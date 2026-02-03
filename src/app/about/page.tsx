import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const values = [
  {
    title: "Uganda-first delivery",
    detail: "We design programs for local realities while meeting Japanese standards.",
  },
  {
    title: "Credible Japan partnerships",
    detail: "Employers and schools are verified before they appear in the platform.",
  },
  {
    title: "Outcome-driven learning",
    detail: "Language progress is tied to clear pathways for work and study.",
  },
];

export default function AboutPage() {
  return (
    <div className="page-shell">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#d7ecf4] blur-[140px]" />
        <div className="absolute bottom-[-260px] right-[-160px] h-[520px] w-[520px] rounded-full bg-[#f1e3d4] blur-[160px]" />
      </div>

      <SiteHeader />

      <main className="relative mx-auto w-full max-w-6xl px-5 pb-20 sm:px-6">
        <section className="grid gap-10 pb-16 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6 reveal">
            <span className="chip">About Bridge Olutindo</span>
            <h1 className="font-display text-3xl leading-tight text-[#121416] sm:text-5xl">
              A bridge between Uganda and Japan for learning, work, and study
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-[#5a5f5f] sm:text-lg">
              We combine language education with verified pathways so learners can move forward with
              confidence. Bridge Olutindo partners with schools, employers, and institutions to make
              the journey transparent and achievable.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary w-full sm:w-auto">
                Contact us
              </Link>
              <Link href="/team" className="btn-outline w-full sm:w-auto">
                Meet the team
              </Link>
            </div>
          </div>
          <div className="grid gap-4 reveal-delay">
            <div className="panel p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b24a2a]">Our mission</p>
              <h3 className="mt-3 font-display text-2xl text-[#121416]">Make the path visible</h3>
              <p className="mt-2 text-sm text-[#5a5f5f]">
                From beginner Japanese to employer-ready, every step is guided.
              </p>
            </div>
            <div className="panel-deep p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#cbe7e2]">
                Our promise
              </p>
              <h3 className="mt-3 font-display text-2xl">Clarity and credibility</h3>
              <p className="mt-2 text-sm text-[#e3f3ef]">
                We verify partners and keep learners informed at every milestone.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 pb-20">
          <div className="max-w-2xl">
            <span className="chip">Our values</span>
            <h2 className="mt-3 font-display text-3xl text-[#121416]">
              What we stand for
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="panel p-6">
                <h3 className="font-display text-xl text-[#121416]">{value.title}</h3>
                <p className="mt-2 text-sm text-[#5a5f5f]">{value.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
