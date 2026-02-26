"use client";

import Link from "next/link";

import { useSiteLanguage } from "@/components/site/language-provider";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";

const COPY = {
  en: {
    kicker: "Learn Japanese",
    title: "Choose the right level and progress with a clear weekly structure.",
    body: "N5 to N3 cohorts designed for measurable progress in grammar, listening, reading, and speaking.",
    primaryCta: "Start intake",
    secondaryCta: "Explore levels",
    panelEyebrow: "Learning model",
    panelTitle: "How progression is evaluated",
    panelItems: [
      "Weekly target clarity for grammar, listening, and output.",
      "Error-pattern review and recovery workflow.",
      "Level-based benchmarks aligned to practical outcomes.",
    ],
    gridTitle: "Learn",
    gridBody: "Open one section at a time for focus.",
    viewSection: "View section",
    sections: [
      {
        title: "Enrollment calendar",
        body: "Upcoming cohort windows and intake timing.",
        href: "/learn/enrollment",
      },
      {
        title: "How it works",
        body: "From intake to measurable weekly progress.",
        href: "/learn/how-it-works",
      },
      {
        title: "JLPT levels",
        body: "Choose the level that matches your current ability.",
        href: "/learn/jlpt-levels",
      },
      {
        title: "Self-study",
        body: "Guided drills for speaking, listening, and reading.",
        href: "/learn/self-study",
      },
      {
        title: "Learning system",
        body: "Weekly rhythm, review cadence, and measurable milestones.",
        href: "/learn/learning-system",
      },
      {
        title: "Guides",
        body: "Research-backed resources to refine your plan.",
        href: "/learn/guides",
      },
      {
        title: "FAQ",
        body: "Clear answers before you commit to a cohort.",
        href: "/learn/faq",
      },
    ],
  },
  ja: {
    kicker: "日本語学習",
    title: "自分に合うレベルを選び、週次の学習設計で着実に伸ばす。",
    body: "N5からN3まで、文法・聴解・読解・会話を段階的に伸ばせるコホート型プログラムです。",
    primaryCta: "インテーク開始",
    secondaryCta: "レベルを見る",
    panelEyebrow: "学習モデル",
    panelTitle: "進捗評価の設計",
    panelItems: [
      "文法・聴解・アウトプットの週次目標を明確化。",
      "誤答傾向をもとにした復習と修正の導線設計。",
      "実務到達を意識したレベル別ベンチマーク運用。",
    ],
    gridTitle: "学習",
    gridBody: "一度に一つずつ確認すると、判断を整理しやすくなります。",
    viewSection: "セクションを見る",
    sections: [
      {
        title: "募集カレンダー",
        body: "次回コホートの開始時期と受付期間を確認。",
        href: "/learn/enrollment",
      },
      {
        title: "進め方",
        body: "初回診断から週次の進捗管理までの流れ。",
        href: "/learn/how-it-works",
      },
      {
        title: "JLPTレベル",
        body: "現在地に合う学習レベルを選択。",
        href: "/learn/jlpt-levels",
      },
      {
        title: "独学サポート",
        body: "会話・聴解・読解の反復ドリルを提供。",
        href: "/learn/self-study",
      },
      {
        title: "学習システム",
        body: "週次リズム、復習設計、到達指標を明確化。",
        href: "/learn/learning-system",
      },
      {
        title: "ガイド",
        body: "実務的な判断に使える解説資料。",
        href: "/learn/guides",
      },
      {
        title: "よくある質問",
        body: "受講前に確認したいポイントを整理。",
        href: "/learn/faq",
      },
    ],
  },
} as const;

export default function LearnPage() {
  const { locale } = useSiteLanguage();
  const copy = COPY[locale];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffcf7_0%,#f7f9fc_42%,#fffcf7_100%)]">
      <section className="section-shell border-b border-slate-300/70 bg-[#f3f4f6]">
        <div className="relative overflow-hidden">
          <div className="container mx-auto px-4 md:pr-[48%]">
            <FadeIn>
              <div className="space-y-4 md:space-y-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">{copy.kicker}</p>
                <h1 className="max-w-xl text-balance">{copy.title}</h1>
                <p className="max-w-xl text-slate-600">{copy.body}</p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="h-11 rounded-xl px-5">
                    <Link href="/intake?focus=learn">{copy.primaryCta}</Link>
                  </Button>
                  <Button asChild variant="outline" className="h-11 rounded-xl px-5">
                    <Link href="/learn/jlpt-levels">{copy.secondaryCta}</Link>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
          <div className="mt-8 h-[260px] w-full border-y border-black bg-white md:absolute md:inset-y-0 md:right-0 md:mt-0 md:h-auto md:w-[48%] md:border-x md:border-y-0" aria-hidden="true" />
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="foundation-grid">
              <div className="foundation-grid__layout">
                <div className="foundation-grid__label">
                  <p className="foundation-grid__title">{copy.gridTitle}</p>
                  <p className="foundation-grid__body">{copy.gridBody}</p>
                </div>
                <div className="foundation-grid__cells">
                  {copy.sections.map((item) => (
                    <Link key={item.title} href={item.href} className="foundation-grid__cell">
                      <h3 className="foundation-grid__cell-title">{item.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">{item.body}</p>
                      <span className="foundation-grid__cell-cta">
                        {copy.viewSection}
                        <span className="foundation-grid__cell-icon">&gt;</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
