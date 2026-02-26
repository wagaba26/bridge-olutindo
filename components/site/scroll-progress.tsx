"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 22,
    mass: 0.18,
  });

  return <motion.div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-brand-500/80" style={{ scaleX }} />;
}

