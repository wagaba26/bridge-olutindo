import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const stories = [
  {
    name: "Aisha K.",
    role: "N4 learner, Kampala",
    quote:
      "The recordings library helped me stay consistent. I felt ready when my intake opened.",
  },
  {
    name: "Robert M.",
    role: "Careers track",
    quote:
      "The eligibility checklist showed me exactly what I needed before applying.",
  },
  {
    name: "Partner School",
    role: "Programs coordinator",
    quote:
      "Bridge Olutindo made exchange planning smooth and transparent for both sides.",
  },
];

const outcomes = [
  { label: "Learners placed in Japan", value: "120+" },
  { label: "JLPT success stories", value: "340+" },
  { label: "Partner institutions", value: "18" },
];

export default function TestimonialsPage() {
  return (
    <div className="page-shell">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#d7ecf4] blur-[140px]" />
        <div className="absolute bottom-[-260px] left-[-160px] h-[520px] w-[520px] rounded-full bg-[#f1e3d4] blur-[160px]" />
      </div>

      <SiteHeader />

      <main className="relative mx-auto w-full max-w-6xl px-5 pb-20 sm:px-6">
        <section className="grid gap-10 pb-16 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6 reveal">
            <span className="chip">Testimonials</span>
            <h1 className="font-display text-3xl leading-tight text-[#121416] sm:text-5xl">
              Learners and partners who made the leap
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-[#5a5f5f] sm:text-lg">
              Real stories from Uganda and Japan that show what happens when the path is clear.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary w-full sm:w-auto">
                Apply now
              </Link>
              <Link href="/learn" className="btn-outline w-full sm:w-auto">
                Start learning
              </Link>
            </div>
          </div>
          <div className="grid gap-4 reveal-delay">
            {outcomes.map((item) => (
              <div key={item.label} className="panel p-6">
                <p className="text-xs text-[#5a5f5f]">{item.label}</p>
                <p className="mt-3 font-display text-3xl text-[#121416]">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 pb-20 md:grid-cols-3">
          {stories.map((story) => (
            <div key={story.name} className="panel p-6">
              <p className="text-sm text-[#5a5f5f]">&ldquo;{story.quote}&rdquo;</p>
              <div className="mt-4">
                <p className="text-sm font-semibold text-[#121416]">{story.name}</p>
                <p className="text-xs text-[#5a5f5f]">{story.role}</p>
              </div>
            </div>
          ))}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
