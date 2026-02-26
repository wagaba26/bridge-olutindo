"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CircleUserRound } from "lucide-react";

import { Logo } from "@/components/ui/logo";
import { LanguageToggle } from "@/components/site/language-toggle";
import { useSiteLanguage } from "@/components/site/language-provider";
import { MobileDrawer } from "@/components/site/mobile-drawer";
import { Button } from "@/components/ui/button";
import { tNav } from "@/lib/i18n";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { MAIN_NAV_ITEMS } from "@/types/navigation";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale } = useSiteLanguage();
  const authEnabled =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authResolved, setAuthResolved] = useState(!authEnabled);

  useEffect(() => {
    if (!authEnabled) return;
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
    <header className="sticky top-0 z-50 border-b border-slate-300 bg-white">
      <div className="container mx-auto">
        <div className="relative flex h-14 items-center justify-between border-b border-slate-300 py-2 md:h-[74px] md:py-3">
          <div className="md:hidden">
            <Logo
              className="shrink-0 gap-2"
              iconSize={30}
              wordmarkClassName="inline-block whitespace-nowrap"
            />
          </div>

          <div className="hidden items-center md:flex">
            <LanguageToggle />
          </div>

          <div className="absolute left-1/2 hidden -translate-x-1/2 md:block">
            <Logo
              className="shrink-0 gap-2.5"
              iconSize={36}
              wordmarkClassName="inline-block whitespace-nowrap"
            />
          </div>

          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="md:hidden">
              <LanguageToggle compact />
            </div>
            <div className="hidden md:flex">
              <Button asChild variant="ghost" size="icon" className="h-10 w-10 border border-slate-300 text-black hover:bg-slate-100 hover:text-black">
                <Link href={isAuthenticated ? "/dashboard" : "/login"} aria-label={isAuthenticated ? "Open account dashboard" : "Open login"}>
                  <CircleUserRound className="size-5" />
                </Link>
              </Button>
            </div>
            <div className="md:hidden">
              <MobileDrawer
                isAuthenticated={isAuthenticated}
                authResolved={authResolved}
                onSignOut={handleSignOut}
                triggerClassName="h-9 w-9 border border-transparent hover:bg-slate-200"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="container mx-auto flex items-center justify-center gap-4 py-3 text-[0.85rem] font-semibold uppercase tracking-[0.24em] text-black">
          {MAIN_NAV_ITEMS.map((item, index) => {
            const active = pathname === item.href;
            return (
              <div key={item.href} className="inline-flex items-center gap-3">
                {index > 0 ? <span className="text-black">/</span> : null}
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
                    active ? "text-black underline decoration-1 underline-offset-4" : "hover:underline hover:decoration-1 hover:underline-offset-4"
                  )}
                >
                  {tNav(item.title, locale)}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}
