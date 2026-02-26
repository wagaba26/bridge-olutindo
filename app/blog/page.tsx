"use client";

import Link from "next/link";

import { FadeIn } from "@/components/ui/fade-in";
import { useSiteLanguage } from "@/components/site/language-provider";
import { RESOURCE_ARTICLES, RESOURCE_CATEGORIES } from "@/lib/resources";

const COPY = {
  en: {
    kicker: "Resources",
    title: "Research-backed guides for language study and life planning.",
    body: "Detailed articles built around official guidance, practical planning frameworks, and compliance-first execution.",
    leadingStory: "Leading story",
    featured: "Featured guide",
    atGlance: "At a glance",
    category: "Category",
    readTime: "Read time",
    updated: "Updated",
    more: "More",
    guides: "guides",
  },
  ja: {
    kicker: "資料",
    title: "語学学習と生活設計のための実務ガイド。",
    body: "公式情報、計画フレーム、コンプライアンス視点をもとにした詳細記事を掲載しています。",
    leadingStory: "注目記事",
    featured: "特集ガイド",
    atGlance: "概要",
    category: "カテゴリ",
    readTime: "読了目安",
    updated: "更新日",
    more: "続きを読む",
    guides: "件",
  },
} as const;

const CATEGORY_JA: Record<string, string> = {
  "Compliance & Residency": "在留・コンプライアンス",
  "Life Systems": "生活基盤",
  "Language & Readiness": "語学・準備",
  "Admissions & Pathways": "出願・進路設計",
};

export default function BlogPage() {
  const { locale } = useSiteLanguage();
  const copy = COPY[locale];
  const leading = RESOURCE_ARTICLES[0];
  const grouped = RESOURCE_CATEGORIES.map((category) => ({
    category,
    items: RESOURCE_ARTICLES.filter((article) => article.category === category && article.slug !== leading?.slug),
  }));

  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-slate-200/70 bg-white py-10 md:py-12">
        <div className="container mx-auto space-y-4 px-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">{copy.kicker}</p>
            <h1 className="mt-2 text-balance">{copy.title}</h1>
            <p className="mt-3 max-w-3xl text-slate-600">{copy.body}</p>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto space-y-10 px-4">
          {leading ? (
            <FadeIn>
              <div className="border border-slate-200">
                <div className="grid md:grid-cols-[240px_1fr]">
                  <div className="border-b border-slate-200 p-6 md:border-b-0 md:border-r">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{copy.leadingStory}</p>
                    <p className="mt-2 text-sm text-slate-600">{copy.featured}</p>
                  </div>
                  <div className="grid border-t border-slate-200 md:border-t-0 md:grid-cols-[minmax(0,1fr)_320px]">
                    <div className="space-y-4 p-6">
                      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        <span>{locale === "ja" ? CATEGORY_JA[leading.category] ?? leading.category : leading.category}</span>
                        <span>{leading.readTime}</span>
                        <span>{copy.updated} {leading.updatedAt}</span>
                      </div>
                      <h2 className="text-2xl">{leading.title}</h2>
                      <p className="text-sm text-slate-600">{leading.excerpt}</p>
                      <Link href={`/blog/${leading.slug}`} className="inline-flex items-center gap-3 text-sm font-semibold text-slate-900">
                        <span className="inline-flex h-9 w-9 items-center justify-center border border-slate-300 text-slate-700">&gt;</span>
                        {copy.more}
                      </Link>
                    </div>
                    <div className="border-t border-slate-200 bg-white p-6 md:border-l md:border-t-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{copy.atGlance}</p>
                      <dl className="mt-4 space-y-2 text-sm text-slate-600">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <dt>{copy.category}</dt>
                          <dd className="font-semibold text-slate-900">{locale === "ja" ? CATEGORY_JA[leading.category] ?? leading.category : leading.category}</dd>
                        </div>
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <dt>{copy.readTime}</dt>
                          <dd className="font-semibold text-slate-900">{leading.readTime}</dd>
                        </div>
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <dt>{copy.updated}</dt>
                          <dd className="font-semibold text-slate-900">{leading.updatedAt}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ) : null}

          {grouped.map((group, groupIndex) => {
            if (group.items.length === 0) return null;

            return (
              <FadeIn key={group.category} delay={0.02 * groupIndex}>
                <div className="border border-slate-200">
                  <div className="grid md:grid-cols-[240px_1fr]">
                    <div className="border-b border-slate-200 p-6 md:border-b-0 md:border-r">
                      <p className="text-lg font-semibold text-slate-900">{locale === "ja" ? CATEGORY_JA[group.category] ?? group.category : group.category}</p>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        {group.items.length} {copy.guides}
                      </p>
                    </div>
                    <div className="grid gap-px bg-slate-200 p-px md:grid-cols-2 xl:grid-cols-3">
                      {group.items.map((story) => (
                        <article key={story.slug} className="flex h-full flex-col bg-white">
                          <div className="flex h-full flex-col p-5">
                            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                              <span>{story.readTime}</span>
                              <span>{story.updatedAt}</span>
                            </div>
                            <h3 className="mt-3 text-lg">{story.title}</h3>
                            <p className="mt-2 text-sm text-slate-600">{story.excerpt}</p>
                            <Link href={`/blog/${story.slug}`} className="mt-5 inline-flex items-center gap-3 text-sm font-semibold text-slate-900">
                              <span className="inline-flex h-9 w-9 items-center justify-center border border-slate-300 text-slate-700">&gt;</span>
                              {copy.more}
                            </Link>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>
    </div>
  );
}
