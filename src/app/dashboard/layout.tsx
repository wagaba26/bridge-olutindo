import type { ReactNode } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const navItems = [
  { label: "Overview", href: "/dashboard" },
  { label: "Live Classes", href: "/dashboard/live-classes" },
  { label: "Recordings", href: "/dashboard/recordings" },
  { label: "Levels", href: "/dashboard/levels" },
  { label: "Progress", href: "/dashboard/progress" },
  { label: "Opportunities", href: "/dashboard/opportunities" },
  { label: "Settings", href: "/dashboard/settings" },
];

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="page-shell">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-10 lg:grid-cols-[240px_1fr]">
        <aside className="panel p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0b6b5f] text-sm font-semibold text-[#f7f6f2] shadow-[0_10px_24px_rgba(11,107,95,0.25)]">
              BO
            </div>
            <div>
              <p className="font-display text-lg">Dashboard</p>
              <p className="text-xs text-[#5b584f]">Student portal</p>
            </div>
          </div>
          <nav className="mt-6 grid gap-2 text-sm text-[#2d3336]">
            {navItems.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className="flex items-center justify-between rounded-2xl px-3 py-2 text-left transition hover:bg-[#f6f2ea]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 panel-soft p-4 text-xs text-[#5a5f5f]">
            Signed in as {session?.user?.email ?? "Student"}
          </div>
        </aside>

        <main className="space-y-6">{children}</main>
      </div>
    </div>
  );
}
