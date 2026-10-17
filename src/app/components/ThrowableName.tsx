"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useVelocity, useTransform } from "motion/react";

const WORDS = ["YASH", "SAINI"];

export function ThrowableName() {
  const containerRef = useRef<HTMLDivElement>(null);
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
