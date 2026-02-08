import Link from "next/link";

import { StickyCTA } from "@/components/site/sticky-cta";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { COMPANY_PROFILE } from "@/lib/company-profile";

export const metadata = {
  title: "Learn Japanese | Bridge Olutindo",
  description: "Premium N5-N3 Japanese programs with clear schedules for Ugandan learners preparing for Japan.",
};

const n5Programs = [
  { title: "N5 Evening Cohort", duration: "12 weeks", mode: "Hybrid", schedule: "3x weekly, 1-hour lessons" },
  {
    title: "Starter Foundations - Extended (N5)",
    duration: "6 months",
    mode: "Hybrid",
    schedule: "3x 1-hour lessons per week",
  },
  { title: "N5 Intensive Bootcamp", duration: "6 weeks", mode: "In-person", schedule: "5x weekly, 2-hour lessons" },
];

const n4Programs = [
  { title: "N4 Evening Program", duration: "12 weeks", mode: "Hybrid", schedule: "3x weekly, 1.5-hour lessons" },
  { title: "N4 Exam Prep Clinic", duration: "8 weeks", mode: "Online", schedule: "2x weekly, 2-hour lessons" },
];

const n3Programs = [
  { title: "N3 Career Track", duration: "16 weeks", mode: "Hybrid", schedule: "3x weekly, 2-hour lessons" },
  {
    title: "N3 Reading and Listening Lab",
    duration: "10 weeks",
    mode: "Online",
    schedule: "2x weekly, 90-minute lessons",
  },
];

function ProgramGrid({ programs, level }: { programs: { title: string; duration: string; mode: string; schedule: string }[]; level: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {programs.map((program) => (
        <article key={program.title} className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Level {level}</p>
          <h3 className="mt-2 text-lg">{program.title}</h3>
          <dl className="mt-4 space-y-2 text-sm text-slate-700">
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500">Duration</dt>
              <dd className="text-right font-medium text-slate-900">{program.duration}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500">Mode</dt>
              <dd className="text-right font-medium text-slate-900">{program.mode}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500">Weekly schedule</dt>
              <dd className="text-right font-medium text-slate-900">{program.schedule}</dd>
            </div>
          </dl>
          <Button asChild className="mt-5 h-11 rounded-xl px-4">
            <Link href="/intake?focus=learn">Join waiting list</Link>
          </Button>
        </article>
      ))}
    </div>
  );
}

export default function LearnPage() {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <section className="border-b bg-white">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">Learn Japanese</p>
          <h1 className="mt-3 max-w-3xl">Choose the right Japanese level and move forward with confidence.</h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-600 md:text-base">
            Structured N5 to N3 programs with clear schedules and practical preparation for work or study pathways.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="container mx-auto space-y-6 px-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white md:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">Featured program</p>
            <h2 className="mt-2 text-2xl text-white">{COMPANY_PROFILE.jclatProgram.title}</h2>
            <p className="mt-2 text-sm text-slate-200">
              Built for learners targeting study or work pathways in Japan with a recognized language score report.
            </p>
            <div className="mt-4 grid gap-2 text-sm text-slate-200 md:grid-cols-2">
              <p>Duration: {COMPANY_PROFILE.jclatProgram.duration}</p>
              <p>Class length: {COMPANY_PROFILE.jclatProgram.lessonLength}</p>
              <p>Schedule: {COMPANY_PROFILE.jclatProgram.schedule.join(" | ")}</p>
              <p>Online test: {COMPANY_PROFILE.jclatProgram.testCadence}</p>
              <p>Monthly fee: USD {COMPANY_PROFILE.jclatProgram.monthlyFeeUsd}</p>
              <p>Registration: USD {COMPANY_PROFILE.jclatProgram.registrationFeeUsd} (one-time)</p>
            </div>
            <p className="mt-3 text-xs text-slate-300">
              Full 6-month payment: USD {COMPANY_PROFILE.jclatProgram.fullProgramUsd}. {COMPANY_PROFILE.jclatProgram.exchangeRateNote}.
            </p>
            <Button asChild variant="secondary" className="mt-4 h-11 rounded-xl px-4">
              <Link href="/learn/jlcat">Enroll in JLCAT track</Link>
            </Button>
          </div>

          <Tabs defaultValue="n5">
            <TabsList className="h-auto w-full justify-start gap-2 overflow-x-auto rounded-xl bg-slate-100 p-1.5">
              <TabsTrigger value="n5" className="min-h-11 min-w-[120px] rounded-lg px-4 py-2 font-semibold">
                N5 Beginner
              </TabsTrigger>
              <TabsTrigger value="n4" className="min-h-11 min-w-[120px] rounded-lg px-4 py-2 font-semibold">
                N4 Foundation
              </TabsTrigger>
              <TabsTrigger value="n3" className="min-h-11 min-w-[120px] rounded-lg px-4 py-2 font-semibold">
                N3 Intermediate
              </TabsTrigger>
            </TabsList>

            <TabsContent value="n5" className="mt-4">
              <ProgramGrid programs={n5Programs} level="N5" />
            </TabsContent>
            <TabsContent value="n4" className="mt-4">
              <ProgramGrid programs={n4Programs} level="N4" />
            </TabsContent>
            <TabsContent value="n3" className="mt-4">
              <ProgramGrid programs={n3Programs} level="N3" />
            </TabsContent>
          </Tabs>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-xl">How to choose your level</h2>
            <Accordion type="single" collapsible className="mt-3">
              <AccordionItem value="n5">
                <AccordionTrigger>Start with N5 if you are new to Japanese.</AccordionTrigger>
                <AccordionContent>
                  N5 introduces scripts, basic grammar, daily vocabulary, and practical conversation patterns.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="n4">
                <AccordionTrigger>Pick N4 if you can already handle beginner conversations.</AccordionTrigger>
                <AccordionContent>
                  N4 deepens reading, listening, and structured speaking for workplace and school settings.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="n3">
                <AccordionTrigger>Move to N3 when your goals include interviews and advanced communication.</AccordionTrigger>
                <AccordionContent>
                  N3 focuses on applied language needed for career progression and everyday life in Japan.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <StickyCTA
        primaryLabel="Talk to an advisor"
        primaryHref="/intake?focus=learn"
        secondaryLabel="Join waiting list"
        secondaryHref="/intake?focus=learn"
      />
    </div>
  );
}
