"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LEGAL_ROUTES = ["/terms", "/privacy"] as const;

/**
 * Loads the Terms and Privacy pages in the background as soon as the current page is idle.
 * Their links sit in the footer, the contact form and the consent line on every page; without
 * this, a click right after a fresh load had to wait for the page to download, so the site
 * appeared stuck for a moment and then jumped.
 */
export function PrefetchLegal() {
  const router = useRouter();
  useEffect(() => {
    const run = () => LEGAL_ROUTES.forEach((href) => router.prefetch(href));
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(run, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(run, 1000);
    return () => clearTimeout(t);
  }, [router]);
  return null;
}
