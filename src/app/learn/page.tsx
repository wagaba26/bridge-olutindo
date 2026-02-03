import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const levels = [
  {
    title: "Bridge Start (N5)",
    detail: "Core grammar, daily conversation, and foundations for JLPT N5.",
  },
  {
    title: "Bridge Grow (N4)",
    detail: "Workplace Japanese, kanji focus, and interview practice.",
  },
  {
    title: "Bridge Ready (N3)",
    detail: "Professional Japanese and career-track readiness support.",
  },
];

const learningFeatures = [
  "Weekly live classes with replay access for paid students",
  "Structured self-study modules and quizzes",
  "Instructor feedback checkpoints",
  "Progress tracking aligned to JLPT",
];

export default function LearnPage() {
  return (
    <div className="page-shell">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#d7ecf4] blur-[140px]" />
        <div className="absolute bottom-[-260px] left-[-160px] h-[520px] w-[520px] rounded-full bg-[#f1e3d4] blur-[160px]" />
      </div>

      <SiteHeader />

      <main className="relative mx-auto w-full max-w-6xl px-5 pb-20 sm:px-6">
        <section className="grid gap-10 pb-16 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6 reveal">
            <span className="chip">Learn Japanese</span>
            <h1 className="font-display text-3xl leading-tight text-[#121416] sm:text-5xl">
              A learning path built for Uganda-to-Japan outcomes
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-[#5a5f5f] sm:text-lg">
              Follow a structured curriculum, join live classes, and access recordings when you are
              subscribed. Every level aligns with JLPT readiness and Bridge career requirements.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/placement" className="btn-primary w-full sm:w-auto">
                Get placement
              </Link>
              <Link href="/login" className="btn-outline w-full sm:w-auto">
                Student login
              </Link>
            </div>
          </div>
          <div className="grid gap-4 reveal-delay">
            <div className="panel p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b24a2a]">Upcoming cohort</p>
              <h3 className="mt-3 font-display text-2xl text-[#121416]">
                N5 Bridge Start
              </h3>
              <p className="mt-2 text-sm text-[#5a5f5f]">
                March 18 · Live classes Tue/Thu · Recording access for paid students.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <span className="rounded-full bg-[#eaf4f2] px-3 py-1 text-xs font-semibold text-[#0d6b5d]">
                  Paid access
                </span>
                <span className="rounded-full bg-[#fdf1e8] px-3 py-1 text-xs font-semibold text-[#b24a2a]">
                  Seats open
                </span>
              </div>
            </div>
            <div className="panel-deep p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#cbe7e2]">
                Learning tools
              </p>
              <h3 className="mt-3 font-display text-2xl">Recordings library</h3>
              <p className="mt-2 text-sm text-[#e3f3ef]">
                Filter by level, topic, and instructor. Keep your pace even when you miss a class.
              </p>
              <Link
                href="/dashboard/recordings"
                className="mt-5 inline-flex items-center rounded-full bg-[#f7f6f2] px-4 py-2 text-sm font-semibold text-[#0b6b5f]"
              >
                View recordings
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-6 pb-16">
          <div className="max-w-2xl">
            <span className="chip">Bridge levels</span>
            <h2 className="mt-3 font-display text-3xl text-[#121416]">
              Clear steps from beginner to career track
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {levels.map((level) => (
              <div key={level.title} className="panel p-6">
                <h3 className="font-display text-xl text-[#121416]">{level.title}</h3>
                <p className="mt-2 text-sm text-[#5a5f5f]">{level.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 pb-16">
          <div className="panel p-8">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <span className="chip">How it works</span>
                <h2 className="mt-3 font-display text-3xl text-[#121416]">
                  A blended approach that fits your schedule
                </h2>
                <p className="mt-3 text-sm text-[#5a5f5f]">
                  Stay accountable with instructor-led sessions and structured self-study. Paid
                  plans unlock recordings, assessments, and instructor feedback.
                </p>
              </div>
              <div className="space-y-3">
                {learningFeatures.map((feature) => (
                  <div key={feature} className="panel-soft px-4 py-3 text-sm">
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 pb-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="chip">Pricing</span>
              <h2 className="mt-3 font-display text-3xl text-[#121416]">
                Choose your pace
              </h2>
            </div>
            <button className="btn-outline">
              Pricing PDF
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { title: "Free learner", price: "UGX 0", detail: "Orientation + sample lessons." },
              {
                title: "Core plan",
                price: "UGX 180k/mo",
                detail: "Live classes + recordings + assessments.",
              },
              {
                title: "Career plan",
                price: "UGX 320k/mo",
                detail: "Includes job/school consulting + applications.",
              },
            ].map((plan) => (
              <div key={plan.title} className="panel p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b24a2a]">
                  {plan.title}
                </p>
                <p className="mt-3 font-display text-2xl">{plan.price}</p>
                <p className="mt-2 text-sm text-[#5a5f5f]">{plan.detail}</p>
                <button className="btn-primary mt-5">
                  Choose plan
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
