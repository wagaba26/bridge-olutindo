import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Dashboard | Bridge Olutindo",
  description: "Placeholder overview dashboard for Bridge Olutindo learners and candidates.",
};

export default function DashboardHomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Overview</h1>
        <p className="text-sm text-muted-foreground">
          This dashboard is a UI shell. In the future, it will display your active programs, applications, and billing
          details.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Current program</CardTitle>
            <CardDescription>Placeholder for your active course or track.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            You&apos;ll see your current Japanese level or job track here, with quick links to materials and sessions.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Applications</CardTitle>
            <CardDescription>Placeholder for study or job applications.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Once connected to the backend, this area will list applications to schools, employers, or programs.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Billing</CardTitle>
            <CardDescription>Placeholder for invoices and payment status.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            In the future, you&apos;ll be able to see invoices, receipts, and payment plans here.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

