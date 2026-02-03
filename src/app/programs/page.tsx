import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const programList = [
  {
    title: "Primary school cultural visits",
    detail: "Short exchange modules hosted in Uganda for partner schools.",
  },
  {
    title: "Vacation exchange camps",
    detail: "Seasonal camps combining language immersion with culture labs.",
  },
  {
    title: "School-to-school partnerships",
    detail: "Long-term partnerships with shared curriculum and visits.",
  },
  {
    title: "Teacher exchange support",
    detail: "Guided planning and scheduling for visiting teachers.",
  },
];

const programSteps = [
  "Define goals and age group",
  "Select program window",
  "Confirm partner school and logistics",
  "Launch orientation sessions",
];

export default function ProgramsPage() {
  return (
    <div className="page-shell">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#d7ecf4] blur-[140px]" />
        <div className="absolute bottom-[-260px] left-[-160px] h-[520px] w-[520px] rounded-full bg-[#f1e3d4] blur-[160px]" />
      </div>

      <SiteHeader />

      <main className="relative mx-auto w-full max-w-6xl px-5 pb-20 sm:px-6">
        <section className="grid gap-10 pb-16 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6 reveal">
            <span className="chip">Programs and exchanges</span>
            <h1 className="font-display text-3xl leading-tight text-[#121416] sm:text-5xl">
              Build cultural exchange programs with trusted partners
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-[#5a5f5f] sm:text-lg">
              Bridge Olutindo designs exchange programs for schools, institutions, and community
              partners across Uganda and Japan.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary w-full sm:w-auto">
                Partner with us
              </Link>
              <Link href="/study" className="btn-outline w-full sm:w-auto">
                Study pathways
              </Link>
            </div>
          </div>
          <div className="grid gap-4 reveal-delay">
            <div className="panel-deep p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#cbe7e2]">
                Exchange calendar
              </p>
              <h3 className="mt-3 font-display text-2xl">2026 partner slots</h3>
              <p className="mt-2 text-sm text-[#e3f3ef]">
                Plan early to align with school terms and travel timelines.
              </p>
            </div>
            <div className="panel p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b24a2a]">Program support</p>
              <h3 className="mt-3 font-display text-2xl text-[#121416]">Full logistics planning</h3>
              <p className="mt-2 text-sm text-[#5a5f5f]">
                We coordinate learning goals, travel windows, and bilingual facilitation.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 pb-16">
          <div className="max-w-2xl">
            <span className="chip">Program types</span>
            <h2 className="mt-3 font-display text-3xl text-[#121416]">
              Designed for schools and institutions
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {programList.map((program) => (
              <div key={program.title} className="panel p-6">
                <h3 className="font-display text-xl text-[#121416]">{program.title}</h3>
                <p className="mt-2 text-sm text-[#5a5f5f]">{program.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 pb-20">
          <div className="panel p-8">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <span className="chip">Getting started</span>
                <h2 className="mt-3 font-display text-3xl text-[#121416]">
                  A clear planning process
                </h2>
                <p className="mt-3 text-sm text-[#5a5f5f]">
                  We align goals with timelines and keep both partners informed every step.
                </p>
              </div>
              <div className="space-y-3">
                {programSteps.map((step, index) => (
                  <div
                    key={step}
                    className="panel-soft flex items-center gap-3 px-4 py-3 text-sm"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1c1b18] text-xs font-semibold text-[#f7f3ee]">
                      {index + 1}
                    </span>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
