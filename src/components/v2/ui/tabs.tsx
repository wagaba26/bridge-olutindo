"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TabItem = { key: string; label: string; content: ReactNode };

export function Tabs({ items, defaultKey }: { items: TabItem[]; defaultKey?: string }) {
  const [active, setActive] = useState(defaultKey ?? items[0]?.key);
  const current = items.find((item) => item.key === active);

  return (
    <div className="v2-card-surface p-4">
      <div className="mb-4 flex flex-wrap gap-2 border-b border-[var(--v2-border)] pb-3">
        {items.map((item) => (
          <button
            key={item.key}
            className={cn(
              "rounded-[var(--v2-radius-sm)] px-3 py-2 text-sm transition-colors",
              active === item.key ? "bg-[var(--v2-accent)] text-white" : "text-[var(--v2-text-muted)] hover:bg-[var(--v2-surface)]"
            )}
            onClick={() => setActive(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div>{current?.content}</div>
    </div>
  );
}
