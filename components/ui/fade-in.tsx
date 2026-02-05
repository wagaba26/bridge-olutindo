"use client";

import { ReactNode } from "react";
import { motion, MotionProps } from "framer-motion";

interface FadeInProps extends MotionProps {
  children: ReactNode;
  delay?: number;
}

export function FadeIn({ children, delay = 0, ...rest }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

