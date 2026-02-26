import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  wordmarkClassName?: string;
  iconSize?: number;
}

export function Logo({
  className,
  variant = "dark",
  wordmarkClassName = "hidden sm:inline-block",
  iconSize = 32,
}: LogoProps) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2.5 transition-opacity hover:opacity-90", className)}>
      <Image
        src="/bridge-olutindo-logo.png"
        alt="Bridge Olutindo logo"
        width={iconSize}
        height={iconSize}
        className="shrink-0 border border-current object-contain"
        priority
      />
      <span
        className={cn(
          wordmarkClassName,
          "font-heading text-[1.3rem] font-bold leading-none tracking-[0.05em] md:text-[1.7rem]",
          variant === "light" ? "text-white" : "text-black"
        )}
      >
        Bridge Olutindo
      </span>
    </Link>
  );
}
