import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const leaders = [
  {
    name: "Akello N.",
    role: "Founder & Program Director",
    focus: "Japan partnerships · learner outcomes · program quality",
  },
  {
    name: "Sato H.",
    role: "Academic Lead",
    focus: "JLPT alignment · curriculum design · instructor training",
  },
  {
    name: "Kato M.",
    role: "Career Pathways Lead",
    focus: "Employer readiness · job matching · compliance support",
  },
  {
    name: "Nakato R.",
    role: "Student Success",
    focus: "Onboarding · progress tracking · advisory clinics",
  },
];

const values = [
  "Learner-first guidance",
  "Verified Japan partners",
  "Transparent requirements",
  "Support across the full journey",
];

export default function TeamPage() {
  return (
    <div className="page-shell">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#d4eef2] blur-[140px]" />
        <div className="absolute bottom-[-260px] right-[-160px] h-[520px] w-[520px] rounded-full bg-[#f3e6d6] blur-[160px]" />
      </div>

      <SiteHeader />

      <main className="relative mx-auto w-full max-w-6xl px-6 pb-20">
        <section className="grid gap-10 pb-16 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6 reveal">
            <span className="chip">Bridge team</span>
            <h1 className="font-display text-4xl leading-tight text-[#121416] sm:text-5xl">
              The team building a reliable bridge to Japan
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-[#5a5f5f] sm:text-lg">
              Our leadership team blends Uganda-first delivery with Japan-grade standards in
              learning, admissions, and career readiness.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Talk to the team
              </Link>
              <Link href="/about" className="btn-outline">
                About Bridge Olutindo
              </Link>
            </div>
          </div>
          <div className="panel p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0b6b5f]">
              What we optimize for
            </p>
            <h3 className="mt-3 font-display text-2xl text-[#121416]">Trust, clarity, outcomes</h3>
            <div className="mt-4 grid gap-3">
              {values.map((value) => (
                <div key={value} className="panel-soft px-4 py-3 text-sm">
                  {value}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 pb-20">
          <div className="max-w-2xl">
            <span className="chip">Leadership</span>
            <h2 className="mt-3 font-display text-3xl text-[#121416]">Meet the core team</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {leaders.map((leader) => (
              <div key={leader.name} className="panel p-6">
                <p className="text-lg font-semibold text-[#121416]">{leader.name}</p>
                <p className="text-xs uppercase tracking-[0.25em] text-[#b24a2a]">
                  {leader.role}
                </p>
                <p className="mt-3 text-sm text-[#5a5f5f]">{leader.focus}</p>
              </div>
            ))}
          </div>
          <div className="panel-deep p-8">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#cbe7e2]">
                  Join the mission
                </p>
                <h3 className="mt-3 font-display text-3xl">Bridge team is hiring</h3>
                <p className="mt-2 text-sm text-[#e3f3ef]">
                  We are growing our instructor, admissions, and partnerships teams.
                </p>
              </div>
              <Link href="/contact" className="btn-primary">
                Apply to join
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
