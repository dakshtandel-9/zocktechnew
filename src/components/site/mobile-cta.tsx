"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { WhatsApp } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { whatsapp } from "@/lib/site";

/**
 * Sticky WhatsApp + quote bar on phones, shown between the page's first section (#top) and its
 * closing call to action (`endId`), so it never covers a CTA that already says the same thing.
 */
export function MobileCta({ quoteHref = "#contact", endId = "contact" }: { quoteHref?: string; endId?: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const contact = document.getElementById(endId);
    let pastHero = false;
    let atContact = false;
    const update = () => setShow(pastHero && !atContact);
    const ioHero = new IntersectionObserver(([e]) => {
      pastHero = !e.isIntersecting;
      update();
    });
    const ioContact = new IntersectionObserver(
      ([e]) => {
        atContact = e.isIntersecting;
        update();
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    if (hero) ioHero.observe(hero);
    if (contact) ioContact.observe(contact);
    return () => {
      ioHero.disconnect();
      ioContact.disconnect();
    };
  }, [endId]);

  return (
    <div
      className={cn(
        "fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 transition-all duration-500 ease-[var(--ease-expo)] md:hidden",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[150%] opacity-0",
      )}
    >
      <div className="glass glass-edge flex items-center gap-1.5 rounded-full p-1.5">
        {quoteHref.startsWith("#") ? (
          <a href={quoteHref} className="btn btn-ghost h-12 flex-1 text-sm">
            Get a quote
          </a>
        ) : (
          <Link href={quoteHref} className="btn btn-ghost h-12 flex-1 text-sm">
            Get a quote
          </Link>
        )}
        <a
          href={whatsapp("Hi ZockTech! I'd like to discuss a project.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary h-12 flex-[1.4] text-sm"
        >
          <WhatsApp size={18} fill="#000" /> WhatsApp us
        </a>
      </div>
    </div>
  );
}
