"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, type CSSProperties, type PointerEvent } from "react";
import { ArrowDownRight, ArrowUpRight } from "@/components/ui/icons";
import { ZMark } from "@/components/ui/z-mark";
import { whatsapp } from "@/lib/site";

const words = ["One", "studio", "for", "your", "website,", "marketing", "&", "content."];
const startProject = whatsapp("Hi ZockTech! I'd like to start a project.");
const d = (n: number) => ({ "--d": n }) as CSSProperties;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const k = reduce ? 0 : 1;

  // Scroll-linked exit: words split apart, portrait sinks, cards drift up.
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(p, [0, 1], [0, 170 * k]);
  const portraitScale = useTransform(p, [0, 1], [1, 1 + 0.07 * k]);
  const copyY = useTransform(p, [0, 1], [0, -110 * k]);
  const fade = useTransform(p, [0, 0.7], [1, 0]);
  const wordA = useTransform(p, [0, 1], [0, -240 * k]);
  const wordB = useTransform(p, [0, 1], [0, 240 * k]);
  const cardsFast = useTransform(p, [0, 1], [0, -280 * k]);
  const cardsSlow = useTransform(p, [0, 1], [0, -150 * k]);
  const zRotate = useTransform(p, [0, 1], [0, 16 * k]);
  const zScale = useTransform(p, [0, 1], [1, 1 + 0.2 * k]);

  // Cursor parallax (mouse only).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 45, damping: 16, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 45, damping: 16, mass: 0.6 });
  const cardX = useTransform(sx, (v) => v * 22 * k);
  const cardY = useTransform(sy, (v) => v * 16 * k);
  const cardXInv = useTransform(sx, (v) => v * -16 * k);
  const cardYInv = useTransform(sy, (v) => v * -12 * k);
  const portraitX = useTransform(sx, (v) => v * -10 * k);
  const zX = useTransform(sx, (v) => v * 30 * k);
  const zY = useTransform(sy, (v) => v * 20 * k);

  function onPointerMove(e: PointerEvent<HTMLElement>) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  }

  return (
    <section
      ref={ref}
      id="top"
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative isolate flex min-h-[max(100svh,640px)] flex-col overflow-hidden lg:min-h-[max(100svh,780px)]"
    >
      {/* backdrop: the logo's Z as a giant watermark, then the breathing glow above it */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-30">
        <motion.div
          style={{ x: zX, y: zY, rotate: zRotate, scale: zScale }}
          className="absolute left-1/2 top-[30%] h-[62%] -translate-x-[58%] opacity-70 lg:left-[54%] lg:top-[7%] lg:h-[86%] lg:opacity-100"
        >
          <ZMark className="h-full w-auto text-[var(--z-mark)]" />
        </motion.div>
      </div>

      {/* dark theme only: her silhouette occludes the Z, so it sits behind her instead of showing through dark hair and back */}
      <motion.div
        aria-hidden
        style={{ y: portraitY, scale: portraitScale, x: portraitX }}
        className="pointer-events-none absolute bottom-0 left-1/2 -z-20 hidden aspect-[3/4] h-[64%] origin-bottom -translate-x-1/2 sm:h-[70%] lg:left-[54%] lg:h-[93%] dark:block"
      >
        <div
          className="size-full bg-bg"
          style={{
            WebkitMask: "url(/media/hero-silhouette.svg) center / 100% 100% no-repeat",
            mask: "url(/media/hero-silhouette.svg) center / 100% 100% no-repeat",
          }}
        />
      </motion.div>

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[22%] size-[min(110vw,820px)] -translate-x-1/2 lg:left-[54%] lg:top-[10%]">
          <div className="hero-glow size-full rounded-full" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg via-bg/70 to-transparent" />
      </div>

      {/* portrait */}
      <motion.div
        style={{ y: portraitY, scale: portraitScale, x: portraitX }}
        className="absolute bottom-0 left-1/2 z-0 aspect-[3/4] h-[64%] origin-bottom -translate-x-1/2 sm:h-[70%] lg:left-[54%] lg:h-[93%] dark:mix-blend-lighten light:mix-blend-darken"
      >
        <div className="anim-portrait relative size-full">
          <Image
            src="/media/hero-dark.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 90vw, 50vw"
            fetchPriority="high"
            className="only-dark portrait-mask object-cover object-top"
          />
          <Image
            src="/media/hero-light.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 90vw, 50vw"
            fetchPriority="high"
            className="only-light portrait-mask object-cover object-top"
          />
        </div>
      </motion.div>

      {/* headline */}
      <motion.div
        style={{ y: copyY, opacity: fade }}
        className="relative z-20 mx-auto w-full max-w-[1440px] px-5 pt-[5.75rem] sm:px-8 md:pt-32 lg:px-12 lg:pt-[clamp(8.5rem,18vh,11rem)]"
      >
        <p className="eyebrow anim-fade-up" style={d(0.15)}>
          <span className="live-dot" /> Digital studio · India
        </p>
        <h1 className="mt-4 max-w-[15ch] font-display text-[clamp(2.6rem,4.5vw,4.6rem)] font-light leading-[1.02] tracking-[-0.035em] sm:mt-5">
          {words.map((w, i) => (
            <span key={i} className="reveal-mask mr-[0.22em] last:mr-0">
              <span className="anim-rise" style={d(0.22 + i * 0.06)}>
                {w === "&" ? <span className="font-normal text-brand">&amp;</span> : w}
              </span>
            </span>
          ))}
        </h1>
        <p
          className="anim-fade-up mt-5 max-w-[22rem] text-[15px] leading-relaxed text-muted max-sm:hidden lg:mt-6"
          style={d(0.85)}
        >
          Websites, performance marketing, design and Instagram content, built and run by one team you can reach on
          WhatsApp.
        </p>
        <div className="anim-fade-up mt-7 hidden lg:block" style={d(1)}>
          <a href="#work" className="btn btn-ghost h-11 px-5 text-[13px]">
            See our work <ArrowDownRight size={15} />
          </a>
        </div>
      </motion.div>

      {/* top-right card */}
      <motion.div
        style={{ y: cardsFast, opacity: fade }}
        className="absolute right-6 top-[17%] z-30 hidden w-[min(25vw,350px)] lg:block xl:right-12"
      >
        <motion.div style={{ x: cardX, y: cardY }}>
          <div className="anim-card" style={d(0.95)}>
            <div className="anim-float" style={{ "--float": "8s" } as CSSProperties}>
              <div className="glass glass-edge flex gap-2.5 rounded-[22px] p-2.5">
                <div className="flex min-w-0 flex-1 flex-col p-2">
                  <p className="text-[12.5px] font-semibold tracking-[0.08em]">FUTURE-READY</p>
                  <p className="mt-2 text-[12px] leading-snug text-muted">
                    Websites and web apps on React + Next.js. Live in days, not months.
                  </p>
                  <a
                    href={startProject}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ink mt-auto h-8 w-fit px-4 text-[11px]"
                  >
                    Book a call
                  </a>
                </div>
                <div className="relative aspect-[4/5] w-[44%] shrink-0 overflow-hidden rounded-[16px]">
                  <Image src="/media/build.jpg" alt="" fill sizes="160px" className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* bottom-left cards */}
      <motion.div
        style={{ y: cardsSlow, opacity: fade }}
        className="absolute bottom-[10%] left-6 z-30 hidden lg:block xl:left-12"
      >
        <motion.div style={{ x: cardXInv, y: cardYInv }} className="flex items-stretch gap-3">
          <div className="anim-card" style={d(1.08)}>
            <div className="anim-float h-full" style={{ "--float": "7s", "--fd": 0.6 } as CSSProperties}>
              <a
                href="#services"
                className="group flex h-[150px] w-[164px] flex-col justify-between rounded-[22px] bg-gradient-to-br from-[#ffb978] via-[#f9943b] to-[#e5600c] p-4 text-[#1a0d03] shadow-[0_24px_60px_-20px_rgb(249_148_59/0.85)] transition-transform duration-500 hover:-rotate-2"
              >
                <span className="flex items-center gap-1">
                  <i className="h-1.5 w-6 rounded-full bg-[#1a0d03]" />
                  <i className="size-1.5 rounded-full bg-[#1a0d03]/45" />
                  <i className="size-1.5 rounded-full bg-[#1a0d03]/45" />
                </span>
                <span className="font-display text-[15px] font-bold uppercase leading-[1.05] tracking-wide">
                  Performance
                  <br />
                  marketing &amp;
                  <br />
                  growth
                </span>
              </a>
            </div>
          </div>
          <div className="anim-card" style={d(1.18)}>
            <div className="anim-float h-full" style={{ "--float": "9s", "--fd": 1.2 } as CSSProperties}>
              <div className="glass glass-edge flex h-[150px] w-[300px] gap-2.5 rounded-[22px] p-2.5">
                <div className="flex min-w-0 flex-1 flex-col p-2">
                  <p className="text-[12.5px] font-semibold tracking-[0.08em]">FULL-CYCLE</p>
                  <p className="mt-1.5 text-[11.5px] leading-snug text-muted">
                    Strategy, design, ads, reels and launch. One team, start to finish.
                  </p>
                  <a href="#services" className="mt-auto text-[12px] font-semibold underline underline-offset-4">
                    View services
                  </a>
                </div>
                <div className="relative w-[46%] shrink-0 overflow-hidden rounded-[16px]">
                  <Image src="/media/swirl.jpg" alt="" fill sizes="140px" className="object-cover" />
                  <span className="absolute bottom-2 right-2 grid size-7 place-items-center rounded-full bg-[#120c08] text-white">
                    <ArrowDownRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* giant words */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[6.75rem] z-20 select-none px-4 sm:bottom-32 lg:bottom-[9%] lg:pr-[3.2vw]">
        <motion.div style={{ x: wordA }} className="flex items-end justify-center gap-[1.6vw] lg:justify-end">
          <span className="reveal-mask giant -mb-[0.22em] pb-[0.22em] text-[clamp(4.1rem,21vw,7.5rem)] lg:text-[clamp(5rem,10.6vw,10.75rem)]">
            <span className="anim-rise block dark:[text-shadow:0_12px_50px_rgb(0_0_0/0.35)]" style={d(0.42)}>
              digital
            </span>
          </span>
          <a
            href={startProject}
            target="_blank"
            rel="noopener noreferrer"
            className="anim-card btn btn-primary pointer-events-auto mb-[1.3vw] hidden h-12 px-6 text-sm lg:inline-flex"
            style={d(1.25)}
          >
            Start a project <ArrowUpRight size={16} />
          </a>
        </motion.div>
        <motion.div style={{ x: wordB }} className="flex justify-center pl-[14vw] lg:justify-end lg:pl-0">
          <span className="reveal-mask giant -mt-[0.04em] text-[clamp(4.1rem,21vw,7.5rem)] lg:text-[clamp(5rem,10.6vw,10.75rem)]">
            <span className="anim-rise block dark:[text-shadow:0_12px_50px_rgb(0_0_0/0.35)]" style={d(0.56)}>
              studio
            </span>
          </span>
        </motion.div>
      </div>

      {/* mobile CTA */}
      <div className="anim-fade-up absolute inset-x-4 bottom-6 z-30 sm:inset-x-8 lg:hidden" style={d(0.9)}>
        <a href={startProject} target="_blank" rel="noopener noreferrer" className="btn btn-primary h-14 w-full text-base">
          Start a project <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}
