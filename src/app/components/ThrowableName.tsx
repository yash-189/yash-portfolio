"use client";

import { useRef, useState, type CSSProperties, type RefObject } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  useVelocity,
  useTransform,
} from "motion/react";
import { TechLogo } from "./TechLogo";

const WORDS = ["YASH", "SAINI"];

const LOGOS: { name: string; style: CSSProperties }[] = [
  { name: "React", style: { left: "-14%", top: "14%" } },
  { name: "Figma", style: { left: "-9%", top: "56%" } },
  { name: "TypeScript", style: { right: "-13%", top: "20%" } },
  { name: "Next.js", style: { right: "-8%", top: "60%" } },
  { name: "Tailwind CSS", style: { left: "46%", bottom: "-6%" } },
];

function NudgedLogo({
  name,
  style,
  words,
}: {
  name: string;
  style: CSSProperties;
  words: RefObject<(HTMLDivElement | null)[]>;
}) {
  const anchor = useRef<HTMLSpanElement>(null);
  const pushX = useMotionValue(0);
  const pushY = useMotionValue(0);
  const x = useSpring(pushX, { stiffness: 180, damping: 14 });
  const y = useSpring(pushY, { stiffness: 180, damping: 14 });
  const rotate = useTransform(x, (v) => v * 0.4);

  useAnimationFrame(() => {
    const home = anchor.current?.getBoundingClientRect();
    if (!home) return;
    const cx = home.left + home.width / 2;
    const cy = home.top + home.height / 2;
    const reach = home.width / 2 + 16;
    let dx = 0;
    let dy = 0;
    for (const word of words.current ?? []) {
      if (!word) continue;
      const r = word.getBoundingClientRect();
      const nearX = Math.max(r.left, Math.min(cx, r.right));
      const nearY = Math.max(r.top, Math.min(cy, r.bottom));
      let ax = cx - nearX;
      let ay = cy - nearY;
      let dist = Math.hypot(ax, ay);
      if (dist === 0) {
        ax = cx - (r.left + r.width / 2);
        ay = cy - (r.top + r.height / 2);
        dist = Math.hypot(ax, ay) || 1;
        dx += (ax / dist) * reach * 2;
        dy += (ay / dist) * reach * 2;
      } else if (dist < reach) {
        dx += (ax / dist) * (reach - dist) * 2;
        dy += (ay / dist) * (reach - dist) * 2;
      }
    }
    pushX.set(dx);
    pushY.set(dy);
  });

  return (
    <span ref={anchor} aria-hidden className="pointer-events-none absolute hidden size-7 md:block" style={style}>
      <motion.span style={{ x, y, rotate }} className="block text-ink-soft/70">
        <TechLogo name={name} className="size-7" />
      </motion.span>
    </span>
  );
}

export function ThrowableName() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [dragging, setDragging] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const velocityX = useVelocity(x);
  const velocityY = useVelocity(y);

  const stretch = useTransform([velocityX, velocityY], (values) => {
    const [vx, vy] = values as number[];
    return Math.min(Math.hypot(vx, vy) / 900, 0.35);
  });

  const scaleX = useTransform(stretch, (s) => 1 + s);
  const scaleY = useTransform(stretch, (s) => 1 - s * 0.6);
  const angle = useTransform(velocityX, (vx) => vx / 60);

  return (
    <div
      ref={containerRef}
      className="relative flex select-none flex-col items-center gap-1 py-6"
    >
      {WORDS.map((word, i) => (
        <motion.div
          key={word}
          ref={(el) => {
            wordRefs.current[i] = el;
          }}
          drag
          dragConstraints={containerRef}
          dragElastic={0.18}
          dragTransition={{ power: 0.35, timeConstant: 200, bounceStiffness: 420, bounceDamping: 14 }}
          onDragStart={() => setDragging(true)}
          onDragEnd={() => setDragging(false)}

          style={i === 0 ? { x, y, scaleX, scaleY, rotate: angle } : { scaleX, scaleY }}
          className="cursor-grab touch-none px-2 active:cursor-grabbing"
        >
          <span
            className={`block font-display text-[16vw] font-semibold leading-[0.82] tracking-tight sm:text-[13vw] md:text-[10vw] ${
              i === 0 ? "text-ink" : "text-accent"
            }`}
          >
            {word}
          </span>
        </motion.div>
      ))}
      {LOGOS.map((logo) => (
        <NudgedLogo key={logo.name} name={logo.name} style={logo.style} words={wordRefs} />
      ))}
      <p
        className={`mt-2 font-mono text-xs uppercase tracking-[0.25em] text-ink-soft transition-opacity duration-300 ${
          dragging ? "opacity-0" : "opacity-100"
        }`}
      >
        (yes, you can drag that)
      </p>
    </div>
  );
}
