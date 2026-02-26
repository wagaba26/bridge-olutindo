import Link from "next/link";

import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "How It Works | Bridge Olutindo",
  description: "From intake to measurable weekly progress.",
};

const howItWorks = [
  {
    step: "Step 1",
    title: "Intake and baseline",
    body: "Share your goals, schedule, and current level so we can place you accurately.",
  },
  {
    step: "Step 2",
    title: "Build a weekly plan",
    body: "We align your cohort, self-study drills, and review cadence to your available hours.",
  },
  {
    step: "Step 3",
    title: "Join the cohort",
    body: "Attend structured lessons with guided speaking, listening, and reading practice.",
  },
  {
    step: "Step 4",
    title: "Review and adjust",
    body: "Weekly checkpoints keep your plan calibrated and your progress measurable.",
  },
];

const weeklyCycle = [
  "New content introduction with focused practice blocks.",
  "Listening and speaking labs for real-time correction.",
  "Independent review sessions with short quizzes.",
  "End-of-week recap to lock in key patterns.",
];

const feedbackLoop = [
  "Instructor notes after each live session.",
  "Error log tracking for grammar, vocabulary, and pronunciation.",
  "Weekly goal reset based on performance data.",
];

const supportPillars = [
  {
    title: "Placement and baseline",
    body: "We assess grammar, reading, and listening to place you in the right cohort from the start.",
  },
  {
    title: "Weekly learning rhythm",
    body: "Structured class cadence plus short daily tasks to keep momentum steady.",
  },
  {
    title: "Guided feedback",
    body: "Instructor reviews, error tracking, and clear next steps after every cycle.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffcf7_0%,#f7f9fc_42%,#fffcf7_100%)]">
      <section className="section-shell border-b border-slate-300/70 bg-white/90">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">Learn Japanese</p>
              <h1 className="max-w-2xl text-balance">How it works</h1>
              <p className="max-w-2xl text-slate-600">A clear flow from intake to measurable weekly progress.</p>
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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Process</p>
              <h2 className="mt-2 text-[1.65rem] leading-tight md:text-3xl">From intake to results</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.04}>
            <div className="grid gap-4 md:grid-cols-4">
              {howItWorks.map((step) => (
                <article key={step.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_22px_rgba(15,23,42,0.06)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{step.step}</p>
                  <h3 className="mt-2 text-lg">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{step.body}</p>
                </article>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="pb-10 md:pb-12">
        <div className="container mx-auto grid gap-4 px-4 md:grid-cols-2">
          <FadeIn>
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.06)] md:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Weekly cycle</p>
              <h3 className="mt-2 text-2xl">Your weekly rhythm</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {weeklyCycle.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
          </FadeIn>
          <FadeIn delay={0.04}>
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.06)] md:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Feedback loop</p>
              <h3 className="mt-2 text-2xl">How progress is corrected</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {feedbackLoop.map((item) => (
                  <li key={item}>• {item}</li>
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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Support pillars</p>
              <h2 className="mt-2 text-[1.65rem] leading-tight md:text-3xl">Structured learning with guided accountability</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.04}>
            <div className="grid gap-4 md:grid-cols-3">
              {supportPillars.map((pillar) => (
                <article key={pillar.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_22px_rgba(15,23,42,0.06)]">
                  <h3>{pillar.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{pillar.body}</p>
                </article>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
