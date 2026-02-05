import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "Partners | Bridge Olutindo",
  description:
    "Partner with Bridge Olutindo to access vetted Ugandan talent for schools, employers, and organizations in Japan.",
};

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b bg-slate-900 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24 grid gap-10 md:grid-cols-2 items-center">
          <SectionHeading
            eyebrow="Partners"
            title="Access vetted Ugandan talent through one trusted bridge."
            description="Bridge Olutindo connects Japanese institutions and employers with prepared, supported candidates from Uganda—across language, jobs, and study pathways."
          />
          <div className="rounded-2xl border border-white/15 bg-white/5 p-6 space-y-4 text-sm">
            <h3 className="text-lg font-semibold">Partner types we support</h3>
            <ul className="space-y-2 text-slate-100">
              <li>• Japanese language schools and universities</li>
              <li>• Caregiving and healthcare institutions</li>
              <li>• Factories, logistics, and manufacturing companies</li>
              <li>• Tech and innovation-focused employers</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why partner */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 space-y-10">
          <SectionHeading
            eyebrow="Why Bridge Olutindo"
            title="A structured pipeline from Uganda to your institution."
            description="We prepare candidates in language, culture, and technical skills before they ever land in Japan—reducing risk and improving long-term outcomes."
          />
          <div className="grid gap-6 md:grid-cols-3 text-sm text-muted-foreground">
            <div className="rounded-xl border bg-card p-5">
              <h3 className="mb-2">Prepared candidates</h3>
              <p>
                We train candidates in Japanese language, culture, and role-specific expectations so they arrive aligned
                with your environment.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-5">
              <h3 className="mb-2">Transparent collaboration</h3>
              <p>
                Clear communication on candidate profiles, timelines, and documentation, with a single point of contact
                in both Uganda and Japan.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-5">
              <h3 className="mb-2">Ongoing support</h3>
              <p>
                We stay in touch with both you and the candidates after arrival, supporting smoother onboarding and
                retention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lead form skeleton */}
      <section className="py-16 bg-slate-50/80">
        <div className="container mx-auto px-4 grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Partner with us"
              title="Share what kind of partnership you’re exploring."
              description="Tell us if you’re a Ugandan school, university, or Japanese institution so we can match you with the right Bridge Olutindo team."
            />
            <form className="space-y-4" action="/api/partners" method="post">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1 text-sm">
                  <label className="font-medium">Organization name</label>
                  <Input name="organization" placeholder="e.g. Kyoto Language Academy" required />
                </div>
                <div className="space-y-1 text-sm">
                  <label className="font-medium">Contact person</label>
                  <Input name="contact_name" placeholder="Full name" required />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1 text-sm">
                  <label className="font-medium">Email</label>
                  <Input name="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="space-y-1 text-sm">
                  <label className="font-medium">Country / region</label>
                  <Input name="region" placeholder="Uganda / Japan / Other (specify)" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1 text-sm">
                  <label className="font-medium">Institution type</label>
                  <Input name="institution_type" placeholder="Primary / Secondary / University / Training institute" />
                </div>
                <div className="space-y-1 text-sm">
                  <label className="font-medium">Based in</label>
                  <Input name="based_in" placeholder="e.g. Kampala, Uganda or Osaka, Japan" />
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <label className="font-medium">Partnership focus</label>
                <Input
                  name="partnership_focus"
                  placeholder="Teaching Japanese, sending students to Japan, hosting Ugandan students, joint programs, etc."
                />
              </div>
              <div className="space-y-1 text-sm">
                <label className="font-medium">Additional details</label>
                <textarea
                  name="details"
                  placeholder="Share your goals, timelines, existing Japanese language activities, and what you’re looking for in a partner."
                  className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                  required
                />
              </div>
              <Button type="submit" className="bg-brand-red hover:bg-brand-red/90">
                Submit interest
              </Button>
            </form>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-sm text-sm text-muted-foreground space-y-3">
            <h3 className="text-lg font-semibold text-foreground">
              What happens after you submit
            </h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Our team reviews your details and partnership type.</li>
              <li>We propose a call with our Uganda or Japan office.</li>
              <li>
                Together, we explore pilot projects or ongoing pipelines that fit your needs.
              </li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
