"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const STEPS = ["Program", "Details", "Payment", "Confirmation"];

export default function CheckoutClient() {
  const searchParams = useSearchParams();
  const selectedProgram = searchParams.get("program") ?? "";
  const programValue = selectedProgram.trim();
  const [activeStep, setActiveStep] = useState<string>("program");

  const stepIndex = STEPS.findIndex((step) =>
    activeStep === "program"
      ? step === "Program"
      : activeStep === "details"
      ? step === "Details"
      : activeStep === "payment"
      ? step === "Payment"
      : step === "Confirmation"
  );

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-slate-50/80">
        <div className="container mx-auto px-4 py-16 md:py-24 space-y-8">
          <SectionHeading
            eyebrow="Enrollment"
            title="Confirm your Bridge Olutindo program."
            description="This checkout flow is a UI skeleton. Program selection, payments, and confirmations will be wired to the backend later."
          />

          {/* Step indicator */}
          <ol className="flex flex-wrap gap-3 text-xs md:text-sm">
            {STEPS.map((label, index) => {
              const isActive = index === stepIndex;
              const isCompleted = index < stepIndex;
              return (
                <li key={label} className="flex items-center gap-2">
                  <span
                    className={[
                      "flex h-7 w-7 items-center justify-center rounded-full border text-[0.7rem] font-semibold",
                      isActive
                        ? "border-brand-red bg-brand-red text-white"
                        : isCompleted
                        ? "border-brand-blue bg-brand-blue text-white"
                        : "border-slate-300 text-slate-500",
                    ].join(" ")}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={
                      isActive || isCompleted ? "font-medium text-slate-900" : "text-slate-500"
                    }
                  >
                    {label}
                  </span>
                  {index < STEPS.length - 1 && (
                    <span className="mx-1 text-slate-400">/</span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start">
          {/* Multi-step form skeleton */}
          <Tabs
            value={activeStep}
            onValueChange={(val) => setActiveStep(val)}
            className="space-y-6"
          >
            <TabsList>
              <TabsTrigger value="program">Program</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="confirmation">Confirmation</TabsTrigger>
            </TabsList>

            <TabsContent value="program">
              <Card>
                <CardHeader>
                  <CardTitle>Select program</CardTitle>
                  <CardDescription>
                    In the future, this will be pre-filled when you start checkout from a specific program.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="space-y-1">
                    <label className="font-medium">Program</label>
                    <Input
                      defaultValue={programValue}
                      placeholder="e.g. N5 Evening Cohort, Factory Track, Study Pathway"
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <label className="font-medium">Start date (preferred)</label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-1">
                      <label className="font-medium">Location / mode</label>
                      <Input placeholder="Online / Kampala / Hybrid" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-3">
                  <Button
                    className="bg-brand-red hover:bg-brand-red/90"
                    type="button"
                    onClick={() => setActiveStep("details")}
                  >
                    Continue to details
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Your details</CardTitle>
                  <CardDescription>
                    This section will be synchronized with your profile once authentication is live.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <label className="font-medium">Full name</label>
                      <Input placeholder="Your full name" />
                    </div>
                    <div className="space-y-1">
                      <label className="font-medium">Email</label>
                      <Input type="email" placeholder="you@example.com" />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <label className="font-medium">Phone</label>
                      <Input placeholder="+256..." />
                    </div>
                    <div className="space-y-1">
                      <label className="font-medium">Current Japanese level</label>
                      <Input placeholder="Beginner / N5 / N4 / N3 / Other" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between gap-3">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setActiveStep("program")}
                  >
                    Back
                  </Button>
                  <Button
                    className="bg-brand-red hover:bg-brand-red/90"
                    type="button"
                    onClick={() => setActiveStep("payment")}
                  >
                    Continue to payment
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>Payment</CardTitle>
                  <CardDescription>
                    Payment methods and integrations (card, mobile money, bank) will be added here later.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="space-y-1">
                    <label className="font-medium">Payment method (placeholder)</label>
                    <Input placeholder="Card / Mobile money / Bank transfer" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-medium">Name on account</label>
                    <Input placeholder="Name on card or account" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between gap-3">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setActiveStep("details")}
                  >
                    Back
                  </Button>
                  <Button
                    className="bg-brand-red hover:bg-brand-red/90"
                    type="button"
                    onClick={() => setActiveStep("confirmation")}
                  >
                    Review &amp; confirm
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="confirmation">
              <Card>
                <CardHeader>
                  <CardTitle>Confirmation</CardTitle>
                  <CardDescription>
                    This summary is static. In the future, it will reflect the actual program, schedule, and payment
                    information above.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>• Program: {programValue || "Example program name"}</p>
                  <p>• Schedule: Example schedule details</p>
                  <p>• Amount: Placeholder amount</p>
                  <p>
                    When the backend is ready, this step will also generate a confirmation email and update your
                    dashboard.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between gap-3">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setActiveStep("payment")}
                  >
                    Back
                  </Button>
                  <Button
                    className="bg-brand-red hover:bg-brand-red/90"
                    type="button"
                  >
                    Confirm (placeholder)
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Summary sidebar */}
          <Card className="bg-slate-900 text-white">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
              <CardDescription className="text-slate-200">
                This card shows a static snapshot. It will later mirror your selected program and pricing.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <p className="font-medium">Program</p>
                  <p className="text-slate-300">
                    {programValue || "Example: N5 Evening Cohort / Factory Track / Study Pathway."}
                  </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-slate-200">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Duration
                  </p>
                  <p>Placeholder</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Amount
                  </p>
                  <p>To be confirmed</p>
                </div>
              </div>
              <p className="text-[0.75rem] text-slate-300">
                Final pricing, discounts, and payment plans will be confirmed by the Bridge Olutindo team before
                anything is charged.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
