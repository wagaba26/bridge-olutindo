import { redirect } from "next/navigation";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type SecurityEvent = {
  id: string;
  created_at: string;
  event_type: string;
  severity: string;
  request_path: string | null;
};

export const metadata = {
  title: "Security | Bridge Olutindo",
  description: "Admin view of recent security events and operational risk indicators.",
};

export default async function DashboardSecurityPage() {
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

  const db = await createSupabaseAdminClient();

  let securityEvents: SecurityEvent[] = [];
  let leadsLast24h = 0;
  let progressUpdatesLast24h = 0;
  let tableHint: string | null = null;

  try {
    const now = new Date();
    now.setHours(now.getHours() - 24);
    const since = now.toISOString();

    const [{ data: eventRows }, { count: leadsCount }, { count: progressCount }] = await Promise.all([
      db
        .from("security_events")
        .select("id, created_at, event_type, severity, request_path")
        .order("created_at", { ascending: false })
        .limit(30),
      db.from("leads").select("id", { count: "exact", head: true }).gte("created_at", since),
      db.from("learner_progress_updates").select("id", { count: "exact", head: true }).gte("created_at", since),
    ]);

    securityEvents = (eventRows as SecurityEvent[] | null) ?? [];
    leadsLast24h = leadsCount ?? 0;
    progressUpdatesLast24h = progressCount ?? 0;
  } catch {
    tableHint = "Security monitoring tables may not be fully configured yet. Apply latest schema.sql in Supabase.";
  }

  const highCount = securityEvents.filter((event) => event.severity === "high").length;
  const mediumCount = securityEvents.filter((event) => event.severity === "medium").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Security monitoring</h1>
        <p className="text-sm text-muted-foreground">
          Quick operational view of suspicious traffic, rate-limit blocks, and platform security signals.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">High severity events</CardTitle>
            <CardDescription>Recent security alerts</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{highCount}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Medium severity events</CardTitle>
            <CardDescription>Recent policy blocks</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{mediumCount}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Leads (24h)</CardTitle>
            <CardDescription>Public form traffic indicator</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{leadsLast24h}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent security events</CardTitle>
          <CardDescription>Latest 30 events captured by API security logging.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {tableHint ? <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-800">{tableHint}</p> : null}
          {securityEvents.length === 0 ? (
            <p className="text-muted-foreground">No recent security events.</p>
          ) : (
            securityEvents.map((event) => (
              <div key={event.id} className="grid gap-2 rounded-lg border p-3 md:grid-cols-[180px_120px_1fr]">
                <span className="text-muted-foreground">{new Date(event.created_at).toLocaleString()}</span>
                <span className="capitalize font-medium">{event.severity}</span>
                <span>
                  {event.event_type}
                  {event.request_path ? ` (${event.request_path})` : ""}
                </span>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Progress operations (24h)</CardTitle>
          <CardDescription>Staff activity linked to learner progress scoring.</CardDescription>
        </CardHeader>
        <CardContent className="text-3xl font-semibold">{progressUpdatesLast24h}</CardContent>
      </Card>
    </div>
  );
}
