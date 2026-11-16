"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { skillGroups } from "../content";
import { hasLogo, TechLogo } from "./TechLogo";
import { SectionHeading } from "./SectionHeading";

const ease = [0.16, 1, 0.3, 1] as const;
const coupling = { type: "spring", stiffness: 210, damping: 26, mass: 0.9 } as const;

const pushFor = (index: number, hovered: number | null) => {
  if (hovered === null || index === hovered) return 0;
  const gap = Math.abs(index - hovered);
  const force = Math.max(0, 8 - (gap - 1) * 3);
  return index > hovered ? force : -force * 0.5;
};

function Row({ skills }: { skills: string[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <ul className="flex flex-wrap gap-2.5" onPointerLeave={() => setHovered(null)}>
      {skills.map((skill, i) => (
        <motion.li
          key={skill}
          onPointerEnter={() => setHovered(i)}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
          className="group"
        >
          <motion.span
            animate={{
              x: reduce ? 0 : pushFor(i, hovered),
              y: hovered === i ? -2 : 0,
            }}
            transition={coupling}
            className={`inline-flex h-11 items-center gap-2.5 rounded-xl border px-3.5 transition-[border-color,background-color] duration-300 will-change-transform ${hovered === i ? "border-ink/20 bg-ink/8 dark:bg-black/35" : "border-ink/10 bg-ink/5 dark:bg-black/20"
              }`}
          >
            {hasLogo(skill) ? (
              <TechLogo name={skill} brand className="size-4.5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
            ) : (
              <span className="font-mono text-[11px] font-bold text-ink-soft">{skill.slice(0, 2)}</span>
            )}
            <span className="text-[15px] font-medium whitespace-nowrap text-ink">{skill}</span>
          </motion.span>
        </motion.li>
      ))}
    </ul>
  );
}

export function Skills() {
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
        <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-pretty text-ink-soft md:text-lg">
          The tools I reach for every day, and the ones I bring in when a project needs them.
        </p>
      </motion.div>

      <div className="flex flex-col gap-10 md:gap-10">
        {skillGroups.map((group, g) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: g * 0.04, ease }}
            className="grid gap-4"
          >
            <h3 className="text-[13px] font-semibold tracking-[0.08em] text-ink-soft uppercase">{group.label}</h3>
            <Row skills={group.skills} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
