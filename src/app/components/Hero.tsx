"use client";

import { motion } from "motion/react";
import { bio, contact } from "../content";
import { ThrowableName } from "./ThrowableName";

export function Hero() {
  return (
    <section id="top" className="relative flex flex-col items-center px-6 pb-16 pt-32 text-center md:pt-40">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft sm:text-xs sm:tracking-[0.3em]"
      >
        {bio.role} · {bio.location}
      </motion.p>

      <ThrowableName />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 max-w-xl text-balance font-display text-2xl font-medium text-ink-soft md:text-3xl"
      >
        {bio.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 flex flex-col items-center gap-6"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
          {bio.stack.join(" · ")}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="#work"
            className="btn-fill inline-flex items-center rounded-full bg-accent px-7 py-3.5 font-mono text-sm uppercase text-white"
          >
            <span className="tracking-[0.15em]">See projects</span>
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center rounded-full border-2 border-ink/15 px-7 py-3.5 font-mono text-sm uppercase tracking-[0.15em] text-ink transition-colors hover:border-ink"
          >
            Email me
          </a>
        </div>
      </motion.div>
    </section>
  );
}
