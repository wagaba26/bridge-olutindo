import Link from "next/link";

import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Learn Guides | Bridge Olutindo",
  description: "Research-backed guides to refine your learning plan.",
};

const learnGuides = [
  {
    category: "Language strategy",
    title: "From N5 to N3 without burnout: a high-discipline weekly language system",
    href: "/blog/japanese-language-progression-n5-to-n3",
  },
  {
    category: "Study planning",
    title: "Japan study planning roadmap: timelines, documents, and scholarship checkpoints",
    href: "/blog/japan-study-planning-roadmap",
  },
  {
    category: "Life systems",
    title: "Your first 90 days in Japan: housing, insurance, registration, and daily setup",
    href: "/blog/first-90-days-japan-systems-checklist",
  },
];

const guideUseCases = [
  "Start with the guide that matches your current level (N5, N4, or N3).",
  "Pull one checklist per week and build it into your study plan.",
  "Return after each cohort cycle to reset goals and update your plan.",
];

export default function LearnGuidesPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffcf7_0%,#f7f9fc_42%,#fffcf7_100%)]">
      <section className="section-shell border-b border-slate-300/70 bg-white/90">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">Learn Japanese</p>
              <h1 className="max-w-2xl text-balance">Guides</h1>
              <p className="max-w-2xl text-slate-600">Research-backed guides to refine your learning plan.</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-11 rounded-xl px-5">
                  <Link href="/blog">Open all resources</Link>
                </Button>
                <Button asChild variant="outline" className="h-11 rounded-xl px-5">
                  <Link href="/learn">Back to Learn</Link>
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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Recommended reads</p>
              <h2 className="mt-2 text-[1.65rem] leading-tight md:text-3xl">Guides to deepen your learning plan</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.03}>
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.06)] md:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">How to use</p>
              <h3 className="mt-2 text-2xl">Apply one guide per cycle</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {guideUseCases.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
          </FadeIn>
          <FadeIn delay={0.04}>
            <div className="grid gap-4 md:grid-cols-3">
              {learnGuides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_22px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(15,23,42,0.10)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{guide.category}</p>
                  <h3 className="mt-2 text-lg">{guide.title}</h3>
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
