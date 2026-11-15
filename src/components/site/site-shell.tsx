import type { ReactNode } from "react";
import { Footer } from "@/components/sections/footer";
import { Ambient } from "@/components/site/ambient";
import { MobileCta } from "@/components/site/mobile-cta";
import { MotionProvider } from "@/components/site/motion-provider";
import { Nav } from "@/components/site/nav";
import type { SitePage } from "@/lib/site";

/**
 * Everything around a page: ambient light, nav, footer and the phone CTA bar.
 * Each page passes its own `page`, so links resolve to same-page anchors on the homepage and to
 * routes elsewhere (no pathname hook, which keeps every page fully prerendered).
 * Every page needs an element with id="top" as its first section.
 */
export function SiteShell({ page, children }: { page: SitePage; children: ReactNode }) {
  // Pages with the enquiry form on them link to it in place; everywhere else links to /contact.
  const hasForm = page === "home" || page === "contact";
  return (
    <MotionProvider>
      <Ambient />
      <Nav page={page} />
      {children}
      <Footer page={page} />
      <MobileCta quoteHref={hasForm ? "#contact" : "/contact"} endId={hasForm ? "contact" : "cta"} />
    </MotionProvider>
  );
}
