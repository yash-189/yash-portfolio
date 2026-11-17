"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { projects, stories, type Project } from "../content";
import { TechLogo } from "./TechLogo";
import { CompanyWork } from "./CompanyWork";
import { SectionHeading } from "./SectionHeading";

const ease = [0.16, 1, 0.3, 1] as const;

function Arrow() {
  return (
    <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M3 9L9 3M4 3h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExternalLinks({ project }: { project: Project }) {
  return (
    <>
      {project.live && (
        <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-ink-soft hover:text-ink">
          Live <Arrow />
        </a>
      )}
      <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-ink-soft hover:text-ink">
        Code <Arrow />
      </a>
    </>
  );
}

function Stack({ items, max = 3, pill = false }: { items: string[]; max?: number; pill?: boolean }) {
  return (
    <ul aria-label="Built with" className={`flex flex-wrap text-ink-soft ${pill ? "gap-1.5 text-[13px]" : "gap-x-5 gap-y-2.5 text-sm"}`}>
      {items.slice(0, max).map((tech) => (
        <li key={tech} className={`inline-flex items-center gap-2 ${pill ? "gap-1.5 rounded-full border border-ink/12 py-0.5 pr-2.5 pl-2" : ""}`}>
          <TechLogo name={tech} brand className={pill ? "size-3" : "size-4"} />
          {tech}
        </li>
      ))}
    </ul>
  );
}

const imageSize: Record<string, [number, number]> = {
  yatrik: [1600, 900],
  "react-dashboard": [2880, 1800],
  eatsxpress: [2400, 1120],
  clover: [3200, 2000],
  wearly: [3200, 2000],
};

function GitHubLink({ className = "" }: { className?: string }) {
  return (
  <a
    href="https://github.com/yash-189?tab=repositories"
    target="_blank"
    rel="noreferrer"
    className={`group/gh flex items-center justify-between gap-6 rounded-3xl border border-ink/10 px-6 py-5 transition-colors hover:border-ink/25 ${className}`}
  >
    <span className="flex items-center gap-4">
      <svg aria-hidden viewBox="0 0 24 24" className="size-6 shrink-0 text-ink" fill="currentColor">
        <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
      </svg>
      <span>
        <span className="block font-display text-lg font-bold tracking-tight text-ink">More on GitHub</span>
        <span className="block text-[15px] text-ink-soft">Experiments, UI components and everything else I&rsquo;ve built.</span>
      </span>
    </span>
    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-ink/15 text-ink transition-transform group-hover/gh:translate-x-0.5 group-hover/gh:-translate-y-0.5">
      <Arrow />
    </span>
  </a>
  );
}

function LeadTile({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease }}
      className="group/tile grid overflow-hidden rounded-3xl p-2.5 ring-1 ring-ink/10 transition-[box-shadow,translate] duration-300 hover:-translate-y-1 hover:ring-accent/60 hover:shadow-[0_24px_48px_-28px_rgb(13_18_32/0.35)] md:col-span-2 md:grid-cols-12 md:p-3"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open the ${project.name} case study`}
        className="block cursor-pointer self-center overflow-hidden rounded-[14px] md:col-span-7 md:rounded-xl"
      >
        <motion.div layoutId={`${project.id}-image`} transition={{ type: "spring", stiffness: 260, damping: 32, mass: 0.9 }}>
          <Image
            src={project.image}
            alt={`${project.name} screens`}
            width={imageSize[project.id]?.[0] ?? 1600}
            height={imageSize[project.id]?.[1] ?? 1000}
            sizes="(min-width: 1152px) 640px, 100vw"
            className="aspect-video h-auto w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tile:scale-[1.02]"
          />
        </motion.div>
      </button>
      <div className="flex flex-col justify-between gap-8 px-3 pt-6 pb-3 md:col-span-5 md:px-8 md:py-6">
        <div>
          <p className="hidden text-[13px] font-medium text-ink-soft">{project.kind}</p>
          <h4 className="font-display text-2xl leading-tight font-bold tracking-tight text-ink md:text-[2rem]">
            <button type="button" onClick={onOpen} className="cursor-pointer text-left transition-colors hover:text-accent">
              {project.name}
            </button>
          </h4>
          <p onClick={onOpen} className="mt-3 cursor-pointer text-base leading-relaxed text-ink-soft md:text-[17px]">{project.summary}</p>
          <div className="mt-6">
            <Stack items={project.stack} max={8} pill />
          </div>
        </div>
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-ink/10 pt-5 text-sm font-medium">
          <button type="button" onClick={onOpen} className="group/cta order-last ml-auto inline-flex cursor-pointer items-center gap-1.5 text-accent">
            <span className="bg-linear-to-r from-current to-current bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover/cta:bg-[length:100%_1px]">Case study</span>
            <span aria-hidden className="transition-transform duration-300 group-hover/cta:translate-x-0.5">→</span>
          </button>
          <ExternalLinks project={project} />
        </div>
      </div>
    </motion.article>
  );
}

function SideTile({ project, lead, onOpen, index }: { project: Project; lead: boolean; onOpen: () => void; index: number }) {
  const story = stories[project.id];
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: lead ? 0 : (index % 2) * 0.08, ease }}
      className={`group/tile flex flex-col rounded-3xl p-2.5 ring-1 ring-ink/10 transition-[box-shadow,translate] duration-300 hover:-translate-y-1 hover:ring-accent/60 hover:shadow-[0_24px_48px_-28px_rgb(13_18_32/0.35)] md:p-3 ${lead ? "md:col-span-2" : ""}`}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open the ${project.name} case study`}
        className="block w-full cursor-pointer overflow-hidden rounded-[14px] md:rounded-xl"
      >
        <motion.div layoutId={`${project.id}-image`} transition={{ type: "spring", stiffness: 260, damping: 32, mass: 0.9 }} className="overflow-hidden rounded-[14px] md:rounded-xl">
          <Image
            src={project.image}
            alt={`${project.name} screens`}
            width={imageSize[project.id]?.[0] ?? 1600}
            height={imageSize[project.id]?.[1] ?? 1000}
            sizes={lead ? "(min-width: 1152px) 1100px, 100vw" : "(min-width: 1152px) 540px, 100vw"}
            className={`h-auto w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tile:scale-[1.02] ${lead ? "aspect-video" : "aspect-16/10"}`}
          />
        </motion.div>
      </button>

      <div className="flex flex-1 flex-col px-3 pt-5 pb-3 md:px-4 md:pb-4">
        <p className="hidden text-[13px] font-medium text-ink-soft">{project.kind}</p>
        <h4 className="font-display text-2xl leading-tight font-bold tracking-tight text-ink md:text-[1.75rem]">
          <button type="button" onClick={onOpen} className="cursor-pointer text-left transition-colors hover:text-accent">
            {project.name}
          </button>
        </h4>
        <p onClick={onOpen} className="mt-2 max-w-[48ch] cursor-pointer text-base leading-relaxed text-ink-soft">{story?.hook ?? project.summary}</p>
        <div className="mt-4 mb-6">
          <Stack items={project.stack} pill />
        </div>
        <div className="mt-auto flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-ink/10 pt-4 text-sm font-medium">
          <button type="button" onClick={onOpen} className="group/cta order-last ml-auto inline-flex cursor-pointer items-center gap-1.5 text-accent">
            <span className="bg-linear-to-r from-current to-current bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover/cta:bg-[length:100%_1px]">Case study</span>
            <span aria-hidden className="transition-transform duration-300 group-hover/cta:translate-x-0.5">→</span>
          </button>
          <ExternalLinks project={project} />
        </div>
      </div>
    </motion.article>
  );
}

function SideProjectGrid({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div className="mt-12 md:mt-16">
      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        {projects.map((project, i) =>
          i === 0 ? (
            <LeadTile key={project.id} project={project} onOpen={() => onOpen(project.id)} />
          ) : (
            <SideTile key={project.id} project={project} lead={false} index={i} onOpen={() => onOpen(project.id)} />
          ),
        )}
      </div>
      <GitHubLink className="mt-12" />
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-3 border-t border-ink/10 py-8 md:grid-cols-[11rem_1fr] md:gap-8">
      <h4 className="text-sm font-semibold text-ink-soft">{title}</h4>
      <div className="max-w-[68ch]">{children}</div>
    </section>
  );
}

function ProjectDialog({
  project,
  onClose,
  onStep,
}: {
  project: Project;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const story = stories[project.id];
  const index = projects.findIndex((p) => p.id === project.id);
  const next = projects[(index + 1) % projects.length];
  const gallery = [{ src: project.image, alt: `${project.name} overview`, width: 1600, height: 1000 }, ...(project.screens ?? [])];
  const [picked, setPicked] = useState({ id: project.id, i: 0 });
  const shot = picked.id === project.id ? picked.i : 0;
  const setShot = (i: number) => setPicked({ id: project.id, i });
  const current = gallery[Math.min(shot, gallery.length - 1)];

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.documentElement.style.overflow = "";
      previous?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [project.id]);

  return createPortal(
    <motion.div
      ref={scrollRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-60 overflow-y-auto overscroll-contain pt-10 md:px-6 md:py-10"
    >
      <div aria-hidden className="modal-backdrop pointer-events-none fixed inset-0 -z-10 md:backdrop-blur-xs" />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onStep(-1);
        }}
        aria-label="Previous project"
        className="glass-dock fixed top-1/2 backdrop-blur-[20px] backdrop-saturate-[1.8] left-6 z-10 hidden size-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-ink transition-transform hover:scale-105 md:grid"
      >
        <svg viewBox="0 0 24 24" aria-hidden className="size-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onStep(1);
        }}
        aria-label="Next project"
        className="glass-dock fixed top-1/2 backdrop-blur-[20px] backdrop-saturate-[1.8] right-6 z-10 hidden size-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-ink transition-transform hover:scale-105 md:grid"
      >
        <svg viewBox="0 0 24 24" aria-hidden className="size-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
      </button>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${project.id}-title`}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease }}
        className="relative mx-auto min-h-[calc(100%-2.5rem)] max-w-5xl bg-paper shadow-[0_30px_80px_-20px_rgb(0_0_0/0.35)] ring-1 ring-ink/10 md:bg-paper/75 md:backdrop-blur-[24px] md:backdrop-saturate-[1.8] md:dark:bg-paper/70 overflow-hidden rounded-t-3xl md:min-h-0 md:rounded-3xl"
      >
        <div className="sticky top-0 z-20 h-0">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="glass-dock absolute top-4 right-4 backdrop-blur-[20px] backdrop-saturate-[1.8] grid size-10 cursor-pointer place-items-center rounded-full text-ink transition-transform hover:rotate-90 md:top-5 md:right-5"
          >
            <svg viewBox="0 0 24 24" aria-hidden className="size-4.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="relative aspect-16/10 bg-paper-dim">
          <motion.div layoutId={`${project.id}-image`} transition={{ type: "spring", stiffness: 260, damping: 32, mass: 0.9 }} className="absolute inset-0">
            <Image src={project.image} alt={`${project.name} screens`} fill loading="eager" fetchPriority="high" sizes="(min-width: 1152px) 1100px, 100vw" className="object-cover" />
          </motion.div>
          <AnimatePresence>
            {shot > 0 && (
              <motion.div
                key={current.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 bg-paper-dim"
              >
                <Image src={current.src} alt={current.alt} fill loading="eager" sizes="(min-width: 1152px) 1100px, 100vw" className="object-contain" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {gallery.length > 1 && (
          <div className="flex gap-2 overflow-x-auto border-b border-ink/10 px-5 py-3 md:px-10">
            {gallery.map((g, i) => (
              <button
                key={g.src}
                type="button"
                onClick={() => setShot(i)}
                aria-label={g.alt}
                aria-pressed={shot === i}
                className={`relative aspect-16/10 w-24 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-[border-color,opacity] md:w-28 ${shot === i ? "border-accent" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
              >
                <Image src={g.src} alt="" fill loading="eager" sizes="112px" className="object-cover" />
              </button>
            ))}
          </div>
        )}

        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease }}
          className="px-5 pt-8 pb-6 md:px-10 md:pt-10"
        >
          <div className="grid gap-8 md:grid-cols-[1fr_16rem] md:gap-14">
            <div>
              <h3 id={`${project.id}-title`} className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
                {project.name}
              </h3>
              <p className="mt-4 max-w-[62ch] text-[17px] leading-[1.7] text-ink-soft">{project.summary}</p>
            </div>
            <dl className="grid content-start gap-4 text-sm md:border-l md:border-ink/10 md:pl-8">
              {story && (
                <div>
                  <dt className="text-ink-soft">Role</dt>
                  <dd className="mt-0.5 text-ink">{story.role}</dd>
                </div>
              )}
              <div>
                <dt className="text-ink-soft">Links</dt>
                <dd className="mt-0.5 flex gap-5 font-medium">
                  <ExternalLinks project={project} />
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-8">
            {story && (
              <>
                <Block title="The problem">
                  <p className="leading-[1.7] text-ink-soft">{story.problem}</p>
                </Block>

                <Block title="Decisions">
                  <ol className="flex flex-col gap-6">
                    {story.decisions.map((d) => (
                      <li key={d.title}>
                        <p className="font-medium text-ink">{d.title}</p>
                        <p className="mt-1 leading-[1.7] text-ink-soft">{d.body}</p>
                      </li>
                    ))}
                  </ol>
                </Block>

                <Block title="Details">
                  <ul className="flex flex-col gap-2.5">
                    {story.details.map((item) => (
                      <li key={item} className="flex gap-3 text-ink-soft">
                        <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-ink-soft/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Block>
              </>
            )}

            <Block title="Stack">
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="inline-flex items-center gap-2 rounded-full border border-ink/10 py-1.5 pr-3.5 pl-2.5 text-sm font-medium text-ink"
                  >
                    <TechLogo name={tech} brand className="size-4" />
                    {tech}
                  </li>
                ))}
              </ul>
            </Block>
          </div>
        </motion.div>

        <button
          type="button"
          onClick={() => onStep(1)}
          className="group flex w-full cursor-pointer items-center justify-between gap-6 border-t border-ink/10 px-5 py-7 text-left transition-colors hover:bg-ink/4 md:px-10"
        >
          <span>
            <span className="block text-sm text-ink-soft">Next project</span>
            <span className="mt-1 block font-display text-2xl font-bold tracking-tight text-ink transition-colors group-hover:text-accent md:text-3xl">
              {next.name}
            </span>
          </span>
          <span aria-hidden className="text-2xl text-ink-soft transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

export function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = useCallback((id: string) => {
    if (!window.history.state?.caseStudy) window.history.pushState({ caseStudy: true }, "");
    setOpenId(id);
  }, []);
  const close = useCallback(() => {
    if (window.history.state?.caseStudy) window.history.back();
    else setOpenId(null);
  }, []);

  useEffect(() => {
    const onPop = () => setOpenId(null);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpenId((id) => {
        const i = projects.findIndex((p) => p.id === id);
        return projects[(i + dir + projects.length) % projects.length].id;
      }),
    [],
  );
  const openProject = projects.find((p) => p.id === openId);

  return (
    <section id="work" className="relative isolate mx-auto w-[calc(100%-3rem)] max-w-276 border-ink/10 py-16 dark:border-t md:py-24">
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
        >
          <SectionHeading label="Work" lead="Selected" accent="work" />
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-pretty text-ink-soft md:text-lg">
            Products I&rsquo;ve built at work. The code and screens are private, so here&rsquo;s what I worked on and how.
          </p>
        </motion.div>

        <CompanyWork />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="mt-20 flex flex-wrap items-end justify-between gap-4 md:mt-28"
      >
        <div>
          <SectionHeading label="Built after hours" lead="Side" accent="projects" ghost="Side" as="h3" small />
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-pretty text-ink-soft md:text-lg">
            Things I build on my own to try ideas end to end. Each one has a short case study.
          </p>
        </div>
      </motion.div>

      <SideProjectGrid onOpen={open} />

      <AnimatePresence>
        {openProject && <ProjectDialog project={openProject} onClose={close} onStep={step} />}
      </AnimatePresence>
    </section>
  );
}
