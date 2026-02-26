"use client";

import Link from "next/link";

import { useSiteLanguage } from "@/components/site/language-provider";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";

const COPY = {
  en: {
    eyebrow: "Learn Japanese",
    title: "Self-study system",
    description:
      "A structured plan for independent learners: daily drills, weekly review, and measurable progress across speaking, listening, reading, and usage.",
    ctaA: "Open teach-yourself tools",
    ctaB: "Open daily quiz",
    ctaC: "Build my intake plan",
    sectionA: "Program focus",
    sectionATitle: "What this self-study track covers",
    sectionABody:
      "Use this path when you need a reliable routine outside live classes. It is designed for mobile-first study and short, repeatable sessions.",
    tracks: [
      {
        title: "N5 Foundation",
        body: "Core sentence patterns, basic listening accuracy, and daily pronunciation stability.",
      },
      {
        title: "N4 Transition",
        body: "Reading speed, grammar control, and practical speaking for structured exchanges.",
      },
      {
        title: "N3 Readiness",
        body: "Context interpretation, higher listening load, and precise response building.",
      },
    ],
    sectionB: "Weekly model",
    sectionBTitle: "A repeatable rhythm for consistency",
    weekly: [
      "Day 1-2: learn and imitate new patterns (speak + listen blocks).",
      "Day 3-4: reinforce weak points with targeted repetition.",
      "Day 5: run a short quiz loop and log corrections.",
      "Day 6-7: recap outcomes and set next-week targets.",
    ],
    sectionC: "Support scope",
    sectionCTitle: "What support Bridge provides",
    support: [
      "Level guidance and progression checkpoints aligned to JLPT outcomes.",
      "Practice templates for voice, listening, reading, and short written output.",
      "Review framework to track consistency, error patterns, and next actions.",
    ],
    back: "Back to Learn",
  },
  ja: {
    eyebrow: "日本語学習",
    title: "独学システム",
    description:
      "独学でも成果を積み上げるための運用設計です。日次ドリル、週次レビュー、到達指標をつなげて、会話・聴解・読解・運用力を段階的に強化します。",
    ctaA: "独学ツールを開く",
    ctaB: "毎日クイズを開く",
    ctaC: "インテーク計画を作成",
    sectionA: "プログラム範囲",
    sectionATitle: "この独学トラックで扱う内容",
    sectionABody:
      "ライブ授業外でも学習を継続したい方向けの運用モデルです。モバイル中心の短時間学習を前提に設計しています。",
    tracks: [
      {
        title: "N5基礎",
        body: "基本文型、初級聴解、日次の発音安定化を重点的に実施。",
      },
      {
        title: "N4移行",
        body: "読解速度、文法運用、実務的な会話応答の精度を強化。",
      },
      {
        title: "N3準備",
        body: "文脈判断、負荷の高い聴解、正確な応答構築を段階的に訓練。",
      },
    ],
    sectionB: "週次モデル",
    sectionBTitle: "継続しやすい反復サイクル",
    weekly: [
      "1-2日目: 新しい表現を学習し、発話と聴解で反復。",
      "3-4日目: 弱点項目を絞り込み、重点復習。",
      "5日目: クイズで定着確認し、修正点を記録。",
      "6-7日目: 週の成果を整理し、次週目標を設定。",
    ],
    sectionC: "提供サポート",
    sectionCTitle: "Bridgeが支援できる内容",
    support: [
      "JLPT到達を見据えたレベル設計と進捗チェックポイント。",
      "発話・聴解・読解・短文アウトプット向けの実践テンプレート。",
      "継続率、誤答傾向、次アクションを可視化するレビュー設計。",
    ],
    back: "学習ページへ戻る",
  },
} as const;

export default function SelfStudyPage() {
  const { locale } = useSiteLanguage();
  const copy = COPY[locale];

  return (
    <div className="min-h-screen bg-white">
      <section className="section-shell border-b border-slate-300/70 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">{copy.eyebrow}</p>
              <h1 className="max-w-3xl text-balance">{copy.title}</h1>
              <p className="max-w-3xl text-slate-600">{copy.description}</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-11 rounded-xl px-5">
                  <Link href="/learn/teach-yourself">{copy.ctaA}</Link>
                </Button>
                <Button asChild variant="outline" className="h-11 rounded-xl px-5">
                  <Link href="/quiz">{copy.ctaB}</Link>
                </Button>
                <Button asChild variant="outline" className="h-11 rounded-xl px-5">
                  <Link href="/intake?focus=learn">{copy.ctaC}</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="container mx-auto space-y-6 px-4">
          <FadeIn>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">{copy.sectionA}</p>
              <h2 className="mt-2 text-[1.65rem] leading-tight md:text-3xl">{copy.sectionATitle}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{copy.sectionABody}</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.04}>
            <div className="grid gap-px border border-slate-300 bg-slate-300 md:grid-cols-3">
              {copy.tracks.map((item) => (
                <article key={item.title} className="bg-white p-5 md:p-6">
                  <h3 className="text-xl leading-tight">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
                </article>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="pb-10 md:pb-12">
        <div className="container mx-auto space-y-6 px-4">
          <FadeIn>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">{copy.sectionB}</p>
              <h2 className="mt-2 text-[1.65rem] leading-tight md:text-3xl">{copy.sectionBTitle}</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.04}>
            <article className="border border-slate-300 bg-white p-5 md:p-6">
              <ul className="space-y-2 text-sm leading-7 text-slate-600">
                {copy.weekly.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </article>
          </FadeIn>
        </div>
      </section>

      <section className="pb-14 md:pb-16">
        <div className="container mx-auto space-y-6 px-4">
          <FadeIn>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">{copy.sectionC}</p>
              <h2 className="mt-2 text-[1.65rem] leading-tight md:text-3xl">{copy.sectionCTitle}</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.04}>
            <div className="grid gap-px border border-slate-300 bg-slate-300 md:grid-cols-3">
              {copy.support.map((item) => (
                <article key={item} className="bg-white p-5 md:p-6">
                  <p className="text-sm leading-7 text-slate-600">{item}</p>
                </article>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <Button asChild variant="outline" className="h-11 rounded-xl px-5">
              <Link href="/learn">{copy.back}</Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
