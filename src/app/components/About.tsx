"use client";

import { motion } from "motion/react";
import { bio } from "../content";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-3xl px-6 py-28 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl"
      >
        Who&rsquo;s typing
      </motion.h2>
      <div className="space-y-6">
        {bio.paragraphs.map((paragraph, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg leading-relaxed text-ink-soft md:text-xl"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
