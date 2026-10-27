"use client";

import { motion, useReducedMotion } from "motion/react";
import { TechLogo } from "./TechLogo";

export function MarginLogo({ name, className, delay = 0 }: { name: string; className: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      animate={reduce ? undefined : { y: [0, -10, 0], rotate: [-4, 4, -4] }}
      transition={{ duration: 9, delay, repeat: Infinity, ease: "easeInOut" }}
      className={`pointer-events-none absolute hidden text-ink-soft/40 min-[1360px]:block ${className}`}
    >
      <TechLogo name={name} className="size-8" />
    </motion.span>
  );
}
