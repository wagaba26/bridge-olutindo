"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useV2ReducedMotion } from "@/src/components/v2/motion/system";
import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children?: ReactNode }) {
  const reduced = useV2ReducedMotion();
  const hover = reduced ? undefined : { y: -6, boxShadow: "var(--v2-shadow-lg)" };
  return (
    <motion.div
      className={cn("v2-card-surface p-6", className)}
      whileHover={hover}
    >
      {children}
    </motion.div>
  );
}

