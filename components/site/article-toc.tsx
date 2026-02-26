"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type TocItem = {
  id: string;
  heading: string;
};

export function ArticleToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const nodes = items.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0.15 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="space-y-1.5">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={cn(
            "block rounded-lg border px-3 py-2 text-sm transition",
            activeId === item.id
              ? "border-brand-600 bg-brand-700 text-white"
              : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
          )}
        >
          {item.heading}
        </a>
      ))}
    </nav>
  );
}

