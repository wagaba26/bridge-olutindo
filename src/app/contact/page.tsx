import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const tracks = [
  "Learn Japanese",
  "Jobs in Japan",
  "Study & Exchange",
  "Programs Partnership",
];

export default function ContactPage() {
  return (
    <div className="page-shell">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#d7ecf4] blur-[140px]" />
        <div className="absolute bottom-[-260px] right-[-160px] h-[520px] w-[520px] rounded-full bg-[#f1e3d4] blur-[160px]" />
      </div>

      <SiteHeader />

      <main className="relative mx-auto w-full max-w-6xl px-5 pb-20 sm:px-6">
        <section className="grid gap-8 pb-16 pt-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6 reveal">
            <span className="chip">Contact & Apply</span>
            <h1 className="font-display text-3xl leading-tight text-[#121416] sm:text-5xl">
              Tell us your goal and we will guide the next step
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-[#5a5f5f] sm:text-lg">
              Apply for a learning intake, request a consultation, or ask about programs.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {tracks.map((track) => (
                <div key={track} className="panel-soft px-4 py-3 text-sm">
                  {track}
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-8">
            <h2 className="font-display text-2xl">Application form</h2>
            <p className="mt-2 text-sm text-[#5a5f5f]">
              Submit your details and we will respond within 48 hours.
            </p>
            <form className="mt-6 grid gap-4">
              <label className="grid gap-2 text-sm">
                Full name
                <input
                  type="text"
                  placeholder="Your name"
                  className="input-field"
                />
              </label>
              <label className="grid gap-2 text-sm">
                Email
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input-field"
                />
              </label>
              <label className="grid gap-2 text-sm">
                Interest
                <select className="input-field">
                  <option>Learn Japanese</option>
                  <option>Jobs in Japan</option>
                  <option>Study & Exchange</option>
                  <option>Programs partnership</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm">
                Message
                <textarea
                  rows={4}
                  placeholder="Tell us your goal"
                  className="textarea-field"
                />
              </label>
              <Link href="/eligibility" className="btn-primary mt-2 h-11 w-full sm:w-auto">
                Submit application
              </Link>
            </form>
          </div>
        </section>

        <section className="panel-deep p-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#cbe7e2]">
                Quick contact
              </p>
              <h2 className="mt-3 font-display text-3xl">Speak with an advisor</h2>
              <p className="mt-2 text-sm text-[#e3f3ef]">
                Book a quick call to confirm your track and next steps.
              </p>
            </div>
            <Link href="/contact" className="btn-primary">
              Book a call
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
