"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Buttery smooth scrolling on desktop. Native scrolling for touch and reduced-motion users. */
export function SmoothScroll() {
  const pathname = usePathname();
  const lastPath = useRef(pathname);

  // New page = start at the top, instantly. Without this Lenis keeps gliding toward the old page's
  // scroll target, so a footer link opened the new page at the bottom and then scrolled it up.
  useLayoutEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    if (window.location.hash) return; // let #anchor links land where they point
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Anchor offsets come from `scroll-padding-top` in globals.css (Lenis reads it).
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      anchors: true,
      // Clicking a link to another page while a glide is still running (e.g. a footer link right
      // after scrolling down) must stop the glide; otherwise Lenis drags the new page to the old
      // scroll position and it opens at the bottom instead of the top.
      stopInertiaOnNavigate: true,
    });
    window.__lenis = lenis;
    return () => {
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);
  return null;
}
