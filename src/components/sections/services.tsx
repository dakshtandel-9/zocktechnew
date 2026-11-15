"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import { ConsentNote } from "@/components/site/consent-note";
import { ArrowUpRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { Spotlight } from "@/components/ui/spotlight";
import { pillars, whatsapp, type Pillar } from "@/lib/site";
import { useMediaQuery } from "@/lib/use-media-query";

/** Same breakpoint as the `stack:` variant in globals.css. */
const STACK_QUERY = "(min-width: 1024px) and (min-height: 740px)";

/** The stacked Build / Grow / Create cards. `standalone` drops the section header (the /services page has its own). */
export function Services({ standalone = false }: { standalone?: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });
  const stacking = useMediaQuery(STACK_QUERY);
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      id={standalone ? "pillars" : "services"}
      aria-label={standalone ? "Build, Grow and Create" : undefined}
      className={standalone ? "relative px-4 pb-16 sm:px-8 lg:px-12 lg:pb-24" : "relative px-4 py-24 sm:px-8 lg:px-12 lg:py-32"}
    >
      <div className="mx-auto max-w-[1440px]">
        {!standalone && (
        <div className="flex flex-col justify-between gap-6 px-1 lg:flex-row lg:items-end">
          <Reveal>
            <p className="section-label">
              <b>02/</b> expertise
            </p>
            <h2 className="mt-5 max-w-[14ch] font-display text-[clamp(2.4rem,5vw,4.6rem)] font-light leading-[1.02] tracking-[-0.035em]">
              Everything your brand needs <span className="text-brand">online.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="max-w-sm">
            <p className="text-[15px] leading-relaxed text-muted">
              Pick one service or let us run all three. Every project is scoped and quoted around your goals, never
              from a price list.
            </p>
          </Reveal>
        </div>
        )}

        <div ref={container} className={standalone ? "relative" : "relative mt-12 lg:mt-16"}>
          {pillars.map((p, i) => (
            <PillarCard
              key={p.id}
              pillar={p}
              index={i}
              total={pillars.length}
              progress={scrollYProgress}
              animate={stacking && !reduce}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarCard({
  pillar,
  index,
  total,
  progress,
  animate,
}: {
  pillar: Pillar;
  index: number;
  total: number;
  progress: MotionValue<number>;
  animate: boolean;
}) {
  const last = index === total - 1;
  const span = total - 1;
  const start = index / span;
  const end = Math.min(1, (index + 1) / span);
  const targetScale = 1 - (span - index) * 0.05;

  const scale = useTransform(progress, last ? [0, 1] : [start, 1], last || !animate ? [1, 1] : [1, targetScale]);
  const dim = useTransform(progress, last ? [0, 1] : [start, end], last || !animate ? [0, 0] : [0, 0.45]);

  return (
    <div id={pillar.id} className="mb-5 scroll-mt-24 stack:sticky stack:top-0 stack:mb-0 stack:flex stack:h-svh stack:items-start">
      <motion.article
        style={{ scale, "--offset": `${index * 28}px` } as unknown as CSSProperties}
        className="group relative w-full origin-top stack:top-[calc(6.5rem+var(--offset))] stack:h-[min(calc(100svh-11rem),700px)]"
      >
        <Spotlight className="glass glass-edge relative h-full overflow-hidden rounded-[32px]">
          <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 z-30 bg-bg" />

          {/* oversized outline word for depth */}
          <span
            aria-hidden
            className="giant outline-text pointer-events-none absolute -bottom-[0.18em] right-4 hidden text-[13vw] opacity-[0.08] lg:block"
          >
            {pillar.name}
          </span>

          <div className="relative grid h-full gap-6 p-4 sm:p-6 lg:grid-cols-12 lg:gap-8 lg:p-9">
            <div className="flex flex-col lg:col-span-7">
              <div className="flex items-center gap-3 text-[13px] text-muted">
                <span className="font-semibold text-brand-text">{pillar.index}</span>
                <span className="h-px w-10 bg-line" />
                {pillar.kicker}
              </div>
              <h3 className="giant mt-4 text-[clamp(3.4rem,6.4vw,6.4rem)]">
                {pillar.name}
                <span className="text-brand">.</span>
              </h3>
              <p className="mt-4 font-display text-[clamp(1.25rem,1.9vw,1.6rem)] leading-snug tracking-[-0.01em]">
                {pillar.title}
              </p>
              <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-muted">{pillar.body}</p>

              <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {pillar.services.map((s) => (
                  <li key={s.name} className="flex gap-3">
                    <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-brand" />
                    <span>
                      <span className="block text-[15px] font-semibold">{s.name}</span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-muted">{s.desc}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-3 lg:mt-auto lg:pt-7">
                <a
                  href={whatsapp(pillar.cta.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary h-12 px-6 text-sm"
                >
                  {pillar.cta.label} <ArrowUpRight size={16} />
                </a>
                <Link href="/contact" className="btn btn-ghost h-12 px-5 text-sm">
                  Get a custom quote
                </Link>
                <ConsentNote className="basis-full" />
              </div>
            </div>

            <div className="relative order-first min-h-[220px] overflow-hidden rounded-[24px] ring-1 ring-line sm:min-h-[300px] lg:order-none lg:col-span-5 lg:min-h-0">
              <Image
                src={pillar.image.src}
                alt={pillar.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-expo)] group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
              <div className="absolute left-3 top-3 flex flex-wrap gap-2 sm:left-4 sm:top-4">
                {pillar.chips.map((c) => (
                  <span
                    key={c}
                    className="glass rounded-full px-3 py-1.5 text-[12px] font-medium !text-white [--glass-bg:rgb(20_14_10/0.32)] [--glass-border:rgb(255_255_255/0.2)]"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <span className="giant absolute bottom-2 right-4 text-[clamp(4rem,7vw,6.5rem)] text-white/90">
                {pillar.index}
              </span>
            </div>
          </div>
        </Spotlight>
      </motion.article>
    </div>
  );
}
