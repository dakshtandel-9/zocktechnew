"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
  as?: "div" | "li" | "p" | "span" | "article" | "header";
};

/** Fades + lifts content into place the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 28, amount = 0.2, as = "div" }: RevealProps) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.95, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}
