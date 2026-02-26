"use client";

import Link from "next/link";
import { Facebook, Instagram, MapPin, Youtube } from "lucide-react";

import { useSiteLanguage } from "@/components/site/language-provider";
import { Logo } from "@/components/ui/logo";

const FOOTER_COPY = {
  en: {
    description: "Practical Japanese learning, study planning, and readiness support across Uganda and Japan.",
    deskLineA: "Kampala Desk / Tokyo Desk",
    deskLineB: "Contact routing available through consultation and intake forms.",
    discover: "Discover",
    support: "Support",
    discoverLinks: [
      { label: "Learn Japanese", href: "/learn" },
      { label: "Study in Japan", href: "/study" },
      { label: "Partners", href: "/partners" },
      { label: "Resources", href: "/blog" },
    ],
    supportLinks: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQs", href: "/faq" },
    ],
    policyLinks: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
    rights: "Bridge Olutindo / KUMBA株式会社. All rights reserved.",
  },
  ja: {
    description: "日本語学習、留学計画、渡航準備をウガンダと日本の両拠点で実務的に支援します。",
    deskLineA: "カンパラデスク / 東京デスク",
    deskLineB: "相談フォームとインテークフォームから担当窓口へ接続します。",
    discover: "サービス",
    support: "サポート",
    discoverLinks: [
      { label: "日本語学習", href: "/learn" },
      { label: "日本留学", href: "/study" },
      { label: "パートナー連携", href: "/partners" },
      { label: "資料", href: "/blog" },
    ],
    supportLinks: [
      { label: "会社情報", href: "/about" },
      { label: "お問い合わせ", href: "/contact" },
      { label: "よくある質問", href: "/faq" },
    ],
    policyLinks: [
      { label: "プライバシーポリシー", href: "/privacy" },
      { label: "利用規約", href: "/terms" },
    ],
    rights: "Bridge Olutindo / KUMBA株式会社. 無断転載を禁じます。",
  },
} as const;

const socialLinks = [
  { label: "YouTube", href: "#", icon: Youtube },
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "Instagram", href: "#", icon: Instagram },
];

export function Footer() {
  const { locale } = useSiteLanguage();
  const copy = FOOTER_COPY[locale];

  return (
    <footer className="mt-20 border-t border-black bg-white text-black">
      <div className="border-b border-black">
        <div className="container mx-auto grid md:grid-cols-[1fr_1.1fr]">
          <div className="space-y-5 border-b border-black px-4 py-8 md:border-b-0 md:border-r md:px-8 md:py-10">
            <Logo className="gap-3" iconSize={28} wordmarkClassName="inline-block" />

            <p className="max-w-md text-sm leading-6 text-neutral-700">{copy.description}</p>

            <p className="text-sm leading-7 text-neutral-800">
              {copy.deskLineA}
              <br />
              {copy.deskLineB}
            </p>

            <div className="flex flex-wrap items-center gap-2.5">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="inline-flex h-10 w-10 items-center justify-center border border-black bg-white text-black hover:bg-black hover:text-white"
                    aria-label={item.label}
                  >
                    <Icon className="size-4.5" />
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-5 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-700">
              {copy.policyLinks.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-black">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-black px-4 py-8 text-white md:px-8 md:py-10">
            <div className="grid gap-7 md:grid-cols-2">
              <div>
                <h3 className="text-[1.1rem] font-semibold uppercase tracking-[0.08em]">{copy.discover}</h3>
                <ul className="mt-3 space-y-2.5 text-sm text-neutral-300">
                  {copy.discoverLinks.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="inline-flex items-center gap-2 hover:text-white">
                        <span>&gt;</span>
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-[1.1rem] font-semibold uppercase tracking-[0.08em]">{copy.support}</h3>
                <ul className="mt-3 space-y-2.5 text-sm text-neutral-300">
                  {copy.supportLinks.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="inline-flex items-center gap-2 hover:text-white">
                        <span>&gt;</span>
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col gap-3 px-4 py-4 text-xs text-neutral-700 md:flex-row md:items-center md:justify-between">
        <p>{copy.rights}</p>
        <p className="inline-flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            Kampala
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            Tokyo
          </span>
        </p>
      </div>
    </footer>
  );
}
