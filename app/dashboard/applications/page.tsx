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
          Track your program, job, or school applications here once the backend is connected.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent applications</CardTitle>
          <CardDescription>Placeholder for your submissions.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          No applications yet. Submit your intake request to start the review process.
        </CardContent>
      </Card>
    </div>
  );
}
