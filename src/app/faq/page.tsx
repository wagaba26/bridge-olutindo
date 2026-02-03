import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const faqs = [
  {
    question: "How do I get placed in the right level?",
    answer:
      "We run a short placement assessment and review your goals before enrollment.",
  },
  {
    question: "Are recordings available to everyone?",
    answer:
      "Recordings are available to paid students only to keep live classes sustainable.",
  },
  {
    question: "What unlocks job or school applications?",
    answer:
      "You unlock applications after meeting the language level and document readiness.",
  },
  {
    question: "Can I pay with mobile money?",
    answer:
      "Yes. We support card payments and mobile money options for Uganda.",
  },
  {
    question: "Do you help with visa documents?",
    answer:
      "Yes, we provide a checklist and guidance for required documentation.",
  },
  {
    question: "Are scholarships guaranteed?",
    answer:
      "No, but we guide you through scholarship preparation and eligibility.",
  },
];

export default function FaqPage() {
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
            <span className="chip">FAQ</span>
            <h1 className="font-display text-3xl leading-tight text-[#121416] sm:text-5xl">
              Answers before you enroll
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-[#5a5f5f] sm:text-lg">
              Clear details on learning, access, and pathways.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary w-full sm:w-auto">
                Contact us
              </Link>
              <Link href="/learn" className="btn-outline w-full sm:w-auto">
                Start learning
              </Link>
            </div>
          </div>
          <div className="panel p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0d6b5d]">Support</p>
            <h3 className="mt-3 font-display text-2xl text-[#121416]">Need help fast?</h3>
            <p className="mt-2 text-sm text-[#5a5f5f]">
              Talk to an advisor and get a clear plan.
            </p>
            <Link href="/contact" className="btn-accent mt-5">
              Book a call
            </Link>
          </div>
        </section>

        <section className="grid gap-4 pb-20 md:grid-cols-2">
          {faqs.map((item) => (
            <div key={item.question} className="panel p-6">
              <h3 className="text-sm font-semibold text-[#1c1b18]">{item.question}</h3>
              <p className="mt-3 text-sm text-[#5a5f5f]">{item.answer}</p>
            </div>
          ))}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
