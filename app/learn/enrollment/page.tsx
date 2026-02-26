import Link from "next/link";

import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Enrollment Calendar | Bridge Olutindo",
  description: "Upcoming cohort windows and intake timing for Japanese learning.",
};

const enrollmentWindows = [
  { intake: "January", deadline: "Confirm in intake", start: "Early January" },
  { intake: "April", deadline: "Confirm in intake", start: "Early April" },
  { intake: "July", deadline: "Confirm in intake", start: "Early July" },
  { intake: "October", deadline: "Confirm in intake", start: "Early October" },
];

const readinessChecklist = [
  "Baseline level (N5/N4/N3) and target level for the next 12 weeks.",
  "Weekly time budget and preferred schedule blocks.",
  "Primary focus (grammar, listening, speaking, reading) for the next cycle.",
  "Device readiness for online sessions and audio practice.",
];

const intakeSteps = [
  { title: "Submit intake", body: "Share your level, schedule, and goals so we can place you accurately." },
  { title: "Confirm cohort", body: "We match you to the next viable intake window and review timing." },
  { title: "Start weekly rhythm", body: "Join the cohort and begin the structured weekly cadence." },
];

export default function EnrollmentPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffcf7_0%,#f7f9fc_42%,#fffcf7_100%)]">
      <section className="section-shell border-b border-slate-300/70 bg-white/90">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">Learn Japanese</p>
              <h1 className="max-w-2xl text-balance">Enrollment calendar</h1>
              <p className="max-w-2xl text-slate-600">
                Confirm exact deadlines during intake. We align your plan to the nearest viable cohort.
              </p>
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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Cohort windows</p>
              <h2 className="mt-2 text-[1.65rem] leading-tight md:text-3xl">Upcoming cohort windows</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.04}>
            <div className="grid gap-4 md:grid-cols-4">
              {enrollmentWindows.map((window) => (
                <article key={window.intake} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_22px_rgba(15,23,42,0.06)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{window.intake}</p>
                  <p className="mt-3 text-sm text-slate-600">Deadline: {window.deadline}</p>
                  <p className="mt-1 text-sm text-slate-600">Start: {window.start}</p>
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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Readiness</p>
              <h2 className="mt-2 text-[1.65rem] leading-tight md:text-3xl">Enrollment readiness checklist</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.04}>
            <div className="grid gap-4 md:grid-cols-2">
              {readinessChecklist.map((item) => (
                <article key={item} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_22px_rgba(15,23,42,0.06)]">
                  <p className="text-sm text-slate-600">{item}</p>
                </article>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="pb-14 md:pb-16">
        <div className="container mx-auto space-y-6 px-4">
          <FadeIn>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Intake flow</p>
              <h2 className="mt-2 text-[1.65rem] leading-tight md:text-3xl">From intake to cohort start</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.04}>
            <div className="grid gap-4 md:grid-cols-3">
              {intakeSteps.map((step) => (
                <article key={step.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_22px_rgba(15,23,42,0.06)]">
                  <h3 className="text-lg">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{step.body}</p>
                </article>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
