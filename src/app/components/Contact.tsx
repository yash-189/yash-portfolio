"use client";

import { motion } from "motion/react";
import { CopyEmail } from "./CopyEmail";
import { RoleSweep } from "./RoleSweep";

const ease = [0.16, 1, 0.3, 1] as const;
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, delay, ease },
});

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 pt-16 pb-28 md:pt-24 md:pb-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.h2 {...reveal()} className="font-display text-[clamp(1.6rem,7vw,4rem)] leading-[1.08] font-bold tracking-[-0.03em] text-ink">
          Hiring a
          <RoleSweep />
        </motion.h2>
        <motion.p {...reveal(0.08)} className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
          I&rsquo;m open to frontend roles. Email is the quickest way to reach me.
        </motion.p>
        <motion.div {...reveal(0.14)} className="mt-8 flex flex-col items-center gap-6">
          <CopyEmail />
          <a
            href="https://github.com/yash-189"
            target="_blank"
            rel="noreferrer"
            className="bg-linear-to-r from-accent to-accent bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 text-[15px] font-medium text-ink-soft transition-[background-size,color] duration-300 hover:bg-[length:100%_1px] hover:text-ink"
          >
            Code and side projects on GitHub ↗
          </a>
        </motion.div>
      </div>

      <motion.p
        aria-hidden
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease }}
        className="pointer-events-none mt-20 bg-linear-to-b from-accent/35 to-accent/0 bg-clip-text text-center font-display text-[16.5vw] leading-[0.85] font-bold tracking-tighter whitespace-nowrap text-transparent select-none md:mt-24 md:text-[15vw]"
      >
        YASH SAINI
      </motion.p>

      <p className="mt-4 text-center text-sm text-ink-soft md:-mt-4">© {new Date().getFullYear()} Yash Saini</p>
    </section>
  );
}
