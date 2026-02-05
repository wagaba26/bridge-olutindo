import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type IntakeSearchParams = {
  focus?: string;
  program?: string;
};

const FOCUS_OPTIONS = [
  {
    value: "learn",
    label: "Learn Japanese",
    description: "Join language cohorts from N5 to N3.",
  },
  {
    value: "jobs",
    label: "Jobs in Japan",
    description: "Explore vetted job tracks and placement support.",
  },
  {
    value: "study",
    label: "Study & Exchange",
    description: "Plan language school or university pathways.",
  },
  {
    value: "partners",
    label: "Partnerships",
    description: "Collaborate with Bridge Olutindo across Uganda and Japan.",
  },
];

const FOCUS_STYLES: Record<string, { active: string; inactive: string }> = {
  learn: {
    active: "border-brand-red text-brand-red font-semibold",
    inactive: "border-brand-red text-brand-red hover:bg-brand-red/10",
  },
  jobs: {
    active: "border-brand-blue text-brand-blue font-semibold",
    inactive: "border-brand-blue text-brand-blue hover:bg-brand-blue/10",
  },
  study: {
    active: "border-brand-orange text-brand-orange font-semibold",
    inactive: "border-brand-orange text-brand-orange hover:bg-brand-orange/10",
  },
  partners: {
    active: "border-network-teal text-network-teal font-semibold",
    inactive: "border-network-teal text-network-teal hover:bg-network-teal/10",
  },
};

export default function IntakePage({
  searchParams,
}: {
  searchParams?: IntakeSearchParams;
}) {
  const focus = typeof searchParams?.focus === "string" ? searchParams.focus : "learn";
  const program = typeof searchParams?.program === "string" ? searchParams.program : "";

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-slate-50/80">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <SectionHeading
            eyebrow="Get Started"
            title="Tell us what you want to achieve."
            description="Share your goal and we’ll connect you with the right Bridge Olutindo team."
          />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Choose your focus</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {FOCUS_OPTIONS.map((option) => {
                  const styles = FOCUS_STYLES[option.value] ?? {
                    active: "bg-brand-red hover:bg-brand-red/90 text-white border-transparent",
                    inactive: "border-slate-300 text-slate-700 hover:bg-slate-100",
                  };
                  const isActive = focus === option.value;
                  return (
                    <Button
                      key={option.value}
                      asChild
                      variant="outline"
                      className={isActive ? styles.active : styles.inactive}
                    >
                      <Link href={`/intake?focus=${option.value}`}>{option.label}</Link>
                    </Button>
                  );
                })}
              </div>
              <p className="text-sm text-muted-foreground">
                {FOCUS_OPTIONS.find((option) => option.value === focus)?.description}
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Share your details</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" action="/api/intake" method="post">
                  <input type="hidden" name="focus" value={focus} />
                  {program ? (
                    <div className="space-y-1 text-sm">
                      <label className="font-medium">Program of interest</label>
                      <Input name="program" defaultValue={program} />
                    </div>
                  ) : (
                    <input type="hidden" name="program" value="" />
                  )}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1 text-sm">
                      <label className="font-medium">Full name</label>
                      <Input name="full_name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-1 text-sm">
                      <label className="font-medium">Email</label>
                      <Input name="email" type="email" placeholder="you@example.com" required />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1 text-sm">
                      <label className="font-medium">Phone</label>
                      <Input name="phone" placeholder="+256..." />
                    </div>
                    <div className="space-y-1 text-sm">
                      <label className="font-medium">Current stage</label>
                      <Input name="current_stage" placeholder="Beginner / Exploring / Ready to apply" />
                    </div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <label className="font-medium">Message</label>
                    <textarea
                      name="message"
                      className="min-h-[140px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                      placeholder="Tell us your goal, timeline, and any key details."
                      required
                    />
                  </div>
                  <Button type="submit" className="bg-brand-red hover:bg-brand-red/90">
                    Send intake request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-900 text-white">
            <CardHeader>
              <CardTitle>What happens next</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-200">
              <p>1. We review your details and confirm the best next step.</p>
              <p>2. A Bridge Olutindo advisor reaches out within 1-2 business days.</p>
              <p>3. We share a tailored plan for language, jobs, or study pathways.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
