"use client";

import { useRef } from "react";
import { useInView } from "motion/react";

export function SectionHeading({
  label,
  lead,
  accent,
  ghost,
  as: Tag = "h2",
  small = false,
  circled = false,
}: {
  label: string;
  lead: string;
  accent: string;
  ghost?: string;
  as?: "h2" | "h3";
  small?: boolean;
  circled?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} data-inview={inView || undefined} className={`sh relative ${circled ? "sh-circled" : ""}`}>
      <span aria-hidden className="sh-ghost">{ghost ?? label}</span>
      <span className="sh-label">{label}</span>
      <div className="sh-row">
        <Tag className={`sh-title font-display font-bold tracking-tight text-ink ${small ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl"}`}>
          {lead}{" "}
          <span className="sh-accent">
            {accent}
            <svg aria-hidden className="sh-under" viewBox="0 0 200 20" preserveAspectRatio="none">
              <path d="M3 14 C 50 4, 120 4, 197 11" />
            </svg>
            <svg aria-hidden className="sh-ring" viewBox="0 0 220 90" preserveAspectRatio="none">
              <path d="M30 18 C 90 2, 200 6, 212 42 C 220 80, 60 92, 14 64 C -6 44, 20 16, 84 10" />
            </svg>
          </span>
          <span className="sh-dot">.</span>
        </Tag>
        <span aria-hidden className="sh-line" />
      </div>
    </div>
  );
}
