"use client";

import { type HTMLAttributes, type ReactNode } from "react";

interface FadeInProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  delay?: number;
}

export function FadeIn({ children, delay = 0, ...rest }: FadeInProps) {
  void delay;
  return <div {...rest}>{children}</div>;
}
