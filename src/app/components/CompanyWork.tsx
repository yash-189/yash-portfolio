"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { companyProjects } from "../content";
import { hasLogo, TechLogo } from "./TechLogo";

const ease = [0.16, 1, 0.3, 1] as const;

function split(point: string) {
  const cut = point.indexOf(": ");
  const title = cut > 0 && cut < 40 ? point.slice(0, cut) : null;
  const body = title ? point.slice(cut + 2) : point;
  return { title, body: body.charAt(0).toUpperCase() + body.slice(1) };
}

export function CompanyWork() {
  const [open, setOpen] = useState<string[]>([companyProjects[0].id]);
  const toggle = (id: string) =>
    setOpen((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  return (
    <ol className="mt-14 border-t border-ink/10 md:mt-20">
      {companyProjects.map((item, index) => {
        const isOpen = open.includes(item.id);
        return (
          <li key={item.id} className={`border-b border-ink/10 transition-colors duration-500`}>
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`${item.id}-details`}
              className={`group grid w-full cursor-pointer grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 pt-8 text-left transition-[padding] duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] md:grid-cols-[4rem_1fr_auto] md:gap-x-6 md:pt-10 ${isOpen ? "pb-5" : "pb-8 md:pb-10"}`}
            >
              <span className="self-start font-mono text-sm leading-7 text-ink-soft/60 tabular-nums md:text-[15px]">{String(index + 1).padStart(2, "0")}</span>
              <span className="min-w-0">
                <span className="inline-flex rounded-full border border-ink/12 bg-ink/3 px-2.5 py-px text-[13px] leading-6 font-medium text-ink-soft">{item.domain}</span>
                <span className="mt-3 block font-display text-2xl leading-tight font-semibold tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-accent md:text-4xl">
                  {item.name}
                </span>
              </span>
              <span className="flex items-center gap-4 self-end">
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-full border text-ink transition-colors duration-300 ${isOpen ? "border-ink/25 bg-ink/6" : "border-ink/12 group-hover:border-ink/30 group-hover:bg-ink/4"}`}
                >
                  <motion.svg
                    aria-hidden
                    viewBox="0 0 16 16"
                    className="size-4"
                    fill="none"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.45, ease }}
                  >
                    <path d="M4 6.25l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                </span>
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${item.id}-details`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-[2.5rem_1fr] gap-x-4 pb-12 md:grid-cols-[4rem_1fr_2.75rem] md:gap-x-6 md:pb-14">
                    <div className="col-start-2">
                      <p className="max-w-[60ch] text-lg leading-relaxed text-ink md:text-lg">{item.summary}</p>
                      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
                        {item.stack.map((tech) => (
                          <li key={tech} className="inline-flex items-center gap-1.5">
                            {hasLogo(tech) && <TechLogo name={tech} brand className="size-3.5" />}
                            {tech}
                          </li>
                        ))}
                      </ul>
                      <ul className="mt-10 grid gap-x-12 gap-y-9 border-t border-ink/10 pt-10 md:grid-cols-2">
                        {item.points.map((point, i) => {
                          const { title, body } = split(point);
                          return (
                            <motion.li
                              key={point}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease }}
                              className="border-l border-ink/10 pl-5"
                            >
                              <span>
                                {title && <span className="block text-[17px] font-semibold tracking-[-0.01em] text-ink">{title}</span>}
                                <span className="mt-1.5 block text-base leading-relaxed text-pretty text-ink-soft">{body}</span>
                              </span>
                            </motion.li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ol>
  );
}
