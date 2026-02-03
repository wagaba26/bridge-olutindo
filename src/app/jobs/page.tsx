import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const jobTracks = [
  {
    title: "Hospitality & services",
    requirement: "N4 readiness + customer service basics",
    roles: ["Hotels", "Restaurants", "Retail"],
  },
  {
    title: "Caregiving",
    requirement: "N3 readiness + health readiness",
    roles: ["Care support", "Facility assistant", "Home care"],
  },
  {
    title: "Manufacturing",
    requirement: "N5 readiness + safety training",
    roles: ["Assembly", "Quality support", "Packaging"],
  },
];

const steps = [
  "Check the language requirement by job type",
  "Enroll in Bridge language track",
  "Complete eligibility checklist and documents",
  "Unlock application and interview coaching",
];

export default function JobsPage() {
  return (
    <div className="page-shell">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-[-120px] h-[520px] w-[520px] rounded-full bg-[#d7ecf4] blur-[150px]" />
        <div className="absolute bottom-[-260px] left-[-160px] h-[520px] w-[520px] rounded-full bg-[#f1e3d4] blur-[170px]" />
      </div>

      <SiteHeader />

      <main className="relative mx-auto w-full max-w-6xl px-5 pb-20 sm:px-6">
        <section className="grid gap-10 pb-16 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6 reveal">
            <span className="chip">Jobs in Japan</span>
            <h1 className="font-display text-3xl leading-tight text-[#121416] sm:text-5xl">
              Match your language level to real hiring opportunities
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-[#5a5f5f] sm:text-lg">
              Bridge Olutindo connects language progress with employer-ready requirements. Know
              exactly what level you need before you apply.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/eligibility" className="btn-primary w-full sm:w-auto">
                Check eligibility
              </Link>
              <Link href="/learn" className="btn-outline w-full sm:w-auto">
                Learn Japanese
              </Link>
            </div>
          </div>
          <div className="grid gap-4 reveal-delay">
            <div className="panel-deep p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#cbe7e2]">
                Career track
              </p>
              <h3 className="mt-3 font-display text-2xl">Eligibility dashboard</h3>
              <p className="mt-2 text-sm text-[#e3f3ef]">
                Paid students see which jobs are locked, eligible, or already applied.
              </p>
              <Link
                href="/dashboard"
                className="mt-5 inline-flex items-center rounded-full bg-[#f7f6f2] px-4 py-2 text-sm font-semibold text-[#0b6b5f]"
              >
                View dashboard
              </Link>
            </div>
            <div className="panel p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b24a2a]">Hiring update</p>
              <h3 className="mt-3 font-display text-2xl text-[#121416]">36 partner employers</h3>
              <p className="mt-2 text-sm text-[#5a5f5f]">
                Roles across hospitality, caregiving, and manufacturing with verified requirements.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 pb-16">
          <div className="max-w-2xl">
            <span className="chip">Job tracks</span>
            <h2 className="mt-3 font-display text-3xl text-[#121416]">
              Choose the path that fits your goals
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {jobTracks.map((track) => (
              <div key={track.title} className="panel p-6">
                <h3 className="font-display text-xl">{track.title}</h3>
                <p className="mt-2 text-sm text-[#5a5f5f]">{track.requirement}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {track.roles.map((role) => (
                    <span
                      key={role}
                      className="rounded-full border border-[#e4e0d8] bg-white px-3 py-1 text-xs text-[#5a5f5f]"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 pb-20">
          <div className="panel p-8">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <span className="chip">Application flow</span>
                <h2 className="mt-3 font-display text-3xl text-[#121416]">
                  Know what unlocks each opportunity
                </h2>
                <p className="mt-3 text-sm text-[#5a5f5f]">
                  Every application is gated by language level, document readiness, and interview
                  preparation. We guide you step-by-step.
                </p>
              </div>
              <div className="space-y-3">
                {steps.map((step, index) => (
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
