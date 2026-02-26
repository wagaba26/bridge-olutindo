import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-[var(--v2-radius-sm)] bg-[#e6e8ef]", className)} />;
}
