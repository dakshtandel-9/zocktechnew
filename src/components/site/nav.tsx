"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import { useEffect, useState, type ComponentProps } from "react";
import { ConsentNote } from "@/components/site/consent-note";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { ArrowUpRight, Close, Instagram, Menu, Phone, WhatsApp } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/cn";
import { navLinks, pageHref, site, whatsapp, type SitePage } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;
const talkLink = whatsapp("Hi ZockTech! I'd like to talk about a project.");

/** Same-page anchors stay plain links (Lenis smooth-scrolls them); anything else is a Next.js route link. */
function SiteLink({ href, ...props }: ComponentProps<"a"> & { href: string }) {
  return href.startsWith("#") ? <a href={href} {...props} /> : <Link href={href} {...props} />;
}

export function Nav({ page = "home" }: { page?: SitePage }) {
  const home = page === "home";
  // Off the homepage, the current section is the page itself.
  const [active, setActive] = useState<string | null>(home ? null : page);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  // Glass background once scrolled; tuck away on scroll down, return on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 40);
        setHidden(y > 640 && y > last + 4);
        if (y < last - 4 || y < 640) setHidden(false);
        last = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the homepage section currently in the middle of the viewport.
  useEffect(() => {
    if (!home) return;
    const ids = navLinks.map((l) => l.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const top = document.getElementById("top");
    const ioTop = new IntersectionObserver(([e]) => e.isIntersecting && setActive(null), {
      rootMargin: "0px 0px -60% 0px",
    });
    if (top) ioTop.observe(top);
    return () => {
      io.disconnect();
      ioTop.disconnect();
    };
  }, [home]);

  // Lock scrolling behind the mobile menu.
  useEffect(() => {
    const lenis = window.__lenis;
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[var(--ease-expo)]",
          hidden && !open && "-translate-y-[130%]",
        )}
      >
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-brand-deep via-brand to-brand-soft"
        />
        <div className="anim-nav px-3 pt-3 sm:px-5 lg:px-8">
          <div
            className={cn(
              "relative mx-auto grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-full px-2 transition-[max-width,height,padding] duration-700 ease-[var(--ease-expo)] md:px-3",
              scrolled ? "max-w-[1180px] md:h-[60px]" : "max-w-[1440px] md:h-16",
            )}
          >
            {/* frosted capsule that settles in once the page scrolls */}
            <div
              aria-hidden
              className={cn(
                "glass glass-header glass-edge absolute inset-0 rounded-full transition-[opacity,transform] duration-500 ease-[var(--ease-expo)]",
                scrolled ? "opacity-100" : "scale-[0.985] opacity-0",
              )}
            />

            {/* mobile: menu | logo | call */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="glass relative grid size-11 place-items-center justify-self-start rounded-full md:hidden"
            >
              <Menu size={20} />
            </button>

            <SiteLink
              href={home ? "#top" : "/"}
              aria-label="ZockTech home"
              className="relative justify-self-center transition-opacity hover:opacity-80 md:justify-self-start md:pl-2"
            >
              <Logo className="h-[22px] w-auto md:h-[26px] lg:h-[28px]" />
            </SiteLink>

            <nav
              aria-label="Primary"
              className={cn(
                "glass relative hidden items-center gap-0.5 rounded-full p-1 transition-shadow duration-500 md:flex",
                scrolled && "shadow-none [--glass-bg:rgb(0_0_0/0.16)] light:[--glass-bg:rgb(255_255_255/0.45)]",
              )}
            >
              {navLinks.map((l) => (
                <SiteLink
                  key={l.id}
                  href={pageHref(l.href, page)}
                  aria-current={active === l.id ? (home ? "true" : "page") : undefined}
                  className={cn(
                    "relative rounded-full px-3 py-2 text-[13px] font-medium transition-colors duration-300 lg:px-4 xl:px-5",
                    active === l.id ? "text-[#170c03]" : "text-muted hover:bg-chip hover:text-fg",
                  )}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-b from-[#ffad66] to-[#f08326] shadow-[0_6px_20px_-6px_rgb(249_148_59/0.8)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </SiteLink>
              ))}
            </nav>

            <div className="relative flex items-center gap-2 justify-self-end">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ZockTech on Instagram"
                className="glass hidden size-10 place-items-center rounded-full transition-transform duration-300 hover:scale-105 lg:grid"
              >
                <Instagram size={17} />
              </a>
              <ThemeToggle className="hidden md:grid" />
              <a
                href={talkLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ink hidden h-11 gap-3 pl-5 pr-1.5 text-[13px] md:inline-flex"
              >
                Let&apos;s talk
                <span className="grid size-8 place-items-center rounded-full bg-brand text-[#170c03]">
                  <Phone size={15} />
                </span>
              </a>
              <a
                href={talkLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with ZockTech on WhatsApp"
                className="glass grid size-11 place-items-center rounded-full md:hidden"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            data-lenis-prevent
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-bg/70 px-5 pb-8 pt-4 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-brand/30 blur-3xl" />
            <div className="relative flex h-14 items-center justify-between">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="glass grid size-11 place-items-center rounded-full"
              >
                <Close size={20} />
              </button>
              <Logo className="h-[22px] w-auto" />
              <ThemeToggle className="size-11" />
            </div>

            <nav aria-label="Mobile" className="relative mt-12 flex flex-col">
              {[{ id: "top", label: "Home", href: home ? "/#top" : "/" }, ...navLinks].map((l, i) => (
                <motion.div
                  key={l.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.7, ease: EASE }}
                >
                  <SiteLink
                    href={pageHref(l.href, page)}
                    onClick={() => setOpen(false)}
                    aria-current={!home && active === l.id ? "page" : undefined}
                    className="flex items-center justify-between border-b border-line py-4 font-display text-[2.6rem] font-light leading-none tracking-tight"
                  >
                    {l.label}
                    <ArrowUpRight size={22} className="text-brand" />
                  </SiteLink>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
              className="relative mt-auto grid gap-3 pt-10"
            >
              <a href={talkLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary h-14 text-base">
                <WhatsApp size={20} /> Chat on WhatsApp
              </a>
              <ConsentNote />
              <div className="flex items-center justify-between text-sm text-muted">
                <a href={site.phoneHref}>{site.phoneDisplay}</a>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer">
                  {site.instagramHandle}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
