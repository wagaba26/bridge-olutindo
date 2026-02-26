import Link from "next/link";
import { Button } from "@/src/components/v2/ui/button";

const links = [
  { href: "/v2/learn", label: "Learn Japanese" },
  { href: "/v2/study", label: "Study in Japan" },
  { href: "/v2/programs", label: "Programs" },
  { href: "/v2/resources", label: "Resources" },
  { href: "/v2/partners", label: "Partners" },
  { href: "/v2/about", label: "About" },
  { href: "/v2/contact", label: "Contact" },
];

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--v2-border)] bg-[color:rgba(245,243,238,0.92)] backdrop-blur">
      <div className="v2-container flex h-16 items-center justify-between">
        <Link href="/v2" className="font-semibold tracking-tight">
          Bridge Olutindo Academy
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-[var(--v2-text-muted)] md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[var(--v2-text)]">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/v2/intake">
          <Button className="h-10 px-4">Apply</Button>
        </Link>
      </div>
    </header>
  );
}

