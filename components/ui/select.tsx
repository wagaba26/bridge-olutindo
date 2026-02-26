import * as React from "react";

import { cn } from "@/lib/utils";

function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      data-slot="select"
      className={cn(
        "border-input bg-white/95 h-11 w-full rounded-xl border px-3.5 text-sm font-medium text-foreground shadow-[0_2px_10px_rgba(15,23,42,0.03)] outline-none transition focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export { Select };
