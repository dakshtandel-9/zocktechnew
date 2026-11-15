"use client";

import Lenis from "lenis";
import { useEffect } from "react";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Buttery smooth scrolling on desktop. Native scrolling for touch and reduced-motion users. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Anchor offsets come from `scroll-padding-top` in globals.css (Lenis reads it).
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      anchors: true,
    });
    window.__lenis = lenis;
    return () => {
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);
  return null;
}
