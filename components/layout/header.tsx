"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CircleUserRound } from "lucide-react";

import { MobileDrawer } from "@/components/site/mobile-drawer";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { MAIN_NAV_ITEMS } from "@/types/navigation";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const authEnabled =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authResolved, setAuthResolved] = useState(!authEnabled);

  useEffect(() => {
    if (!authEnabled) {
      return;
    }

    const supabase = createSupabaseBrowserClient();

    supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(Boolean(data.session));
      setAuthResolved(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session));
      setAuthResolved(true);
    });

    return () => subscription.unsubscribe();
  }, [authEnabled]);

  async function handleSignOut() {
    let supabase;
    try {
      supabase = createSupabaseBrowserClient();
    } catch {
      setIsAuthenticated(false);
      setAuthResolved(true);
      router.push("/");
      router.refresh();
      return;
    }

    await supabase.auth.signOut();
    setIsAuthenticated(false);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center gap-3 px-4 lg:h-[72px]">
        <div className="lg:hidden">
          <MobileDrawer isAuthenticated={isAuthenticated} authResolved={authResolved} onSignOut={handleSignOut} />
        </div>

        <Logo className="shrink-0" wordmarkClassName="hidden lg:inline-block" />

        <nav className="ml-8 hidden items-center gap-1 lg:flex">
          {MAIN_NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium transition",
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden h-11 rounded-xl px-4 lg:inline-flex">
            <Link href="/about">About</Link>
          </Button>
          <Button asChild variant="ghost" className="hidden h-11 rounded-xl px-4 lg:inline-flex">
            <Link href="/contact">Contact</Link>
          </Button>
          {!authResolved ? (
            <div className="h-11 w-28 rounded-xl bg-slate-100" />
          ) : isAuthenticated ? (
            <>
              <Button asChild className="h-11 rounded-xl bg-slate-900 px-4 text-sm text-white shadow-sm hover:bg-slate-800 lg:hidden">
                <Link href="/dashboard">My Account</Link>
              </Button>
              <Button asChild variant="ghost" className="hidden h-11 rounded-xl px-4 lg:inline-flex">
                <Link href="/dashboard" className="inline-flex items-center gap-2">
                  <CircleUserRound className="size-4" />
                  My Account
                </Link>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="hidden h-11 rounded-xl px-4 lg:inline-flex"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" className="hidden h-11 rounded-xl px-4 lg:inline-flex">
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild className="h-11 rounded-xl bg-slate-900 px-4 text-sm text-white shadow-sm hover:bg-slate-800">
                <Link href="/intake">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
