import { NextResponse } from "next/server";

import { checkRateLimit } from "@/lib/api-security";

type TatoebaSentence = {
  id: number;
  text: string;
  translations?: Array<{ text: string; lang: string }>;
};

export async function GET(request: Request) {
  const limitError = await checkRateLimit({ request, routeKey: "jp-sentences", limit: 20, windowMs: 60_000 });
  if (limitError) return limitError;

  const { searchParams } = new URL(request.url);
  const query = String(searchParams.get("q") ?? "").trim();
  if (!query) {
    return NextResponse.json({ error: "Missing query." }, { status: 400 });
  }

  const params = new URLSearchParams();
  params.set("lang", "jpn");
  params.set("q", query);
  params.set("sort", "relevance");
  params.set("limit", "5");
  params.set("trans:lang", "eng");

  const response = await fetch(`https://api.tatoeba.org/unstable/sentences?${params.toString()}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Sentence lookup failed." }, { status: response.status });
  }

  const data = (await response.json()) as { data?: TatoebaSentence[] };
  const items = (data.data ?? []).map((item) => ({
    id: item.id,
    text: item.text,
    translation: item.translations?.[0]?.text ?? null,
  }));

  return NextResponse.json({ items });
}
