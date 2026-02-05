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
          This section will list your active language cohorts, job tracks, or study pathways once connected to the
          backend.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active programs</CardTitle>
          <CardDescription>Placeholder for your enrollments.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          You do not have any active programs yet. Start from the intake form to get matched with a track.
        </CardContent>
      </Card>
    </div>
  );
}
