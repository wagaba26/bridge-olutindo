"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function HeroParallaxOverlay() {
  const { scrollYProgress } = useScroll();
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -28]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -52]);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saveData) return;

    const onMove = (event: MouseEvent) => {
      if (!mq.matches) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 14;
      const y = (event.clientY / window.innerHeight - 0.5) * 10;
      setPointer({ x, y });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <motion.div className="pointer-events-none absolute -right-8 top-8 hidden h-28 w-28 rounded-full bg-cyan-300/20 blur-2xl lg:block" style={{ y: yFast, x: pointer.x * -0.35 }} />
      <motion.div className="pointer-events-none absolute -left-8 bottom-8 hidden h-24 w-24 rounded-full bg-blue-300/20 blur-2xl lg:block" style={{ y: ySlow, x: pointer.x * 0.25 }} />
    </>
  );
}
