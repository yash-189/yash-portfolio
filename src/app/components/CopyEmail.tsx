"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { contact } from "../content";

const spring = { type: "spring", stiffness: 420, damping: 22 } as const;

export function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const [hover, setHover] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
    } catch {
      window.location.href = `mailto:${contact.email}`;
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <motion.button
      type="button"
      onClick={copy}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      whileTap={{ scale: 0.98 }}
      aria-label={`Copy ${contact.email}`}
      className="group relative cursor-pointer rounded-2xl px-2 py-3 font-display text-[clamp(1.4rem,5.4vw,3.25rem)] font-semibold tracking-tight text-ink focus-visible:outline-2 focus-visible:outline-accent"
    >
      <span className={`flex transition-opacity duration-200 ${copied ? "opacity-0" : ""}`} aria-hidden>
        {contact.email.split("").map((ch, i) => (
          <motion.span
            key={i}
            animate={{ y: hover && !copied ? -4 : 0, color: hover && !copied ? "var(--accent)" : "var(--ink)" }}
            transition={{ ...spring, delay: hover ? i * 0.012 : 0 }}
            className="inline-block"
          >
            {ch}
          </motion.span>
        ))}
      </span>

      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={spring}
            className="absolute inset-0 flex items-center justify-center gap-3 text-accent"
            aria-live="polite"
          >
            <svg viewBox="0 0 24 24" className="size-[0.9em]" fill="none" aria-hidden>
              <motion.path
                d="M4 12.5l5 5L20 6.5"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.35, delay: 0.08, ease: "easeOut" }}
              />
            </svg>
            Copied
          </motion.span>
        )}
      </AnimatePresence>

      <span className="mt-1 block text-sm font-normal tracking-normal text-ink-soft">
        {copied ? (
          "Paste it anywhere"
        ) : (
          <>
            <span className="pointer-coarse:hidden">Click to copy</span>
            <span className="hidden pointer-coarse:inline">Tap to copy</span>
          </>
        )}
      </span>
    </motion.button>
  );
}
