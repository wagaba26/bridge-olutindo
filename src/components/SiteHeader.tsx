import Link from "next/link";

const navItems = [
  { label: "Learn Japanese", href: "/learn" },
  { label: "Jobs in Japan", href: "/jobs" },
  { label: "Study & Exchange", href: "/study" },
  { label: "Programs", href: "/programs" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "About", href: "/about" },
];

export default function SiteHeader() {
  return (
    <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-6 sm:py-6">
      <Link href="/" className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0b6b5f] text-sm font-semibold text-[#f7f6f2] shadow-[0_10px_24px_rgba(11,107,95,0.25)]">
          BO
        </div>
        <div>
          <p className="font-display text-lg">Bridge Olutindo</p>
          <p className="text-xs text-[#5a5f5f]">Japan-Uganda learning bridge</p>
        </div>
      </Link>
      <nav className="hidden items-center gap-6 text-sm text-[#2d3336] lg:flex">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="hover:text-[#0d6b5d]">
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="hidden rounded-full border border-[#e4e0d8] px-4 py-2 text-sm text-[#2d3336] transition hover:border-[#0b6b5f] hover:text-[#0b6b5f] sm:inline-flex"
        >
          Student Login
        </Link>
        <Link
          href="/team"
          className="hidden items-center gap-2 rounded-full border border-[#e4e0d8] px-5 py-2 text-sm font-semibold text-[#1a1f24] transition hover:border-[#0b6b5f] hover:text-[#0b6b5f] sm:inline-flex"
        >
          Bridge Team
        </Link>
        <Link href="/contact" className="btn-accent">
          Apply Now
        </Link>
      </div>
    </header>
  );
}
