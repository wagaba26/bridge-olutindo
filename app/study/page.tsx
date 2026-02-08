import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProgramCard } from "@/components/ui/program-card";
import { Button } from "@/components/ui/button";
import { getProgramHref } from "@/lib/programs";

export const metadata = {
  title: "Study & Exchange | Bridge Olutindo",
  description:
    "Access language schools, colleges, and universities in Japan with full support from Bridge Olutindo.",
};

export default function StudyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b bg-slate-50/80">
        <div className="container mx-auto px-4 py-16 md:py-24 grid gap-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-center">
          <SectionHeading
            eyebrow="Study & Exchange"
            title="Turn your dream of studying in Japan into a clear plan."
            description="From language schools to university degrees, we help Ugandans choose the right study path, secure admissions, and prepare for life in Japan."
          />
          <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-4 text-sm text-muted-foreground">
            <h3 className="text-lg font-semibold text-foreground">
              Pathways we support
            </h3>
            <ul className="space-y-2">
              <li>• Japanese language schools (1–2 years)</li>
              <li>• College and vocational programs</li>
              <li>• Undergraduate and postgraduate degrees</li>
              <li>• Short-term exchange or summer programs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Highlighted programs */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 space-y-8">
          <SectionHeading
            eyebrow="Featured pathways"
            title="Sample study routes for Ugandan students."
            description="Exact schools and offers vary by intake, but these pathways show the kind of journeys we help students build."
          />

          <div className="mt-4 grid gap-6 md:grid-cols-3">
            <ProgramCard
              title="Language School → Vocational College"
              badge="Popular route"
              duration="2–3 years"
              mode="In-person"
              highlights={[
                "1–2 years of intensive Japanese",
                "Progression into IT, design, or business colleges",
                "Support with part-time work while studying",
              ]}
              href={getProgramHref("Language School → Vocational College")}
            />
            <ProgramCard
              title="Language School → University"
              duration="3–5 years"
              mode="In-person"
              highlights={[
                "Preparation for EJU and university entrance",
                "Guidance on choosing faculties and majors",
                "Help with scholarship and fee planning",
              ]}
              href={getProgramHref("Language School → University")}
            />
            <ProgramCard
              title="Short-Term Exchange & Summer"
              duration="3–12 months"
              mode="In-person"
              highlights={[
                "Short, immersive study experiences",
                "Ideal for students testing life in Japan",
                "Campus and homestay options",
              ]}
              href={getProgramHref("Short-Term Exchange & Summer")}
            />
          </div>
        </div>
      </section>

      {/* Scholarships & support */}
      <section className="py-16 bg-slate-50/70">
        <div className="container mx-auto px-4 grid gap-10 md:grid-cols-2 items-start">
          <div className="space-y-6 text-sm text-muted-foreground">
            <SectionHeading
              eyebrow="Scholarships & fees"
              title="We help you navigate scholarships and realistic budgets."
              description="Japan offers a mix of government, school-based, and private scholarships. We help you understand what’s possible for your profile."
            />
          </div>
          <div className="space-y-6 text-sm text-muted-foreground">
            <div>
              <h3 className="mb-2">Scholarship guidance</h3>
              <p>
                We review your academic record and goals, then highlight scholarship types you can realistically target—while being clear about
                where self-funding is required.
              </p>
            </div>
            <div>
              <h3 className="mb-2">Document and interview support</h3>
              <p>
                Receive structured support on statements of purpose, recommendation letters, and interviews with Japanese schools and universities.
              </p>
            </div>
            <div>
              <h3 className="mb-2">Life preparation</h3>
              <p>
                Beyond admissions, we help with expectations around accommodation, part-time work rules, and campus culture in Japan.
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
            eyebrow="Plan your route"
            title="Book a study planning call with our team."
            description="Share your current level, grades, and goals, and we’ll outline possible timelines and school options in Japan."
          />
          <Button asChild className="rounded-full px-10">
            <Link href="/intake?focus=study">Talk to a study advisor</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
