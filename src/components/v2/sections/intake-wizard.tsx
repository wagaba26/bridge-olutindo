"use client";

import { useState } from "react";
import { Button } from "@/src/components/v2/ui/button";
import { Card } from "@/src/components/v2/ui/card";
import { Input } from "@/src/components/v2/ui/input";
import { useToast } from "@/src/components/v2/ui/toast";

const steps = ["Profile", "Level", "Schedule", "Confirm"];

export function IntakeWizard() {
  const [step, setStep] = useState(0);
  const { push } = useToast();

  return (
    <section className="v2-section">
      <div className="v2-container">
        <Card className="mx-auto max-w-2xl p-7">
          <p className="v2-eyebrow">Intake</p>
          <h1 className="mt-3 text-3xl font-semibold">Application wizard</h1>
          <div className="mt-5 flex flex-wrap gap-2">
            {steps.map((item, idx) => (
              <span key={item} className={`rounded-full px-3 py-1 text-xs ${idx <= step ? "bg-[var(--v2-accent)] text-white" : "bg-[var(--v2-accent-soft)] text-[var(--v2-text-muted)]"}`}>
                {idx + 1}. {item}
              </span>
            ))}
          </div>
          <div className="mt-6 space-y-4">
            {step === 0 ? (
              <>
                <Input placeholder="Full Name" />
                <Input type="email" placeholder="Email Address" />
              </>
            ) : null}
            {step === 1 ? (
              <>
                <Input placeholder="Current Japanese level" />
                <Input placeholder="Learning goal" />
              </>
            ) : null}
            {step === 2 ? (
              <>
                <Input placeholder="Preferred class days" />
                <Input placeholder="Preferred study hours per week" />
              </>
            ) : null}
            {step === 3 ? (
              <div className="rounded-[var(--v2-radius-md)] border border-[var(--v2-border)] bg-[var(--v2-surface)] p-4 text-sm text-[var(--v2-text-muted)]">
                Review your details and submit. Our team will contact you with placement guidance.
              </div>
            ) : null}
          </div>
          <div className="mt-6 flex justify-between">
            <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))}>Back</Button>
            {step < steps.length - 1 ? (
              <Button onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}>Next</Button>
            ) : (
              <Button onClick={() => push("Intake submitted successfully.")}>Submit</Button>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}

