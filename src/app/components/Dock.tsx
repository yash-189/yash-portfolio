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
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const icons: Record<string, ReactNode> = {
  top: <path {...stroke} d="M4 11.5 12 5l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1z" />,
  about: (
    <g {...stroke}>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </g>
  ),
  work: (
    <g {...stroke}>
      <rect x="3.5" y="7" width="17" height="12.5" rx="2" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3.5 12.5h17" />
    </g>
  ),
  skills: (
    <g {...stroke}>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
    </g>
  ),
  contact: (
    <g {...stroke}>
      <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z" />
    </g>
  ),
  email: (
    <g {...stroke}>
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
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
    </g>
  ),
  moon: <path {...stroke} d="M19.5 14.5A7.5 7.5 0 0 1 9.5 4.5a7.5 7.5 0 1 0 10 10z" />,
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
  onClick?: () => void;
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
  const scale = useSpring(useTransform(distance, [-70, 0, 70], [1, 1.22, 1]), {
    stiffness: 420,
    damping: 28,
    mass: 0.2,
  });

  const tone = lit ? "text-ink" : ctx.hovered === id ? "text-ink" : "text-ink-soft dark:text-ink/85";

  const inner = (
    <>
      <motion.svg
        viewBox="0 0 24 24"
        aria-hidden
        style={{ scale }}
        className={`relative z-10 size-5 md:size-4 transition-colors duration-200 ${tone} ${text ? "md:hidden" : ""}`}
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
      className={`relative h-10 shrink-0 md:h-8 ${text ? "w-10 md:w-auto md:px-3" : "w-10 md:w-8"} ${className}`}
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
          className="absolute inset-0 rounded-full bg-ink/6 ring-1 ring-ink/6 ring-inset dark:bg-ink/10 dark:ring-ink/15"
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

function Divider() {
  return <span aria-hidden className="mx-1 h-6 w-px shrink-0 self-center bg-ink/10" />;
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

  const ctx: DockCtx = {
    mouseX,
    lit: scrub ?? active,
    hovered: scrub ? null : hovered,
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
      className="glass-dock fixed top-5 left-6 z-50 hidden h-11 items-center rounded-full px-4 font-display text-base font-semibold tracking-tight text-ink backdrop-blur-sm backdrop-saturate-150 transition-colors hover:text-accent md:flex"
    >
      Y.S.
    </motion.a>
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-50 -translate-x-1/2 md:top-5 md:right-6 md:bottom-auto md:left-auto md:translate-x-0">
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
      className="glass-dock flex h-14 items-center backdrop-blur-sm backdrop-saturate-150 gap-1 rounded-full px-2 md:h-11 md:gap-0.5 md:px-1.5 select-none sm:gap-1.5"
    >
      <LayoutGroup>
        {SECTIONS.map((id) => (
          <DockItem key={id} id={id} ctx={ctx} label={LABELS[id]} text href={`#${id}`} current={active === id} onClick={() => goTo(id)}>
            {icons[id]}
          </DockItem>
        ))}
        <Divider />
        {github && (
          <DockItem id="github" ctx={ctx} label="GitHub" href={github.href} external>
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
