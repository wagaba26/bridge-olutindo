import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProgramCard } from "@/components/ui/program-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProgramHref } from "@/lib/programs";

export const metadata = {
  title: "All Programs | Bridge Olutindo",
  description:
    "Explore all Bridge Olutindo programs across language, jobs, and study pathways between Uganda and Japan.",
};

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b bg-slate-50/80">
        <div className="container mx-auto px-4 py-16 md:py-24 space-y-6">
          <SectionHeading
            eyebrow="Programs"
            title="All Bridge Olutindo programs in one place."
            description="Browse language, job, and study programs that connect Uganda and Japan. Filter by type, level, and delivery mode."
          />
          <div className="flex flex-wrap gap-3 text-xs">
            {["Language", "Jobs", "Study", "Short courses", "Online", "In-person", "Hybrid"].map(
              (tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-slate-300 text-slate-700"
                >
                  {tag}
                </Badge>
              )
            )}
          </div>
        </div>
      </section>

      {/* Program groups */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 space-y-12">
          {/* Language */}
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2>Japanese language programs</h2>
              <Badge variant="outline" className="border-brand-blue text-brand-blue">
                Language
              </Badge>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <ProgramCard
                title="N5 Foundation"
                level="N5"
                duration="12 weeks"
                mode="Hybrid"
                highlights={[
                  "Core grammar and daily vocabulary",
                  "Ugandan-context examples",
                  "JLPT-style quizzes",
                ]}
                href={getProgramHref("N5 Foundation")}
              />
              <ProgramCard
                title="N4 Completion"
                level="N4"
                duration="12 weeks"
                mode="Hybrid"
                highlights={[
                  "Reading and listening drills",
                  "Mock exams and feedback",
                  "Exam registration support",
                ]}
                href={getProgramHref("N4 Completion")}
              />
              <ProgramCard
                title="N3 Career Japanese"
                level="N3"
                duration="16 weeks"
                mode="Hybrid"
                highlights={[
                  "Workplace Japanese for jobs",
                  "Business email and meetings",
                  "Interview practice",
                ]}
                href={getProgramHref("N3 Career Japanese")}
              />
            </div>
          </div>

          {/* Jobs */}
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2>Job preparation tracks</h2>
              <Badge variant="outline" className="border-brand-red text-brand-red">
                Jobs
              </Badge>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <ProgramCard
                title="Factory & Manufacturing Track"
                duration="3–6 months pre-departure"
                mode="In-person"
                highlights={[
                  "Technical basics for factory roles",
                  "Safety and quality standards",
                  "Interview and contract guidance",
                ]}
                href={getProgramHref("Factory & Manufacturing Track")}
              />
              <ProgramCard
                title="Caregiving Track"
                duration="6–9 months pre-departure"
                mode="Hybrid"
                highlights={[
                  "Foundations in care work",
                  "Japanese for care environments",
                  "Cultural preparation for long-term roles",
                ]}
                href={getProgramHref("Caregiving Track")}
              />
              <ProgramCard
                title="IT & Digital Careers Track"
                duration="6–12 months pre-departure"
                mode="Hybrid"
                highlights={[
                  "Tech interview coaching",
                  "Remote collaboration skills",
                  "Support in exploring high-skill visas",
                ]}
                href={getProgramHref("IT & Digital Careers Track")}
              />
            </div>
          </div>

          {/* Study */}
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2>Study & scholarship preparation</h2>
              <Badge variant="outline" className="border-brand-orange text-brand-orange">
                Study
              </Badge>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <ProgramCard
                title="Language School Placement Support"
                duration="6–12 months"
                mode="In-person"
                highlights={[
                  "School matching in Japan",
                  "Application document guidance",
                  "Orientation for new life abroad",
                ]}
                href={getProgramHref("Language School Placement Support")}
              />
              <ProgramCard
                title="Scholarship Strategy Clinic"
                duration="Short program"
                mode="Online"
                highlights={[
                  "Clarify realistic scholarship options",
                  "Improve statements and recommendations",
                  "Interview coaching and mock panels",
                ]}
                href={getProgramHref("Scholarship Strategy Clinic")}
              />
              <ProgramCard
                title="Study Planning Session"
                duration="One-time session"
                mode="Online"
                highlights={[
                  "Personalized roadmap for your goals",
                  "Budget and timeline planning",
                  "Next steps for parents and guardians",
                ]}
                href={getProgramHref("Study Planning Session")}
              />
            </div>
          </div>

          {/* CTA */}
          <div className="border rounded-2xl bg-slate-900 text-white px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange">
                Not sure where to start?
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold">
                Get a tailored program recommendation.
              </h2>
              <p className="text-slate-200 text-sm md:text-base">
                Tell us if you want to focus on language, work, or study, and we’ll suggest a combination of programs and
                timelines that fit your current stage.
              </p>
            </div>
            <Button asChild className="bg-brand-red hover:bg-brand-red/90 rounded-full px-8">
              <Link href="/intake">Talk to our team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
