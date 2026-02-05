import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Billing | Bridge Olutindo",
  description: "Placeholder billing view for Bridge Olutindo dashboard.",
};

export default function DashboardBillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Billing</h1>
        <p className="text-sm text-muted-foreground">
          This is a static billing view. In the future, it will connect to your payment history and invoices.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>Sample structure for future billing data.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 text-xs md:text-sm font-medium text-muted-foreground border-b pb-2">
            <span>Date</span>
            <span>Description</span>
            <span>Status</span>
            <span className="text-right">Amount</span>
          </div>
          <div className="py-3 text-xs md:text-sm text-muted-foreground">
            <p>No invoices yet. This table will show tuition, program, and other payments in the future.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

