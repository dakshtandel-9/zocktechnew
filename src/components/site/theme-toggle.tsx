"use client";

import type { MouseEvent } from "react";
import { Moon, Sun } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type Theme = "light" | "dark";

function applyTheme(next: Theme) {
  const root = document.documentElement;
  root.dataset.theme = next;
  root.style.colorScheme = next;
  try {
    localStorage.setItem("zt-theme", next);
  } catch {
    /* storage unavailable: theme still applies for this visit */
  }
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", next === "light" ? "#f3eee7" : "#070605");
}

/** Light/dark switch with a circular reveal (View Transitions) where supported. */
export function ThemeToggle({ className }: { className?: string }) {
  function toggle(e: MouseEvent<HTMLButtonElement>) {
    const root = document.documentElement;
    const next: Theme = root.dataset.theme === "light" ? "dark" : "light";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || !("startViewTransition" in document)) {
      applyTheme(next);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const transition = document.startViewTransition(() => applyTheme(next));
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 700, easing: "cubic-bezier(.65,0,.35,1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      title="Switch theme"
      className={cn(
        "glass grid size-10 place-items-center rounded-full text-fg transition-transform duration-300 hover:scale-105",
        className,
      )}
    >
      <Sun className="only-dark" size={17} />
      <Moon className="only-light" size={17} />
    </button>
  );
}
