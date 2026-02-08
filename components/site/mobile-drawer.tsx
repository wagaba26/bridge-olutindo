"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleUserRound, Menu, User } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { MAIN_NAV_ITEMS, SECONDARY_NAV_ITEMS } from "@/types/navigation";

export function MobileDrawer({
  isAuthenticated,
  authResolved,
  onSignOut,
}: {
  isAuthenticated: boolean;
  authResolved: boolean;
  onSignOut: () => Promise<void>;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-11 w-11 rounded-xl border border-border/70"
          aria-label="Open navigation menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[88vw] max-w-[360px] border-r p-0">
        <SheetHeader className="border-b p-6">
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <SheetDescription className="sr-only">
            Main and secondary links for Bridge Olutindo.
          </SheetDescription>
          <Logo />
        </SheetHeader>

        <div className="flex h-full flex-col overflow-y-auto px-6 pb-8 pt-4">
          <nav className="space-y-1">
            {MAIN_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950",
                  pathname === item.href && "bg-slate-900 text-white hover:bg-slate-800 hover:text-white"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="mt-6 border-t pt-6">
            <p className="mb-2 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">More</p>
            <div className="space-y-1">
              {SECONDARY_NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-2.5 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-auto space-y-2 border-t pt-6">
            {!authResolved ? (
              <Button type="button" variant="ghost" className="h-11 w-full justify-center rounded-xl" disabled>
                Loading account...
              </Button>
            ) : isAuthenticated ? (
              <>
                <Button asChild variant="outline" className="h-11 w-full justify-center rounded-xl">
                  <Link href="/dashboard" onClick={() => setOpen(false)}>
                    <CircleUserRound className="size-4" />
                    My Account
                  </Link>
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="h-11 w-full justify-center rounded-xl"
                  onClick={async () => {
                    await onSignOut();
                    setOpen(false);
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" className="h-11 w-full justify-center rounded-xl">
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <User className="size-4" />
                    Log In
                  </Link>
                </Button>
                <Button asChild className="h-11 w-full rounded-xl bg-primary hover:bg-primary/90">
                  <Link href="/intake" onClick={() => setOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
