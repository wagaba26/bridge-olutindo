import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const steps = [
  {
    title: "Pay placement exam fee",
    detail: "Secure your assessment slot with a one-time payment.",
  },
  {
    title: "Complete the placement exam",
    detail: "Short language test + goals interview to assess strengths.",
  },
  {
    title: "Get eligibility outcome",
    detail: "We map your level and confirm eligibility for jobs or study tracks.",
  },
];

export default function EligibilityPage() {
  return (
    <div className="page-shell">
      <SiteHeader />

      <main className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-8 sm:px-6">
        <section className="grid gap-10 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6 reveal">
            <span className="chip">Eligibility check</span>
            <h1 className="font-display text-3xl leading-tight text-[#121416] sm:text-5xl">
              Confirm your eligibility with a placement exam
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-[#5a5f5f] sm:text-lg">
              Students pay a placement exam fee to assess strengths and readiness. We then confirm
              the right level and which opportunities are open to you.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/placement" className="btn-primary w-full sm:w-auto">
                Pay for placement exam
              </Link>
              <Link href="/eligibility/result" className="btn-outline w-full sm:w-auto">
                View sample outcome
              </Link>
            </div>
          </div>
          <div className="panel p-6 reveal-delay">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b24a2a]">
              How it works
            </p>
            <div className="mt-4 space-y-3">
              {steps.map((step, index) => (
                <div key={step.title} className="panel-soft flex gap-3 px-4 py-3 text-sm">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#121416] text-xs font-semibold text-[#f7f6f2]">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-[#121416]">{step.title}</p>
                    <p className="text-xs text-[#5a5f5f]">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
