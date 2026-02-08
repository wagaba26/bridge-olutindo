import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { COMPANY_PROFILE } from "@/lib/company-profile";

export const metadata = {
  title: "JLCAT Enrollment | Bridge Olutindo",
  description: "Enroll in Bridge's dedicated JLCAT preparation track with a focused intake form.",
};

export default function JlcatEnrollmentPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-slate-50/80">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">JLCAT Enrollment</p>
          <h1 className="mt-2 max-w-3xl">Enroll in the Japanese Language Program - JLCAT Preparation</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
            This is a dedicated enrollment form for the JLCAT track so your request goes directly to the language desk.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container mx-auto grid gap-6 px-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Card>
            <CardHeader>
              <CardTitle>JLCAT intake form</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" action="/api/intake" method="post">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <input type="hidden" name="focus" value="learn" />
                <input type="hidden" name="program" value="Japanese Language Program - JLCAT Preparation" />

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
                    <label className="font-medium">Phone / WhatsApp</label>
                    <Input name="phone" placeholder="+256..." className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <label className="font-medium">Current stage</label>
                    <Select name="current_stage" defaultValue="beginner" className="h-11 rounded-xl">
                      <option value="beginner">Beginner</option>
                      <option value="exploring">Exploring options</option>
                      <option value="ready">Ready to apply</option>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5 text-sm">
                    <label className="font-medium">Preferred start window</label>
                    <Input name="preferred_start" placeholder="e.g. March 2026" className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <label className="font-medium">Entry mode</label>
                    <Select name="entry_mode" defaultValue="new" className="h-11 rounded-xl">
                      <option value="new">New intake</option>
                      <option value="midway">Midway entry (with catch-up)</option>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5 text-sm">
                  <label className="font-medium">Preferred payment plan</label>
                  <Select name="payment_plan" defaultValue="monthly" className="h-11 rounded-xl">
                    <option value="monthly">Monthly (USD 150)</option>
                    <option value="full">Full 6-month upfront (USD 840)</option>
                    <option value="discuss">Discuss with advisor</option>
                  </Select>
                </div>

                <div className="space-y-1.5 text-sm">
                  <label className="font-medium">Weekly availability note</label>
                  <Input name="weekly_availability" placeholder="Wednesday 17:00, Saturday 07:00 or 13:00" className="h-11 rounded-xl" />
                </div>

                <div className="space-y-1.5 text-sm">
                  <label className="font-medium">Message</label>
                  <textarea
                    name="message"
                    className="min-h-28 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none"
                    placeholder="Share your study goal, timeline, and any questions for the language desk."
                    required
                  />
                </div>

                <Button type="submit" className="h-11 rounded-xl px-5">
                  Submit JLCAT enrollment
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 text-white">
            <CardHeader>
              <CardTitle>Program snapshot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-200">
              <p>Duration: {COMPANY_PROFILE.jclatProgram.duration}</p>
              <p>Class length: {COMPANY_PROFILE.jclatProgram.lessonLength}</p>
              <p>Schedule: {COMPANY_PROFILE.jclatProgram.schedule.join(" | ")}</p>
              <p>Monthly fee: USD {COMPANY_PROFILE.jclatProgram.monthlyFeeUsd}</p>
              <p>Registration: USD {COMPANY_PROFILE.jclatProgram.registrationFeeUsd} (one-time)</p>
              <p>Full payment: USD {COMPANY_PROFILE.jclatProgram.fullProgramUsd}</p>
              <p className="pt-2 text-slate-300">Need another program? Use the general intake form.</p>
              <Link href="/intake?focus=learn" className="inline-flex pt-1 text-sm font-semibold text-white underline">
                Open general intake
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
