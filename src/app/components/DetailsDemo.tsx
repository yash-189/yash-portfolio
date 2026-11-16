"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useAmbient } from "./useAmbient";
import { SectionHeading } from "./SectionHeading";

type IssueId = "radius" | "play" | "digits" | "hover" | "overflow" | "states";
type Status = "ready" | "loading" | "empty" | "error";

type Issue = {
  n: number;
  title: string;
  spot: string;
  why: string;
  fix: string;
  diff: { remove: string; add: string };
  tryIt: { before: string; after: string };
};

const ISSUES: Record<IssueId, Issue> = {
  radius: {
    n: 1,
    title: "Concentric corners",
    spot: "The gap between the cover and the card is wider at the corners than along the edges.",
    why: "Both use a 24px radius, but the cover sits 12px inside, so its curve should be tighter.",
    fix: "My rule for any nested rounded box: inner radius = outer radius − padding. Here, 24 − 12 = 12px.",
    diff: { remove: '<img className="rounded-3xl" />', add: '<img className="rounded-xl" />' },
    tryIt: { before: "Look at the corners of the cover.", after: "Now compare the corners. The gap is even all the way round." },
  },
  play: {
    n: 2,
    title: "Optical centring",
    spot: "The play icon looks like it's leaning left inside its circle.",
    why: "It's centred by its bounding box, but a triangle's visual weight sits towards its flat side.",
    fix: "I trust my eyes over the numbers here and nudge it about 2px right, until it looks centred.",
    diff: { remove: '<PlayIcon className="" />', add: '<PlayIcon className="translate-x-0.5" />' },
    tryIt: { before: "Look at the play button.", after: "Now look again. The triangle sits in the middle of the circle." },
  },
  digits: {
    n: 3,
    title: "Numbers that don't jitter",
    spot: "The progress bar twitches every second while the song plays.",
    why: "Digits in most fonts have different widths, so 1:11 is narrower than 1:08 and the bar resizes as the time changes.",
    fix: "Anything that counts, like timers, prices or table columns, gets tabular-nums from me by default.",
    diff: { remove: '<time className="text-xs" />', add: '<time className="text-xs tabular-nums" />' },
    tryIt: { before: "Press play and watch the progress bar.", after: "Watch it again. The bar stays still." },
  },
  hover: {
    n: 4,
    title: "Hover without layout shift",
    spot: "The track list jumps by a couple of pixels when you hover a row.",
    why: "The border only exists on hover, so it adds 2px to the row's size.",
    fix: "I reserve the space up front with a transparent border, so hover only ever changes colour.",
    diff: { remove: '<li className="hover:border-2" />', add: '<li className="border-2 border-transparent hover:border-accent" />' },
    tryIt: { before: "Hover the tracks and watch the list jump.", after: "Now hover the tracks again. Nothing moves." },
  },
  overflow: {
    n: 5,
    title: "Long text that stays inside",
    spot: "A long track title pushes the duration out of the card.",
    why: "Flex items won't shrink below their content width by default, so the text never gets a chance to truncate.",
    fix: "min-w-0 on the text column, then truncate. Every list I build gets this check with ugly, long data.",
    diff: { remove: '<span className="flex-1 whitespace-nowrap" />', add: '<span className="min-w-0 flex-1 truncate" />' },
    tryIt: { before: "Look at the third track.", after: "The long title now ends with … and the time stays inside." },
  },
  states: {
    n: 6,
    title: "Every state, not just the happy one",
    spot: "Switch the list to loading, empty or error. It goes blank, and the user can't tell what's happening.",
    why: "Designs usually show the list full of data. Real data arrives late, comes back empty or fails.",
    fix: "I wrap every list in one shared component that shows a loading skeleton, an empty message or a retry button, so no screen is ever left blank.",
    diff: { remove: "<TrackList />", add: "<WithStates loading={<Skeleton />} empty={<NoTracks />} error={<Retry />}><TrackList /></WithStates>" },
    tryIt: { before: "Switch between the states below.", after: "Switch again. Each state now tells you what's going on." },
  },
};

const ORDER = Object.keys(ISSUES) as IssueId[];

const TRACKS = [
  { title: "Night Drive", artist: "Low Tide", time: "4:03" },
  { title: "Afterglow", artist: "Paper Moons", time: "4:18" },
  { title: "Slow Signals (Extended Late Night Mix)", artist: "Harbour", time: "7:46" },
];

function Marker({ id, open, onToggle }: { id: IssueId; open: boolean; onToggle: (id: IssueId, el: HTMLElement) => void }) {
  return (
    <button
      type="button"
      onClick={(e) => onToggle(id, e.currentTarget)}
      aria-expanded={open}
      aria-label={`Issue ${ISSUES[id].n}: ${ISSUES[id].title}`}
      className="group/marker absolute z-10 grid size-6 cursor-pointer place-items-center"
    >
            <span className="relative grid size-6 place-items-center rounded-full bg-paper text-[11px] font-semibold text-ink shadow-md ring-1 ring-ink/15 transition-[transform,background-color,color] group-hover/marker:scale-110 group-aria-expanded/marker:bg-accent group-aria-expanded/marker:text-white group-aria-expanded/marker:ring-accent">
        {ISSUES[id].n}
      </span>
    </button>
  );
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path d="M4 2.5v13a.8.8 0 0 0 1.2.7l11-6.5a.8.8 0 0 0 0-1.4l-11-6.5A.8.8 0 0 0 4 2.5z" fill="currentColor" />
    </svg>
  );
}

export function DetailsDemo() {
  const [fixedSet, setFixedSet] = useState<Set<IssueId>>(new Set());
  const isFixed = (id: IssueId) => fixedSet.has(id);
  const allFixed = fixedSet.size === Object.keys(ISSUES).length;
  const setAll = (on: boolean) => setFixedSet(on ? new Set(Object.keys(ISSUES) as IssueId[]) : new Set());
  const toggleFix = (id: IssueId) =>
    setFixedSet((cur) => {
      const next = new Set(cur);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const [open, setOpen] = useState<IssueId | null>("radius");
  const toggle = (id: IssueId, el: HTMLElement) => {
    setOpen(id);
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    el.closest("[data-demo]")?.querySelector(`[data-card="${id}"]`)?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };
  const issue = open ? ISSUES[open] : null;
  const [status, setStatus] = useState<Status>("ready");
  const shown: Status = open === "states" ? status : "ready";

  const [elapsed, setElapsed] = useState(58);
  const music = useAmbient();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.15 });
  const { playing, stop } = music;
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setElapsed((t) => (t >= 243 ? 0 : t + 1)), 1000);
    return () => clearInterval(id);
  }, [playing]);
  useEffect(() => {
    if (!inView && playing) stop();
  }, [inView, playing, stop]);
  const clock = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}`;

  return (
    <div ref={rootRef} data-demo className="flex flex-col gap-12 md:gap-16">
      <div>
        <div>
          <SectionHeading label="Process" lead="How I catch the" accent="details" circled />
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-pretty text-ink-soft md:text-lg">Six things I check on every component before it ships. None of them show up in a linter.</p>
        </div>
      </div>

      <div className="glass-card relative grid items-start gap-8 rounded-3xl p-4 md:grid-cols-2 md:gap-12 md:p-8">
      <div className="absolute top-5 left-1/2 z-20 -translate-x-1/2 md:top-8 md:right-8 md:left-auto md:translate-x-0">
        <div role="radiogroup" aria-label="Version" className="glass-dock relative flex rounded-full p-1">
          {(["Before", "After"] as const).map((label) => {
            const active = (label === "After") === allFixed;
            return (
              <button
                key={label}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setAll(label === "After")}
                className={`relative z-10 cursor-pointer rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors ${
                  active ? (allFixed ? "text-white" : "text-paper") : "text-ink-soft hover:text-ink"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="details-toggle"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className={`absolute inset-0 -z-10 rounded-full ${allFixed ? "bg-accent" : "bg-ink"}`}
                  />
                )}
                {label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="grid place-items-center px-2 pt-16 pb-6 md:self-stretch md:border-r md:border-ink/10 md:px-5 md:py-10 md:pr-12">
        <div className="relative w-full max-w-70">
          <div className="rounded-3xl bg-paper p-3 shadow-[0_24px_50px_-28px_rgb(13_18_32/0.45)]">
            <div className="relative">
              <motion.div
                animate={{ borderRadius: isFixed("radius") ? 12 : 24 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className="aspect-4/3 w-full overflow-hidden bg-[radial-gradient(120%_90%_at_20%_10%,#ff8a5b_0%,#c2368f_45%,#2a1e5c_100%)]"
              >
                <div className="flex h-full flex-col justify-end p-4 text-white">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] opacity-80">Now playing</p>
                  <p className="font-display text-2xl font-bold">Night Drive</p>
                </div>
              </motion.div>
              <span className="absolute -left-3 -top-3"><Marker id="radius" open={open === "radius"} onToggle={toggle} /></span>

              <div className="absolute -bottom-6 right-4">
                <button
                  type="button"
                  onClick={music.toggle}
                  aria-label={music.playing ? "Pause" : "Play"}
                  aria-pressed={music.playing}
                  className="grid size-14 cursor-pointer place-items-center rounded-full bg-ink text-paper shadow-lg transition-transform active:scale-95"
                >
                  {music.playing ? (
                    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                      <rect x="4" y="3" width="3.5" height="12" rx="1" fill="currentColor" />
                      <rect x="10.5" y="3" width="3.5" height="12" rx="1" fill="currentColor" />
                    </svg>
                  ) : (
                    <motion.span animate={{ x: isFixed("play") ? 2 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="grid">
                      <PlayIcon />
                    </motion.span>
                  )}
                </button>
                <AnimatePresence>
                  {open === "play" && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-hidden className="pointer-events-none absolute inset-0">
                      <i className="absolute inset-y-1 left-1/2 w-px bg-accent" />
                      <i className="absolute inset-x-1 top-1/2 h-px bg-accent" />
                    </motion.span>
                  )}
                </AnimatePresence>
                <span className="absolute -right-3 -top-3"><Marker id="play" open={open === "play"} onToggle={toggle} /></span>
              </div>
            </div>

            <div className="relative mt-9 flex items-center gap-3 px-3">
              <time className={`text-xs text-ink-soft ${isFixed("digits") ? "tabular-nums" : "[font-variant-numeric:proportional-nums]"}`}>{clock}</time>
              <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-ink/10">
                <span className="absolute inset-y-0 left-0 rounded-full bg-accent transition-[width] duration-1000 ease-linear" style={{ width: `${(elapsed / 243) * 100}%` }} />
              </span>
              <time className={`text-xs text-ink-soft ${isFixed("digits") ? "tabular-nums" : "[font-variant-numeric:proportional-nums]"}`}>4:03</time>
              <span className="absolute -left-3 -top-3"><Marker id="digits" open={open === "digits"} onToggle={toggle} /></span>
            </div>

            <ul className="relative mt-3 flex min-h-46 flex-col gap-1">
              {shown === "ready" ? (
                <>

                      {TRACKS.map((t, i) => (
                    <li
                      key={t.title}
                      className={`flex cursor-default items-center gap-3 rounded-xl transition-colors ${
                        isFixed("hover")
                          ? "border-2 border-transparent px-3 py-2 hover:border-accent/40 hover:bg-paper-dim"
                          : "px-3.5 py-2.5 hover:border-2 hover:border-accent/40 hover:bg-paper-dim"
                      }`}
                    >
                      <span className="w-4 font-mono text-xs tabular-nums text-ink-soft">{i + 1}</span>
                      <span className={isFixed("overflow") ? "min-w-0 flex-1" : "flex-1 whitespace-nowrap"}>
                        <span className={`block text-sm font-semibold text-ink ${isFixed("overflow") ? "truncate" : ""}`}>{t.title}</span>
                        <span className={`block text-xs text-ink-soft ${isFixed("overflow") ? "truncate" : ""}`}>{t.artist}</span>
                      </span>
                      <span className="font-mono text-xs tabular-nums text-ink-soft">{t.time}</span>
                    </li>
                  ))}
                </>
              ) : !isFixed("states") ? null : shown === "loading" ? (
                [0, 1, 2].map((i) => (
                  <li key={i} className="flex items-center gap-3 px-3.5 py-2.5">
                    <span className="skeleton h-3 w-4 rounded" />
                    <span className="flex-1 space-y-1.5">
                      <span className="skeleton block h-3 w-3/4 rounded" />
                      <span className="skeleton block h-2.5 w-1/3 rounded" />
                    </span>
                    <span className="skeleton h-3 w-8 rounded" />
                  </li>
                ))
              ) : shown === "empty" ? (
                <li className="grid flex-1 place-items-center gap-2 px-4 text-center">
                  <span>
                    <span className="block text-sm font-semibold text-ink">No tracks yet</span>
                    <span className="mt-1 block text-xs text-ink-soft">Save a song and it will show up here.</span>
                    <span className="mt-3 inline-flex rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-paper">Browse music</span>
                  </span>
                </li>
              ) : (
                <li className="grid flex-1 place-items-center gap-2 px-4 text-center">
                  <span>
                    <span className="block text-sm font-semibold text-ink">Couldn&rsquo;t load your tracks</span>
                    <span className="mt-1 block text-xs text-ink-soft">Check your connection and try again.</span>
                    <span className="mt-3 inline-flex rounded-full border border-ink/20 px-3 py-1.5 text-xs font-medium text-ink">Retry</span>
                  </span>
                </li>
              )}
              <span className="absolute -right-3 top-3"><Marker id="hover" open={open === "hover"} onToggle={toggle} /></span>
              <span className="absolute -bottom-3 -left-3"><Marker id="overflow" open={open === "overflow"} onToggle={toggle} /></span>
              <span className="absolute -left-3 top-12"><Marker id="states" open={open === "states"} onToggle={toggle} /></span>
            </ul>
          </div>
        </div>
      </div>

      <div data-panel className="max-md:hidden md:min-h-146 md:pt-14">
        <AnimatePresence mode="wait">
          {issue ? (
            <motion.div
              key={open}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="grid gap-6"
            >
              <div className="flex items-center justify-between gap-4">
                <h4 className="font-display text-xl font-semibold tracking-tight text-ink md:text-2xl">{issue.title}</h4>
                <div className="flex shrink-0 items-center gap-1 text-sm text-ink-soft">
                  <button
                    type="button"
                    aria-label="Previous check"
                    onClick={() => setOpen(ORDER[(ORDER.indexOf(open!) + ORDER.length - 1) % ORDER.length])}
                    className="grid size-8 cursor-pointer place-items-center rounded-full transition-colors hover:bg-ink/8 hover:text-ink"
                  >
                    ←
                  </button>
                  <span className="w-12 text-center tabular-nums">
                    {issue.n} / {ORDER.length}
                  </span>
                  <button
                    type="button"
                    aria-label="Next check"
                    onClick={() => setOpen(ORDER[(ORDER.indexOf(open!) + 1) % ORDER.length])}
                    className="grid size-8 cursor-pointer place-items-center rounded-full transition-colors hover:bg-ink/8 hover:text-ink"
                  >
                    →
                  </button>
                </div>
              </div>

              <ol className="grid gap-4">
                {(
                  [
                    ["Spot", issue.spot],
                    ["Why", issue.why],
                    ["What I do", issue.fix],
                  ] as const
                ).map(([step, text], i) => (
                  <motion.li
                    key={step}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.25 }}
                    className="grid gap-1 text-[15px] leading-relaxed sm:grid-cols-[96px_1fr] sm:gap-4"
                  >
                    <span className="text-sm font-medium text-ink">{step}</span>
                    <span className="text-ink-soft">{text}</span>
                  </motion.li>
                ))}
              </ol>

              {open === "states" && (
                <div role="radiogroup" aria-label="List state" className="flex flex-wrap gap-1.5">
                  {(["ready", "loading", "empty", "error"] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      role="radio"
                      aria-checked={status === st}
                      onClick={() => setStatus(st)}
                      className={`cursor-pointer rounded-full px-3 py-1 text-[13px] font-medium capitalize transition-colors ${
                        status === st ? "bg-ink text-paper" : "border border-ink/15 text-ink-soft hover:text-ink"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => open && toggleFix(open)}
                aria-label={isFixed(open!) ? "Show the original code" : "Apply the fix"}
                className="group/diff cursor-pointer md:mt-4 overflow-hidden rounded-xl border border-ink/10 bg-ink/3 text-left font-mono text-[12px] leading-relaxed transition-colors hover:border-accent/40"
              >
                <span
                  className={`flex gap-3 px-3 py-1.5 transition-opacity ${isFixed(open!) ? "opacity-40 line-through decoration-red-500/60" : ""} bg-red-500/10 text-red-600 dark:text-red-400`}
                >
                  <b className="font-normal">−</b>
                  <span className="min-w-0 wrap-anywhere">{issue.diff.remove}</span>
                </span>
                <span className={`flex gap-3 px-3 py-1.5 transition-opacity ${isFixed(open!) ? "" : "opacity-50"} bg-emerald-500/10 text-emerald-700 dark:text-emerald-400`}>
                  <b className="font-normal">+</b>
                  <span className="min-w-0 wrap-anywhere">{issue.diff.add}</span>
                </span>
                <span className="flex justify-end px-3 py-2 font-sans text-[13px] font-medium text-ink-soft group-hover/diff:text-ink">
                  {isFixed(open!) ? "✓ Fixed · undo" : "Apply fix →"}
                </span>
              </button>

              <motion.p
                key={isFixed(open!) ? "after" : "before"}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[13px] text-ink-soft/80"
              >
                {isFixed(open!) ? issue.tryIt.after : issue.tryIt.before}
              </motion.p>
            </motion.div>
          ) : (
            <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[15px] text-ink-soft">
              Pick a number on the card to see how I spot it and fix it.
            </motion.p>
          )}
        </AnimatePresence>

      </div>
      {(
        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:hidden">
          {ORDER.map((id) => {
            const it = ISSUES[id];
            return (
              <div
                key={id}
                data-card={id}
                onClick={() => setOpen(id)}
                className={`w-[78%] shrink-0 snap-center rounded-2xl border p-4 transition-colors ${open === id ? "border-accent/50" : "border-ink/10"}`}
              >
                <p className="text-xs text-ink-soft">
                  {it.n} / {ORDER.length}
                </p>
                <p className="mt-1 font-display text-lg font-semibold tracking-tight text-ink">{it.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{it.spot}</p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(id);
                    toggleFix(id);
                  }}
                  className="mt-3 inline-flex cursor-pointer items-center rounded-full bg-ink px-3.5 py-1.5 text-[13px] font-medium text-paper"
                >
                  {isFixed(id) ? "✓ Fixed · undo" : "Apply fix"}
                </button>
              </div>
            );
          })}
        </div>
      )}
      </div>
    </div>
  );
}
