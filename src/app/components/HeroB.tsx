"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimate, useInView, useReducedMotion } from "motion/react";
import { contact } from "../content";
import { TechLogo } from "./TechLogo";

const ease = [0.16, 1, 0.3, 1] as const;
const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease },
});

const STRIP = [
  { label: "Frontend", logo: "React" },
  { label: "Mobile", logo: "Expo" },
  { label: "Backend", logo: "PostgreSQL" },
];

const ROLES = ["Frontend engineer", "Mobile developer", "Full-stack developer", "UI engineer"];

function RoleRoll() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % ROLES.length), 3200);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  return (
    <span ref={ref} className="relative block [perspective:900px]">
      <span data-focus="role" className="absolute inset-x-[15%] inset-y-0" />
      <span className="sr-only">Frontend engineer</span>
      <span aria-hidden className="relative block h-[1.1em] overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={ROLES[i]}
            initial={{ y: "100%", rotateX: -40, opacity: 0 }}
            animate={{ y: "0%", rotateX: 0, opacity: 1 }}
            exit={{ y: "-100%", rotateX: 40, opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
            className="block origin-center whitespace-nowrap will-change-transform [backface-visibility:hidden]"
          >
            {ROLES[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

const CORNERS = [
  "top-0 left-0 border-t-2 border-l-2",
  "top-0 right-0 border-t-2 border-r-2",
  "bottom-0 left-0 border-b-2 border-l-2",
  "right-0 bottom-0 border-r-2 border-b-2",
];

function Corners() {
  return CORNERS.map((c) => <span key={c} aria-hidden className={`absolute size-2.5 border-accent ${c}`} />);
}

const HANDLES = ["top-0 left-0", "top-0 left-full", "top-full left-0", "top-full left-full"];
const drag = [0.65, 0, 0.3, 1] as const;

function Brackets({ children }: { children: React.ReactNode }) {
  const [scope, animate] = useAnimate<HTMLSpanElement>();
  const reduce = useReducedMotion();
  const [size, setSize] = useState("");

  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    if (reduce) {
      void animate(".sel-bracket", { opacity: 1 }, { duration: 0 });
      return;
    }
    let off = false;
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const run = async () => {
      await wait(500);
      if (off) return;
      setSize(`${Math.round(el.offsetWidth)} × ${Math.round(el.offsetHeight)}`);
      await animate(".sel-cursor", { opacity: 1, left: "0%", top: "0%" }, { duration: 0.7, ease });
      if (off) return;
      await Promise.all([
        animate(".sel-cursor", { left: "100%", top: "100%" }, { duration: 0.6, ease: drag }),
        animate(".sel-box", { width: "100%", height: "100%", opacity: 1 }, { duration: 0.6, ease: drag }),
      ]);
      if (off) return;
      void animate(".sel-handle", { opacity: 1, scale: [0, 1] }, { duration: 0.22, ease });
      void animate(".sel-tag", { opacity: 1, y: 0 }, { duration: 0.25, ease });
      await wait(750);
      if (off) return;
      void animate(".sel-cursor", { left: "130%", top: "200%", opacity: 0 }, { duration: 0.5, ease });
      void animate(".sel-handle", { opacity: 0, scale: 0 }, { duration: 0.2 });
      void animate(".sel-tag", { opacity: 0 }, { duration: 0.2 });
      void animate(".sel-box", { opacity: 0 }, { duration: 0.4 });
      await animate(".sel-bracket", { opacity: 1, scale: [1.25, 1] }, { type: "spring", stiffness: 420, damping: 26 });
    };
    void run();
    return () => {
      off = true;
    };
  }, [animate, scope, reduce]);

  return (
    <span ref={scope} className="relative inline-block px-4 py-2 text-[15px] font-medium text-ink">
      <span className="sel-bracket absolute inset-0 opacity-0">
        <Corners />
      </span>
      <span aria-hidden className="sel-box absolute top-0 left-0 rounded-xs border border-accent bg-accent/10 opacity-0" style={{ width: 0, height: 0 }} />
      {HANDLES.map((h) => (
        <span key={h} aria-hidden className={`sel-handle absolute ${h} size-1.75 -translate-x-1/2 -translate-y-1/2 border border-accent bg-paper opacity-0`} />
      ))}
      <span aria-hidden className="sel-tag absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded-[3px] bg-accent px-1.5 py-0.5 font-mono text-[10px] leading-none whitespace-nowrap text-white opacity-0" style={{ transform: "translateY(4px)" }}>
        {size}
      </span>
      <span aria-hidden className="sel-cursor absolute z-10 opacity-0" style={{ left: "-60%", top: "-160%" }}>
        <svg viewBox="0 0 16 16" className="size-4.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
          <path d="M1.5 1.5 L1.5 13.5 L5 10.2 L7.4 15 L9.6 14 L7.3 9.4 L12 9.4 Z" fill="white" stroke="#0b0d12" strokeWidth="1" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="relative inline-block">{children}</span>
    </span>
  );
}

function ScrollBadge() {
  const reduce = useReducedMotion();
  const text = "scroll · see the work · scroll · see the work · ";
  return (
    <a href="#about" aria-label="Scroll to about" className="group relative hidden size-24 shrink-0 place-items-center rounded-full md:grid">
      <svg viewBox="0 0 100 100" className={`absolute inset-0 size-full text-ink-soft transition-colors group-hover:text-ink ${reduce ? "" : "animate-[spin_14s_linear_infinite]"}`}>
        <defs>
          <path id="ring" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
        </defs>
        <text className="fill-current font-mono text-[9.5px] tracking-[0.12em]">
          <textPath href="#ring">{text}</textPath>
        </text>
      </svg>
      <span className="grid size-9 place-items-center rounded-full border border-ink-soft/25 text-ink transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
    </a>
  );
}

export function HeroB() {
  const [copied, setCopied] = useState(false);

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
    <section id="top" className="relative flex flex-col justify-between px-6 pt-32 pb-16 max-md:[@media(max-height:720px)]:pt-14 md:min-h-svh md:pt-40 md:pb-10">
      <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
        <Brackets>Hi, I&rsquo;m Yash Saini</Brackets>
        <motion.h1 {...rise(0.06)} className="mt-6 font-display text-[clamp(2.2rem,7vw,4.5rem)] leading-[1.05] font-bold tracking-tight text-ink">
          <RoleRoll />
          <span className="block whitespace-nowrap text-accent max-sm:text-[6.6vw]">React · Next.js · React Native</span>
        </motion.h1>
        <motion.p {...rise(0.12)} className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">
          I build apps that look right, work right, and stay that way.
        </motion.p>

        <motion.div {...rise(0.18)} className="mt-9 flex items-center gap-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#work" className="group/cta relative mr-2 mb-2 inline-flex h-12">
              <span aria-hidden className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-md border-[1.5px] border-accent transform-gpu transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover/cta:translate-x-1.75 group-hover/cta:translate-y-1.75 group-active/cta:translate-x-0.5 group-active/cta:translate-y-0.5" />
              <span className="relative inline-flex items-center gap-4 rounded-md border border-white/20 bg-accent bg-linear-to-b from-white/12 to-transparent px-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.35),inset_0_-1px_0_rgb(0_0_0/0.15)] text-[15px] font-semibold text-white transform-gpu backface-hidden transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover/cta:-translate-x-px group-hover/cta:-translate-y-px group-active/cta:translate-x-1 group-active/cta:translate-y-1 group-active/cta:duration-100">
                View work
                <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"><path d="M7 17 17 7M8 7h9v9" /></svg>
              </span>
            </a>
            <button
              type="button"
              onClick={copy}
              aria-live="polite"
              className="group/mail glass-dock inline-flex h-12 cursor-pointer items-center gap-3 rounded-full pr-6 pl-1.5 text-[15px] font-semibold text-ink"
            >
              <span aria-hidden className={`relative grid size-9 place-items-center overflow-hidden rounded-full transition-colors duration-300 ${copied ? "bg-accent text-white" : "bg-ink/10 group-hover/mail:bg-ink/15"}`}>
                {copied ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                    <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.35, ease }} />
                  </svg>
                ) : (
                  <>
                    <span className="text-sm transition-opacity duration-300 ease-out group-hover/mail:opacity-0">@</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute size-4 opacity-0 transition-opacity duration-300 ease-out group-hover/mail:opacity-100">
                      <rect x="9" y="9" width="11" height="11" rx="2.5" />
                      <path d="M5 15V6.5A1.5 1.5 0 0 1 6.5 5H15" />
                    </svg>
                  </>
                )}
              </span>
              <span className="relative grid">
                <span className={`col-start-1 row-start-1 transition-opacity duration-300 ease-out ${copied ? "opacity-0" : "opacity-100"}`}>Copy email</span>
                <span className={`col-start-1 row-start-1 text-accent transition-opacity duration-300 ease-out ${copied ? "opacity-100" : "opacity-0"}`}>Copied</span>
              </span>
            </button>
          </div>
          <ScrollBadge />
        </motion.div>

        <motion.ul {...rise(0.24)} aria-label="Daily stack" className="mt-8 md:mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:gap-2">
          {["React", "Next.js", "React Native", "TypeScript", "Tailwind CSS"].map((t) => (
            <li key={t} data-focus={t === "React Native" ? "chip" : undefined} className="inline-flex items-center gap-2 rounded-full border border-ink-soft/20 px-3 py-1.5 text-[13px] font-medium text-ink-soft">
              <TechLogo name={t} brand className="size-3.5" />
              {t}
            </li>
          ))}
        </motion.ul>
      </div>

      <motion.div {...rise(0.3)} className="mx-auto mt-20 w-full max-w-6xl border-t border-ink-soft/15 pt-6">
        <ul className="flex items-center justify-between gap-2">
          {STRIP.map((s, i) => (
            <li key={s.label} className="group flex items-center gap-2 md:gap-5">
              {i > 0 && <span aria-hidden className="font-display text-lg font-light text-ink-soft/30 sm:text-3xl md:text-6xl">/</span>}
              <span className="bg-linear-to-b from-ink/70 to-ink/45 dark:to-ink/15 bg-clip-text font-display text-lg font-light tracking-tight text-transparent uppercase transition-[--tw-gradient-from] duration-300 group-hover:from-ink group-hover:to-ink/60 sm:text-3xl md:text-6xl">{s.label}</span>
              <span className="hidden size-8 place-items-center rounded-full border border-ink-soft/25 text-ink-soft transition-colors group-hover:text-ink sm:grid md:size-10">
                <TechLogo name={s.logo} className="size-4" />
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
