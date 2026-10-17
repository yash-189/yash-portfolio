"use client";

import { motion } from "motion/react";
import { capabilities } from "../content";

export function Capabilities() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-28">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14 font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl"
      >
        Skills
      </motion.h2>

      <ul className="grid gap-x-12 md:grid-cols-2">
        {capabilities.map((c) => (
          <li key={c.label} className="border-t-2 border-ink/10 py-7">
            <div>
              <h3 className="font-display text-xl font-semibold text-ink md:text-2xl">{c.label}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{c.detail}</p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-wide text-ink-soft">{c.tools.join(" · ")}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
