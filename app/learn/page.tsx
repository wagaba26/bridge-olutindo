import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProgramCard } from "@/components/ui/program-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { getProgramHref } from "@/lib/programs";

export const metadata = {
  title: "Learn Japanese | Bridge Olutindo",
  description:
    "Master Japanese from N5 to N3 with Bridge Olutindo. Flexible classes, Ugandan-friendly pricing, and JLPT-focused training.",
};

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b bg-slate-50/60">
        <div className="container mx-auto px-4 py-16 md:py-24 grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">
          <div>
            <SectionHeading
              eyebrow="Learn Japanese"
              title="From Kampala classroom to Tokyo conversation."
              description="Structured Japanese language programs designed for Ugandans preparing for life, work, and study in Japan."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="bg-brand-red hover:bg-brand-red/90 rounded-full px-8">
                <Link href="/intake?focus=learn">Get Started</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-8">
                <Link href="#levels">View curriculum</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-semibold">Quick facts</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• JLPT-focused training from N5 to N3.</li>
              <li>• Evening and weekend cohorts for working learners.</li>
              <li>• Practice with native Japanese partners.</li>
              <li>• Interview preparation for jobs and schools in Japan.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Levels */}
      <section id="levels" className="py-16 md:py-20">
        <div className="container mx-auto px-4 space-y-8">
          <SectionHeading
            eyebrow="Curriculum"
            title="Choose your JLPT starting point."
            description="Whether you are new to Japanese or ready to advance, start at the level that matches your current skills."
          />

          <Tabs defaultValue="n5" className="mt-4">
            <TabsList>
              <TabsTrigger value="n5">N5 – Beginner</TabsTrigger>
              <TabsTrigger value="n4">N4 – Foundation</TabsTrigger>
              <TabsTrigger value="n3">N3 – Intermediate</TabsTrigger>
            </TabsList>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <TabsContent value="n5" className="md:col-span-3 grid gap-6 md:grid-cols-3">
                <ProgramCard
                  title="N5 Evening Cohort"
                  level="N5"
                  badge="Best for beginners"
                  duration="12 weeks"
                  mode="Hybrid"
                  highlights={[
                    "Hiragana & Katakana mastery",
                    "Daily phrases for work and travel",
                    "Uganda–Japan culture basics",
                  ]}
                  ctaLabel="Join waiting list"
                  href={getProgramHref("N5 Evening Cohort")}
                />
                <ProgramCard
                  title="N5 Intensive Bootcamp"
                  level="N5"
                  badge="Fast track"
                  duration="6 weeks"
                  mode="In-person"
                  highlights={[
                    "Small group classes",
                    "Daily drills and tests",
                    "Speaking labs with coaches",
                  ]}
                  href={getProgramHref("N5 Intensive Bootcamp")}
                />
                <ProgramCard
                  title="N5 Online Weekend"
                  level="N5"
                  duration="10 weeks"
                  mode="Online"
                  highlights={[
                    "Weekend-only schedule",
                    "Recorded sessions for revision",
                    "WhatsApp community support",
                  ]}
                  href={getProgramHref("N5 Online Weekend")}
                />
              </TabsContent>

              <TabsContent value="n4" className="md:col-span-3 grid gap-6 md:grid-cols-3">
                <ProgramCard
                  title="N4 Evening Program"
                  level="N4"
                  badge="Recommended"
                  duration="12 weeks"
                  mode="Hybrid"
                  highlights={[
                    "JLPT-style mock exams",
                    "Listening and reading focus",
                    "Kanji foundations",
                  ]}
                  href={getProgramHref("N4 Evening Program")}
                />
                <ProgramCard
                  title="N4 Exam Prep Clinic"
                  level="N4"
                  duration="8 weeks"
                  mode="Online"
                  highlights={[
                    "Past paper analysis",
                    "Time management training",
                    "Speaking and interview drills",
                  ]}
                  href={getProgramHref("N4 Exam Prep Clinic")}
                />
              </TabsContent>

              <TabsContent value="n3" className="md:col-span-3 grid gap-6 md:grid-cols-3">
                <ProgramCard
                  title="N3 Career Track"
                  level="N3"
                  badge="For work & study"
                  duration="16 weeks"
                  mode="Hybrid"
                  highlights={[
                    "Industry vocabulary (care, factory, IT)",
                    "Business email and etiquette",
                    "Interview simulations with coaches",
                  ]}
                  href={getProgramHref("N3 Career Track")}
                />
                <ProgramCard
                  title="N3 Reading & Listening Lab"
                  level="N3"
                  duration="10 weeks"
                  mode="Online"
                  highlights={[
                    "News and real-world content",
                    "Weekly comprehension quizzes",
                    "Pronunciation coaching",
                  ]}
                  href={getProgramHref("N3 Reading & Listening Lab")}
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      {/* Self-study */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">
          <SectionHeading
            eyebrow="Self-study"
            title="Practice Japanese on your own time."
            description="Use our interactive practice page to review vocabulary, run quick quizzes, and build confidence every day."
          />
          <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-4 text-sm text-muted-foreground">
            <p>
              This practice space is perfect between classes. Work through daily words, quizzes, and curated resources
              before you apply.
            </p>
            <Button asChild className="bg-brand-blue hover:bg-brand-blue/90 rounded-full px-8">
              <Link href="/learn/teach-yourself">Start practicing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16 bg-slate-50/60">
        <div className="container mx-auto px-4 grid gap-10 md:grid-cols-2 items-start">
          <SectionHeading
            eyebrow="Our approach"
            title="Built for Ugandans preparing for Japan."
            description="We combine local context with Japanese standards so you can move with confidence."
          />
          <div className="space-y-6 text-sm text-muted-foreground">
            <div>
              <h3 className="mb-2">Contextualized examples</h3>
              <p>
                Lessons use Ugandan workplaces, schools, and daily life scenarios so that grammar and vocabulary feel
                natural and practical from day one.
              </p>
            </div>
            <div>
              <h3 className="mb-2">Practice with real Japanese speakers</h3>
              <p>
                We connect learners with Japanese partners for speaking practice, helping you understand accents,
                pace, and real-life conversation.
              </p>
            </div>
            <div>
              <h3 className="mb-2">Support beyond the classroom</h3>
              <p>
                Our team supports you with exam registration, visa documentation guidance, and interview coaching for
                employers and schools in Japan.
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
            eyebrow="Next step"
            title="Start your Japanese journey with Bridge Olutindo."
            description="Tell us your goal—work, study, or explore—and our team will recommend the right class and timeline."
          />
          <Button asChild className="bg-brand-red hover:bg-brand-red/90 rounded-full px-10">
            <Link href="/intake?focus=learn">Talk to an advisor</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
