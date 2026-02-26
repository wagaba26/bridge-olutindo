import { NextResponse } from "next/server";

import { checkRateLimit } from "@/lib/api-security";

export async function GET(request: Request) {
  const limitError = await checkRateLimit({ request, routeKey: "jp-kanji", limit: 30, windowMs: 60_000 });
  if (limitError) return limitError;

  const { searchParams } = new URL(request.url);
  const raw = String(searchParams.get("char") ?? "").trim();
  if (!raw) {
    return NextResponse.json({ error: "Missing kanji character." }, { status: 400 });
  }

  const char = Array.from(raw)[0] ?? "";
  if (!char) {
    return NextResponse.json({ error: "Invalid kanji character." }, { status: 400 });
  }

  const response = await fetch(`https://kanjiapi.dev/v1/kanji/${encodeURIComponent(char)}`, {
    next: { revalidate: 86_400 },
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Kanji lookup failed." }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
