import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { ProgramCard } from "@/components/ui/program-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { TrustStrip } from "@/components/site/trust-strip";

export const metadata = {
  title: "Partner Programs | Bridge Olutindo",
  description:
    "Explore Bridge Olutindo partner programs for institutions, schools, organizations, and Uganda-Japan collaboration initiatives.",
};

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_11%_8%,rgba(27,59,102,0.10),transparent_42%),linear-gradient(180deg,#f7f9fd_0%,#fdfaf3_46%,#f7f9fd_100%)]">
      <section className="border-b border-slate-300/70 bg-white/88">
        <div className="container mx-auto space-y-6 px-4 py-12 md:py-16">
          <FadeIn>
            <SectionHeading
              eyebrow="Partner Programs"
              title="Programs built for institutions and cross-border collaboration."
              description="This page focuses on partner-facing programs. Learner programs for language and study remain in dedicated sections."
            />
          </FadeIn>
          <FadeIn delay={0.04}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-11 rounded-xl px-5">
                <Link href="/partners#partner-interest-form">Submit partner interest</Link>
              </Button>
              <Button asChild variant="secondary" className="h-11 rounded-xl px-5">
                <Link href="/consultation">Book free consultation</Link>
              </Button>
            </div>
          </FadeIn>
          <FadeIn delay={0.07}>
            <div className="flex flex-wrap gap-3 text-xs">
              {["UG Institutions", "JP Institutions", "Organizations", "Schools", "NGOs", "Consultancy"].map((tag) => (
                <Badge key={tag} variant="outline" className="border-slate-300 text-slate-700">
                  {tag}
                </Badge>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="-mt-4 pb-8 md:-mt-6 md:pb-10">
        <div className="container mx-auto px-4">
          <FadeIn>
            <TrustStrip
              items={[
                { value: "24-72h", label: "Partnership response target" },
                { value: "UG + JP", label: "Institution coordination" },
                { value: "Free", label: "Consultation booking" },
                { value: "Hybrid", label: "Delivery model" },
              ]}
              className="border border-slate-200/85 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
            />
          </FadeIn>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="container mx-auto space-y-12 px-4">
          <FadeIn>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2>Partner programs</h2>
              <Badge variant="outline" className="border-slate-700 text-slate-700">
                Institutional + Business
              </Badge>
            </div>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                title: "UG Institution Collaboration Program",
                duration: "Multi-term",
                mode: "Hybrid" as const,
                highlights: [
                  "Curriculum and readiness alignment",
                  "Joint intake planning and applicant support",
                  "Coordinated pathway to study and long-term skills development",
                ],
                ctaLabel: "Explore partnership",
                href: "/partners",
              },
              {
                title: "JP Institution Onboarding Program",
                duration: "Multi-term",
                mode: "Hybrid" as const,
                highlights: [
                  "Uganda-side candidate pipeline setup",
                  "Cross-border communication flow design",
                  "Program launch and performance review support",
                ],
                ctaLabel: "Explore partnership",
                href: "/partners",
              },
              {
                title: "School and Exchange Framework",
                duration: "Flexible",
                mode: "Hybrid" as const,
                highlights: [
                  "Language school and university collaboration",
                  "Exchange program structuring",
                  "Operational coordination for student mobility",
                ],
                ctaLabel: "Discuss framework",
                href: "/partners",
              },
              {
                title: "Uganda-Japan Business Consultancy",
                duration: "Flexible engagement",
                mode: "Hybrid" as const,
                highlights: [
                  "Market orientation in both countries",
                  "Partner matching and program structuring",
                  "Execution support for cross-border operations",
                ],
                ctaLabel: "Book free consultation",
                href: "/consultation",
              },
              {
                title: "Market Entry Discovery Session",
                duration: "One-time session",
                mode: "Online" as const,
                highlights: [
                  "Entry viability and risk scan",
                  "Priority action plan for first 90 days",
                  "Recommended partner and execution path",
                ],
                ctaLabel: "Schedule session",
                href: "/contact",
              },
            ].map((item, index) => (
              <FadeIn key={item.title} delay={0.03 * (index % 5)}>
                <ProgramCard {...item} />
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.06}>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">How to choose</p>
              <div className="mt-4 grid gap-3 text-sm text-slate-700 md:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">1. Define your goal</p>
                  <p className="mt-1">Talent pipeline, school collaboration, exchange, or market-entry advisory.</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">2. Pick a model</p>
                  <p className="mt-1">Choose a program card, then share your preferred start window and scope.</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">3. Start with a call</p>
                  <p className="mt-1">We align teams and send a practical launch path in the first scoping round.</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-transparent bg-gradient-to-br from-brand-700 via-brand-600 to-brand-red px-6 py-10 text-white md:flex-row md:items-center md:px-10">
              <div className="max-w-xl space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-100/90">Need a custom structure?</p>
                <h2 className="text-2xl font-semibold text-white md:text-3xl">We can design a partner program around your institution goals.</h2>
                <p className="text-sm text-slate-100 md:text-base">
                  Share your context and we will propose a practical Uganda-Japan collaboration model, timeline, and implementation steps.
                </p>
              </div>
              <Button asChild className="rounded-full bg-white px-8 text-slate-900 hover:bg-slate-100">
                <Link href="/partners">Talk to partnerships team</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
