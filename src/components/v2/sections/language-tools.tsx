"use client";

import { useState } from "react";

import { Button } from "@/src/components/v2/ui/button";
import { Card } from "@/src/components/v2/ui/card";
import { Input } from "@/src/components/v2/ui/input";
import { cn } from "@/lib/utils";

type KanjiPayload = {
  kanji: string;
  grade?: number;
  jlpt?: number;
  stroke_count?: number;
  meanings?: string[];
  kun_readings?: string[];
  on_readings?: string[];
};

type WordItem = {
  meanings?: Array<{ glosses?: string[] }>;
  variants?: Array<{ written?: string; pronounced?: string }>;
};

type SentenceItem = {
  id: number;
  text: string;
  translation: string | null;
};

export function LanguageToolsPanel({ className }: { className?: string }) {
  const [kanjiInput, setKanjiInput] = useState("?");
  const [kanjiData, setKanjiData] = useState<KanjiPayload | null>(null);
  const [wordItems, setWordItems] = useState<WordItem[]>([]);
  const [sentenceQuery, setSentenceQuery] = useState("???");
  const [sentences, setSentences] = useState<SentenceItem[]>([]);
  const [kanjiStatus, setKanjiStatus] = useState<string | null>(null);
  const [sentenceStatus, setSentenceStatus] = useState<string | null>(null);

  async function handleKanjiLookup() {
    const char = Array.from(kanjiInput.trim())[0];
    if (!char) return;
    setKanjiStatus("Loading kanji...");
    try {
      const [kanjiRes, wordsRes] = await Promise.all([
        fetch(`/api/japanese/kanji?char=${encodeURIComponent(char)}`),
        fetch(`/api/japanese/words?char=${encodeURIComponent(char)}`),
      ]);
      if (!kanjiRes.ok) throw new Error("Kanji lookup failed.");
      const kanji = (await kanjiRes.json()) as KanjiPayload;
      const words = wordsRes.ok ? ((await wordsRes.json()) as WordItem[]) : [];
      setKanjiData(kanji);
      setWordItems(words.slice(0, 5));
      setKanjiStatus(null);
    } catch {
      setKanjiData(null);
      setWordItems([]);
      setKanjiStatus("Unable to load kanji details.");
    }
  }

  async function handleSentenceSearch() {
    const query = sentenceQuery.trim();
    if (!query) return;
    setSentenceStatus("Searching sentences...");
    try {
      const response = await fetch(`/api/japanese/sentences?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error("Sentence lookup failed.");
      const data = (await response.json()) as { items: SentenceItem[] };
      setSentences(data.items ?? []);
      setSentenceStatus(null);
    } catch {
      setSentences([]);
      setSentenceStatus("Unable to load sentences.");
    }
  }

  return (
    <section className={cn("v2-section pt-0", className)}>
      <div className="v2-container space-y-6">
        <div className="max-w-2xl space-y-3">
          <p className="v2-eyebrow">Language tools</p>
          <h2 className="v2-title text-[clamp(2rem,4vw,3.2rem)]">Fast reference while you study</h2>
          <p className="v2-subtitle">
            Pull kanji details, example words, and short sentences without leaving your practice flow.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
          <Card className="space-y-4">
            <div>
              <p className="v2-eyebrow">Kanji explorer</p>
              <h3 className="mt-2 text-lg font-semibold">Check readings and usage quickly</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <Input
                value={kanjiInput}
                onChange={(event) => setKanjiInput(event.target.value)}
                placeholder="Enter a single kanji"
                className="max-w-[240px]"
              />
              <Button type="button" onClick={handleKanjiLookup}>
                Lookup
              </Button>
            </div>
            {kanjiStatus ? <p className="text-sm text-[var(--v2-text-muted)]">{kanjiStatus}</p> : null}
            {kanjiData ? (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[var(--v2-radius-md)] border border-[var(--v2-border)] bg-[var(--v2-surface)] p-3">
                  <p className="text-xs text-[var(--v2-text-muted)]">Kanji</p>
                  <p className="mt-2 text-3xl font-semibold">{kanjiData.kanji}</p>
                  <p className="mt-2 text-xs text-[var(--v2-text-muted)]">
                    {kanjiData.meanings?.join(", ") || "Meaning unavailable"}
                  </p>
                </div>
                <div className="space-y-2 text-sm text-[var(--v2-text-muted)]">
                  <p><span className="font-semibold text-[var(--v2-text)]">On:</span> {kanjiData.on_readings?.join(", ") || "-"}</p>
                  <p><span className="font-semibold text-[var(--v2-text)]">Kun:</span> {kanjiData.kun_readings?.join(", ") || "-"}</p>
                  <p><span className="font-semibold text-[var(--v2-text)]">Stroke:</span> {kanjiData.stroke_count ?? "-"}</p>
                  <p><span className="font-semibold text-[var(--v2-text)]">JLPT:</span> {kanjiData.jlpt ?? "-"}</p>
                  <p><span className="font-semibold text-[var(--v2-text)]">Grade:</span> {kanjiData.grade ?? "-"}</p>
                </div>
              </div>
            ) : null}
            {wordItems.length ? (
              <div className="space-y-2 text-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--v2-text-muted)]">Word examples</p>
                {wordItems.map((item, idx) => (
                  <div key={`${item.variants?.[0]?.written ?? "word"}-${idx}`} className="rounded-[var(--v2-radius-md)] border border-[var(--v2-border)] bg-white p-3">
                    <p className="font-semibold text-[var(--v2-text)]">
                      {item.variants?.[0]?.written ?? ""}
                      <span className="ml-2 text-xs text-[var(--v2-text-muted)]">{item.variants?.[0]?.pronounced ?? ""}</span>
                    </p>
                    <p className="mt-1 text-xs text-[var(--v2-text-muted)]">
                      {item.meanings?.[0]?.glosses?.join(", ") ?? ""}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </Card>

          <Card className="space-y-4">
            <div>
              <p className="v2-eyebrow">Sentence finder</p>
              <h3 className="mt-2 text-lg font-semibold">See the word in context</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <Input
                value={sentenceQuery}
                onChange={(event) => setSentenceQuery(event.target.value)}
                placeholder="Search by Japanese word"
              />
              <Button type="button" variant="secondary" onClick={handleSentenceSearch}>
                Search
              </Button>
            </div>
            {sentenceStatus ? <p className="text-sm text-[var(--v2-text-muted)]">{sentenceStatus}</p> : null}
            <div className="space-y-2 text-sm">
              {sentences.length ? (
                sentences.map((sentence) => (
                  <div key={sentence.id} className="rounded-[var(--v2-radius-md)] border border-[var(--v2-border)] bg-white p-3">
                    <p className="font-semibold text-[var(--v2-text)]">{sentence.text}</p>
                    {sentence.translation ? (
                      <p className="mt-2 text-xs text-[var(--v2-text-muted)]">{sentence.translation}</p>
                    ) : null}
                  </div>
                ))
              ) : (
                <p className="text-xs text-[var(--v2-text-muted)]">Search a term to see example sentences.</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
