import { NextResponse } from "next/server";

import { recordSecurityEvent } from "@/lib/security-log";

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_STORE = new Map<string, RateLimitBucket>();

async function checkUpstashRateLimit({
  key,
  limit,
  windowMs,
}: {
  key: string;
  limit: number;
  windowMs: number;
}) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  const windowSeconds = Math.max(Math.ceil(windowMs / 1000), 1);
  const endpoint = `${url}/pipeline`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      ["INCR", key],
      ["EXPIRE", key, String(windowSeconds), "NX"],
      ["TTL", key],
    ]),
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const results = (await response.json()) as Array<{ result?: number | string | null }>;
  const count = Number(results?.[0]?.result ?? 0);
  const ttl = Number(results?.[2]?.result ?? windowSeconds);

  if (count > limit) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.max(ttl, 1)),
        },
      }
    );
  }

  return null;
}

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

function isBrowserFormRequest(request: Request) {
  return Boolean(request.headers.get("origin"));
}

export async function validateOrigin(request: Request) {
  if (!isBrowserFormRequest(request)) {
    return null;
  }

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (!origin || !host) {
    await recordSecurityEvent({
      request,
      eventType: "invalid_origin_headers",
      severity: "medium",
      details: { origin, host },
    });
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const originHost = new URL(origin).host;
  if (originHost !== host) {
    await recordSecurityEvent({
      request,
      eventType: "cross_site_blocked",
      severity: "high",
      details: { originHost, host },
    });
    return NextResponse.json({ error: "Cross-site request blocked." }, { status: 403 });
  }

  return null;
}

export async function checkRateLimit({
  request,
  routeKey,
  limit,
  windowMs,
}: {
  request: Request;
  routeKey: string;
  limit: number;
  windowMs: number;
}) {
  const ip = getClientIp(request);
  const key = `${routeKey}:${ip}`;

  const distributedLimitResponse = await checkUpstashRateLimit({ key, limit, windowMs });
  if (distributedLimitResponse) {
    await recordSecurityEvent({
      request,
      eventType: "rate_limit_blocked",
      severity: "medium",
      details: { routeKey, limit, mode: "redis" },
    });
    return distributedLimitResponse;
  }

  const now = Date.now();
  const existing = RATE_LIMIT_STORE.get(key);

  if (!existing || existing.resetAt <= now) {
    RATE_LIMIT_STORE.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  if (existing.count >= limit) {
    await recordSecurityEvent({
      request,
      eventType: "rate_limit_blocked",
      severity: "medium",
      details: { routeKey, limit, mode: "memory" },
    });
    const retryAfter = Math.ceil((existing.resetAt - now) / 1000);
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.max(retryAfter, 1)),
        },
      }
    );
  }

  existing.count += 1;
  RATE_LIMIT_STORE.set(key, existing);
  return null;
}
