"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { IntakeFocus } from "@/lib/intake";

const FLOW_COPY: Record<
  IntakeFocus,
  {
    helper: string;
    messagePlaceholder: string;
    nextSteps: [string, string, string];
  }
> = {
  learn: {
    helper: "Tell us your current level and preferred study schedule.",
    messagePlaceholder: "Share your learning goal, target level (N5/N4/N3), and timeline.",
    nextSteps: [
      "We review your level and readiness for the right class track.",
      "A language advisor reaches out within 1-2 business days.",
      "You receive a practical class and intake recommendation.",
    ],
  },
  jobs: {
    helper: "Tell us your role interest and language readiness for Japan job tracks.",
    messagePlaceholder: "Share your preferred job category, background, and timeline.",
    nextSteps: [
      "We review your profile and role fit for available pathways.",
      "A placement advisor contacts you within 1-2 business days.",
      "You receive a readiness and next-step plan for job matching.",
    ],
  },
  study: {
    helper: "Tell us your study goal, preferred intake, and education background.",
    messagePlaceholder: "Share your target school type, intake period, and scholarship goals.",
    nextSteps: [
      "We review your study profile and intake timing.",
      "A study advisor reaches out within 1-2 business days.",
      "You receive an admissions and preparation action plan.",
    ],
  },
  partners: {
    helper: "Tell us your organization type and intended collaboration model.",
    messagePlaceholder: "Share your partnership objective, scope, and expected timeline.",
    nextSteps: [
      "We review your institution details and partnership model.",
      "A partnership advisor contacts you within 1-2 business days.",
      "We share a scoped onboarding path and coordination steps.",
    ],
  },
};

export function IntakeForm({
  initialFocus,
  initialProgram,
  focusOptions,
}: {
  initialFocus: IntakeFocus;
  initialProgram: string;
  focusOptions: Array<{ value: IntakeFocus; label: string; description: string }>;
}) {
  const [focus, setFocus] = useState<IntakeFocus>(initialFocus);

  const flow = useMemo(() => FLOW_COPY[focus], [focus]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Share your details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" action="/api/intake" method="post">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <div className="space-y-1.5 text-sm">
              <label className="font-medium">What are you interested in?</label>
              <Select name="focus" value={focus} onChange={(event) => setFocus(event.target.value as IntakeFocus)} className="h-11 rounded-xl" required>
                {focusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <p className="text-xs text-muted-foreground" aria-live="polite">{flow.helper}</p>
            </div>

            {initialProgram ? (
              <div className="space-y-1.5 text-sm">
                <label className="font-medium">Program of interest</label>
                <Input name="program" defaultValue={initialProgram} className="h-11 rounded-xl" readOnly />
              </div>
            ) : (
              <input type="hidden" name="program" value="" />
            )}

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
                <Input name="current_stage" placeholder="Beginner / Exploring / Ready to apply" className="h-11 rounded-xl" />
              </div>
            </div>

            {focus === "learn" ? (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5 text-sm">
                  <label className="font-medium">Preferred start window</label>
                  <Input name="preferred_start" placeholder="e.g. March 2026" className="h-11 rounded-xl" />
                </div>
                <div className="space-y-1.5 text-sm">
                  <label className="font-medium">Preferred payment plan</label>
                  <Select name="payment_plan" defaultValue="discuss" className="h-11 rounded-xl">
                    <option value="monthly">Monthly plan</option>
                    <option value="full">Full upfront</option>
                    <option value="discuss">Discuss with advisor</option>
                  </Select>
                </div>
              </div>
            ) : null}

            {focus === "jobs" ? (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5 text-sm">
                  <label className="font-medium">Target role category</label>
                  <Select name="target_role_category" defaultValue="factory" className="h-11 rounded-xl">
                    <option value="factory">Factory</option>
                    <option value="caregiving">Caregiving</option>
                    <option value="it">IT and Digital</option>
                    <option value="other">Other</option>
                  </Select>
                </div>
                <div className="space-y-1.5 text-sm">
                  <label className="font-medium">JLPT level</label>
                  <Select name="jlpt_level" defaultValue="none" className="h-11 rounded-xl">
                    <option value="none">Not yet started</option>
                    <option value="n5">N5</option>
                    <option value="n4">N4</option>
                    <option value="n3">N3+</option>
                  </Select>
                </div>
              </div>
            ) : null}

            {focus === "study" ? (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5 text-sm">
                  <label className="font-medium">Target intake</label>
                  <Input name="target_intake" placeholder="e.g. April 2027" className="h-11 rounded-xl" />
                </div>
                <div className="space-y-1.5 text-sm">
                  <label className="font-medium">Current education status</label>
                  <Input name="education_status" placeholder="High school / Diploma / Degree" className="h-11 rounded-xl" />
                </div>
              </div>
            ) : null}

            {focus === "partners" ? (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5 text-sm">
                  <label className="font-medium">Organization</label>
                  <Input name="organization" placeholder="Institution or company name" className="h-11 rounded-xl" />
                </div>
                <div className="space-y-1.5 text-sm">
                  <label className="font-medium">Partnership model</label>
                  <Select name="partnership_model" defaultValue="custom" className="h-11 rounded-xl">
                    <option value="talent">Talent pipeline</option>
                    <option value="education">Education collaboration</option>
                    <option value="exchange">Exchange program</option>
                    <option value="business">Business consultancy</option>
                    <option value="custom">Custom model</option>
                  </Select>
                </div>
              </div>
            ) : null}

            <div className="space-y-1.5 text-sm">
              <label className="font-medium">Message</label>
              <textarea
                name="message"
                className="min-h-[136px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                placeholder={flow.messagePlaceholder}
                required
              />
            </div>

            <Button type="submit" className="h-11 w-full rounded-xl px-5 sm:w-auto">
              Send intake request
            </Button>
            <p className="text-xs text-muted-foreground">Response time: usually within 24-72 business hours.</p>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 text-white lg:sticky lg:top-24">
        <CardHeader className="pb-4">
          <CardTitle>What happens next</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-200">
          <p>1. {flow.nextSteps[0]}</p>
          <p>2. {flow.nextSteps[1]}</p>
          <p>3. {flow.nextSteps[2]}</p>
        </CardContent>
      </Card>
    </div>
  );
}
