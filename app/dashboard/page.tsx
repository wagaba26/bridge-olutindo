import Link from "next/link";

import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LearnerLiveProgress } from "@/components/dashboard/learner-live-progress";

export const metadata = {
  title: "My Account | Bridge Olutindo",
  description: "Structured overview of your learning pathway, submissions, and progress updates.",
};

export default function DashboardHomePage() {
  return (
    <div className="space-y-6">
      <FadeIn>
        <div>
          <h1 className="mb-2">Dashboard Overview</h1>
          <p className="text-sm text-muted-foreground">
            Monitor your language progression, readiness tasks, and support desk updates in one place.
          </p>
        </div>
      </FadeIn>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Programs", value: "0 active" },
          { label: "Submissions", value: "0 active reviews" },
          { label: "Billing", value: "No current invoices" },
        ].map((item, index) => (
          <FadeIn key={item.label} delay={0.03 * index}>
            <Card className="border-slate-200 bg-white">
              <CardContent className="p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</p>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "E-learning",
            body: "Continue level-based modules and review your learning metrics.",
            cta: "Open e-learning",
            href: "/dashboard/learning",
            variant: "default" as const,
          },
          {
            title: "Structured intake",
            body: "Submit updated baseline information so advisors can refine your learning and relocation plan.",
            cta: "Open intake",
            href: "/intake",
            variant: "default" as const,
          },
          {
            title: "Advisor support",
            body: "Request a desk-specific consultation for level planning and execution guidance.",
            cta: "Book consultation",
            href: "/consultation",
            variant: "secondary" as const,
          },
          {
            title: "Japan preparation",
            body: "Open practical modules for study and daily life systems in Japan.",
            cta: "Open preparation hub",
            href: "/japan-preparation",
            variant: "outline" as const,
          },
        ].map((item, index) => (
          <FadeIn key={item.title} delay={0.04 * index}>
            <Card className="border-slate-200 bg-white">
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>{item.body}</p>
                <Button asChild variant={item.variant} className="h-10 rounded-xl px-4">
                  <Link href={item.href}>{item.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Current program",
            description: "Current learning assignment and status.",
            body: "No active assignment yet. After intake review, your designated track and milestone updates appear here.",
          },
          {
            title: "Submissions",
            description: "Track forms, reviews, and confirmations.",
            body: "Monitor status updates, advisor notes, and pending action items.",
          },
          {
            title: "Billing",
            description: "Invoices, receipts, and payment plans.",
            body: "Billing records appear once your account has an active fee schedule.",
          },
        ].map((item, index) => (
          <FadeIn key={item.title} delay={0.03 * index}>
            <Card className="border-slate-200 bg-white">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{item.body}</CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.08}>
        <Card className="border-slate-200 bg-white">
          <CardHeader>
            <CardTitle>Live teacher updates</CardTitle>
            <CardDescription>Your dashboard updates in real time when teachers submit class ratings.</CardDescription>
          </CardHeader>
          <CardContent>
            <LearnerLiveProgress />
          </CardContent>
        </Card>
      </FadeIn>

      <FadeIn delay={0.08}>
        <Card className="border-slate-200 bg-white">
          <CardHeader>
            <CardTitle>Suggested flow</CardTitle>
            <CardDescription>Follow this sequence for stable progression.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>1. Submit structured intake with current baseline and weekly capacity.</p>
            <p>2. Track desk updates and complete requested follow-up actions.</p>
            <p>3. Begin assigned modules and review live teacher feedback metrics.</p>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
