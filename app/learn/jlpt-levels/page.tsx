import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { COMPANY_PROFILE } from "@/lib/company-profile";

export const metadata = {
  title: "JLPT Levels | Bridge Olutindo",
  description: "Choose the level that matches your current ability and goals.",
};

const n5Programs = [
  { title: "N5 Evening Cohort", duration: "12 weeks", mode: "Hybrid", schedule: "3x weekly, 1-hour lessons" },
  { title: "Starter Foundations (N5)", duration: "6 months", mode: "Hybrid", schedule: "3x 1-hour lessons per week" },
  { title: "N5 Intensive Bootcamp", duration: "6 weeks", mode: "In-person", schedule: "5x weekly, 2-hour lessons" },
];

const n4Programs = [
  { title: "N4 Evening Program", duration: "12 weeks", mode: "Hybrid", schedule: "3x weekly, 1.5-hour lessons" },
  { title: "N4 Exam Prep Clinic", duration: "8 weeks", mode: "Online", schedule: "2x weekly, 2-hour lessons" },
];

const n3Programs = [
  { title: "N3 Advancement Track", duration: "16 weeks", mode: "Hybrid", schedule: "3x weekly, 2-hour lessons" },
  { title: "N3 Reading and Listening Lab", duration: "10 weeks", mode: "Online", schedule: "2x weekly, 90-minute lessons" },
];

const levelFocus = [
  {
    level: "N5",
    title: "Foundation in kana",
    body: "Hiragana and katakana reading fluency, core grammar patterns, and survival conversations.",
  },
  {
    level: "N4",
    title: "Balanced bilingual pacing",
    body: "Reduce romaji, increase kana-based prompts, and build listening comprehension with short dialogues.",
  },
  {
    level: "N3",
    title: "Japanese-dominant practice",
    body: "Kana-first reading, early kanji coverage, and longer listening tasks with summary practice.",
  },
];

const scriptProgression = [
  "N5: kana-first reading with limited romaji support.",
  "N4: kana prompts by default, romaji only for pronunciation checks.",
  "N3: kana and early kanji for all prompts, English only for brief clarifications.",
];

function ProgramGrid({
  programs,
  level,
}: {
  programs: { title: string; duration: string; mode: string; schedule: string }[];
  level: string;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {programs.map((program) => (
        <article key={program.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_22px_rgba(15,23,42,0.06)]">
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

export default function JlptLevelsPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffcf7_0%,#f7f9fc_42%,#fffcf7_100%)]">
      <section className="section-shell border-b border-slate-300/70 bg-white/90">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">Learn Japanese</p>
              <h1 className="max-w-2xl text-balance">JLPT levels</h1>
              <p className="max-w-2xl text-slate-600">Pick the level that matches your current ability.</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-11 rounded-xl px-5">
                  <Link href="/intake?focus=learn">Start intake</Link>
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
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_26px_rgba(15,23,42,0.06)] md:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Featured track</p>
              <h2 className="mt-2 text-2xl">{COMPANY_PROFILE.jclatProgram.title}</h2>
              <div className="mt-4 grid gap-2 text-sm text-slate-700 md:grid-cols-2">
                <p>Duration: {COMPANY_PROFILE.jclatProgram.duration}</p>
                <p>Class length: {COMPANY_PROFILE.jclatProgram.lessonLength}</p>
                <p>Schedule: {COMPANY_PROFILE.jclatProgram.schedule.join(" | ")}</p>
                <p>Monthly fee: USD {COMPANY_PROFILE.jclatProgram.monthlyFeeUsd}</p>
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-11 rounded-xl px-5">
                  <Link href="/learn/jlcat">Open JLCAT track</Link>
                </Button>
                <Button asChild variant="outline" className="h-11 rounded-xl px-5">
                  <Link href="/japan-preparation">Open preparation hub</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="pb-10 md:pb-12">
        <div className="container mx-auto space-y-6 px-4">
          <FadeIn>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">N5 to N3 cohorts</p>
              <h2 className="mt-2 text-[1.65rem] leading-tight md:text-3xl">Choose your level</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.03}>
            <div className="grid gap-4 md:grid-cols-3">
              {levelFocus.map((item) => (
                <article key={item.level} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_22px_rgba(15,23,42,0.06)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{item.level}</p>
                  <h3 className="mt-2 text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.body}</p>
                </article>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.04}>
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_26px_rgba(15,23,42,0.06)] md:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Script progression</p>
              <h3 className="mt-2 text-2xl">Reduce romaji as you advance</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {scriptProgression.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
          </FadeIn>
          <FadeIn delay={0.04}>
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
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
