import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-[#e4e0d8] bg-white/70">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-start justify-between gap-8 px-6 py-10">
        <div className="max-w-xs">
          <Link href="/" className="font-display text-xl">
            Bridge Olutindo
          </Link>
          <p className="mt-2 text-sm text-[#5a5f5f]">
            A bridge for learners in Uganda pursuing Japanese language, careers, and study.
          </p>
        </div>
        <div className="grid gap-2 text-sm text-[#5a5f5f]">
          <p className="font-semibold text-[#1c1b18]">Programs</p>
          <Link href="/learn">Japanese learning</Link>
          <Link href="/jobs">Jobs pathway</Link>
          <Link href="/study">Study pathway</Link>
        </div>
        <div className="grid gap-2 text-sm text-[#5a5f5f]">
          <p className="font-semibold text-[#1c1b18]">Company</p>
          <Link href="/testimonials">Testimonials</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/about">About</Link>
          <Link href="/team">Bridge team</Link>
        </div>
        <div className="grid gap-2 text-sm text-[#5a5f5f]">
          <p className="font-semibold text-[#1c1b18]">Get started</p>
          <Link href="/contact">Apply now</Link>
          <Link href="/login">Student login</Link>
          <Link href="/team">Bridge team</Link>
          <Link href="/#">Partner inquiry</Link>
        </div>
      </div>
    </footer>
  );
}
