"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { MAIN_NAV_ITEMS, SECONDARY_NAV_ITEMS } from "@/types/navigation";

export function Header() {
    const pathname = usePathname();
    const [open, setOpen] = React.useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {/* Top Utility Bar */}
            <div className="hidden md:block bg-slate-900 text-white py-1 text-xs">
                <div className="container mx-auto px-4 flex justify-between items-center h-8">
                    <div className="flex gap-4">
                        {/* Slogan or simplified tagline */}
                        <span className="opacity-80">Connecting Uganda & Japan</span>
                    </div>
                    <div className="flex gap-6">
                        {SECONDARY_NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="hover:text-brand-orange transition-colors"
                            >
                                {item.title}
                            </Link>
                        ))}
                        {/* Language Switcher Placeholder */}
                        <button className="hover:text-brand-orange transition-colors">EN</button>
                    </div>
                </div>
            </div>

            {/* Main Navigation Bar */}
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Logo />

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {MAIN_NAV_ITEMS.map((item) => (
                                    <NavigationMenuItem key={item.title}>
                                        <Link href={item.href} legacyBehavior passHref>
                                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-base")}>
                                                {item.title}
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Mobile Menu Trigger */}
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[260px] sm:w-[320px] max-w-[80vw]">
                            <div className="flex flex-col gap-6 mt-8">
                                <Logo />
                                <nav className="flex flex-col gap-4">
                                    {MAIN_NAV_ITEMS.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                "text-lg font-medium hover:text-brand-red transition-colors",
                                                pathname === item.href && "text-brand-red"
                                            )}
                                            onClick={() => setOpen(false)}
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                    <hr className="my-2 border-border" />
                                    {SECONDARY_NAV_ITEMS.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                            onClick={() => setOpen(false)}
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                </nav>
                                <div className="flex flex-col gap-2 mt-auto">
                                    <Button asChild variant="outline" className="w-full justify-start gap-2">
                                        <Link href="/login"><User className="w-4 h-4" /> Log In</Link>
                                    </Button>
                                    <Button asChild className="w-full bg-brand-red hover:bg-brand-red/90 text-white">
                                        <Link href="/intake">Get Started</Link>
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>

                    <div className="hidden lg:flex items-center gap-2">
                        <Button asChild variant="ghost" className="gap-2">
                            <Link href="/login"><User className="w-4 h-4" /> Log In</Link>
                        </Button>
                        <Button asChild className="bg-brand-red hover:bg-brand-red/90 text-white rounded-full px-6">
                            <Link href="/intake">Get Started</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
