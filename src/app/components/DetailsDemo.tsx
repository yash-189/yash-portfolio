"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type IssueId = "radius" | "play" | "digits" | "hover" | "overflow";

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
    tryIt: { before: "Watch the progress bar for a few seconds.", after: "Watch it again. The bar stays still." },
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
};

const TRACKS = [
  { title: "Midnight City", artist: "M83", time: "4:03" },
  { title: "Nightcall", artist: "Kavinsky", time: "4:18" },
  { title: "Resonance (Extended Late Night Mix)", artist: "Home", time: "7:46" },
];

function Marker({ id, open, onToggle }: { id: IssueId; open: boolean; onToggle: (id: IssueId) => void }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(id)}
      aria-expanded={open}
      aria-label={`Issue ${ISSUES[id].n}: ${ISSUES[id].title}`}
      className="group/marker absolute z-10 grid size-6 cursor-pointer place-items-center"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-accent/40 group-aria-expanded/marker:hidden" />
      <span className="relative grid size-6 place-items-center rounded-full bg-accent font-mono text-[11px] font-bold text-white shadow-md ring-2 ring-paper transition-transform group-hover/marker:scale-110">
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
  const toggle = (id: IssueId) => setOpen((cur) => (cur === id ? null : id));
  const issue = open ? ISSUES[open] : null;

  const [elapsed, setElapsed] = useState(58);
  useEffect(() => {
    const id = setInterval(() => setElapsed((t) => (t >= 243 ? 58 : t + 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const clock = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}`;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-3">
        <div className="grid gap-1">
          <h3 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">How I catch the details</h3>
          <p className="text-ink-soft">Things I check on every component before it ships. None of them show up in a linter. Tap a number.</p>
        </div>
        <div role="radiogroup" aria-label="Version" className="relative flex rounded-full border-2 border-ink/10 bg-paper-dim p-1">
          {(["Before", "After"] as const).map((label) => {
            const active = (label === "After") === allFixed;
            return (
              <button
                key={label}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setAll(label === "After")}
                className={`relative z-10 cursor-pointer rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors ${
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

      <div className="grid items-start gap-8 md:grid-cols-2 md:gap-12">
      <div className="grid place-items-center rounded-[20px] border-2 border-ink/10 bg-paper-dim px-5 py-10">
        <div className="relative w-full max-w-[280px]">
          <div className="rounded-3xl bg-paper p-3 shadow-[0_24px_50px_-28px_rgb(13_18_32/0.45)]">
            <div className="relative">
              <motion.div
                animate={{ borderRadius: isFixed("radius") ? 12 : 24 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className="aspect-4/3 w-full overflow-hidden bg-[radial-gradient(120%_90%_at_20%_10%,#ff8a5b_0%,#c2368f_45%,#2a1e5c_100%)]"
              >
                <div className="flex h-full flex-col justify-end p-4 text-white">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] opacity-80">Now playing</p>
                  <p className="font-display text-2xl font-bold">Midnight City</p>
                </div>
              </motion.div>
              <span className="absolute -left-3 -top-3"><Marker id="radius" open={open === "radius"} onToggle={toggle} /></span>

              <div className="absolute -bottom-6 right-4">
                <span className="grid size-14 place-items-center rounded-full bg-ink text-paper shadow-lg">
                  <motion.span animate={{ x: isFixed("play") ? 2 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="grid">
                    <PlayIcon />
                  </motion.span>
                </span>
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

            <ul className="relative mt-3 flex flex-col gap-1">
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
              <span className="absolute -right-3 top-3"><Marker id="hover" open={open === "hover"} onToggle={toggle} /></span>
              <span className="absolute -bottom-3 -left-3"><Marker id="overflow" open={open === "overflow"} onToggle={toggle} /></span>
            </ul>
          </div>
        </div>
      </div>

      <div className="md:pt-4">
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
              <h4 className="font-display text-2xl font-bold tracking-tight text-ink">{issue.title}</h4>

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
                    className="grid grid-cols-[96px_1fr] gap-4 text-[15px] leading-relaxed"
                  >
                    <span className="pt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-accent-deep">{step}</span>
                    <span className="text-ink-soft">{text}</span>
                  </motion.li>
                ))}
              </ol>

              <button
                type="button"
                onClick={() => open && toggleFix(open)}
                aria-label={isFixed(open!) ? "Show the original code" : "Apply the fix"}
                className="group/diff mt-4 cursor-pointer overflow-hidden rounded-xl border-2 border-ink/10 bg-paper-dim text-left font-mono text-[12px] leading-relaxed transition-colors hover:border-accent/40"
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
                <span className="flex justify-end px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-ink-soft group-hover/diff:text-ink">
                  {isFixed(open!) ? "✓ Applied · click to revert" : "Click to apply the fix →"}
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
              Tap a number to see how I spot it and fix it.
            </motion.p>
          )}
        </AnimatePresence>

      </div>
      </div>
    </div>
  );
}
