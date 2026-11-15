"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/lib/use-media-query";

/*
 * Frames from the live Tuklogic story, one per chapter. English and Arabic chapter names are the
 * ones the site itself uses (public/locales/{en,ar}/home.json in the Tuklogic project).
 */
const ERAS = [
  { id: "early-humans", en: "Early humans", ar: "العصر الحجري", caption: "Fire and the first tools: the oldest technology there is." },
  { id: "egypt", en: "Ancient Egypt", ar: "مصر القديمة", caption: "Irrigation, records and governance, engineered to outlast generations." },
  { id: "china", en: "Ancient China", ar: "الصين القديمة", caption: "Water clocks and calendars: systems built around people." },
  { id: "greece", en: "Ancient Greece", ar: "اليونان القديمة", caption: "Craft, discipline and the first great engineers." },
  { id: "golden-age", en: "India's Golden Age", ar: "العصر الذهبي", caption: "Astronomy and mathematics that looked further than anyone before." },
  { id: "present", en: "Tuklogic, today", ar: "الحاضر", caption: "Technology and talent, built around your goals." },
] as const;

type Era = (typeof ERAS)[number];

function EraCard({ era, index, className, sizes }: { era: Era; index: number; className?: string; sizes: string }) {
  return (
    <figure className={cn("relative shrink-0 overflow-hidden rounded-[26px] bg-[#040716] ring-1 ring-white/10", className)}>
      <Image
        src={`/work/case/tuklogic/${era.id}.webp`}
        alt={`${era.en}: a frame from the Tuklogic story`}
        fill
        sizes={sizes}
        className="object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-8">
        <div className="min-w-0">
          <span className="font-display text-sm font-semibold text-[var(--cs)]">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="mt-2 font-display text-[clamp(1.6rem,3vw,2.8rem)] font-semibold leading-none tracking-[-0.03em]">
            {era.en}
          </h3>
          <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-white/75 sm:text-[15px]">{era.caption}</p>
        </div>
        <p lang="ar" dir="rtl" className="shrink-0 text-lg font-medium text-white/80 sm:text-2xl lg:text-3xl">
          {era.ar}
        </p>
      </figcaption>
    </figure>
  );
}

export function TuklogicTimeline() {
  const wide = useMediaQuery("(min-width: 1024px) and (min-height: 640px)");
  const reduce = useReducedMotion() ?? false;
  return wide && !reduce ? <Pinned /> : <Swipe />;
}

/** Desktop: the page scroll drives the chapters sideways while the stage stays pinned. */
function Pinned() {
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => -v * distance);

  return (
    <div ref={ref} className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div
          ref={track}
          style={{ x }}
          className="flex w-max gap-6 px-[max(3rem,calc((100vw-1440px)/2+3rem))]"
        >
          {ERAS.map((era, i) => (
            <EraCard
              key={era.id}
              era={era}
              index={i}
              sizes="62vw"
              className="aspect-[16/9] w-[min(62vw,calc(68vh*16/9),1040px)]"
            />
          ))}
        </motion.div>

        <div className="mx-auto mt-8 w-full max-w-[1440px] px-12">
          <div className="relative h-px bg-line">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="absolute inset-0 origin-left bg-[var(--cs)] shadow-[0_0_12px_rgb(var(--cs-rgb)/0.9)]"
            />
          </div>
          <ol className="mt-4 grid grid-cols-6 text-[12px] text-muted">
            {ERAS.map((era) => (
              <li key={era.id}>{era.en}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

/** Phones, tablets and reduced motion: a native swipeable row. */
function Swipe() {
  return (
    <div>
      <ol
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 sm:scroll-px-8 sm:gap-4 sm:px-8"
        aria-label="Chapters of the Tuklogic story"
      >
        {ERAS.map((era, i) => (
          <li key={era.id} className="snap-start">
            <EraCard
              era={era}
              index={i}
              sizes="(max-width: 640px) 86vw, 70vw"
              className="aspect-[4/5] w-[84vw] max-w-[620px] sm:aspect-[16/10] sm:w-[70vw]"
            />
          </li>
        ))}
      </ol>
      <p className="mt-4 px-5 text-xs text-faint sm:px-9">Swipe through the chapters →</p>
    </div>
  );
}
