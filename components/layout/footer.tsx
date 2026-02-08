import Link from "next/link";
import { Facebook, Instagram, Linkedin, MapPin, Twitter } from "lucide-react";

import { Logo } from "@/components/ui/logo";

const discoverLinks = [
  { label: "Learn Japanese", href: "/learn" },
  { label: "Jobs in Japan", href: "/jobs" },
  { label: "Study & Exchange", href: "/study" },
  { label: "Partner Program", href: "/programs" },
  { label: "Resources", href: "/blog" },
];

const supportLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQs", href: "/faq" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="mt-20 bg-slate-950 text-slate-200">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo variant="light" />
            <p className="text-sm leading-6 text-slate-400">
              Learn, work, and study in Japan with one trusted team supporting you from Kampala to Tokyo.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <Link href="#" aria-label="Facebook" className="transition hover:text-white">
                <Facebook className="size-5" />
              </Link>
              <Link href="#" aria-label="Twitter" className="transition hover:text-white">
                <Twitter className="size-5" />
              </Link>
              <Link href="#" aria-label="Instagram" className="transition hover:text-white">
                <Instagram className="size-5" />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="transition hover:text-white">
                <Linkedin className="size-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Discover</h3>
            <ul className="space-y-2 text-sm">
              {discoverLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Support</h3>
            <ul className="space-y-2 text-sm">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Newsletter</h3>
            <p className="mb-3 text-sm text-slate-400">Get monthly updates on jobs, intakes, and scholarship windows.</p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="you@example.com"
                className="h-11 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 text-sm text-white outline-none transition focus-visible:border-slate-500"
              />
              <button
                type="submit"
                className="h-11 w-full rounded-xl bg-white text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-800 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} KUMBA Co., Ltd. All rights reserved.</p>
          <p className="inline-flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-4" /> Kampala
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-4" /> Tokyo
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
