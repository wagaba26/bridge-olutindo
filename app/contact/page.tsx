import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata = {
  title: "Contact | Bridge Olutindo",
  description:
    "Get in touch with Bridge Olutindo for questions about Japanese language, jobs, and study programs.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b bg-slate-50/80">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <SectionHeading
            eyebrow="Contact"
            title="Talk to the Bridge Olutindo team."
            description="Whether you’re a learner, job seeker, parent, or partner, we’d love to hear your questions about Uganda–Japan opportunities."
          />
        </div>
      </section>

      {/* Split layout */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 grid gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start">
          {/* Form skeleton */}
          <form className="space-y-4" action="/api/contact" method="post">
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
                <label className="font-medium">Phone (optional)</label>
                <Input name="phone" placeholder="+256..." />
              </div>
              <div className="space-y-1 text-sm">
                <label className="font-medium">Inquiry type</label>
                <Input name="inquiry_type" placeholder="Learn / Jobs / Study / Partner / Other" />
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <label className="font-medium">Message</label>
              <textarea
                className="min-h-[140px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                name="message"
                placeholder="Share your question, goals, or situation."
                required
              />
            </div>
            <Button type="submit" className="bg-brand-red hover:bg-brand-red/90">
              Send message
            </Button>
          </form>

          {/* Contact info */}
          <div className="space-y-6 text-sm text-muted-foreground">
            <Card>
              <CardHeader>
                <CardTitle>Offices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-1 h-4 w-4" />
                  <div>
                    <p className="font-medium text-foreground">Kampala, Uganda</p>
                    <p>Exact address details to be added here.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="mt-1 h-4 w-4" />
                  <div>
                    <p className="font-medium text-foreground">Tokyo, Japan</p>
                    <p>Exact address details to be added here.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Direct contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>info@bridgeolutindo.com (placeholder)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+256 000 000 000 / +81 00 0000 0000 (placeholder)</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
