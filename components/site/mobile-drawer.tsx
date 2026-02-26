"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleUserRound, Menu, User, X } from "lucide-react";
import { useState } from "react";

import { LanguageToggle } from "@/components/site/language-toggle";
import { useSiteLanguage } from "@/components/site/language-provider";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ENGAGEMENT_SIGNAL_KEYS, markEngagementSignal, trackEvent } from "@/lib/journey-analytics";
import { tNav } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { MAIN_NAV_ITEMS } from "@/types/navigation";

export function MobileDrawer({
  isAuthenticated,
  authResolved,
  onSignOut,
  triggerClassName,
}: {
  isAuthenticated: boolean;
  authResolved: boolean;
  onSignOut: () => Promise<void>;
  triggerClassName?: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { locale } = useSiteLanguage();
  const copy =
    locale === "ja"
      ? {
          menu: "\u30e1\u30cb\u30e5\u30fc",
          navigation: "\u30ca\u30d3\u30b2\u30fc\u30b7\u30e7\u30f3",
          help: "\u30b5\u30dd\u30fc\u30c8",
          resources: "\u8cc7\u6599",
          contact: "\u304a\u554f\u3044\u5408\u308f\u305b",
          account: "\u30a2\u30ab\u30a6\u30f3\u30c8",
          loading: "\u8aad\u307f\u8fbc\u307f\u4e2d...",
          myAccount: "\u30de\u30a4\u30a2\u30ab\u30a6\u30f3\u30c8",
          signOut: "\u30ed\u30b0\u30a2\u30a6\u30c8",
          logIn: "\u30ed\u30b0\u30a4\u30f3",
          getStarted: "\u306f\u3058\u3081\u308b",
          close: "\u9589\u3058\u308b",
        }
      : {
          menu: "Menu",
          navigation: "Navigation",
          help: "Support",
          resources: "Resources",
          contact: "Contact",
          account: "Account",
          loading: "Loading account...",
          myAccount: "My Account",
          signOut: "Sign Out",
          logIn: "Log In",
          getStarted: "Get Started",
          close: "Close",
        };

  function handleSheetOpenChange(next: boolean) {
    setOpen(next);
    if (!next) return;
    trackEvent("mobile_menu_opened", { locale });
  }

  function handleMenuNavigate(target: string) {
    trackEvent("mobile_menu_navigation_click", { target, locale });
    setOpen(false);
  }

  function handlePrimaryIntentFromMenu(target: string) {
    markEngagementSignal(ENGAGEMENT_SIGNAL_KEYS.primaryIntentAt);
    trackEvent("primary_intent_click", { page: "mobile-menu", target, locale });
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-11 w-11 rounded-xl border border-border/70", triggerClassName)}
          aria-label="Open navigation menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" showCloseButton={false} className="w-[90vw] max-w-[370px] border-r border-slate-300 p-0">
        <SheetHeader className="border-b border-slate-300 px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">{copy.menu}</p>
              <Logo />
            </div>
            <SheetClose asChild>
              <Button type="button" variant="outline" className="h-11 w-11 border-slate-300 p-0" aria-label={copy.close}>
                <X className="size-5" />
              </Button>
            </SheetClose>
          </div>
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <SheetDescription className="sr-only">Main and secondary links for Bridge Olutindo.</SheetDescription>
        </SheetHeader>

        <div className="flex h-full flex-col overflow-y-auto px-5 pb-6 pt-4">
          <div className="mb-5 flex justify-end">
            <LanguageToggle compact />
          </div>

          <div>
            <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">{copy.navigation}</p>
            <nav className="space-y-1 border border-slate-300 p-2">
              {MAIN_NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => handleMenuNavigate(item.href)}
                  className={cn(
                    "block px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950",
                    pathname === item.href && "bg-slate-900 text-white hover:bg-slate-800 hover:text-white"
                  )}
                >
                  {tNav(item.title, locale)}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">{copy.help}</p>
            <div className="grid gap-1 border border-slate-300 p-2">
              <Link
                href="/blog"
                onClick={() => handleMenuNavigate("/blog")}
                className="block px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-950"
              >
                {copy.resources}
              </Link>
              <Link
                href="/contact"
                onClick={() => handleMenuNavigate("/contact")}
                className="block px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-950"
              >
                {copy.contact}
              </Link>
            </div>
          </div>

          <div className="mt-auto border-t border-slate-300 pt-5">
            <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">{copy.account}</p>
            {!authResolved ? (
              <Button type="button" variant="ghost" className="h-11 w-full justify-center rounded-none" disabled>
                {copy.loading}
              </Button>
            ) : isAuthenticated ? (
              <div className="grid gap-2">
                <Button asChild variant="outline" className="h-11 w-full justify-center rounded-none border-slate-300">
                  <Link href="/dashboard" onClick={() => handleMenuNavigate("/dashboard")}>
                    <CircleUserRound className="size-4" />
                    {copy.myAccount}
                  </Link>
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="h-11 w-full justify-center rounded-none"
                  onClick={async () => {
                    await onSignOut();
                    setOpen(false);
                  }}
                >
                  {copy.signOut}
                </Button>
              </div>
            ) : (
              <div className="grid gap-2">
                <Button asChild variant="outline" className="h-11 w-full justify-center rounded-none border-slate-300">
                  <Link href="/login" onClick={() => handleMenuNavigate("/login")}>
                    <User className="size-4" />
                    {copy.logIn}
                  </Link>
                </Button>
                <Button asChild className="h-11 w-full rounded-none bg-primary hover:bg-primary/90">
                  <Link href="/intake" onClick={() => handlePrimaryIntentFromMenu("intake-secondary")}>
                    {copy.getStarted}
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
