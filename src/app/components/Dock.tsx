"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  LayoutGroup,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { contact } from "../content";
import { useTheme } from "./ThemeToggle";

const SECTIONS = ["top", "about", "work", "skills", "contact"] as const;
type Section = (typeof SECTIONS)[number];

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const icons: Record<string, ReactNode> = {
  top: (
    <g {...stroke}>
      <path d="m9.02 2.84-5.39 4.2C2.73 7.74 2 9.23 2 10.36v7.41c0 2.32 1.89 4.22 4.21 4.22h11.58c2.32 0 4.21-1.9 4.21-4.21V10.5c0-1.21-.81-2.76-1.8-3.45l-6.18-4.33c-1.4-.98-3.65-.93-5 .12ZM12 17.99v-3" />
    </g>
  ),
  about: (
    <g {...stroke}>
      <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM20.59 22c0-3.87-3.85-7-8.59-7s-8.59 3.13-8.59 7" />
    </g>
  ),
  work: (
    <g {...stroke}>
      <path d="M8 22h8c4.02 0 4.74-1.61 4.95-3.57l.75-8C21.97 7.99 21.27 6 17 6H7c-4.27 0-4.97 1.99-4.7 4.43l.75 8C3.26 20.39 3.98 22 8 22ZM8 6v-.8C8 3.43 8 2 11.2 2h1.6C16 2 16 3.43 16 5.2V6" />
      <path d="M14 13v1.02c0 1.09-.01 1.98-2 1.98-1.98 0-2-.88-2-1.97V13c0-1 0-1 1-1h2c1 0 1 0 1 1ZM21.65 11A16.484 16.484 0 0 1 14 14.02M2.62 11.27c2.25 1.54 4.79 2.47 7.38 2.76" />
    </g>
  ),
  skills: (
    <g {...stroke}>
      <path d="M5 10h2c2 0 3-1 3-3V5c0-2-1-3-3-3H5C3 2 2 3 2 5v2c0 2 1 3 3 3ZM17 10h2c2 0 3-1 3-3V5c0-2-1-3-3-3h-2c-2 0-3 1-3 3v2c0 2 1 3 3 3ZM17 22h2c2 0 3-1 3-3v-2c0-2-1-3-3-3h-2c-2 0-3 1-3 3v2c0 2 1 3 3 3ZM5 22h2c2 0 3-1 3-3v-2c0-2-1-3-3-3H5c-2 0-3 1-3 3v2c0 2 1 3 3 3Z" />
    </g>
  ),
  contact: (
    <g fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z" />
    </g>
  ),
  email: (
    <g fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </g>
  ),
  github: (
    <path
      fill="currentColor"
      d="M12 2.5a9.5 9.5 0 0 0-3 18.52c.48.09.65-.2.65-.46v-1.65c-2.64.57-3.2-1.13-3.2-1.13-.43-1.1-1.06-1.4-1.06-1.4-.87-.59.06-.58.06-.58.96.07 1.46.99 1.46.99.85 1.46 2.23 1.04 2.78.8.08-.62.33-1.04.6-1.28-2.1-.24-4.32-1.06-4.32-4.7 0-1.04.37-1.89.98-2.55-.1-.24-.43-1.21.09-2.52 0 0 .8-.26 2.62.97a9.06 9.06 0 0 1 4.77 0c1.82-1.23 2.62-.97 2.62-.97.52 1.31.19 2.28.09 2.52.61.66.98 1.51.98 2.55 0 3.65-2.22 4.46-4.34 4.7.34.29.65.87.65 1.76v2.61c0 .26.17.56.66.46A9.5 9.5 0 0 0 12 2.5Z"
    />
  ),
  sun: (
    <g {...stroke}>
      <path d="M12 18.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z" />
      <path d="m19.14 19.14-.13-.13m0-14.02.13-.13-.13.13ZM4.86 19.14l.13-.13-.13.13ZM12 2.08V2v.08ZM12 22v-.08.08ZM2.08 12H2h.08ZM22 12h-.08.08ZM4.99 4.99l-.13-.13.13.13Z" />
    </g>
  ),
  moon: (
    <g {...stroke}>
      <path d="M2.03 12.42c.36 5.15 4.73 9.34 9.96 9.57 3.69.16 6.99-1.56 8.97-4.27.82-1.11.38-1.85-.99-1.6-.67.12-1.36.17-2.08.14C13 16.06 9 11.97 8.98 7.14c-.01-1.3.26-2.53.75-3.65.54-1.24-.11-1.83-1.36-1.3C4.41 3.86 1.7 7.85 2.03 12.42Z" />
    </g>
  ),
};

const LABELS: Record<Section, string> = {
  top: "Home",
  about: "About",
  work: "Work",
  skills: "Skills",
  contact: "Contact",
};

function currentSection(): Section {
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) return "contact";
  const line = window.innerHeight * 0.4;
  let found: Section = "top";
  for (const id of SECTIONS) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= line) found = id;
  }
  return found;
}

function useActiveSection() {
  const [active, setActive] = useState<Section>("top");
  const locked = useRef(false);
  const unlockTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!locked.current) setActive(currentSection());
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onScrollEnd = () => {
      if (!locked.current) return;
      locked.current = false;
      window.clearTimeout(unlockTimer.current);
      setActive(currentSection());
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", onScrollEnd);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", onScrollEnd);
      cancelAnimationFrame(frame);
      window.clearTimeout(unlockTimer.current);
    };
  }, []);

  const goTo = (id: Section) => {
    locked.current = true;
    setActive(id);
    window.clearTimeout(unlockTimer.current);
    unlockTimer.current = window.setTimeout(() => {
      locked.current = false;
      setActive(currentSection());
    }, 1500);
  };

  return [active, goTo] as const;
}

type DockCtx = {
  mouseX: MotionValue<number>;
  lit: string | null;
  hovered: string | null;
  tip: string | null;
  scrubbing: boolean;
  setHovered: (id: string | null) => void;
};

const spring = { type: "spring", stiffness: 480, damping: 36, mass: 0.6 } as const;

function DockItem({
  id,
  ctx,
  label,
  href,
  onClick,
  current,
  external,
  text = false,
  className = "",
  children,
}: {
  id: string;
  ctx: DockCtx;
  label: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  current?: boolean;
  external?: boolean;
  text?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const lit = ctx.lit === id;

  const distance = useTransform(ctx.mouseX, (x) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box || !Number.isFinite(x)) return 999;
    return x - box.x - box.width / 2;
  });
  const peak = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches ? 1.1 : 1.22;
  const scale = useSpring(useTransform(distance, [-70, 0, 70], [1, peak, 1]), {
    stiffness: 420,
    damping: 28,
    mass: 0.2,
  });

  const tone = lit ? "text-accent dark:text-ink" : ctx.hovered === id ? "text-ink" : "text-ink/75 md:text-ink-soft dark:text-ink/85";

  const inner = (
    <>
      <motion.svg
        viewBox="0 0 24 24"
        aria-hidden
        style={{ scale }}
        className={`relative z-10 size-4.5 md:size-4 transition-colors duration-200 ${tone} ${text ? "md:hidden" : ""}`}
      >
        {children}
      </motion.svg>
      {text && (
        <span aria-hidden className={`relative z-10 hidden text-[13px] font-medium transition-colors duration-200 md:inline ${tone}`}>
          {label}
        </span>
      )}
      <span className="sr-only">{label}</span>
    </>
  );

  const shared = "absolute inset-0 grid place-items-center rounded-full outline-offset-2";

  return (
    <motion.div
      ref={ref}
      data-dock={id}
      className={`relative h-full shrink-0 md:h-8 ${text ? "w-10.75 md:w-auto md:px-3" : "w-10.75 md:w-8"} ${className}`}
      onPointerEnter={(e) => e.pointerType === "mouse" && ctx.setHovered(id)}
    >
      {text && (
        <span aria-hidden className="invisible hidden h-full items-center text-[13px] font-medium md:flex">
          {label}
        </span>
      )}
      {lit && (
        <motion.span
          layoutId="dock-lit"
          transition={spring}
          className="absolute inset-0 rounded-full bg-accent/10 ring-1 ring-accent/20 ring-inset dark:bg-ink/12 dark:ring-ink/15 md:dark:bg-ink/10"
        />
      )}
      {!lit && ctx.hovered === id && (
        <motion.span layoutId="dock-hover" transition={spring} className="absolute inset-0 rounded-full bg-ink/8" />
      )}
      {ctx.tip === id && (!text || ctx.scrubbing) && (
        <motion.span
          layoutId="dock-tip"
          transition={spring}
          className="pointer-events-none absolute -top-11 left-1/2 z-20 md:top-auto md:-bottom-10 -translate-x-1/2 rounded-full bg-ink px-2.5 py-1 text-xs font-medium whitespace-nowrap text-paper shadow-md"
        >
          <motion.span key={label} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15 }} className="block">
            {label}
          </motion.span>
        </motion.span>
      )}
      {href ? (
        <a
          href={href}
          aria-label={label}
          aria-current={current ? "location" : undefined}
          onClick={onClick}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          draggable={false}
          className={shared}
        >
          {inner}
        </a>
      ) : (
        <button type="button" onClick={onClick} aria-label={label} className={`${shared} cursor-pointer`}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}

function Divider({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`mx-1 h-6 w-px shrink-0 self-center bg-ink/10 ${className}`} />;
}

export function Dock() {
  const mouseX = useMotionValue(Infinity);
  const [active, goTo] = useActiveSection();
  const { dark, toggle } = useTheme();
  const github = contact.socials.find((s) => s.label === "GitHub");
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrub, setScrub] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const scrubbing = useRef(false);
  const committed = useRef(false);

  const itemAt = (x: number) => {
    const nav = navRef.current;
    if (!nav) return null;
    const box = nav.getBoundingClientRect();
    const el = document.elementFromPoint(x, box.top + box.height / 2)?.closest<HTMLElement>("[data-dock]");
    return el && nav.contains(el) ? el.dataset.dock ?? null : null;
  };

  const scrubTo = (x: number) => {
    mouseX.set(x);
    const id = itemAt(x);
    if (id && id !== scrub) {
      setScrub(id);
      try {
        navigator.vibrate?.(6);
      } catch { }
    }
  };

  const endScrub = (commit: boolean) => {
    if (!scrubbing.current) return;
    scrubbing.current = false;
    const id = scrub;
    setScrub(null);
    mouseX.set(Infinity);
    if (commit && id) {
      committed.current = true;
      window.setTimeout(() => (committed.current = false), 500);
      navRef.current?.querySelector<HTMLElement>(`[data-dock="${id}"] a, [data-dock="${id}"] button`)?.click();
    }
  };

  const scrubSection = scrub && (SECTIONS as readonly string[]).includes(scrub) ? scrub : null;

  const ctx: DockCtx = {
    mouseX,
    lit: scrubSection ?? active,
    hovered: scrub ? (scrubSection ? null : scrub) : hovered,
    tip: scrub ?? hovered,
    scrubbing: scrub !== null,
    setHovered,
  };

  return (
    <>
    <motion.a
      href="#top"
      onClick={() => goTo("top")}
      aria-label="Yash Saini, back to top"
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className="glass-dock fixed top-5 left-6 z-50 hidden h-11 items-center rounded-full px-4 font-display text-base font-semibold tracking-tight text-ink backdrop-blur-[20px] backdrop-saturate-[1.8] transition-colors hover:text-accent md:flex"
    >
      Y.S.
    </motion.a>
    <div className="fixed bottom-[max(1.25rem,calc(env(safe-area-inset-bottom)+0.5rem))] left-1/2 z-50 -translate-x-1/2 md:top-5 md:right-6 md:bottom-auto md:left-auto md:translate-x-0">
    <motion.nav
      ref={navRef}
      aria-label="Primary"
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1, scale: scrub ? 1.04 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => {
        mouseX.set(Infinity);
        setHovered(null);
      }}
      onPointerDown={(e) => {
        if (e.pointerType === "mouse") return;
        e.currentTarget.setPointerCapture(e.pointerId);
        scrubbing.current = true;
        scrubTo(e.clientX);
      }}
      onPointerMove={(e) => scrubbing.current && scrubTo(e.clientX)}
      onPointerUp={(e) => e.pointerType !== "mouse" && endScrub(true)}
      onPointerCancel={() => endScrub(false)}
      onClickCapture={(e) => {
        if (e.isTrusted && committed.current) {
          committed.current = false;
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        if (e.target === e.currentTarget) e.preventDefault();
      }}
      style={{ touchAction: "none" }}
      className="glass-dock flex h-13 items-center gap-0 rounded-full p-1 backdrop-blur-[20px] backdrop-saturate-[1.8] select-none md:h-11 md:gap-0.5 md:px-1.5 md:py-0"
    >
      <LayoutGroup>
        {SECTIONS.map((id) => (
          <DockItem key={id} id={id} ctx={ctx} label={LABELS[id]} text href={`#${id}`} current={active === id} onClick={() => goTo(id)}>
            {icons[id]}
          </DockItem>
        ))}
        <Divider className="max-sm:hidden" />
        {github && (
          <DockItem id="github" ctx={ctx} label="GitHub" href={github.href} external className="max-sm:hidden">
            {icons.github}
          </DockItem>
        )}
        <DockItem id="email" ctx={ctx} label="Email" href={`mailto:${contact.email}`} className="max-sm:hidden">
          {icons.email}
        </DockItem>
        <Divider />
        <DockItem id="theme" ctx={ctx} label={dark ? "Light theme" : "Dark theme"} onClick={toggle}>
          {dark ? icons.sun : icons.moon}
        </DockItem>
      </LayoutGroup>
    </motion.nav>
    </div>
    </>
  );
}
