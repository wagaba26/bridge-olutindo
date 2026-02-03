import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const pathways = [
  {
    title: "Language schools",
    detail: "Find partner schools, intake windows, and required levels.",
  },
  {
    title: "Universities",
    detail: "Prepare for academic Japanese and scholarship guidance.",
  },
  {
    title: "Exchange programs",
    detail: "Short-term study tours and cultural exchange support.",
  },
];

const readiness = [
  "Language placement and JLPT alignment",
  "Visa document checklist",
  "School application coaching",
  "Interview and statement review",
];

export default function StudyPage() {
  return (
    <div className="page-shell">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#d7ecf4] blur-[140px]" />
        <div className="absolute bottom-[-260px] right-[-160px] h-[520px] w-[520px] rounded-full bg-[#f1e3d4] blur-[160px]" />
      </div>

      <SiteHeader />

      <main className="relative mx-auto w-full max-w-6xl px-5 pb-20 sm:px-6">
        <section className="grid gap-10 pb-16 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6 reveal">
            <span className="chip">Study and exchange</span>
            <h1 className="font-display text-3xl leading-tight text-[#121416] sm:text-5xl">
              School pathways with clear intake timelines
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-[#5a5f5f] sm:text-lg">
              Bridge Olutindo helps you plan intakes, readiness documents, and consulting sessions
              so your application is complete and credible.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/eligibility" className="btn-primary w-full sm:w-auto">
                Request consulting
              </Link>
              <Link href="/learn" className="btn-outline w-full sm:w-auto">
                Learn Japanese
              </Link>
            </div>
          </div>
          <div className="grid gap-4 reveal-delay">
            <div className="panel p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b24a2a]">Intake calendar</p>
              <h3 className="mt-3 font-display text-2xl text-[#121416]">October 2026 intake</h3>
              <p className="mt-2 text-sm text-[#5a5f5f]">
                Applications open in May. Start language prep now to meet the requirement.
              </p>
            </div>
            <div className="panel-deep p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#cbe7e2]">
                Consulting hours
              </p>
              <h3 className="mt-3 font-display text-2xl">Weekly advisor clinics</h3>
              <p className="mt-2 text-sm text-[#e3f3ef]">
                Paid plans include guided sessions for statements, interviews, and document checks.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center rounded-full bg-[#f7f6f2] px-4 py-2 text-sm font-semibold text-[#0b6b5f]"
              >
                Book a session
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-6 pb-16">
          <div className="max-w-2xl">
            <span className="chip">Pathways</span>
            <h2 className="mt-3 font-display text-3xl text-[#121416]">
              Build the right study plan for you
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {pathways.map((pathway) => (
              <div key={pathway.title} className="panel p-6">
                <h3 className="font-display text-xl text-[#121416]">{pathway.title}</h3>
                <p className="mt-2 text-sm text-[#5a5f5f]">{pathway.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 pb-20">
          <div className="panel p-8">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <span className="chip">Readiness</span>
                <h2 className="mt-3 font-display text-3xl text-[#121416]">
                  What you need before you apply
                </h2>
                <p className="mt-3 text-sm text-[#5a5f5f]">
                  We track your progress and unlock applications when your documents and language
                  level are ready.
                </p>
              </div>
              <div className="space-y-3">
                {readiness.map((item) => (
                  <div key={item} className="panel-soft px-4 py-3 text-sm">
                    {item}
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
