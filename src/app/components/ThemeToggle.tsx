"use client";

import { useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
};

const isDark = () => document.documentElement.classList.contains("dark");

export function useTheme() {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  const toggle = (e?: { currentTarget: EventTarget | null }) => {
    const next = !isDark();
    const apply = () => {
      document.documentElement.classList.toggle("dark", next);
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch {}
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) return apply();
    const box = e?.currentTarget instanceof Element ? e.currentTarget.getBoundingClientRect() : null;
    const x = box ? box.left + box.width / 2 : window.innerWidth - 40;
    const y = box ? box.top + box.height / 2 : 40;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    document.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 700, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    }).catch(() => {});
  };

  return { dark, toggle };
}
