"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import { skillGroups } from "../content";
import { hasLogo, TechLogo } from "./TechLogo";
import { SectionHeading } from "./SectionHeading";

const ease = [0.16, 1, 0.3, 1] as const;
const coupling = { type: "spring", stiffness: 210, damping: 26, mass: 0.9 } as const;

const snap = { type: "spring", stiffness: 520, damping: 18, mass: 0.6 } as const;

function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(mq.matches);
    requestAnimationFrame(update);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine;
}

type Wave = { origin: number; id: number } | null;

function Ripple({ index, wave, onTap, fine, reduce, glow, children }: { index: number; wave: Wave; onTap: () => void; fine: boolean; reduce: boolean; glow: MotionValue<number>; children: React.ReactNode }) {
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);

  useEffect(() => {
    if (!wave || reduce) return;
    const gap = index - wave.origin;
    const dist = Math.abs(gap);
    if (dist > 8) return;
    const delay = dist * 0.09;
    const falloff = Math.exp(-dist * 0.3);
    const spring = { type: "spring", stiffness: 70, damping: 7 + dist * 0.6, mass: 1.1 } as const;
    const runs = [
      animate(glow, [0, Math.max(0.35, 1 - dist * 0.09), 0], { duration: 1.1, delay, ease: [0.4, 0, 0.2, 1], times: [0, 0.3, 1] }),
      animate(y, 0, { ...spring, velocity: -60 * falloff, delay }),
      animate(rotate, 0, { ...spring, velocity: dist === 0 ? 0 : Math.sign(gap) * 14 * falloff, delay }),
    ];
    return () => runs.forEach((r) => r.stop());
  }, [wave, index, reduce, glow, y, rotate]);


  return (
    <motion.span
      onTap={onTap}
      className="relative inline-flex touch-manipulation"
      drag={fine && !reduce}
      dragSnapToOrigin
      dragConstraints={{ left: -14, right: 14, top: -10, bottom: 10 }}
      dragElastic={0.2}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 18 }}
      whileDrag={{ scale: 1.05, rotate: -3, zIndex: 10, cursor: "grabbing" }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={snap}
      style={{ y, rotate, cursor: fine && !reduce ? "grab" : undefined }}
    >
      {children}
    </motion.span>
  );
}

type Pointer = { x: MotionValue<number>; y: MotionValue<number> };

function Magnet({ pointer, enabled, children }: { pointer: Pointer; enabled: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const pull = (axis: "x" | "y") => ([px, py]: number[]) => {
    const el = ref.current;
    if (!enabled || !el || !Number.isFinite(px)) return 0;
    const box = el.getBoundingClientRect();
    const dx = px - (box.left + box.width / 2);
    const dy = py - (box.top + box.height / 2);
    const reach = 180;
    const d = Math.hypot(dx, dy);
    if (d > reach) return 0;
    const strength = (1 - d / reach) ** 2 * 0.14;
    return (axis === "x" ? dx : dy) * strength;
  };
  const rawX = useTransform([pointer.x, pointer.y], pull("x"));
  const rawY = useTransform([pointer.x, pointer.y], pull("y"));
  const x = useSpring(rawX, { stiffness: 160, damping: 17, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 160, damping: 17, mass: 0.6 });
  return (
    <motion.span ref={ref} style={{ x, y }} className="inline-flex">
      {children}
    </motion.span>
  );
}

function Chip({ skill, lifted, glow }: { skill: string; lifted: boolean; glow: MotionValue<number> }) {
  const lift = useMotionValue(lifted ? 20 : 10);
  useEffect(() => lift.set(lifted ? 20 : 10), [lifted, lift]);
  const boxShadow = useTransform(
    glow,
    (g) =>
      `inset 0 1px 0 color-mix(in oklab, white ${Math.round(g * 22)}%, transparent), 0 10px 28px -12px color-mix(in oklab, var(--color-accent) ${Math.round(g * 38)}%, transparent)`,
  );
  const borderColor = useTransform(
    [glow, lift],
    ([g, l]: number[]) => `color-mix(in oklab, var(--color-accent) ${Math.round(g * 45)}%, color-mix(in oklab, var(--color-ink) ${l}%, transparent))`,
  );
  return (
    <motion.span
      style={{ borderColor, boxShadow }}
      animate={{ y: lifted ? -2 : 0 }}
      transition={coupling}
      className={`inline-flex h-9 items-center gap-2 rounded-full border px-3.5 md:h-11 md:gap-2.5 md:rounded-xl md:px-3.5 transition-[background-color] duration-300 will-change-transform ${lifted ? "border-ink/20 bg-ink/4 shadow-[0_2px_8px_-2px_rgb(13_18_32/0.12)] dark:bg-ink/5 dark:shadow-none" : "border-ink/10 bg-ink/2 shadow-[0_1px_2px_rgb(13_18_32/0.05)] dark:bg-ink/3 dark:shadow-none"}`}
    >
      {hasLogo(skill) ? (
        <TechLogo name={skill} brand className="size-4 shrink-0 transition-transform md:size-4.5 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
      ) : (
        <span className="font-mono text-[11px] font-bold text-ink-soft">{skill.slice(0, 2)}</span>
      )}
      <span className="text-sm font-medium whitespace-nowrap text-ink md:text-[15px]">{skill}</span>
    </motion.span>
  );
}

function Item({ index, skill, wave, onTap, fine, reduce, pointer, lifted }: { index: number; skill: string; wave: Wave; onTap: () => void; fine: boolean; reduce: boolean; pointer: Pointer; lifted: boolean }) {
  const glow = useMotionValue(0);
  return (
    <Ripple index={index} wave={wave} onTap={onTap} fine={fine} reduce={reduce} glow={glow}>
      <Magnet pointer={pointer} enabled={fine && !reduce}>
        <Chip skill={skill} lifted={lifted} glow={glow} />
      </Magnet>
    </Ripple>
  );
}

function Row({ skills, pointer }: { skills: string[]; pointer: Pointer }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const [wave, setWave] = useState<Wave>(null);

  return (
    <ul className="flex flex-wrap gap-2.5" onPointerLeave={() => setHovered(null)}>
      {skills.map((skill, i) => (
        <motion.li
          key={skill}
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(i)}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
          className="group"
        >
          <Item index={i} skill={skill} wave={wave} onTap={() => setWave({ origin: i, id: Date.now() })} fine={fine} reduce={!!reduce} pointer={pointer} lifted={hovered === i} />
        </motion.li>
      ))}
    </ul>
  );
}

export function Skills() {
  const pointer = { x: useMotionValue(Number.POSITIVE_INFINITY), y: useMotionValue(Number.POSITIVE_INFINITY) };
  const away = () => {
    pointer.x.set(Number.POSITIVE_INFINITY);
    pointer.y.set(Number.POSITIVE_INFINITY);
  };

  return (
    <section id="skills" className="mx-auto w-[calc(100%-3rem)] max-w-276 border-b border-ink/10 py-16 dark:border-t md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="mb-12 md:mb-16"
      >
        <SectionHeading label="Skills" lead="What I" accent="work with" />
        <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-pretty text-ink-soft md:text-lg">
          The tools I reach for every day, and the ones I bring in when a project needs them.
        </p>
      </motion.div>

      <div
        className="flex flex-col gap-10 md:gap-10"
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          pointer.x.set(e.clientX);
          pointer.y.set(e.clientY);
        }}
        onPointerLeave={away}
      >
        {skillGroups.map((group, g) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: g * 0.04, ease }}
            className="grid gap-4"
          >
            <h3 className="text-[15px] font-medium text-ink-soft">{group.label}</h3>
            <Row skills={group.skills} pointer={pointer} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
