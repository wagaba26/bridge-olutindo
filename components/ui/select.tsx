import * as React from "react";

import { cn } from "@/lib/utils";

function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      data-slot="select"
      className={cn(
        "border-input bg-background h-11 w-full rounded-xl border px-3 text-sm text-foreground shadow-xs outline-none transition focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export { Select };
