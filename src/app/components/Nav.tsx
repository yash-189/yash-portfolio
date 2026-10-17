"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { href: "#about", label: "About", wide: true },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills", wide: true },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const scrollingDown = latest > previous;
    setHidden(scrollingDown && latest > 160);
  });

  return (
    <motion.header
      animate={{ y: hidden ? -96 : 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 md:px-10"
    >
      <a
        href="#top"
        className="font-display text-lg font-semibold tracking-tight text-ink"
      >
        Y.S.
      </a>
      <nav className="flex items-center gap-4 rounded-full border-2 border-ink/10 bg-paper px-4 py-2 sm:gap-5 sm:px-5 md:gap-7">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`link-underline font-mono text-xs uppercase tracking-[0.1em] text-ink-soft transition-colors hover:text-ink sm:tracking-[0.15em] ${
              link.wide ? "hidden sm:inline" : ""
            }`}
          >
            {link.label}
          </a>
        ))}
        <span aria-hidden className="h-4 w-px bg-ink/15" />
        <ThemeToggle />
      </nav>
    </motion.header>
  );
}
