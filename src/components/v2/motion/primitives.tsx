"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, maskReveal, pageTransition, staggerChildren, useV2ReducedMotion } from "@/src/components/v2/motion/system";
import { cn } from "@/lib/utils";

export function MotionPage({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useV2ReducedMotion();
  return (
    <motion.main className={className} variants={pageTransition(reduced)} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.main>
  );
}

export function MotionStagger({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useV2ReducedMotion();
  return (
    <motion.div className={className} variants={staggerChildren(reduced)} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
      {children}
    </motion.div>
  );
}

export function MotionFadeItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useV2ReducedMotion();
  return (
    <motion.div className={className} variants={fadeUp(reduced)}>
      {children}
    </motion.div>
  );
}

export function MotionMaskTitle({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useV2ReducedMotion();
  return (
    <motion.div className={cn("overflow-hidden", className)} variants={maskReveal(reduced)} initial="hidden" animate="show">
      {children}
    </motion.div>
  );
}

export function SubtleParallax({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useV2ReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -28]);
  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

