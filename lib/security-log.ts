import { createSupabaseAdminOrServerClient } from "@/lib/supabase/admin";

type SecurityEventInput = {
  request: Request;
  eventType: string;
  severity?: "low" | "medium" | "high";
  details?: Record<string, unknown>;
};

type AlertState = {
  count: number;
  resetAt: number;
  lastSentAt: number;
};

const ALERT_STATE = new Map<string, AlertState>();

function shouldSendHighSeverityAlert(key: string) {
  const now = Date.now();
  const current = ALERT_STATE.get(key);
  if (!current || now - current.lastSentAt > 5 * 60_000) {
    ALERT_STATE.set(key, {
      count: current?.count ?? 0,
      resetAt: current?.resetAt ?? now + 10 * 60_000,
      lastSentAt: now,
    });
    return true;
  }
  return false;
}

function shouldSendRateLimitBurstAlert(key: string) {
  const now = Date.now();
  const current = ALERT_STATE.get(key);

  if (!current || current.resetAt <= now) {
    ALERT_STATE.set(key, { count: 1, resetAt: now + 5 * 60_000, lastSentAt: current?.lastSentAt ?? 0 });
    return false;
  }

  current.count += 1;
  ALERT_STATE.set(key, current);

  const burstThreshold = 10;
  const cooldownMs = 10 * 60_000;
  if (current.count >= burstThreshold && now - current.lastSentAt > cooldownMs) {
    current.lastSentAt = now;
    ALERT_STATE.set(key, current);
    return true;
  }

  return false;
}

async function sendSecurityAlert(payload: {
  title: string;
  severity: string;
  eventType: string;
  requestPath: string;
  details: Record<string, unknown>;
}) {
  const webhookUrl = process.env.SECURITY_ALERT_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: [
          `*${payload.title}*`,
          `Severity: ${payload.severity}`,
          `Event: ${payload.eventType}`,
          `Path: ${payload.requestPath}`,
          `Details: ${JSON.stringify(payload.details)}`,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(4000),
    });
  } catch {
    // Alert transport must not block requests.
  }
}

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || null;
  }
  return request.headers.get("x-real-ip");
}

export async function recordSecurityEvent({
  request,
  eventType,
  severity = "low",
  details = {},
}: SecurityEventInput) {
  try {
    const db = await createSupabaseAdminOrServerClient();
    const url = new URL(request.url);
    const userAgent = request.headers.get("user-agent");
    const ipAddress = getClientIp(request);
    const requestPath = url.pathname;

    await db.from("security_events").insert({
      event_type: eventType,
      severity,
      request_path: requestPath,
      ip_address: ipAddress,
      user_agent: userAgent,
      details,
    });

    const highKey = `high:${eventType}:${requestPath}`;
    const burstKey = `burst:${eventType}:${requestPath}`;

    if (severity === "high" && shouldSendHighSeverityAlert(highKey)) {
      await sendSecurityAlert({
        title: "Bridge security alert",
        severity,
        eventType,
        requestPath,
        details,
      });
      return;
    }

    if (eventType === "rate_limit_blocked" && shouldSendRateLimitBurstAlert(burstKey)) {
      await sendSecurityAlert({
        title: "Bridge rate-limit burst detected",
        severity: "medium",
        eventType,
        requestPath,
        details,
      });
    }
  } catch {
    // Security logging should never block main request flow.
  }
}
