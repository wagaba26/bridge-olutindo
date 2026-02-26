import { NextResponse } from "next/server";

import { checkRateLimit } from "@/lib/api-security";

const MAX_TEXT_LENGTH = 240;
const DEFAULT_DAILY_BUDGET = 300;
const TTS_ROUTE_LIMIT_PER_MINUTE = 12;

type MemoryDailyBucket = {
  day: string;
  count: number;
};

const MEMORY_DAILY_BUDGET: MemoryDailyBucket = {
  day: "",
  count: 0,
};

function normalizeLanguage(value: string) {
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) return "ja-JP";
  if (trimmed.startsWith("ja")) return "ja-JP";
  if (trimmed.startsWith("en")) return "en-US";
  return "ja-JP";
}

async function fetchVoiceRss(text: string, lang: string, key: string) {
  const params = new URLSearchParams();
  params.set("key", key);
  params.set("src", text);
  params.set("hl", lang.toLowerCase());
  params.set("c", "MP3");
  params.set("f", "44khz_16bit_mono");

  const response = await fetch(`https://api.voicerss.org/?${params.toString()}`, {
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") ?? "";
  if (!response.ok || contentType.startsWith("text/plain")) return null;
  return response;
}

function getUtcDayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function secondsUntilNextUtcDay(date = new Date()) {
  const next = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1, 0, 0, 0));
  return Math.max(Math.ceil((next.getTime() - date.getTime()) / 1000), 1);
}

async function reserveDailyBudget(limit: number) {
  const now = new Date();
  const day = getUtcDayKey(now);
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  const retryAfter = secondsUntilNextUtcDay(now);

  if (redisUrl && redisToken) {
    const key = `tts:daily:${day}`;
    const response = await fetch(`${redisUrl}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${redisToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, String(retryAfter), "NX"],
      ]),
      cache: "no-store",
    });

    if (!response.ok) {
      return { allowed: true, retryAfter };
    }

    const results = (await response.json()) as Array<{ result?: number | string | null }>;
    const count = Number(results?.[0]?.result ?? 0);
    return { allowed: count <= limit, retryAfter };
  }

  if (MEMORY_DAILY_BUDGET.day !== day) {
    MEMORY_DAILY_BUDGET.day = day;
    MEMORY_DAILY_BUDGET.count = 0;
  }

  if (MEMORY_DAILY_BUDGET.count >= limit) {
    return { allowed: false, retryAfter };
  }

  MEMORY_DAILY_BUDGET.count += 1;
  return { allowed: true, retryAfter };
}

export async function GET(request: Request) {
  const limitError = await checkRateLimit({
    request,
    routeKey: "jp-tts",
    limit: TTS_ROUTE_LIMIT_PER_MINUTE,
    windowMs: 60_000,
  });
  if (limitError) {
    const retryAfter = limitError.headers.get("Retry-After") ?? "60";
    return NextResponse.json(
      {
        error:
          "Sorry, listening is temporarily busy right now. Please try again in about a minute.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": retryAfter,
        },
      }
    );
  }

  const { searchParams } = new URL(request.url);
  const text = String(searchParams.get("text") ?? "").trim();
  if (!text) {
    return NextResponse.json({ error: "Missing text." }, { status: 400 });
  }
  if (text.length > MAX_TEXT_LENGTH) {
    return NextResponse.json({ error: `Text too long. Max ${MAX_TEXT_LENGTH} characters.` }, { status: 400 });
  }

  const lang = normalizeLanguage(String(searchParams.get("lang") ?? "ja-JP"));
  const voiceRssKey = process.env.VOICERSS_API_KEY?.trim();

  if (!voiceRssKey) {
    return NextResponse.json(
      {
        error:
          "Sorry, listening is not configured yet. Please add a VoiceRSS API key or try again later.",
      },
      { status: 503 }
    );
  }

  const dailyBudgetLimit = Number(process.env.TTS_DAILY_REQUEST_BUDGET ?? DEFAULT_DAILY_BUDGET);
  const budget = await reserveDailyBudget(Math.max(dailyBudgetLimit, 1));
  if (!budget.allowed) {
    return NextResponse.json(
      {
        error:
          "Sorry, listening is paused for now because today's free audio limit has been reached. Please try again tomorrow.",
      },
      {
        status: 503,
        headers: {
          "Retry-After": String(budget.retryAfter),
        },
      }
    );
  }

  const upstream = await fetchVoiceRss(text, lang, voiceRssKey);

  if (!upstream || !upstream.body) {
    return NextResponse.json(
      {
        error:
          "Sorry, listening is not working right now due to provider load. Please try again shortly.",
      },
      { status: 503 }
    );
  }

  return new NextResponse(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "public, max-age=604800, stale-while-revalidate=86400",
      "X-TTS-Provider": "voicerss",
    },
  });
}
