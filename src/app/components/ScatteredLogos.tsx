"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { TechLogo } from "./TechLogo";

const NAMES = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Figma",
  "Redux Toolkit",
  "React Query",
  "Expo",
  "Socket.IO",
  "shadcn/ui",
  "Firebase",
  "Zod",
  "GraphQL",
  "Vite",
  "Git",
  "Lighthouse",
  "Vercel",
  "PostgreSQL",
  "Redis",
  "React Router",
  "Radix UI",
  "HTML",
  "CSS",
  "GitHub",
];

const COUNT = 26;

const SCATTER = Array.from({ length: COUNT }, (_, i) => {
  const lane = [6, 92, 22, 78, 50, 3, 64, 36, 96, 14][i % 10];
  const jitter = ((i * 37) % 9) - 4;
  return {
    name: NAMES[(i * 7) % NAMES.length],
    top: 3 + (i / (COUNT - 1)) * 94,
    left: lane + jitter,
    size: [44, 28, 36, 24, 52, 30, 40, 26][i % 8],
    rotate: (((i * 53) % 70) - 35) | 0,
  };
});

function Logo({ logo }: { logo: (typeof SCATTER)[number] }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const depth = (logo.size - 20) * 6;
  const y = useTransform(scrollYProgress, [0, 1], [depth, -depth]);

  return (
    <motion.span
      className="absolute text-ink-soft/20"
      style={{
        top: `${logo.top}%`,
        left: `${logo.left}%`,
        width: logo.size,
        height: logo.size,
        y: reduce ? 0 : y,
        rotate: logo.rotate,
        x: "-50%",
        translateY: "-50%",
      }}
    >
      <TechLogo name={logo.name} className="size-full" />
    </motion.span>
  );
}

export function ScatteredLogos() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden md:block">
      {SCATTER.map((logo, i) => (
        <Logo key={i} logo={logo} />
      ))}
    </div>
  );
}
