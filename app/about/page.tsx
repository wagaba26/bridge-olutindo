import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
            description="Bridge Olutindo (Bridge4U) was created to give Ugandans a clear, trusted path to learn Japanese, work in Japan, and study at world-class institutions."
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
            </div>
            <div>
              <h3 className="mb-2">Mission</h3>
              <p>
                To prepare and connect Ugandans with ethical, sustainable opportunities in Japan—through language
                education, career pathways, and study programs.
              </p>
            </div>
            <div>
              <h3 className="mb-2">Vision</h3>
              <p>
                A future where talented Ugandans confidently move between Kampala and Tokyo, building careers, learning,
                and partnerships that uplift both countries.
              </p>
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
                <p>• Emphasis on ethics, transparency, and long-term impact.</p>
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

      {/* Team grid placeholder */}
      <section className="py-16">
        <div className="container mx-auto px-4 space-y-8">
          <SectionHeading
            eyebrow="Team"
            title="People behind the bridge."
            description="This section will highlight key team members and advisors across Uganda and Japan."
          />
          <div className="grid gap-6 md:grid-cols-3 text-sm text-muted-foreground">
            {["Leadership", "Advisors", "Operations"].map((group) => (
              <Card key={group}>
                <CardHeader>
                  <CardTitle>{group}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Placeholder for names, roles, and short bios. This will help learners, parents, and partners see who
                    is behind Bridge Olutindo.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

