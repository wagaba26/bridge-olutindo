import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Programs | Bridge Olutindo",
  description: "Placeholder programs view for Bridge Olutindo dashboard.",
};

export default function DashboardProgramsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Programs</h1>
        <p className="text-sm text-muted-foreground">
          Review your active cohorts, pathway assignments, and upcoming milestones.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="border-slate-200 bg-white">
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Active tracks</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">0</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 bg-white">
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Pending review</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">1</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 bg-white">
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Next milestone</p>
            <p className="mt-2 text-sm font-medium text-slate-900">Submit intake profile</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <CardTitle>Active programs</CardTitle>
          <CardDescription>Your current enrollments and status.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>No active program yet. Once intake is approved, your assigned track appears here.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="secondary" className="h-10 rounded-xl px-4">
              <Link href="/intake?focus=learn">Request program matching</Link>
            </Button>
            <Button asChild variant="outline" className="h-10 rounded-xl px-4">
              <Link href="/consultation">Talk to an advisor</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <CardTitle>What to prepare now</CardTitle>
          <CardDescription>Completing these steps helps us place you faster.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>1. Select your preferred pathway and timeline in intake.</p>
          <p>2. Share your language level and prior training background.</p>
          <p>3. Book a consultation if you need a custom program fit.</p>
          <Button asChild variant="outline" className="mt-2 h-10 rounded-xl px-4">
            <Link href="/intake?focus=learn">Request program matching</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
