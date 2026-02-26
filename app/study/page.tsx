"use client";

import Link from "next/link";

import { useSiteLanguage } from "@/components/site/language-provider";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";

const COPY = {
  en: {
    kicker: "Study in Japan",
    title: "Official partner institutions, organized by study path.",
    body:
      "This section will list partner institutions only. We keep the catalog lean to avoid information overload and to ensure every listing is verified.",
    primaryCta: "Start study intake",
    secondaryCta: "Request a partner review",
    panelEyebrow: "Catalog scope",
    panelTitle: "What each listing includes",
    panelPoints: [
      "Verified institution profile and route fit",
      "Intake timing, documents, and eligibility checks",
      "Direct contact path and support model",
    ],
    gridTitle: "Study",
    gridBody: "Choose one track at a time to keep decisions clear.",
    viewSection: "View section",
    listingKicker: "Listing policy",
    listingTitle: "How we publish partner institutions",
    sections: [
      {
        title: "Universities",
        description: "Partner universities with verified contacts and intake guidance.",
        href: "/study/universities",
      },
      {
        title: "Vocational schools",
        description: "Practice-focused institutes with clear program routes and timelines.",
        href: "/study/vocational",
      },
      {
        title: "Language schools",
        description: "Japanese language institutes with structured progression and support services.",
        href: "/study/language-schools",
      },
    ],
    notes: [
      "Only confirmed partner institutions are published.",
      "Each listing includes official site links and direct contacts.",
      "Filters will activate once the catalog is live.",
    ],
  },
  ja: {
    kicker: "日本留学",
    title: "進路別に整理した、公式パートナー校一覧。",
    body:
      "このページには提携先のみを掲載します。情報過多を避け、各掲載情報の正確性を担保するため、公開内容を厳選しています。",
    primaryCta: "留学インテーク開始",
    secondaryCta: "提携先レビューを依頼",
    panelEyebrow: "掲載範囲",
    panelTitle: "各掲載ページで確認できる内容",
    panelPoints: [
      "確認済みの学校プロフィールと進路適合性",
      "募集時期・必要書類・応募条件の整理",
      "直接連絡導線とサポート体制の説明",
    ],
    gridTitle: "留学",
    gridBody: "進路ごとに一つずつ比較すると、判断しやすくなります。",
    viewSection: "セクションを見る",
    listingKicker: "掲載ポリシー",
    listingTitle: "提携校の掲載基準",
    sections: [
      {
        title: "大学",
        description: "連絡先確認済みの提携大学と募集情報。",
        href: "/study/universities",
      },
      {
        title: "専門学校",
        description: "実務重視の進路に対応した専門課程と募集時期。",
        href: "/study/vocational",
      },
      {
        title: "日本語学校",
        description: "段階的な語学習得と生活支援を提供する提携校。",
        href: "/study/language-schools",
      },
    ],
    notes: [
      "掲載は確認済みの提携機関のみです。",
      "各校ページに公式サイトと連絡窓口を記載します。",
      "フィルター機能はカタログ公開時に順次有効化します。",
    ],
  },
} as const;

export default function StudyPage() {
  const { locale } = useSiteLanguage();
  const copy = COPY[locale];

  return (
    <div className="min-h-screen bg-white">
      <section className="section-shell border-b border-slate-300/70 bg-neutral-50">
        <div className="relative overflow-hidden">
          <div className="container mx-auto px-4 md:pr-[48%]">
            <FadeIn>
              <div className="space-y-4 md:space-y-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">{copy.kicker}</p>
                <h1 className="max-w-2xl text-balance">{copy.title}</h1>
                <p className="max-w-2xl text-slate-600">{copy.body}</p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="h-11 rounded-xl px-5">
                    <Link href="/intake?focus=study">{copy.primaryCta}</Link>
                  </Button>
                  <Button asChild variant="outline" className="h-11 rounded-xl px-5">
                    <Link href="/contact">{copy.secondaryCta}</Link>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
          <div className="mt-8 h-[280px] w-full border-y border-black bg-white md:absolute md:inset-y-0 md:right-0 md:mt-0 md:h-auto md:w-[48%] md:border-x md:border-y-0" aria-hidden="true" />
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
                  {copy.sections.map((section) => (
                    <Link
                      key={section.title}
                      href={section.href}
                      className="foundation-grid__cell foundation-grid__cell--media"
                    >
                      <h3 className="foundation-grid__cell-title">{section.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">{section.description}</p>
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

      <section className="pb-10 md:pb-12">
        <div className="container mx-auto space-y-6 px-4">
          <FadeIn>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">{copy.listingKicker}</p>
              <h2 className="mt-2 text-[1.65rem] leading-tight md:text-3xl">{copy.listingTitle}</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.04}>
            <div className="grid gap-4 md:grid-cols-3">
              {copy.notes.map((note) => (
                <article key={note} className="rounded-xl border border-slate-200 bg-white p-5">
                  <p className="text-sm text-slate-600">{note}</p>
                </article>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
