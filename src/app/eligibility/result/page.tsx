import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const outcomes = [
  { label: "Placement level", value: "N5 (Bridge Start)" },
  { label: "Jobs pathway", value: "Eligible after N4" },
  { label: "Study pathway", value: "Eligible now" },
];

export default function EligibilityResultPage() {
  return (
    <div className="page-shell">
      <SiteHeader />

      <main className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-8 sm:px-6">
        <section className="panel p-8">
          <span className="chip">Eligibility result</span>
          <h1 className="mt-3 font-display text-3xl text-[#121416]">
            Sample outcome (demo)
          </h1>
          <p className="mt-2 text-sm text-[#5a5f5f]">
            This is a mock result. Real results appear after the placement exam.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {outcomes.map((item) => (
              <div key={item.label} className="panel-soft px-4 py-4">
                <p className="text-xs text-[#5a5f5f]">{item.label}</p>
                <p className="mt-2 text-sm font-semibold text-[#121416]">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/dashboard" className="btn-primary w-full sm:w-auto">
              Go to dashboard
            </Link>
            <Link href="/contact" className="btn-outline w-full sm:w-auto">
              Speak to an advisor
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
