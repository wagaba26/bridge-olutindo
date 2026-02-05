import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProgramCard } from "@/components/ui/program-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { getProgramHref } from "@/lib/programs";

export const metadata = {
  title: "Jobs in Japan | Bridge Olutindo",
  description:
    "Find vetted jobs in Japan for Ugandans — including factory, caregiving, and IT roles — with full preparation and support.",
};

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b bg-slate-900 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24 grid gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-center">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange">
              Jobs in Japan
            </p>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              High-quality jobs in Japan,
              <br />
              designed for Ugandan talent.
            </h1>
            <p className="text-slate-200 max-w-xl text-sm md:text-base">
              We partner with compliant employers to place Ugandans in factories, caregiving centers, and offices
              across Japan—with training and support before and after you land.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-brand-red hover:bg-brand-red/90 rounded-full px-8">
                <Link href="/intake?focus=jobs">View open tracks</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-white/40 text-white">
                <Link href="/intake?focus=jobs">Talk to a placement advisor</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/5 p-6 shadow-lg space-y-4 text-sm">
            <h3 className="text-lg font-semibold">What we look for</h3>
            <ul className="space-y-2 text-slate-200">
              <li>• Commitment to complete Japanese language training.</li>
              <li>• Strong work ethic and reliability.</li>
              <li>• Willingness to adapt to Japanese culture and systems.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 space-y-8">
          <SectionHeading
            eyebrow="Job tracks"
            title="Choose a pathway that matches your skills."
            description="Bridge Olutindo focuses on sectors where Ugandan talent is highly valued and long-term careers are possible."
          />

          <Tabs defaultValue="factory" className="mt-4">
            <TabsList>
              <TabsTrigger value="factory">Factory</TabsTrigger>
              <TabsTrigger value="caregiving">Caregiving</TabsTrigger>
              <TabsTrigger value="it">IT & Digital</TabsTrigger>
              <TabsTrigger value="other">Other roles</TabsTrigger>
            </TabsList>

            <TabsContent value="factory" className="mt-8 grid gap-6 md:grid-cols-3">
              <ProgramCard
                title="Automotive & Manufacturing Associate"
                badge="Most popular"
                duration="Pre-departure: 3–6 months"
                mode="In-person"
                highlights={[
                  "Assembly line and quality-check training",
                  "On-site safety and equipment basics",
                  "Japanese workplace communication",
                ]}
                ctaLabel="Join factory track"
                href={getProgramHref("Automotive & Manufacturing Associate")}
              />
              <ProgramCard
                title="Food Processing & Packaging"
                duration="Pre-departure: 3–6 months"
                mode="Hybrid"
                highlights={[
                  "Hygiene and handling standards",
                  "Shift work preparation",
                  "Basic kanji for signage and manuals",
                ]}
                href={getProgramHref("Food Processing & Packaging")}
              />
              <ProgramCard
                title="Logistics & Warehouse Support"
                duration="Pre-departure: 3–6 months"
                mode="Hybrid"
                highlights={[
                  "Inventory and stock management",
                  "Equipment and safety drills",
                  "Team-based workflow training",
                ]}
                href={getProgramHref("Logistics & Warehouse Support")}
              />
            </TabsContent>

            <TabsContent value="caregiving" className="mt-8 grid gap-6 md:grid-cols-3">
              <ProgramCard
                title="Elderly Care Assistant"
                badge="High demand"
                duration="Pre-departure: 6–9 months"
                mode="Hybrid"
                highlights={[
                  "Basic nursing and daily-care routines",
                  "Respectful communication in Japanese",
                  "Workplace etiquette in care homes",
                ]}
                ctaLabel="Join caregiving track"
                href={getProgramHref("Elderly Care Assistant")}
              />
              <ProgramCard
                title="Rehabilitation & Support Staff"
                duration="Pre-departure: 6–9 months"
                mode="Hybrid"
                highlights={[
                  "Movement and exercise support basics",
                  "Documentation and reporting",
                  "Empathy and cultural sensitivity",
                ]}
                href={getProgramHref("Rehabilitation & Support Staff")}
              />
            </TabsContent>

            <TabsContent value="it" className="mt-8 grid gap-6 md:grid-cols-3">
              <ProgramCard
                title="Junior Software Developer"
                badge="Competitive"
                duration="Pre-departure: 6–12 months"
                mode="Hybrid"
                highlights={[
                  "Technical interview preparation",
                  "Agile and remote collaboration",
                  "Tech vocabulary in Japanese",
                ]}
                ctaLabel="Express interest"
                href={getProgramHref("Junior Software Developer")}
              />
              <ProgramCard
                title="IT Support & Helpdesk"
                duration="Pre-departure: 6–9 months"
                mode="Online"
                highlights={[
                  "Ticketing and documentation",
                  "Customer support scripts",
                  "Rotational shift preparation",
                ]}
                href={getProgramHref("IT Support & Helpdesk")}
              />
            </TabsContent>

            <TabsContent value="other" className="mt-8 grid gap-6 md:grid-cols-3">
              <ProgramCard
                title="Hospitality & Service"
                duration="Pre-departure: 3–6 months"
                mode="Hybrid"
                highlights={[
                  "Hotel and restaurant basics",
                  "Customer service Japanese",
                  "On-the-job etiquette",
                ]}
                href={getProgramHref("Hospitality & Service")}
              />
              <ProgramCard
                title="Agriculture & Outdoor Work"
                duration="Pre-departure: 3–6 months"
                mode="In-person"
                highlights={[
                  "Farm and greenhouse routines",
                  "Safety and weather preparation",
                  "Teamwork in rural Japan",
                ]}
                href={getProgramHref("Agriculture & Outdoor Work")}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-slate-50/60">
        <div className="container mx-auto px-4 space-y-10">
          <SectionHeading
            eyebrow="How it works"
            title="A clear pathway from Kampala to your first day at work."
            description="We stay with you at every step—from your first inquiry to your first salary in Japan."
          />
          <div className="grid gap-6 md:grid-cols-5 text-sm text-muted-foreground">
            <div className="rounded-xl border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue mb-2">
                Step 1
              </p>
              <h3 className="mb-2">Profile review</h3>
              <p>
                Share your education, work history, and language level. We confirm if you meet current track
                requirements.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue mb-2">
                Step 2
              </p>
              <h3 className="mb-2">Training & language</h3>
              <p>
                Complete required Japanese level and pre-departure training tailored to your job category.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue mb-2">
                Step 3
              </p>
              <h3 className="mb-2">Employer interviews</h3>
              <p>
                We match you with vetted employers and guide you through interviews with mock sessions and feedback.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue mb-2">
                Step 4
              </p>
              <h3 className="mb-2">Visa & departure</h3>
              <p>
                Our team supports documentation, orientation, and travel preparation for a smooth transition to Japan.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue mb-2">
                Step 5
              </p>
              <h3 className="mb-2">On-the-ground support</h3>
              <p>
                After you arrive, we stay in touch to help with cultural adjustment, workplace issues, and next steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center space-y-6">
          <SectionHeading
            align="center"
            eyebrow="Ready to explore Japan?"
            title="Tell us the kind of job you’re looking for."
            description="Our team will review your profile and recommend the best track and timeline based on your goals."
          />
          <Button asChild className="bg-brand-red hover:bg-brand-red/90 rounded-full px-10">
            <Link href="/intake?focus=jobs">Start job assessment</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
