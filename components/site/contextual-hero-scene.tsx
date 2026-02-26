"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type HeroScene = {
  src: string;
  label: string;
  caption: string;
};

export function ContextualHeroScene({ scenes, className = "" }: { scenes: HeroScene[]; className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const allowMotion = useMemo(() => !prefersReducedMotion, [prefersReducedMotion]);

  useEffect(() => {
    if (!allowMotion || scenes.length <= 1) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saveData) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % scenes.length);
    }, 5800);
    return () => window.clearInterval(timer);
  }, [allowMotion, scenes.length]);

  return (
    <div className={`relative overflow-hidden border border-black bg-white ${className}`}>
      <div className="relative aspect-[16/10] p-4">
        {scenes.map((scene, index) => (
          <div
            key={scene.src}
            className={`absolute inset-4 border border-black p-3 transition-opacity duration-700 ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{scene.label}</p>
            <p className="mt-2 text-sm text-slate-700">{scene.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
