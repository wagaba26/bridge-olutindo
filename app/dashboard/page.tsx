import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "My Account | Bridge Olutindo",
  description: "Overview of your Bridge programs, applications, and billing.",
};

export default function DashboardHomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">My Account Overview</h1>
        <p className="text-sm text-muted-foreground">
          Track your current pathway, submitted requests, and next actions in one place.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="border-slate-200 bg-white">
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Programs</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">0 active</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 bg-white">
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Applications</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">0 submitted</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 bg-white">
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Billing</p>
            <p className="mt-2 text-sm font-medium text-slate-900">No open invoices</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-slate-200 bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Next best action</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Complete your intake form so the right team can map your next step.</p>
            <Button asChild className="h-10 rounded-xl px-4">
              <Link href="/intake">Open intake</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="border-slate-200 bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Advisor support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Need direct help? Book a free consultation with the most relevant desk.</p>
            <Button asChild variant="secondary" className="h-10 rounded-xl px-4">
              <Link href="/consultation">Book free consultation</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="border-slate-200 bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Explore practical guides for language, jobs, and life in Japan.</p>
            <Button asChild variant="outline" className="h-10 rounded-xl px-4">
              <Link href="/blog">Open resources</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-slate-200 bg-white">
          <CardHeader>
            <CardTitle>Current program</CardTitle>
            <CardDescription>Your latest pathway status appears here.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            No active program yet. Once your intake is reviewed, your assigned track and progress updates appear here.
          </CardContent>
        </Card>
        <Card className="border-slate-200 bg-white">
          <CardHeader>
            <CardTitle>Applications</CardTitle>
            <CardDescription>Track your submitted requests and reviews.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            You can monitor review status, advisor notes, and next required actions.
          </CardContent>
        </Card>
        <Card className="border-slate-200 bg-white">
          <CardHeader>
            <CardTitle>Billing</CardTitle>
            <CardDescription>Invoices, receipts, and payment plans.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Billing details appear as soon as your account has an active fee schedule.
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <CardTitle>Suggested flow</CardTitle>
          <CardDescription>Use this sequence to move your account forward quickly.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>1. Submit intake with your preferred pathway and timing.</p>
          <p>2. Review updates in Applications and respond to advisor requests.</p>
          <p>3. Confirm billing items once your placement is approved.</p>
        </CardContent>
      </Card>
    </div>
  );
}
