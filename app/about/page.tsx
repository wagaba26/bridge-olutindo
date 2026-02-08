import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { COMPANY_PROFILE } from "@/lib/company-profile";

export const metadata = {
  title: "About | Bridge Olutindo",
  description:
    "Learn how Bridge Olutindo connects Uganda and Japan through language, jobs, and study pathways.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero / Intro */}
      <section className="border-b bg-slate-50/80">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <SectionHeading
            eyebrow="About Bridge Olutindo"
            title="A bridge between Ugandan potential and Japanese opportunity."
            description={`${COMPANY_PROFILE.name} (${COMPANY_PROFILE.alias}), operated by ${COMPANY_PROFILE.parentCompany}, provides practical pathways across education, employment, business, and travel between Uganda and Japan.`}
          />
        </div>
      </section>

      {/* Story, mission, vision */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 grid gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start">
          <div className="space-y-8 text-sm text-muted-foreground">
            <div>
              <h2>Our story</h2>
              <p className="mt-3">
                Bridge Olutindo was started by Ugandans and partners who had lived, worked, and studied in Japan. They
                saw how difficult it was to find reliable information, trustworthy intermediaries, and programs tailored
                to Ugandan realities. Bridge Olutindo was born to change that.
              </p>
              <p className="mt-3">
                As shared on our Bridge4U profile, our direction is rooted in &ldquo;Okutambula Kulaba&rdquo; and spans education,
                employment, business, and travel support between Uganda and Japan.
              </p>
            </div>
            <div>
              <h3 className="mb-2">Mission</h3>
              <p>{COMPANY_PROFILE.mission}</p>
            </div>
            <div>
              <h3 className="mb-2">Vision</h3>
              <p>{COMPANY_PROFILE.vision}</p>
            </div>
          </div>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>At a glance</CardTitle>
                <CardDescription>
                  Key pillars that make Bridge Olutindo different.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>• Deep understanding of both Ugandan and Japanese systems.</p>
                <p>• Programs covering language, jobs, and study in one ecosystem.</p>
                <p>• Business consultancy support for Uganda-Japan collaboration.</p>
                <p>• Emphasis on ethics, transparency, and long-term impact.</p>
                <p>• Community channels and direct contact support via Bridge4U platforms.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Parent company</CardTitle>
                <CardDescription>Bridge is operated by KUMBA Co., Ltd.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>KUMBA oversees the wider Bridge vision and supports service delivery quality across all pillars.</p>
                <Link href={COMPANY_PROFILE.contact.kumbaLink} target="_blank" className="text-primary font-medium hover:underline">
                  View KUMBA profile
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline / milestones */}
      <section className="py-16 bg-slate-50/80">
        <div className="container mx-auto px-4 space-y-8">
          <SectionHeading
            eyebrow="Milestones"
            title="Growing a trusted bridge, step by step."
            description="Exact dates and numbers will be refined later. For now, this gives a sense of how the story is unfolding."
          />
          <div className="space-y-6 text-sm text-muted-foreground">
            <div className="border-l-2 border-brand-red pl-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
                Phase 1
              </p>
              <p className="font-medium">Launched first Japanese language cohorts in Uganda.</p>
            </div>
            <div className="border-l-2 border-brand-blue pl-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
                Phase 2
              </p>
              <p className="font-medium">
                Signed initial partnerships with schools and employers in Japan.
              </p>
            </div>
            <div className="border-l-2 border-brand-orange pl-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                Phase 3
              </p>
              <p className="font-medium">
                Expanded into dedicated job tracks, study planning, and long-term alumni support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4 space-y-8">
          <SectionHeading
            eyebrow="Team"
            title="People behind the bridge."
            description="Bridge4U operates as a cross-border team with dedicated responsibilities in Uganda and Japan."
          />
          <div className="grid gap-6 md:grid-cols-3 text-sm text-muted-foreground">
            {[
              {
                title: "Leadership & Strategy",
                body: `${COMPANY_PROFILE.contact.managerName} (${COMPANY_PROFILE.contact.managerRole}) leads cross-border execution and partner alignment under ${COMPANY_PROFILE.parentCompany}.`,
              },
              {
                title: "Uganda Program Team",
                body: "Handles learner support, applicant readiness, school/job preparation, and local coordination in Kampala.",
              },
              {
                title: "Japan Partnerships Team",
                body: "Coordinates schools, employers, and institutions in Japan to ensure smooth onboarding and continuity.",
              },
              {
                title: "Education Desk",
                body: "Supports Japanese language pathways and study planning, including scholarship and admissions guidance.",
              },
              {
                title: "Employment & Business Desk",
                body: "Supports career-track placement and Uganda-Japan business consultancy for organizations entering either market.",
              },
              {
                title: "Community & Media",
                body: "Runs Bridge communication channels and community engagement to keep applicants and partners informed.",
              },
            ].map((group) => (
              <Card key={group.title}>
                <CardHeader>
                  <CardTitle>{group.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{group.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Leadership contact</CardTitle>
              <CardDescription>Direct line for program and partnership coordination.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{COMPANY_PROFILE.contact.managerName}</p>
              <p>{COMPANY_PROFILE.contact.managerRole}</p>
              <p>Uganda: {COMPANY_PROFILE.contact.ugandaPhone}</p>
              <p>Japan / WhatsApp: {COMPANY_PROFILE.contact.japanPhoneWhatsApp}</p>
              <p>Email: {COMPANY_PROFILE.contact.email}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
