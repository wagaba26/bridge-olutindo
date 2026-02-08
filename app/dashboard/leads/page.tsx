import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Leads | Bridge Olutindo",
  description: "Admin view for intake, contact, and partner leads.",
};

export const dynamic = "force-dynamic";

type LeadRecord = {
  id: string;
  created_at: string;
  type: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  focus: string | null;
  organization: string | null;
};

export default async function DashboardLeadsPage() {
  const authClient = await createSupabaseServerClient();
  const {
    data: { user },
  } = await authClient.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const role = String((user.user_metadata?.primary_role ?? "")).toLowerCase().trim();
  if (role !== "admin") {
    redirect("/dashboard");
  }

  const supabase = await createSupabaseAdminClient();
  const leads: LeadRecord[] = [];
  let errorMessage: string | null = null;

  const { data, error } = await supabase
    .from("leads")
    .select("id, created_at, type, full_name, email, phone, focus, organization")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    errorMessage = "Unable to load leads from Supabase.";
  } else if (data) {
    leads.push(...(data as LeadRecord[]));
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Leads</h1>
        <p className="text-sm text-muted-foreground">
          Intake, contact, and partner submissions will appear here for follow-up.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent submissions</CardTitle>
          <CardDescription>Latest 50 leads from the website.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm">
          {errorMessage ? (
            <p className="text-muted-foreground">{errorMessage}</p>
          ) : leads.length === 0 ? (
            <p className="text-muted-foreground">No leads yet. Submit an intake or contact form to test.</p>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-6 gap-3 text-xs uppercase tracking-wide text-muted-foreground">
                <span>Date</span>
                <span>Type</span>
                <span>Name</span>
                <span>Email</span>
                <span>Phone</span>
                <span>Focus / Org</span>
              </div>
              {leads.map((lead) => (
                <div key={lead.id} className="grid grid-cols-6 gap-3 text-sm">
                  <span>{new Date(lead.created_at).toLocaleDateString()}</span>
                  <span className="capitalize">{lead.type}</span>
                  <span>{lead.full_name ?? "-"}</span>
                  <span>{lead.email ?? "-"}</span>
                  <span>{lead.phone ?? "-"}</span>
                  <span>{lead.focus ?? lead.organization ?? "-"}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
