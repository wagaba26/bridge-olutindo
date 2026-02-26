import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock3 } from "lucide-react";

import { FadeIn } from "@/components/ui/fade-in";
import { ReadingProgress } from "@/components/site/reading-progress";
import { ArticleToc } from "@/components/site/article-toc";
import { RESOURCE_ARTICLES, RESOURCE_CATEGORIES, getResourceBySlug } from "@/lib/resources";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

function headingId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function keyTakeaway(text: string) {
  const sentence = text.split(". ")[0]?.trim();
  if (!sentence) return text;
  return sentence.endsWith(".") ? sentence : `${sentence}.`;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getResourceBySlug(slug);

  if (!article) {
    return { title: "Resource not found | Bridge Olutindo" };
  }

  return {
    title: `${article.title} | Bridge Olutindo`,
    description: article.excerpt,
  };
}

export function generateStaticParams() {
  return RESOURCE_ARTICLES.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getResourceBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = RESOURCE_ARTICLES.filter((item) => item.slug !== article.slug && item.category === article.category).slice(0, 2);
  const sectionItems = article.sections.map((section) => ({
    heading: section.heading,
    id: headingId(section.heading),
  }));
  const bulletHighlights = article.sections.flatMap((section) => section.bullets ?? []).slice(0, 3);
  const summaryHighlights =
    bulletHighlights.length > 0
      ? bulletHighlights
      : article.sections
          .map((section) => (section.paragraphs[0] ? keyTakeaway(section.paragraphs[0]) : ""))
          .filter((item) => item.length > 0)
          .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <article className="container mx-auto px-4 py-10 md:py-14">
        <FadeIn>
          <Link href="/blog" className="text-sm font-semibold text-brand-700">
            Back to resources
          </Link>

          <div className="mt-6 border-b border-slate-200 pb-8">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  <span>{article.category}</span>
                  <span>Updated {article.updatedAt}</span>
                </div>
                <h1 className="mt-4 max-w-4xl text-balance">{article.title}</h1>
                <p className="mt-5 max-w-3xl text-base text-slate-700 md:text-lg">{article.excerpt}</p>
                <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500 md:text-sm">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="size-4" />
                    {article.readTime}
                  </span>
                  <span>Bridge Editorial Desk</span>
                  <span>Planning-focused guide</span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">At a glance</p>
                <ul className="mt-4 space-y-2">
                  <li>Category: {article.category}</li>
                  <li>Updated: {article.updatedAt}</li>
                  <li>Read time: {article.readTime}</li>
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,740px)_300px] xl:justify-between">
          <div className="space-y-10">
            {summaryHighlights.length > 0 ? (
              <FadeIn>
                <section className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Key points</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    {summaryHighlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-red" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </FadeIn>
            ) : null}

            {article.sections.map((section, index) => (
              <FadeIn key={section.heading} delay={0.02 * (index % 5)}>
                <section id={headingId(section.heading)} className="scroll-mt-24 border-t border-slate-200 pt-6">
                  <h2 className="text-2xl">{section.heading}</h2>
                  <div className="mt-4 max-w-[70ch] space-y-4 text-slate-700">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-[1.02rem] leading-8 md:text-[1.08rem]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.paragraphs[0] ? (
                    <blockquote className="mt-5 border-l-4 border-brand-600 bg-slate-50 p-4 text-sm text-slate-700">
                      {keyTakeaway(section.paragraphs[0])}
                    </blockquote>
                  ) : null}
                  {section.bullets && section.bullets.length > 0 ? (
                    <ul className="mt-5 max-w-[70ch] space-y-2.5 text-sm text-slate-700 md:text-base">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-red" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              </FadeIn>
            ))}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <FadeIn delay={0.05}>
              <div className="border border-slate-200 bg-white p-5">
                <ReadingProgress />
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">On this page</p>
                <div className="mt-3">
                  <ArticleToc items={sectionItems} />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="border border-slate-200 bg-white p-5">
                <h3 className="text-lg font-semibold">Official references</h3>
                <p className="mt-2 text-sm text-slate-600">Verify latest policy details using these primary sources.</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {article.sources.map((source) => (
                    <li key={source.href}>
                      <a
                        href={source.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:underline"
                      >
                        {source.label}
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div className="border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
                <h3 className="font-semibold text-slate-900">Compliance note</h3>
                <p className="mt-2">
                  These guides are educational and planning-focused. Always confirm current legal, immigration, and institutional requirements before
                  acting.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.16}>
              <div className="border border-slate-200 bg-white p-5">
                <h3 className="text-lg font-semibold">Continue reading</h3>
                <ul className="mt-3 space-y-2">
                  {related.length > 0 ? (
                    related.map((item) => (
                      <li key={item.slug}>
                        <Link href={`/blog/${item.slug}`} className="text-sm font-semibold text-brand-700 hover:underline">
                          {item.title}
                        </Link>
                      </li>
                    ))
                  ) : (
                    RESOURCE_CATEGORIES.slice(0, 2).map((item) => (
                      <li key={item} className="text-sm text-slate-600">
                        Explore more in {item}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </FadeIn>
          </aside>
        </div>
      </article>
    </div>
  );
}
