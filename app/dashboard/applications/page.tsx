import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Applications | Bridge Olutindo",
  description: "Placeholder applications view for Bridge Olutindo dashboard.",
};

export default function DashboardApplicationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Applications</h1>
        <p className="text-sm text-muted-foreground">
          Track your program, job, or school applications in one consolidated timeline.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="border-slate-200 bg-white">
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Total submitted</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">0</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 bg-white">
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Under review</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">0</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 bg-white">
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Next action</p>
            <p className="mt-2 text-sm font-medium text-slate-900">Open your first intake thread</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <CardTitle>Recent applications</CardTitle>
          <CardDescription>Submission and review status.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>No applications yet. Start with intake to open your first review thread.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-10 rounded-xl px-4">
              <Link href="/intake">Submit intake</Link>
            </Button>
            <Button asChild variant="outline" className="h-10 rounded-xl px-4">
              <Link href="/consultation">Discuss your pathway</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <CardTitle>Application timeline</CardTitle>
          <CardDescription>Typical stages once you submit your intake.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>1. Intake submission and profile review.</p>
          <p>2. Advisor follow-up with required documents.</p>
          <p>3. Program, job, or institution matching and progress updates.</p>
        </CardContent>
      </Card>
    </div>
  );
}
