import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function PlacementPage() {
  return (
    <div className="page-shell">
      <SiteHeader />

      <main className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-8 sm:px-6">
        <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="panel p-8">
            <span className="chip">Placement exam</span>
            <h1 className="mt-3 font-display text-3xl text-[#121416]">
              Pay for placement exam
            </h1>
            <p className="mt-2 text-sm text-[#5a5f5f]">
              Secure your assessment slot. After payment, you will schedule your exam and
              interview.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="panel-soft px-4 py-3 text-sm">
                <p className="text-xs text-[#5a5f5f]">Fee</p>
                <p className="text-lg font-semibold text-[#121416]">UGX 60,000</p>
              </div>
              <div className="panel-soft px-4 py-3 text-sm">
                <p className="text-xs text-[#5a5f5f]">Includes</p>
                <p className="text-sm font-semibold text-[#121416]">Assessment + consult</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/eligibility/result" className="btn-primary w-full sm:w-auto">
                Pay now (mock)
              </Link>
              <Link href="/contact" className="btn-outline w-full sm:w-auto">
                Ask about payment
              </Link>
            </div>
          </div>
          <div className="panel-deep p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#cbe7e2]">
              What happens next
            </p>
            <h2 className="mt-3 font-display text-2xl">Schedule your assessment</h2>
            <p className="mt-2 text-sm text-[#e3f3ef]">
              We will confirm a date and send your exam link. Your eligibility result appears in the
              dashboard.
            </p>
            <Link href="/dashboard" className="btn-primary mt-5 w-full sm:w-auto">
              Go to dashboard
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
