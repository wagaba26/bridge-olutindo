import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string; // Additional classes
    variant?: "light" | "dark"; // For potentially different backgrounds
}

export function Logo({ className, variant = "dark" }: LogoProps) {
    return (
        <Link href="/" className={cn("flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-90 transition-opacity", className)}>
            <Image
                src="/bridge-olutindo-logo.png"
                alt="Bridge Olutindo logo"
                width={36}
                height={36}
                className="object-contain"
                priority
            />
            <span className={cn("hidden sm:inline-block", variant === "light" ? "text-white" : "text-foreground")}>
                Bridge<span className="text-brand-red">Olutindo</span>
            </span>
        </Link>
    );
}
