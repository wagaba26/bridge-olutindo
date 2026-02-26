import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AccountNav } from "@/components/dashboard/account-nav";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const DASHBOARD_LINKS = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/learning", label: "E-Learning" },
  { href: "/dashboard/programs", label: "Programs" },
  { href: "/dashboard/applications", label: "Applications" },
  { href: "/dashboard/billing", label: "Billing" },
];

const STAFF_ROLES = new Set(["admin", "teacher"]);

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const role = String((user.user_metadata?.primary_role ?? "")).toLowerCase().trim();
  const links = [...DASHBOARD_LINKS];
  if (STAFF_ROLES.has(role)) {
    links.push({ href: "/dashboard/teaching", label: "Teaching Desk" });
  }
  if (role === "admin") {
    links.push({ href: "/dashboard/leads", label: "Leads" });
    links.push({ href: "/dashboard/security", label: "Security" });
  }

  const userLabel = user.email ?? "Signed-in user";
  const roleLabel = role ? role[0].toUpperCase() + role.slice(1) : "Member";

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[radial-gradient(circle_at_9%_8%,rgba(27,59,102,0.10),transparent_42%),linear-gradient(180deg,#f7f9fd_0%,#fdfaf3_45%,#f7f9fd_100%)]">
      <div className="container mx-auto grid gap-6 px-4 py-8 md:grid-cols-[186px_minmax(0,1fr)] md:gap-6 md:py-12">
        <aside className="hidden space-y-3 md:block">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">My Account</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">Workspace</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-[0_8px_22px_rgba(15,23,42,0.06)]">
            <p className="truncate text-sm font-medium text-slate-900">{userLabel}</p>
            <p className="mt-1 inline-flex rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700">
              {roleLabel}
            </p>
          </div>

          <AccountNav links={links} />
        </aside>
        <main className="space-y-6">{children}</main>
      </div>
    </div>
  );
}
