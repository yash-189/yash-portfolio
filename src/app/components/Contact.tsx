"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { contact } from "../content";

const ease = [0.16, 1, 0.3, 1] as const;
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, delay, ease },
});

function GitHubIcon() {
  return (
    <svg
      aria-hidden
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

const SCENE_BG =
  "bg-[#060d19] dark:bg-[linear-gradient(to_bottom,var(--paper),#060d19_10rem)]";

export function Contact() {
  const github = contact.socials.find((s) => s.label === "GitHub");

  return (
    <section
      id="contact"
      className={`relative overflow-hidden ${SCENE_BG} text-band-fg lg:h-[clamp(36rem,46vw,44rem)]`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-6xl -translate-x-1/2 px-6 lg:block"
      >
        <div className="absolute top-[20%] bottom-0 right-6 aspect-3/2 translate-x-[11%] mask-t-from-82% mask-b-from-88% mask-l-from-60% mask-r-from-90%">
          <Image
            src="/contact-bot-2.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 85vw, 0px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="relative mx-auto flex max-w-6xl items-center px-6 pt-28 lg:h-[80%] lg:pt-0">
        <div className="flex flex-col items-start">
          <motion.span
            {...reveal()}
            className="font-mono text-sm uppercase tracking-[0.25em] text-sand"
          >
            Get in touch
          </motion.span>

          <motion.h2
            {...reveal()}
            className="mt-8 font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl"
          >
            Hiring a frontend
            <br />
            developer?
          </motion.h2>

          <motion.p
            {...reveal(0.1)}
            className="mt-6 select-all break-all font-mono text-lg md:text-2xl"
          >
            {contact.email}
          </motion.p>

          <motion.div {...reveal(0.15)} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a
              href={`mailto:${contact.email}`}
              className="group inline-flex items-center gap-4 rounded-full bg-accent px-9 py-4 font-mono text-sm uppercase tracking-[0.2em] text-white transition-transform hover:-translate-y-0.5"
            >
              Send an email
              <span
                aria-hidden
                className="text-lg transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>

            {github && (
              <a
                href={github.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-[0.2em] text-sand transition-colors hover:text-band-fg"
              >
                <GitHubIcon />
                GitHub
              </a>
            )}
          </motion.div>
        </div>
      </div>

      <div
        aria-hidden
        className="relative mt-10 aspect-square w-full lg:hidden"
      >
        <Image
          src="/contact-bot-2.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[78%_center]"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 lg:absolute lg:inset-x-0 lg:bottom-[7%]">
        <motion.p
          {...reveal(0.2)}
          className="py-8 font-mono text-sm uppercase tracking-[0.2em] text-sand lg:py-0"
        >
          © {new Date().getFullYear()} Yash Saini
        </motion.p>
      </div>
    </section>
  );
}
