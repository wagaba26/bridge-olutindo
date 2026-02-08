import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrustStrip } from "@/components/site/trust-strip";
import { ProgramCard } from "@/components/ui/program-card";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata = {
  title: "Partner Programs | Bridge Olutindo",
  description:
    "Explore Bridge Olutindo partner programs for institutions, employers, schools, and Uganda-Japan collaboration initiatives.",
};

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-slate-50/80">
        <div className="container mx-auto space-y-6 px-4 py-12 md:py-16">
          <SectionHeading
            eyebrow="Partner Programs"
            title="Programs built for institutions and cross-border collaboration."
            description="This page focuses on partner-facing programs. Learner programs for language, jobs, and study remain in their dedicated sections."
          />
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-11 rounded-xl px-5">
              <Link href="/partners#partner-interest-form">Submit partner interest</Link>
            </Button>
            <Button asChild variant="secondary" className="h-11 rounded-xl px-5">
              <Link href="/consultation">Book free consultation</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-3 text-xs">
            {["UG Institutions", "JP Institutions", "Employers", "Schools", "NGOs", "Consultancy"].map((tag) => (
              <Badge key={tag} variant="outline" className="border-slate-300 text-slate-700">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="-mt-4 pb-8 md:-mt-6 md:pb-10">
        <div className="container mx-auto px-4">
          <TrustStrip
            items={[
              { value: "24-72h", label: "Partnership response target" },
              { value: "UG + JP", label: "Institution coordination" },
              { value: "Free", label: "Consultation booking" },
              { value: "Hybrid", label: "Delivery model" },
            ]}
          />
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="container mx-auto space-y-12 px-4">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2>Partner programs</h2>
              <Badge variant="outline" className="border-slate-700 text-slate-700">
                Institutional + Business
              </Badge>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <ProgramCard
                title="UG Institution Collaboration Program"
                duration="Multi-term"
                mode="Hybrid"
                highlights={[
                  "Curriculum and readiness alignment",
                  "Joint intake planning and applicant support",
                  "Coordinated pathway to jobs and study in Japan",
                ]}
                ctaLabel="Explore partnership"
                href="/partners"
              />
              <ProgramCard
                title="JP Institution Onboarding Program"
                duration="Multi-term"
                mode="Hybrid"
                highlights={[
                  "Uganda-side candidate pipeline setup",
                  "Cross-border communication flow design",
                  "Program launch and performance review support",
                ]}
                ctaLabel="Explore partnership"
                href="/partners"
              />
              <ProgramCard
                title="School and Exchange Framework"
                duration="Flexible"
                mode="Hybrid"
                highlights={[
                  "Language school and university collaboration",
                  "Exchange program structuring",
                  "Operational coordination for student mobility",
                ]}
                ctaLabel="Discuss framework"
                href="/partners"
              />
              <ProgramCard
                title="Employer Talent Pipeline Program"
                duration="Quarterly cycles"
                mode="Hybrid"
                highlights={[
                  "Language-first talent screening",
                  "Interview and readiness support",
                  "Employer matching and onboarding coordination",
                ]}
                ctaLabel="Start employer intake"
                href="/partners"
              />
              <ProgramCard
                title="Uganda-Japan Business Consultancy"
                duration="Flexible engagement"
                mode="Hybrid"
                highlights={[
                  "Market orientation in both countries",
                  "Partner matching and program structuring",
                  "Execution support for cross-border operations",
                ]}
                ctaLabel="Book free consultation"
                href="/consultation"
              />
              <ProgramCard
                title="Market Entry Discovery Session"
                duration="One-time session"
                mode="Online"
                highlights={[
                  "Entry viability and risk scan",
                  "Priority action plan for first 90 days",
                  "Recommended partner and execution path",
                ]}
                ctaLabel="Schedule session"
                href="/contact"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">How to choose</p>
            <div className="mt-4 grid gap-3 text-sm text-slate-700 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">1. Define your goal</p>
                <p className="mt-1">Hiring pipeline, school collaboration, exchange, or market-entry advisory.</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">2. Pick a model</p>
                <p className="mt-1">Choose a program card above, then share your preferred start window and scope.</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">3. Start with a call</p>
                <p className="mt-1">We align teams and send a practical launch path in the first scoping round.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border bg-slate-900 px-6 py-10 text-white md:flex-row md:items-center md:px-10">
            <div className="max-w-xl space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">Need a custom structure?</p>
              <h2 className="text-2xl font-extrabold md:text-3xl">We can design a partner program around your institution goals.</h2>
              <p className="text-sm text-slate-200 md:text-base">
                Share your context and we will propose a practical Uganda-Japan collaboration model, timeline, and
                implementation steps.
              </p>
            </div>
            <Button asChild className="rounded-full bg-white px-8 text-slate-900 hover:bg-slate-200">
              <Link href="/partners">Talk to partnerships team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
