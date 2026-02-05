import { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const DASHBOARD_LINKS = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/programs", label: "Programs" },
  { href: "/dashboard/applications", label: "Applications" },
  { href: "/dashboard/billing", label: "Billing" },
  { href: "/dashboard/leads", label: "Leads" },
];

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/80">
      <div className="container mx-auto px-4 py-10 md:py-14 grid gap-8 md:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="space-y-6">
          <SectionHeading
            eyebrow="Dashboard"
            title="Your Bridge space."
            description="This area will surface your programs, applications, and billing."
          />
          <nav className="space-y-1 text-sm">
            {DASHBOARD_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center justify-between rounded-full px-4 py-2 transition-colors hover:bg-slate-200 text-slate-800"
                )}
              >
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </aside>
        <main className="space-y-6">{children}</main>
      </div>
    </div>
  );
}

