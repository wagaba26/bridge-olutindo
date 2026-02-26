"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type AccountNavLink = {
  href: string;
  label: string;
};

interface AccountNavProps {
  links: AccountNavLink[];
}

function isActivePath(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AccountNav({ links }: AccountNavProps) {
  const pathname = usePathname();

  return (
    <nav className="-mx-1 overflow-x-auto pb-2 md:mx-0 md:overflow-visible md:pb-0" aria-label="Dashboard navigation">
      <div className="flex min-w-max gap-1 px-1 md:min-w-0 md:flex-col md:gap-1 md:px-0">
        {links.map((link) => {
          const active = isActivePath(pathname, link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "inline-flex items-center rounded-xl border px-3 py-2 text-xs font-medium transition-colors md:w-full md:justify-between",
                active
                  ? "border-brand-600/35 bg-brand-600/10 text-slate-900"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-100"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
