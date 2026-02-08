import Link from "next/link";

import { Button } from "@/components/ui/button";
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
          View payment records and keep your account billing status up to date.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>Your billing activity appears here once invoicing is activated.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-muted-foreground md:hidden">
            <p className="font-medium text-slate-700">No invoices yet</p>
            <p className="mt-1">Once billing is active, each invoice appears here with date, status, and amount.</p>
          </div>

          <div className="hidden grid-cols-4 gap-4 border-b pb-2 text-sm font-medium text-muted-foreground md:grid">
            <span>Date</span>
            <span>Description</span>
            <span>Status</span>
            <span className="text-right">Amount</span>
          </div>
          <div className="hidden py-3 text-sm text-muted-foreground md:block">
            <p>No invoices yet. This table will show tuition, program, and other payments in the future.</p>
          </div>

          <Button asChild variant="outline" className="h-10 rounded-xl px-4">
            <Link href="/contact">Contact billing support</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
