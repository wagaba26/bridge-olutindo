"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/fade-in";
import { Input } from "@/components/ui/input";
import { useSiteLanguage } from "@/components/site/language-provider";
import { cn } from "@/lib/utils";

type Locale = "en" | "ja";

type SentenceItem = {
  id: number;
  text: string;
  translation: string | null;
};

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

const DAILY_STEPS = {
  en: [
    { title: "Warm-up", detail: "Kana recall + breathing reset", minutes: "3 min" },
    { title: "Listen", detail: "Short dialogue + comprehension check", minutes: "5 min" },
    { title: "Speak", detail: "Repeat and record two lines", minutes: "5 min" },
    { title: "Review", detail: "Spaced recall for weak items", minutes: "3 min" },
  ],
  ja: [
    { title: "\u30a6\u30a9\u30fc\u30e0\u30a2\u30c3\u30d7", detail: "\u304b\u306a\u306e\u8a18\u61b6\u3092\u6574\u3048\u308b", minutes: "3\u5206" },
    { title: "\u805e\u304f", detail: "\u77ed\u3044\u4f1a\u8a71\u3068\u7406\u89e3\u30c1\u30a7\u30c3\u30af", minutes: "5\u5206" },
    { title: "\u8a71\u3059", detail: "\u30e9\u30a4\u30f3\u3092\u7e70\u308a\u8fd4\u3057\u9332\u97f3", minutes: "5\u5206" },
    { title: "\u5fa9\u7fd2", detail: "\u5fd8\u5374\u30bf\u30a4\u30df\u30f3\u30b0\u3067\u898b\u76f4\u3057", minutes: "3\u5206" },
  ],
} as const;

const IMMERSION_MODES = {
  en: [
    {
      key: "n5",
      label: "N5 English-first",
      support: "English support for meaning",
      example: "\u4eca\u65e5\u306f\u56f3\u66f8\u9928\u3078\u884c\u304d\u307e\u3059\u3002",
      translation: "Today I am going to the library.",
    },
    {
      key: "n4",
      label: "N4 Balanced",
      support: "Reading support (hiragana)",
      example: "\u660e\u65e5\u306f\u6388\u696d\u304c\u3042\u308a\u307e\u3059\u3002",
      translation: "\u3042\u3057\u305f\u306f \u3058\u3085\u304e\u3087\u3046\u304c \u3042\u308a\u307e\u3059\u3002",
    },
    {
      key: "n3",
      label: "N3 Japanese-first",
      support: "Japanese-first (hiragana only)",
      example: "\u7d42\u696d\u5f8c\u306b\u56f3\u66f8\u9928\u3067\u52c9\u5f37\u3057\u307e\u3059\u3002",
      translation: "\u3057\u3085\u3046\u304e\u3087\u3046\u3054\u306b \u3068\u3057\u3087\u304b\u3093\u3067 \u3079\u3093\u304d\u3087\u3046\u3057\u307e\u3059\u3002",
    },
  ],
  ja: [
    {
      key: "n5",
      label: "N5 \u82f1\u8a9e\u4e2d\u5fc3",
      support: "\u82f1\u8a9e\u3067\u610f\u5473\u3092\u30b5\u30dd\u30fc\u30c8",
      example: "\u4eca\u65e5\u306f\u56f3\u66f8\u9928\u3078\u884c\u304d\u307e\u3059\u3002",
      translation: "Today I am going to the library.",
    },
    {
      key: "n4",
      label: "N4 \u30d0\u30e9\u30f3\u30b9",
      support: "\u3072\u3089\u304c\u306a\u3067\u3088\u307f\u3092\u8868\u793a",
      example: "\u660e\u65e5\u306f\u6388\u696d\u304c\u3042\u308a\u307e\u3059\u3002",
      translation: "\u3042\u3057\u305f\u306f \u3058\u3085\u304e\u3087\u3046\u304c \u3042\u308a\u307e\u3059\u3002",
    },
    {
      key: "n3",
      label: "N3 \u65e5\u672c\u8a9e\u4e2d\u5fc3",
      support: "\u65e5\u672c\u8a9e\u4e2d\u5fc3\u3001\u3072\u3089\u304c\u306a\u306e\u307f",
      example: "\u7d42\u696d\u5f8c\u306b\u56f3\u66f8\u9928\u3067\u52c9\u5f37\u3057\u307e\u3059\u3002",
      translation: "\u3057\u3085\u3046\u304e\u3087\u3046\u3054\u306b \u3068\u3057\u3087\u304b\u3093\u3067 \u3079\u3093\u304d\u3087\u3046\u3057\u307e\u3059\u3002",
    },
  ],
} as const;

const WEEKLY_PLANS = {
  en: [
    { hours: 3, label: "3 hours / week", blocks: ["3 sessions x 60 min", "Focus: kana + basic listening"] },
    { hours: 6, label: "6 hours / week", blocks: ["4 sessions x 90 min", "Focus: grammar + speaking"] },
    { hours: 10, label: "10 hours / week", blocks: ["5 sessions x 120 min", "Focus: immersion + review"] },
  ],
  ja: [
    { hours: 3, label: "\u90313\u6642\u9593", blocks: ["60\u5206 x 3\u56de", "\u304b\u306a\u3068\u805e\u304f\u529b\u3092\u4e2d\u5fc3\u306b"] },
    { hours: 6, label: "\u90316\u6642\u9593", blocks: ["90\u5206 x 4\u56de", "\u6587\u6cd5\u3068\u8a71\u3059\u529b\u3092\u5f37\u5316"] },
    { hours: 10, label: "\u903110\u6642\u9593", blocks: ["120\u5206 x 5\u56de", "\u6ca1\u5165\u3068\u5fa9\u7fd2\u3092\u5b8c\u6210\u5f62\u306b"] },
  ],
} as const;

const REVIEW_QUEUE = {
  en: [
    { item: "\u304a\u9858\u3044\u3057\u307e\u3059", type: "Phrase", next: "Today, 18:00" },
    { item: "\u304b\u3089\u3044", type: "Vocabulary", next: "Tomorrow, 08:00" },
    { item: "\u3044\u305f\u3060\u304d\u307e\u3059", type: "Phrase", next: "In 2 days" },
  ],
  ja: [
    { item: "\u304a\u9858\u3044\u3057\u307e\u3059", type: "\u30d5\u30ec\u30fc\u30ba", next: "\u4eca\u65e5 18:00" },
    { item: "\u304b\u3089\u3044", type: "\u5358\u8a9e", next: "\u660e\u65e5 08:00" },
    { item: "\u3044\u305f\u3060\u304d\u307e\u3059", type: "\u30d5\u30ec\u30fc\u30ba", next: "2\u65e5\u5f8c" },
  ],
} as const;

const SCENARIOS = {
  en: [
    { title: "At the clinic", focus: "Explain symptoms and ask follow-up questions." },
    { title: "City office", focus: "Resident registration and basic forms." },
    { title: "Train station", focus: "Ask for directions and platform changes." },
    { title: "Cafe order", focus: "Practice polite requests and payment flow." },
  ],
  ja: [
    { title: "\u75c5\u9662\u3067", focus: "\u75c7\u72b6\u306e\u8aac\u660e\u3068\u8ffd\u52a0\u8cea\u554f\u3002" },
    { title: "\u5e02\u5f79\u6240\u3067", focus: "\u4f4f\u6c11\u767b\u9332\u3068\u7c21\u5358\u306a\u624b\u7d9a\u304d\u3002" },
    { title: "\u99c5\u3067", focus: "\u65b9\u5411\u3084\u4e57\u308a\u63db\u3048\u306e\u78ba\u8a8d\u3002" },
    { title: "\u30ab\u30d5\u30a7\u3067", focus: "\u4e01\u5be7\u306a\u6ce8\u6587\u3068\u652f\u6255\u3044\u3002" },
  ],
} as const;

const CULTURE_CARDS = {
  en: [
    { title: "Introductions", body: "Use \u3088\u308d\u3057\u304f\u304a\u9858\u3044\u3057\u307e\u3059 with a calm bow." },
    { title: "Quiet transit", body: "Lower voice volume and avoid calls on trains." },
    { title: "Shoes indoors", body: "Change footwear at entry and align shoes neatly." },
    { title: "Waste sorting", body: "Separate burnables, plastics, cans, and paper." },
  ],
  ja: [
    { title: "\u81ea\u5df1\u7d39\u4ecb", body: "\u3088\u308d\u3057\u304f\u304a\u9858\u3044\u3057\u307e\u3059\u3068\u7a4f\u3084\u304b\u306b\u304a\u3058\u304e\u3002" },
    { title: "\u99c5\u3067\u306e\u58f0\u91cf", body: "\u8eca\u5185\u3067\u306f\u58f0\u3092\u63a7\u3048\u308b\u3002" },
    { title: "\u9762\u7d22\u3068\u5c65\u7269", body: "\u5165\u308a\u53e3\u3067\u9762\u7d22\u3092\u6574\u7406\u3002" },
    { title: "\u30b4\u30df\u5206\u5225", body: "\u53ef\u71c3\u3001\u30d7\u30e9\u3001\u7f36\u30fb\u74f6\u3001\u7d19\u3092\u5206\u3051\u308b\u3002" },
  ],
} as const;

const REPORT_METRICS = {
  en: [
    { label: "Accuracy", value: 82 },
    { label: "Listening precision", value: 76 },
    { label: "Fluency", value: 64 },
    { label: "Consistency", value: 57 },
  ],
  ja: [
    { label: "\u6b63\u78ba\u3055", value: 82 },
    { label: "\u805e\u304d\u53d6\u308a\u7cbe\u5ea6", value: 76 },
    { label: "\u6d41\u66f4\u6027", value: 64 },
    { label: "\u7d99\u7d9a\u7387", value: 57 },
  ],
} as const;

const RESOURCE_ITEMS = {
  en: [
    { title: "Kana master map", status: "Saved" },
    { title: "N5 listening pack", status: "In progress" },
    { title: "Everyday forms glossary", status: "Completed" },
  ],
  ja: [
    { title: "\u304b\u306a\u30de\u30c3\u30d7", status: "\u4fdd\u5b58\u6e08\u307f" },
    { title: "N5\u30ea\u30b9\u30cb\u30f3\u30b0\u30d1\u30c3\u30af", status: "\u9032\u884c\u4e2d" },
    { title: "\u751f\u6d3b\u66f8\u985e\u7528\u8a9e", status: "\u5b8c\u4e86" },
  ],
} as const;

const COPY = {
  en: {
    systemKicker: "Learning system",
    systemTitle: "Daily rhythm, immersion control, and weekly focus.",
    systemBody: "A short daily loop plus level-based exposure keeps progress steady without burnout.",
    retentionKicker: "Retention and feedback",
    retentionTitle: "Hold what you learn and track it clearly.",
    retentionBody: "Review at the right time, refine pronunciation, and see clear weekly progress.",
    readinessKicker: "Everyday readiness",
    readinessTitle: "Practice real-life situations before they happen.",
    readinessBody: "Short scenarios and cultural reminders build calm, practical readiness.",
    toolsKicker: "Language tools",
    toolsTitle: "Check kanji and sentences quickly.",
    toolsBody: "Powered by public data with caching and rate limits.",
    immersionLabel: "Immersion mode",
    planLabel: "Weekly plan builder",
    dailyLoopLabel: "Daily practice loop",
    microReviewLabel: "Review plan",
    pronunciationLabel: "Pronunciation guide",
    scenarioLabel: "Scenario practice",
    cultureLabel: "Culture quick-cards",
    reportLabel: "Weekly progress",
    resourceLabel: "Resource tracker",
    targetLineLabel: "Target line",
  },
  ja: {
    systemKicker: "\u5b66\u7fd2\u30b7\u30b9\u30c6\u30e0",
    systemTitle: "\u6bce\u65e5\u306e\u30ea\u30ba\u30e0\u3068\u6ca1\u5165\u8abf\u6574\u3001\u9031\u6b21\u306e\u7126\u70b9\u3002",
    systemBody: "\u77ed\u3044\u30eb\u30fc\u30d7\u3068\u30ec\u30d9\u30eb\u5225\u306e\u8abf\u6574\u3067\u3001\u7a4f\u3084\u304b\u306b\u7d9a\u3051\u3089\u308c\u307e\u3059\u3002",
    retentionKicker: "\u5b9a\u7740\u3068\u30d5\u30a3\u30fc\u30c9\u30d0\u30c3\u30af",
    retentionTitle: "\u5b66\u7fd2\u3092\u4fdd\u3061\u3001\u9032\u6b69\u3092\u78ba\u8a8d\u3002",
    retentionBody: "\u9069\u5207\u306a\u30bf\u30a4\u30df\u30f3\u30b0\u3067\u5fa9\u7fd2\u3057\u3001\u6bce\u9031\u306e\u9032\u6357\u3092\u6570\u5024\u3067\u8996\u899a\u5316\u3002",
    readinessKicker: "\u65e5\u5e38\u5bfe\u5fdc",
    readinessTitle: "\u4e88\u884c\u6f14\u7fd2\u3067\u5b89\u5fc3\u3092\u3064\u304f\u308b\u3002",
    readinessBody: "\u5730\u57df\u751f\u6d3b\u306e\u30b7\u30fc\u30f3\u3092\u77ed\u304f\u7df4\u7fd2\u3057\u3001\u5bfe\u5fdc\u529b\u3092\u4e0a\u3052\u307e\u3059\u3002",
    toolsKicker: "\u8a00\u8a9e\u30c4\u30fc\u30eb",
    toolsTitle: "\u6f22\u5b57\u3068\u4f8b\u6587\u3092\u3059\u3050\u78ba\u8a8d\u3002",
    toolsBody: "\u516c\u958b\u30c7\u30fc\u30bf\u3092\u5b89\u5168\u306a\u7bc4\u56f2\u3067\u53d6\u5f97\u3002",
    immersionLabel: "\u6ca1\u5165\u30e2\u30fc\u30c9",
    planLabel: "\u9031\u6b21\u30d7\u30e9\u30f3",
    dailyLoopLabel: "\u6bce\u65e5\u306e\u7df4\u7fd2\u30eb\u30fc\u30d7",
    microReviewLabel: "\u5fa9\u7fd2\u30d7\u30e9\u30f3",
    pronunciationLabel: "\u767a\u97f3\u30ac\u30a4\u30c9",
    scenarioLabel: "\u30b7\u30fc\u30ca\u30ea\u30aa\u7df4\u7fd2",
    cultureLabel: "\u30ab\u30eb\u30c1\u30e3\u30fc\u30ab\u30fc\u30c9",
    reportLabel: "\u9031\u6b21\u306e\u9032\u6357",
    resourceLabel: "\u30ea\u30bd\u30fc\u30b9\u7ba1\u7406",
    targetLineLabel: "\u76ee\u6a19\u30d5\u30ec\u30fc\u30ba",
  },
} as const;

export function HomeLearningFeatures({ locale }: { locale?: Locale }) {
  const { locale: siteLocale } = useSiteLanguage();
  const activeLocale = locale ?? siteLocale;
  const t = COPY[activeLocale];
  const dailySteps = DAILY_STEPS[activeLocale];
  const immersionModes = IMMERSION_MODES[activeLocale];
  const weeklyPlans = WEEKLY_PLANS[activeLocale];
  const reviewQueue = REVIEW_QUEUE[activeLocale];
  const scenarios = SCENARIOS[activeLocale];
  const cultureCards = CULTURE_CARDS[activeLocale];
  const reportMetrics = REPORT_METRICS[activeLocale];
  const resources = RESOURCE_ITEMS[activeLocale];

  const [immersionKey, setImmersionKey] = useState("n5");
  const activeImmersion = useMemo(
    () => immersionModes.find((mode) => mode.key === immersionKey) ?? immersionModes[0],
    [immersionKey, immersionModes]
  );

  const [weeklyHours, setWeeklyHours] = useState(6);
  const weeklyPlan = useMemo(
    () => weeklyPlans.find((plan) => plan.hours === weeklyHours) ?? weeklyPlans[1],
    [weeklyHours, weeklyPlans]
  );

  const [kanjiInput, setKanjiInput] = useState("\u65e5");
  const [kanjiData, setKanjiData] = useState<KanjiPayload | null>(null);
  const [wordItems, setWordItems] = useState<WordItem[]>([]);
  const [sentenceQuery, setSentenceQuery] = useState("\u56f3\u66f8\u9928");
  const [sentences, setSentences] = useState<SentenceItem[]>([]);
  const [kanjiStatus, setKanjiStatus] = useState<string | null>(null);
  const [sentenceStatus, setSentenceStatus] = useState<string | null>(null);

  async function handleKanjiLookup() {
    const char = Array.from(kanjiInput.trim())[0];
    if (!char) return;
    setKanjiStatus(activeLocale === "ja" ? "\u8aad\u307f\u8fbc\u307f\u4e2d\u2026" : "Loading kanji...");
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
      setKanjiStatus(activeLocale === "ja" ? "\u53d6\u5f97\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002" : "Unable to load kanji details.");
    }
  }

  async function handleSentenceSearch() {
    const query = sentenceQuery.trim();
    if (!query) return;
    setSentenceStatus(activeLocale === "ja" ? "\u691c\u7d22\u4e2d\u2026" : "Searching sentences...");
    try {
      const response = await fetch(`/api/japanese/sentences?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error("Sentence lookup failed.");
      const data = (await response.json()) as { items: SentenceItem[] };
      setSentences(data.items ?? []);
      setSentenceStatus(null);
    } catch {
      setSentences([]);
      setSentenceStatus(activeLocale === "ja" ? "\u53d6\u5f97\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002" : "Unable to load sentences.");
    }
  }

  return (
    <>
      {/* Sections filled in below via follow-up patches. */}
      <section className="bg-[#f7f7f7] py-10">
        <div className="container mx-auto space-y-6 px-4">
          <FadeIn>
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{t.systemKicker}</p>
              <h2 className="text-[1.9rem] leading-[1.1] md:text-4xl">{t.systemTitle}</h2>
              <p className="text-base leading-7 text-slate-600">{t.systemBody}</p>
            </div>
          </FadeIn>
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <FadeIn>
              <Card>
                <CardHeader>
                  <CardTitle>{t.immersionLabel}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {immersionModes.map((mode) => (
                      <button
                        key={mode.key}
                        type="button"
                        aria-pressed={immersionKey === mode.key}
                        onClick={() => setImmersionKey(mode.key)}
                        className={cn(
                          "rounded-full border px-4 py-2 text-xs font-semibold",
                          immersionKey === mode.key
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-200 bg-white text-slate-700"
                        )}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{activeImmersion.support}</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{activeImmersion.example}</p>
                    <p className="mt-2 text-sm text-slate-600">{activeImmersion.translation}</p>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
            <FadeIn delay={0.05}>
              <Card>
                <CardHeader>
                  <CardTitle>{t.dailyLoopLabel}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    {dailySteps.map((step, index) => (
                      <div key={step.title} className="rounded-xl border border-slate-200 bg-white p-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Step {index + 1}</p>
                        <p className="mt-2 text-sm font-semibold text-slate-900">{step.title}</p>
                        <p className="mt-1 text-xs text-slate-600">{step.detail}</p>
                        <p className="mt-3 text-xs font-semibold text-slate-800">{step.minutes}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>{activeLocale === "ja" ? "\u4eca\u65e5" : "Today"}</span>
                      <span>{activeLocale === "ja" ? "4\u30b9\u30c6\u30c3\u30d7\u4e2d2\u5b8c\u4e86" : "2 of 4 steps complete"}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-200">
                      <div className="h-2 w-[50%] rounded-full bg-slate-900" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          <FadeIn delay={0.08}>
            <Card>
              <CardHeader>
                <CardTitle>{t.planLabel}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {weeklyPlans.map((plan) => (
                    <Button
                      key={plan.hours}
                      type="button"
                      variant={weeklyHours === plan.hours ? "default" : "outline"}
                      className="h-10 rounded-full px-4 text-sm"
                      onClick={() => setWeeklyHours(plan.hours)}
                    >
                      {plan.label}
                    </Button>
                  ))}
                </div>
                <ul className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  {weeklyPlan.blocks.map((block) => (
                    <li key={block} className="py-1">{block}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>
      <section className="border-t border-slate-200 bg-[#efefef] py-10">
        <div className="container mx-auto space-y-6 px-4">
          <FadeIn>
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{t.retentionKicker}</p>
              <h2 className="text-[1.9rem] leading-[1.1] md:text-4xl">{t.retentionTitle}</h2>
              <p className="text-base leading-7 text-slate-600">{t.retentionBody}</p>
            </div>
          </FadeIn>
          <div className="grid gap-4 lg:grid-cols-3">
            <FadeIn>
              <Card>
                <CardHeader>
                  <CardTitle>{t.microReviewLabel}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {reviewQueue.map((item) => (
                    <div key={item.item} className="rounded-xl border border-slate-200 bg-white p-3">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-slate-900">{item.item}</p>
                        <span className="text-xs text-slate-500">{item.type}</span>
                      </div>
                      <p className="mt-2 text-xs text-slate-500">{item.next}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </FadeIn>
            <FadeIn delay={0.05}>
              <Card>
                <CardHeader>
                  <CardTitle>{t.pronunciationLabel}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{t.targetLineLabel}</p>
                    <p className="mt-2 text-base font-semibold text-slate-900">
                      そのことばをもう一度いってください。
                    </p>
                  </div>
                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2">
                      <span>{activeLocale === "ja" ? "\u30e2\u30fc\u30e9\u30bf\u30a4\u30df\u30f3\u30b0" : "Mora timing"}</span>
                      <span className="font-semibold text-brand-700">{activeLocale === "ja" ? "\u6ce8\u610f" : "Focus"}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2">
                      <span>{activeLocale === "ja" ? "\u9577\u97f3" : "Long vowels"}</span>
                      <span>{activeLocale === "ja" ? "\u5b89\u5b9a" : "Stable"}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2">
                      <span>{activeLocale === "ja" ? "\u767a\u97f3\u306e\u660e\u77ad" : "Clarity"}</span>
                      <span>{activeLocale === "ja" ? "\u5b89\u5b9a" : "Stable"}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" className="h-9 rounded-full px-4 text-sm">
                      {activeLocale === "ja" ? "\u9332\u97f3" : "Record"}
                    </Button>
                    <Button type="button" variant="outline" className="h-9 rounded-full px-4 text-sm">
                      {activeLocale === "ja" ? "\u624b\u672c\u3092\u518d\u751f" : "Play model"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle>{t.reportLabel}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {reportMetrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>{metric.label}</span>
                        <span>{metric.value}%</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
                        <div className="h-2 rounded-full bg-slate-900" style={{ width: `${metric.value}%` }} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>
      <section className="border-t border-slate-200 bg-[#f7f7f7] py-10">
        <div className="container mx-auto space-y-6 px-4">
          <FadeIn>
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{t.readinessKicker}</p>
              <h2 className="text-[1.9rem] leading-[1.1] md:text-4xl">{t.readinessTitle}</h2>
              <p className="text-base leading-7 text-slate-600">{t.readinessBody}</p>
            </div>
          </FadeIn>
          <div className="grid gap-4 lg:grid-cols-3">
            <FadeIn>
              <Card>
                <CardHeader>
                  <CardTitle>{t.scenarioLabel}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {scenarios.map((scenario) => (
                    <div key={scenario.title} className="rounded-xl border border-slate-200 bg-white p-3">
                      <p className="font-semibold text-slate-900">{scenario.title}</p>
                      <p className="mt-1 text-xs text-slate-600">{scenario.focus}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </FadeIn>
            <FadeIn delay={0.05}>
              <Card>
                <CardHeader>
                  <CardTitle>{t.cultureLabel}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 text-sm">
                  {cultureCards.map((card) => (
                    <div key={card.title} className="rounded-xl border border-slate-200 bg-white p-3">
                      <p className="font-semibold text-slate-900">{card.title}</p>
                      <p className="mt-1 text-xs text-slate-600">{card.body}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle>{t.resourceLabel}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {resources.map((resource) => (
                    <div key={resource.title} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2">
                      <span className="font-semibold text-slate-900">{resource.title}</span>
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
                        {resource.status}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>
      <section className="border-t border-slate-200 bg-[#efefef] py-10">
        <div className="container mx-auto space-y-6 px-4">
          <FadeIn>
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{t.toolsKicker}</p>
              <h2 className="text-[1.9rem] leading-[1.1] md:text-4xl">{t.toolsTitle}</h2>
              <p className="text-base leading-7 text-slate-600">{t.toolsBody}</p>
            </div>
          </FadeIn>
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <FadeIn>
              <Card>
                <CardHeader>
                  <CardTitle>{activeLocale === "ja" ? "\u6f22\u5b57\u691c\u7d22" : "Kanji explorer"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Input
                      value={kanjiInput}
                      onChange={(event) => setKanjiInput(event.target.value)}
                      placeholder={activeLocale === "ja" ? "\u6f22\u5b57\u3092\u5165\u529b" : "Enter a kanji"}
                      className="max-w-[200px]"
                    />
                    <Button type="button" className="h-10 rounded-full px-4 text-sm" onClick={handleKanjiLookup}>
                      {activeLocale === "ja" ? "\u691c\u7d22" : "Lookup"}
                    </Button>
                  </div>
                  {kanjiStatus ? <p className="text-sm text-slate-600">{kanjiStatus}</p> : null}
                  {kanjiData ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <p className="text-xs text-slate-500">Kanji</p>
                        <p className="mt-2 text-3xl font-semibold">{kanjiData.kanji}</p>
                        <p className="mt-2 text-xs text-slate-600">
                          {kanjiData.meanings?.join(", ") || (activeLocale === "ja" ? "\u610f\u5473\u306a\u3057" : "No meaning yet")}
                        </p>
                      </div>
                      <div className="space-y-2 text-sm text-slate-600">
                        <p><span className="font-semibold text-slate-900">On:</span> {kanjiData.on_readings?.join(", ") || "-"}</p>
                        <p><span className="font-semibold text-slate-900">Kun:</span> {kanjiData.kun_readings?.join(", ") || "-"}</p>
                        <p><span className="font-semibold text-slate-900">Stroke:</span> {kanjiData.stroke_count ?? "-"}</p>
                        <p><span className="font-semibold text-slate-900">JLPT:</span> {kanjiData.jlpt ?? "-"}</p>
                        <p><span className="font-semibold text-slate-900">Grade:</span> {kanjiData.grade ?? "-"}</p>
                      </div>
                    </div>
                  ) : null}
                  {wordItems.length ? (
                    <div className="space-y-2 text-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {activeLocale === "ja" ? "\u4f8b\u6587\u30fb\u5358\u8a9e" : "Word examples"}
                      </p>
                      {wordItems.map((item, idx) => (
                        <div key={`${item.variants?.[0]?.written ?? "word"}-${idx}`} className="rounded-xl border border-slate-200 bg-white p-3">
                          <p className="font-semibold text-slate-900">
                            {item.variants?.[0]?.written ?? ""}
                            <span className="ml-2 text-xs text-slate-500">{item.variants?.[0]?.pronounced ?? ""}</span>
                          </p>
                          <p className="mt-1 text-xs text-slate-600">
                            {item.meanings?.[0]?.glosses?.join(", ") ?? ""}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </FadeIn>
            <FadeIn delay={0.05}>
              <Card>
                <CardHeader>
                  <CardTitle>{activeLocale === "ja" ? "\u4f8b\u6587\u691c\u7d22" : "Sentence finder"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Input
                      value={sentenceQuery}
                      onChange={(event) => setSentenceQuery(event.target.value)}
                      placeholder={activeLocale === "ja" ? "\u65e5\u672c\u8a9e\u3067\u691c\u7d22" : "Search a Japanese word"}
                    />
                    <Button type="button" variant="outline" className="h-10 rounded-full px-4 text-sm" onClick={handleSentenceSearch}>
                      {activeLocale === "ja" ? "\u691c\u7d22" : "Search"}
                    </Button>
                  </div>
                  {sentenceStatus ? <p className="text-sm text-slate-600">{sentenceStatus}</p> : null}
                  <div className="space-y-2 text-sm">
                    {sentences.length ? (
                      sentences.map((sentence) => (
                        <div key={sentence.id} className="rounded-xl border border-slate-200 bg-white p-3">
                          <p className="font-semibold text-slate-900">{sentence.text}</p>
                          {sentence.translation ? <p className="mt-2 text-xs text-slate-600">{sentence.translation}</p> : null}
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-600">
                        {activeLocale === "ja" ? "\u8a9e\u3092\u5165\u529b\u3059\u308b\u3068\u4f8b\u6587\u304c\u8868\u793a\u3055\u308c\u307e\u3059\u3002" : "Search a term to see example sentences."}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
