import Link from "next/link";

import { CostOfLivingBreakdown, HousingComparisonChart, VisaPermitTimeline, WasteSortingInfographic } from "@/components/site/japan-prep-infographics";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Japan Preparation | Bridge Olutindo",
  description:
    "Structured guidance for preparing to study and live in Japan, with practical timelines and readiness tools.",
};

const moduleCards = [
  {
    title: "Compliance & Residency",
    description: "Status documentation, visa sequencing, and arrival registration requirements.",
    href: "#compliance-residency",
  },
  {
    title: "Studying in Japan",
    description: "School selection, admissions timing, student status, scholarships, and housing choices.",
    href: "#studying-in-japan",
  },
  {
    title: "Living in Japan",
    description: "Resident registration, insurance, banking, transport, and neighborhood systems.",
    href: "#living-in-japan",
  },
  {
    title: "Practice and self-study",
    description: "Daily quizzes and scenario practice to reinforce readiness routines.",
    href: "#practice-and-self-study",
  },
];

export default function JapanPreparationPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffcf7_0%,#f7f9fc_42%,#fffcf7_100%)]">
      <section className="section-shell border-b border-slate-300/70 bg-[#f3f4f6]">
        <div className="relative overflow-hidden">
          <div className="container mx-auto px-4 md:pr-[48%]">
            <FadeIn>
              <div className="space-y-4 md:space-y-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">Japan preparation</p>
                <h1 className="max-w-2xl text-balance">Prepare to study and live in Japan with a structured readiness model.</h1>
                <p className="max-w-2xl text-slate-600">
                  Clear sequences for documentation, study planning, and daily life systems. Use the modules below to move one step at a time.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="h-11 rounded-xl px-5">
                    <Link href="/intake?focus=study">Start preparation intake</Link>
                  </Button>
                  <Button asChild variant="outline" className="h-11 rounded-xl px-5">
                    <Link href="/learn">Open learn hub</Link>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
          <div className="mt-8 h-[280px] w-full border-y border-black bg-white md:absolute md:inset-y-0 md:right-0 md:mt-0 md:h-auto md:w-[48%] md:border-x md:border-y-0" />
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="foundation-grid">
              <div className="foundation-grid__layout">
                <div className="foundation-grid__label">
                  <p className="foundation-grid__title">Preparation</p>
                  <p className="foundation-grid__body">Open the module that matches your current step.</p>
                </div>
                <div className="foundation-grid__cells md:grid-cols-2 xl:grid-cols-2">
                  {moduleCards.map((item) => (
                    <Link key={item.title} href={item.href} className="foundation-grid__cell">
                      <h3 className="foundation-grid__cell-title">{item.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                      <span className="foundation-grid__cell-cta">
                        View module
                        <span className="foundation-grid__cell-icon">&gt;</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="compliance-residency" className="py-6 md:py-8">
        <div className="container mx-auto space-y-4 px-4">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl">Compliance and residency</h2>
            <p className="text-sm text-slate-600 md:text-base">
              Maintain your status of residence by following official procedures, documentation timelines, and local registration requirements.
            </p>
          </FadeIn>
          <FadeIn delay={0.04}>
            <div className="grid gap-4 lg:grid-cols-2">
              <VisaPermitTimeline />
              <Card className="border-slate-200 bg-white shadow-none">
                <CardHeader>
                  <CardTitle>Resident registration checklist</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-slate-700">
                  <p>1. Register your address at the municipal office after arrival.</p>
                  <p>2. Keep your residence card and address updates current.</p>
                  <p>3. Maintain enrollment records through your institution.</p>
                  <p>4. Track document renewal windows and deadlines.</p>
                </CardContent>
              </Card>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="studying-in-japan" className="py-6 md:py-8">
        <div className="container mx-auto space-y-4 px-4">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl">Studying in Japan</h2>
            <p className="text-sm text-slate-600 md:text-base">
              Use a timeline-first model: choose intake month, confirm entry requirements, prepare scholarship strategy,
              and align your Japanese level with academic demands.
            </p>
          </FadeIn>
          <FadeIn delay={0.04}>
            <div className="grid gap-4 lg:grid-cols-2">
              <HousingComparisonChart />
              <CostOfLivingBreakdown />
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <Card className="border-slate-200 bg-white shadow-none">
              <CardHeader>
                <CardTitle>Student route checklist</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 text-sm text-slate-700 md:grid-cols-3">
                <div>
                  <p className="font-semibold text-slate-900">Step 1: Select program</p>
                  <p className="mt-1">Compare language schools, universities, and exchange options using budget and timeline constraints.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Step 2: Document and visa flow</p>
                  <p className="mt-1">Prepare COE documents, school paperwork, and student status requirements in sequence.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Step 3: Arrival setup</p>
                  <p className="mt-1">Register address, activate insurance, set transport routines, and confirm weekly study rhythm.</p>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      <section id="living-in-japan" className="py-6 md:py-8">
        <div className="container mx-auto space-y-4 px-4">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl">Living in Japan</h2>
            <p className="text-sm text-slate-600 md:text-base">
              Stable daily life systems improve language outcomes. Focus on registration, healthcare, budgeting,
              neighborhood rules, and emergency preparation from week one.
            </p>
          </FadeIn>
          <FadeIn delay={0.04}>
            <div className="grid gap-4 lg:grid-cols-2">
              <WasteSortingInfographic />
              <Card className="border-slate-200 bg-white shadow-none">
                <CardHeader>
                  <CardTitle>First 30-day setup</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-slate-700">
                  <p>1. Register your address at your local municipal office and confirm resident records.</p>
                  <p>2. Enroll in health insurance and complete pension obligations according to your status.</p>
                  <p>3. Open a local bank account, set up mobile service, and track fixed monthly costs.</p>
                  <p>4. Learn neighborhood rules: greeting etiquette, quiet hours, and waste collection schedule.</p>
                  <p>5. Save emergency contacts and local disaster guidance for earthquakes and typhoons.</p>
                </CardContent>
              </Card>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="practice-and-self-study" className="py-8 md:py-10">
        <div className="container mx-auto space-y-4 px-4">
          <FadeIn>
            <Card className="border-slate-200 bg-white shadow-none">
              <CardHeader>
                <CardTitle>Practice and self-study</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-700">
                <p>Use daily quiz and scenario practice to convert information into behavior under real conditions.</p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="h-11 rounded-xl px-5">
                    <Link href="/learn/teach-yourself">Open teach-yourself and quiz</Link>
                  </Button>
                  <Button asChild variant="outline" className="h-11 rounded-xl px-5">
                    <Link href="/intake?focus=study">Submit your readiness intake</Link>
                  </Button>
                </div>
                <p className="text-xs text-slate-500">
                  Source verification: check current guidance before final decisions through official channels such as
                  Study in Japan, Immigration Services Agency, and local municipal offices.
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
