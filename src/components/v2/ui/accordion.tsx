"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionItem = { title: string; body: string };

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.title} className="v2-card-surface overflow-hidden">
            <button
              className="flex w-full items-center justify-between px-5 py-4 text-left"
              onClick={() => setOpen(expanded ? null : index)}
            >
              <span className="font-medium">{item.title}</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} />
            </button>
            {expanded ? <div className="border-t border-[var(--v2-border)] px-5 py-4 text-sm text-[var(--v2-text-muted)]">{item.body}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
