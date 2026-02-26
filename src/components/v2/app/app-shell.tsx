import Link from "next/link";
import type { ReactNode } from "react";

const nav = [
  { href: "/v2/app", label: "Overview" },
  { href: "/v2/app/catalog", label: "Catalog" },
  { href: "/v2/app/profile", label: "Profile" },
];

export function AppShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="v2-container v2-section">
      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        <aside className="v2-card-surface h-fit p-4">
          <p className="mb-4 text-xs uppercase tracking-[0.14em] text-[var(--v2-text-muted)]">Learning Space</p>
          <nav className="space-y-2 text-sm">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="block rounded-[var(--v2-radius-sm)] px-3 py-2 hover:bg-[var(--v2-accent-soft)]">
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <section className="space-y-5">
          <div className="v2-card-surface flex items-center justify-between p-4">
            <h1 className="text-xl font-semibold">{title}</h1>
            <p className="text-sm text-[var(--v2-text-muted)]">Academic dashboard</p>
          </div>
          {children}
        </section>
      </div>
    </div>
  );
}
