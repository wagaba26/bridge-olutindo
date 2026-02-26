"use client";

import type { Variants } from "framer-motion";
import { useReducedMotion } from "framer-motion";

export const fadeUp = (reduced: boolean): Variants => ({
  hidden: { opacity: 0, y: reduced ? 0 : 20 },
  show: { opacity: 1, y: 0, transition: { duration: reduced ? 0.01 : 0.5, ease: [0.22, 1, 0.36, 1] } },
});

export const staggerChildren = (reduced: boolean): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: reduced ? 0 : 0.08,
      delayChildren: reduced ? 0 : 0.05,
    },
  },
});

export const maskReveal = (reduced: boolean): Variants => ({
  hidden: { opacity: 0, clipPath: reduced ? "inset(0 0 0 0)" : "inset(0 0 100% 0)" },
  show: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: reduced ? 0.01 : 0.75, ease: [0.19, 1, 0.22, 1] },
  },
});

export const cardLift = (reduced: boolean) => ({
  whileHover: reduced
    ? {}
    : {
        y: -6,
        boxShadow: "var(--v2-shadow-lg)",
        transition: { duration: 0.25, ease: "easeOut" },
      },
});

export const pageTransition = (reduced: boolean): Variants => ({
  initial: { opacity: 0, y: reduced ? 0 : 12 },
  animate: { opacity: 1, y: 0, transition: { duration: reduced ? 0.01 : 0.4 } },
  exit: { opacity: 0, y: reduced ? 0 : -8, transition: { duration: reduced ? 0.01 : 0.25 } },
});

export function useV2ReducedMotion() {
  return !!useReducedMotion();
}
