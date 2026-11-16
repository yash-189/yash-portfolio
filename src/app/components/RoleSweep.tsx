"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

const ROLES = ["frontend developer", "React developer", "React Native developer", "full-stack developer", "UI engineer"];

const split = (from: string, to: string) => {
  let start = 0;
  while (start < from.length && start < to.length && from[start] === to[start]) start++;
  let end = 0;
  while (
    end < from.length - start &&
    end < to.length - start &&
    from[from.length - 1 - end] === to[to.length - 1 - end]
  )
    end++;
  return { start, end };
};

export function RoleSweep() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const reduce = useReducedMotion();
  const [text, setText] = useState(ROLES[0]);
  const [caret, setCaret] = useState(-1);
  const [busy, setBusy] = useState(false);
  const step = useRef(0);

  useEffect(() => {
    if (!inView || reduce) return;
    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) => new Promise<void>((r) => timers.push(window.setTimeout(r, ms)));

    const run = async () => {
      while (!cancelled) {
        await wait(2800);
        if (cancelled) return;
        const from = ROLES[step.current % ROLES.length];
        const to = ROLES[(step.current + 1) % ROLES.length];
        const { start, end } = split(from, to);
        const head = from.slice(0, start);
        const tail = from.slice(from.length - end);
        setBusy(true);
        let mid = from.slice(start, from.length - end);
        setCaret(start + mid.length);
        await wait(320);
        while (mid.length && !cancelled) {
          mid = mid.slice(0, -1);
          setText(head + mid + tail);
          setCaret(start + mid.length);
          await wait(45);
        }
        const add = to.slice(start, to.length - end);
        await wait(180);
        for (let i = 1; i <= add.length && !cancelled; i++) {
          setText(head + add.slice(0, i) + tail);
          setCaret(start + i);
          await wait(70 + Math.random() * 50);
        }
        await wait(500);
        setBusy(false);
        setCaret(-1);
        step.current += 1;
      }
    };
    void run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [inView, reduce]);

  const at = caret < 0 ? text.length : caret;

  return (
    <span ref={ref} className="block whitespace-nowrap text-accent">
      <span className="sr-only">frontend developer?</span>
      <span aria-hidden>
        {text.slice(0, at)}
        <span
          className={`mx-px inline-block h-[0.9em] w-[0.06em] translate-y-[0.1em] rounded-full bg-accent align-baseline transition-opacity ${
            busy ? "opacity-100" : "opacity-0"
          }`}
        />
        {text.slice(at)}
        <span className="text-ink">?</span>
      </span>
    </span>
  );
}
