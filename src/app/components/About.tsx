"use client";

import { motion } from "motion/react";
import { bio } from "../content";
import { SectionHeading } from "./SectionHeading";

const ease = [0.16, 1, 0.3, 1] as const;

const rich = (text: string) =>
  text.split("**").map((part, j) =>
    j % 2 ? (
      <strong key={j} className="font-medium text-ink">
        {part}
      </strong>
    ) : (
      part
    ),
  );

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, delay, ease },
});

export function About() {
  const [lead, ...rest] = bio.paragraphs;

  return (
    <section id="about" className="mx-auto w-[calc(100%-3rem)] max-w-276 border-t border-ink/10 py-16 md:py-24">
      <motion.div {...reveal()}>
        <SectionHeading label="About" lead="Who’s" accent="typing" />
      </motion.div>
      <div className="max-w-208">
        <motion.p {...reveal(0.05)} className="mt-6 text-lg leading-relaxed text-pretty text-ink md:text-xl">
          {rich(lead)}
        </motion.p>

        <div className="mt-8 space-y-5">
          {rest.map((paragraph, i) => (
            <motion.p key={i} {...reveal((i + 1) * 0.05)} className="text-base leading-[1.7] text-ink-soft md:text-[17px]">
              {rich(paragraph)}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
