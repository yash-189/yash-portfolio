"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { projects, type Project } from "../content";

const ease = [0.16, 1, 0.3, 1] as const;

function Arrow() {
  return (
    <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
      <path d="M3 9L9 3M4 3h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const detailsId = `${project.id}-details`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.08, ease }}
      className="group flex flex-col overflow-hidden rounded-[20px] border-2 border-ink/10 bg-paper transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_24px_48px_-28px_rgb(13_18_32/0.35)]"
    >
      <a
        href={project.live ?? project.github}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.name}`}
        className="relative block aspect-16/10 overflow-hidden bg-paper-dim"
      >
        <Image
          src={project.image}
          alt={`${project.name} screens`}
          fill
          sizes="(min-width: 768px) 560px, 100vw"
          priority={index < 2}
          className="object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
      </a>

      <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
        <h3 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">{project.name}</h3>
        <p className="line-clamp-2 leading-relaxed text-ink-soft">{project.summary}</p>

        <ul className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-ink/10 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft transition-colors duration-200 hover:border-accent hover:text-accent-deep"
            >
              {tech}
            </li>
          ))}
        </ul>

        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              id={detailsId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease }}
              className="space-y-2 overflow-hidden"
            >
              {project.highlights.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + i * 0.05, ease }}
                  className="flex gap-3 text-[15px] leading-snug text-ink"
                >
                  <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 border-t-2 border-ink/5 pt-4 font-mono text-xs uppercase tracking-[0.15em]">
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="group/link inline-flex items-center gap-1.5 text-ink hover:text-accent-deep">
              Live <Arrow />
            </a>
          )}
          <a href={project.github} target="_blank" rel="noreferrer" className="group/link inline-flex items-center gap-1.5 text-ink-soft hover:text-ink">
            Code <Arrow />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={detailsId}
            className="ml-auto inline-flex cursor-pointer items-center gap-2 text-ink-soft uppercase transition-colors hover:text-ink"
          >
            How it&apos;s built
            <motion.span aria-hidden animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25, ease }} className="text-base leading-none">
              +
            </motion.span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="mb-12 flex flex-wrap items-end justify-between gap-4"
      >
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-deep">Built after hours</span>
          <h2 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">Side projects</h2>
          <p className="max-w-xl text-lg text-ink-soft">Designed and built end to end, from layout and spacing to state and data.</p>
        </div>
        <a
          href="https://github.com/yash-189?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="group/link inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-ink-soft hover:text-ink"
        >
          More on GitHub <Arrow />
        </a>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
