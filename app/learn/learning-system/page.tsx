import Link from "next/link";

import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { HomeLearningFeatures } from "@/components/site/home-learning-features";

export const metadata = {
  title: "Learning System | Bridge Olutindo",
  description: "Weekly rhythm, review cadence, and measurable milestones.",
};

const systemPillars = [
  {
    title: "Rhythm and cadence",
    body: "A stable weekly schedule with short daily drills to keep momentum steady.",
  },
  {
    title: "Review timing",
    body: "Planned re-exposure so grammar, listening, and speaking patterns settle faster.",
  },
  {
    title: "Measured outcomes",
    body: "Weekly check-ins so you always know what improved and what needs focus.",
  },
];

export default function LearningSystemPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffcf7_0%,#f7f9fc_42%,#fffcf7_100%)]">
      <section className="section-shell border-b border-slate-300/70 bg-white/90">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">Learn Japanese</p>
              <h1 className="max-w-2xl text-balance">Learning system</h1>
              <p className="max-w-2xl text-slate-600">Weekly rhythm, review cadence, and measurable milestones.</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-11 rounded-xl px-5">
                  <Link href="/intake?focus=learn">Start intake</Link>
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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">System pillars</p>
              <h2 className="mt-2 text-[1.65rem] leading-tight md:text-3xl">The structure behind consistent progress</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.04}>
            <div className="grid gap-4 md:grid-cols-3">
              {systemPillars.map((pillar) => (
                <article key={pillar.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_22px_rgba(15,23,42,0.06)]">
                  <h3 className="text-lg">{pillar.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{pillar.body}</p>
                </article>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.06}>
            <HomeLearningFeatures />
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
