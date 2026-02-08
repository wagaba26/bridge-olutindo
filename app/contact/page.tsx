import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { COMPANY_PROFILE } from "@/lib/company-profile";

export const metadata = {
  title: "Contact | Bridge Olutindo",
  description:
    "Get in touch with Bridge Olutindo for questions about Japanese language, jobs, and study programs.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-slate-50/80">
        <div className="container mx-auto space-y-5 px-4 py-12 md:py-16">
          <SectionHeading
            eyebrow="Contact"
            title="Talk to the Bridge Olutindo team."
            description="Whether you're a learner, job seeker, parent, or partner, we'd love to hear your questions about Uganda-Japan opportunities."
          />
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              "Response target: 24-72 hours",
              "Uganda + Japan support desks",
              "Consultations available",
            ].map((item) => (
              <p key={item} className="rounded-full border border-slate-300 bg-white px-3 py-1.5 font-medium text-slate-700">
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="container mx-auto grid items-start gap-10 px-4 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <Card className="border-slate-200 bg-white">
            <CardHeader>
              <CardTitle>Send a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" action="/api/contact" method="post">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5 text-sm">
                    <label className="font-medium">Full name</label>
                    <Input name="full_name" placeholder="Your name" className="h-11 rounded-xl" required />
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <label className="font-medium">Email</label>
                    <Input name="email" type="email" placeholder="you@example.com" className="h-11 rounded-xl" required />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5 text-sm">
                    <label className="font-medium">Phone (optional)</label>
                    <Input name="phone" placeholder="+256..." className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <label className="font-medium">Inquiry type</label>
                    <Input name="inquiry_type" placeholder="Learn / Jobs / Study / Partner / Other" className="h-11 rounded-xl" />
                    <p className="text-xs text-slate-500">This helps route your message to the right desk faster.</p>
                  </div>
                </div>
                <div className="space-y-1.5 text-sm">
                  <label className="font-medium">Message</label>
                  <textarea
                    className="min-h-[140px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                    name="message"
                    placeholder="Share your question, goals, or situation."
                    required
                  />
                </div>
                <Button type="submit" className="h-11 rounded-xl px-5">
                  Send message
                </Button>
                <p className="text-xs text-muted-foreground">Response time: usually within 24-72 business hours.</p>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6 text-sm text-muted-foreground md:sticky md:top-24">
            <Card className="border-slate-200 bg-white">
              <CardHeader>
                <CardTitle>Prefer a call?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>Book a free desk-specific consultation and pick the best slot for your team.</p>
                <Button asChild variant="secondary" className="h-11 w-full rounded-xl">
                  <Link href="/consultation">Schedule free consultation</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white">
              <CardHeader>
                <CardTitle>Offices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-1 h-4 w-4" />
                  <div>
                    <p className="font-medium text-foreground">Kampala, Uganda</p>
                    <p>Primary learner and program support coordination hub.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="mt-1 h-4 w-4" />
                  <div>
                    <p className="font-medium text-foreground">Tokyo, Japan</p>
                    <p>Partnership and Japan-side coordination support desk.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white">
              <CardHeader>
                <CardTitle>Direct contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{COMPANY_PROFILE.contact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Uganda: {COMPANY_PROFILE.contact.ugandaPhone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Japan / WhatsApp: {COMPANY_PROFILE.contact.japanPhoneWhatsApp}</span>
                </div>
                <p className="pt-2 text-foreground font-medium">
                  {COMPANY_PROFILE.contact.managerName} - {COMPANY_PROFILE.contact.managerRole}
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white">
              <CardHeader>
                <CardTitle>Official updates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href={COMPANY_PROFILE.contact.litlink} target="_blank" className="text-primary font-medium hover:underline">
                  Bridge4U official links and updates
                </Link>
                <Link href={COMPANY_PROFILE.contact.kumbaLink} target="_blank" className="text-primary font-medium hover:underline">
                  KUMBA parent company profile
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
