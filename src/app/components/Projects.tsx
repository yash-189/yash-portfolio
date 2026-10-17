"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { projects, type Project } from "../content";

const ease = [0.16, 1, 0.3, 1] as const;

function Arrow() {
  return (
    <svg
      aria-hidden
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
    >
      <path
        d="M3 9L9 3M4 3h5v5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Links({ project }: { project: Project }) {
  return (
    <>
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer"
          className="group/link inline-flex items-center gap-1.5 text-ink hover:text-accent-deep"
        >
          Live <Arrow />
        </a>
      )}
      <a
        href={project.github}
        target="_blank"
        rel="noreferrer"
        className="group/link inline-flex items-center gap-1.5 text-ink-soft hover:text-ink"
      >
        Code <Arrow />
      </a>
    </>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.08, ease }}
      className="group flex flex-col overflow-hidden rounded-[20px] border-2 border-ink/10 bg-paper transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_24px_48px_-28px_rgb(13_18_32/0.35)]"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`How ${project.name} is built`}
        className="relative block aspect-16/10 cursor-zoom-in overflow-hidden bg-paper-dim"
      >
        <motion.div
          layoutId={`${project.id}-image`}
          className="absolute inset-0"
        >
          <Image
            src={project.image}
            alt={`${project.name} screens`}
            fill
            sizes="(min-width: 768px) 560px, 100vw"
            priority={index < 2}
            className="object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
        </motion.div>
      </button>

      <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
        <h3 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
          {project.name}
        </h3>
        <p className="line-clamp-2 leading-relaxed text-ink-soft">
          {project.summary}
        </p>

        <ul className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-ink/10 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 border-t-2 border-ink/5 pt-4 font-mono text-xs uppercase tracking-[0.15em]">
          <Links project={project} />
          <button
            type="button"
            onClick={onOpen}
            className="group/link ml-auto inline-flex cursor-pointer items-center gap-2 text-ink-soft uppercase transition-colors hover:text-ink"
          >
            How it&apos;s built
            <span
              aria-hidden
              className="text-base leading-none transition-transform duration-300 group-hover/link:rotate-90"
            >
              +
            </span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectDetails({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Escape closes, the page behind doesn't scroll, and focus starts on the close button
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const previous = document.activeElement as HTMLElement | null;
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      previous?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-[rgb(8_11_18/0.6)] px-4 py-6 backdrop-blur-sm md:py-12"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${project.id}-title`}
        onClick={(e) => e.stopPropagation()}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border-2 border-ink/10 bg-paper"
      >
        <div className="relative aspect-16/10 bg-paper-dim">
          <motion.div
            layoutId={`${project.id}-image`}
            className="absolute inset-0"
          >
            <Image
              src={project.image}
              alt={`${project.name} screens`}
              fill
              sizes="(min-width: 896px) 896px, 100vw"
              className="object-contain"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease }}
          className="grid gap-10 p-6 md:grid-cols-[1fr_16rem] md:p-10"
        >
          <div className="flex flex-col gap-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-deep">
              {project.kind}
            </span>
            <h3
              id={`${project.id}-title`}
              className="-mt-2 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl"
            >
              {project.name}
            </h3>
            <p className="text-lg leading-relaxed text-ink-soft">
              {project.summary}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
                How it&apos;s built
              </h4>
              <ul className="space-y-2.5">
                {project.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[15px] leading-snug text-ink"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.6em] h-px w-3 shrink-0 bg-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <ul className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-ink/10 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <div className="flex gap-5 font-mono text-xs uppercase tracking-[0.15em]">
              <Links project={project} />
            </div>
          </div>
        </motion.div>

        {project.screens && (
          <div className="space-y-4 px-6 pb-6 md:px-10 md:pb-10">
            {project.screens.map((screen) => (
              <Image
                key={screen.src}
                src={screen.src}
                alt={screen.alt}
                width={1600}
                height={813}
                sizes="(min-width: 896px) 816px, 100vw"
                className="w-full rounded-2xl"
              />
            ))}
          </div>
        )}

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 grid size-10 cursor-pointer place-items-center rounded-full bg-paper/90 text-xl leading-none text-ink shadow-sm transition-transform hover:rotate-90"
        >
          ×
        </button>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);
  const close = useCallback(() => setOpenId(null), []);
  const openProject = projects.find((p) => p.id === openId);

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
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-deep">
            Built after hours
          </span>
          <h2 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Side projects
          </h2>
          <p className="max-w-xl text-lg text-ink-soft">
            Designed and built end to end, from layout and spacing to state and
            data.
          </p>
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
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            onOpen={() => setOpenId(project.id)}
          />
        ))}
      </div>

      <AnimatePresence>
        {openProject && (
          <ProjectDetails
            key={openProject.id}
            project={openProject}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
