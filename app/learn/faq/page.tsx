import Link from "next/link";

import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Learn FAQ | Bridge Olutindo",
  description: "Answers to common questions about learning Japanese with Bridge.",
};

const faqItems = [
  {
    question: "How long does each level take?",
    answer: "Most learners complete one level in 10 to 14 weeks depending on attendance and self-practice consistency.",
  },
  {
    question: "Are classes live or self-paced?",
    answer: "Both. You get live sessions, guided office hours, and a structured self-study track.",
  },
  {
    question: "Do you provide placement tests?",
    answer: "Yes. We assess grammar, reading, and listening to place learners accurately.",
  },
  {
    question: "How much study time is recommended each week?",
    answer: "3 hours maintains progress, 6 hours keeps a balanced pace, and 10 hours supports accelerated growth.",
  },
  {
    question: "Do you support speaking and listening practice?",
    answer: "Yes. Every cohort includes guided speaking labs and listening checks with feedback.",
  },
  {
    question: "What script do you use in lessons?",
    answer: "We move from kana-first prompts at N5 toward kana and early kanji at N3, reducing romaji support.",
  },
  {
    question: "Can I change levels after starting?",
    answer: "Yes. We review your progress after each cycle and move you if a different level is a better fit.",
  },
];

export default function LearnFaqPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffcf7_0%,#f7f9fc_42%,#fffcf7_100%)]">
      <section className="section-shell border-b border-slate-300/70 bg-white/90">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">Learn Japanese</p>
              <h1 className="max-w-2xl text-balance">Frequently asked questions</h1>
              <p className="max-w-2xl text-slate-600">Clear answers before you commit to a cohort.</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-11 rounded-xl px-5">
                  <Link href="/contact">Ask a learning question</Link>
                </Button>
                <Button asChild variant="outline" className="h-11 rounded-xl px-5">
                  <Link href="/learn">Back to Learn</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="container mx-auto space-y-6 px-4">
          <FadeIn>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">FAQ</p>
              <h2 className="mt-2 text-[1.65rem] leading-tight md:text-3xl">Need help choosing a level?</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.04}>
            <div className="grid gap-4 md:grid-cols-3">
              {faqItems.map((item) => (
                <article key={item.question} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_22px_rgba(15,23,42,0.06)]">
                  <h3 className="text-lg">{item.question}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.answer}</p>
                </article>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
