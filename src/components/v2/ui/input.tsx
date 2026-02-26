import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-[var(--v2-radius-md)] border border-[var(--v2-border)] bg-white px-3 text-sm text-[var(--v2-text)] placeholder:text-[var(--v2-text-muted)]",
        className
      )}
      {...props}
    />
  );
}
