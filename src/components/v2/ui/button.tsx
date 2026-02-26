import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--v2-radius-md)] px-4 py-2.5 text-sm font-medium transition-all",
        variant === "primary" && "bg-[var(--v2-accent)] text-white hover:bg-[var(--v2-accent-strong)]",
        variant === "secondary" && "bg-[var(--v2-accent-soft)] text-[var(--v2-accent-strong)] hover:bg-[#dce3f5]",
        variant === "ghost" && "border border-[var(--v2-border)] bg-transparent text-[var(--v2-text)] hover:bg-[var(--v2-surface)]",
        className
      )}
      {...props}
    />
  );
}
