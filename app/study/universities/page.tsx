import Link from "next/link";

import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "University Partners | Bridge Olutindo",
  description: "Verified university partners for study in Japan.",
};

const focusAreas = [
  "Program overview and intake months",
  "Instruction language and support services",
  "Admission timelines and document requirements",
  "Verified contact channels",
];

const categories = ["National universities", "Public universities", "Private universities"];

export default function UniversitiesPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffcf7_0%,#f7f9fc_42%,#fffcf7_100%)]">
      <section className="section-shell border-b border-slate-300/70 bg-white/90">
        <div className="container mx-auto grid gap-8 px-4 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:items-center">
          <FadeIn>
            <div className="space-y-4 md:space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">Study in Japan</p>
              <h1 className="max-w-2xl text-balance">University partners</h1>
              <p className="max-w-2xl text-slate-600">
                We will publish partner universities only. Each listing will include verified contacts and official links.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-11 rounded-xl px-5">
                  <Link href="/intake?focus=study">Start study intake</Link>
                </Button>
                <Button asChild variant="outline" className="h-11 rounded-xl px-5">
                  <Link href="/contact">Nominate a university</Link>
                </Button>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="rounded-[1.6rem] border border-slate-300/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">What will be listed</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {focusAreas.map((note) => (
                  <li key={note}>• {note}</li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="container mx-auto space-y-6 px-4">
          <FadeIn>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">University types</p>
              <h2 className="mt-2 text-[1.65rem] leading-tight md:text-3xl">Partner listings will appear here once confirmed</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.04}>
            <div className="grid gap-4 md:grid-cols-3">
              {categories.map((category) => (
                <article
                  key={category}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_22px_rgba(15,23,42,0.06)]"
                >
                  <h3>{category}</h3>
                  <p className="mt-2 text-sm text-slate-600">Partner listings will appear here once confirmed.</p>
                </article>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

