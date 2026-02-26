"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { IntakeFocus } from "@/lib/intake";
import { ALLOWED_CONSULTATION_DESKS } from "@/lib/service-policy";

const FLOW_COPY: Record<
  IntakeFocus,
  {
    helper: string;
    messagePlaceholder: string;
    nextSteps: [string, string, string];
  }
> = {
  learn: {
    helper: "Provide your current level, weekly capacity, and target JLPT stage (N5, N4, or N3).",
    messagePlaceholder: "State your target level, baseline, weekly hours, and realistic timeline.",
    nextSteps: [
      "We evaluate your baseline and progression requirements.",
      "An academic advisor responds within 1-2 business days.",
      "You receive a structured training recommendation.",
    ],
  },
  study: {
    helper: "Provide your study objective, intake period, and current education background.",
    messagePlaceholder: "Share school type, intake month, and document preparation status.",
    nextSteps: [
      "We review your study profile and timing constraints.",
      "A study advisor responds within 1-2 business days.",
      "You receive a preparation sequence with clear milestones.",
    ],
  },
  partners: {
    helper: "Provide organization type, collaboration model, and expected timeline.",
    messagePlaceholder: "Describe the objective, scope, and implementation timeline.",
    nextSteps: [
      "We review your institutional context and model.",
      "A partnership advisor responds within 1-2 business days.",
      "We share a scoped coordination plan.",
    ],
  },
};

const DESK_LABELS: Record<string, string> = {
  language: "Language Desk",
  study: "Study and Exchange Desk",
  partners: "Partnerships Desk",
  business: "Business Consultancy Desk",
};

const DEFAULT_DESK_BY_FOCUS: Record<IntakeFocus, string> = {
  learn: "language",
  study: "study",
  partners: "partners",
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
  const [desk, setDesk] = useState<string>(DEFAULT_DESK_BY_FOCUS[initialFocus] ?? ALLOWED_CONSULTATION_DESKS[0] ?? "language");

  const flow = useMemo(() => FLOW_COPY[focus], [focus]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Submit structured details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" action="/api/intake" method="post">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <div className="space-y-1.5 text-sm">
              <label className="font-medium">What are you interested in?</label>
              <Select
                name="focus"
                value={focus}
                onChange={(event) => {
                  const nextFocus = event.target.value as IntakeFocus;
                  setFocus(nextFocus);
                  const nextDesk = DEFAULT_DESK_BY_FOCUS[nextFocus];
                  if (nextDesk && ALLOWED_CONSULTATION_DESKS.includes(nextDesk as (typeof ALLOWED_CONSULTATION_DESKS)[number])) {
                    setDesk(nextDesk);
                  }
                }}
                className="h-11 rounded-xl"
                required
              >
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
                <Select name="current_stage" defaultValue="exploring" className="h-11 rounded-xl">
                  <option value="beginner">Beginner</option>
                  <option value="exploring">Exploring options</option>
                  <option value="ready_to_apply">Ready to apply</option>
                  <option value="already_started">Already started elsewhere</option>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5 text-sm">
              <label className="font-medium">Preferred support desk</label>
              <Select name="preferred_support_desk" value={desk} onChange={(event) => setDesk(event.target.value)} className="h-11 rounded-xl">
                {ALLOWED_CONSULTATION_DESKS.map((value) => (
                  <option key={value} value={value}>
                    {DESK_LABELS[value] ?? value}
                  </option>
                ))}
              </Select>
              <p className="text-xs text-muted-foreground">Your intake is routed to this desk first.</p>
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
                  <Input name="organization" placeholder="Institution or organization name" className="h-11 rounded-xl" />
                </div>
                <div className="space-y-1.5 text-sm">
                  <label className="font-medium">Partnership model</label>
                  <Select name="partnership_model" defaultValue="custom" className="h-11 rounded-xl">
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
              Submit intake
            </Button>
            <p className="text-xs text-muted-foreground">Response time: typically 24-72 business hours.</p>
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
