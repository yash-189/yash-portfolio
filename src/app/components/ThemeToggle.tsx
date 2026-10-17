"use client";

import { useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
};

const isDark = () => document.documentElement.classList.contains("dark");

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, isDark, () => null);

  const toggle = () => {
    const next = !isDark();
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark ?? undefined}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="link-underline font-mono text-xs uppercase tracking-[0.1em] text-ink-soft hover:text-ink sm:tracking-[0.15em]"
    >
      {dark === null ? "Theme" : dark ? "Light" : "Dark"}
    </button>
  );
}
