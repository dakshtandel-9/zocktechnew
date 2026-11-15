"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight, Check } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { process, whatsapp } from "@/lib/site";

type Step = (typeof process)[number];

/** Four-step timeline. `standalone` (the /process page) drops the header and shows each step's details. */
export function Process({ standalone = false }: { standalone?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 78%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const line = reduce ? 1 : progress;

  return (
    <section
      id={standalone ? "steps" : "process"}
      aria-label={standalone ? "The four steps" : undefined}
      className={standalone ? "relative px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28" : "relative px-5 py-24 sm:px-8 lg:px-12 lg:py-32"}
    >
      <div className="mx-auto max-w-[1440px]">
        {!standalone && (
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal>
            <p className="section-label">
              <b>04/</b> process
            </p>
            <h2 className="mt-5 max-w-[14ch] font-display text-[clamp(2.4rem,5vw,4.6rem)] font-light leading-[1.02] tracking-[-0.035em]">
              From first chat to <span className="text-brand">real results.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="max-w-sm">
            <p className="text-[15px] leading-relaxed text-muted">
              Simple, fast and transparent. Four steps, whether we&apos;re building a site, running ads or creating
              content.
            </p>
          </Reveal>
        </div>
        )}

        <div ref={ref} className={standalone ? "relative" : "relative mt-14 lg:mt-20"}>
          <div aria-hidden className="absolute inset-x-0 top-7 hidden h-px bg-line lg:block">
            <motion.div
              style={{ scaleX: line }}
              className="h-full origin-left bg-gradient-to-r from-brand-deep via-brand to-brand-soft"
            />
          </div>
          <div aria-hidden className="absolute bottom-0 left-7 top-0 w-px bg-line lg:hidden">
            <motion.div
              style={{ scaleY: line }}
              className="size-full origin-top bg-gradient-to-b from-brand-deep via-brand to-brand-soft"
            />
          </div>
          <ol className="relative grid gap-6 lg:grid-cols-4 lg:gap-5">
            {process.map((s, i) => (
              <StepItem key={s.n} step={s} index={i} total={process.length} progress={progress} still={reduce} detailed={standalone} />
            ))}
          </ol>
        </div>

        {!standalone && (
        <Reveal className="mt-14 flex justify-center">
          <a
            href={whatsapp("Hi ZockTech! I'd like to start a project. Can we set up a quick call?")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary h-12 px-7 text-sm"
          >
            Start with a discovery chat <ArrowUpRight size={16} />
          </a>
        </Reveal>
        )}
      </div>
    </section>
  );
}

function StepItem({
  step,
  index,
  total,
  progress,
  still,
  detailed,
}: {
  step: Step;
  index: number;
  total: number;
  progress: MotionValue<number>;
  still: boolean;
  detailed: boolean;
}) {
  const at = index / total;
  const lit = useTransform(progress, [Math.max(0, at - 0.03), at + 0.04], [0, 1]);

  return (
    <li className="relative pl-[4.75rem] lg:pl-0">
      <div className="absolute left-0 top-0 lg:relative">
        <div className="glass relative grid size-14 place-items-center rounded-full text-sm font-semibold">
          <motion.span
            aria-hidden
            style={{ opacity: still ? 1 : lit }}
            className="absolute -inset-px rounded-full bg-gradient-to-b from-[#ffad66] to-[#ef7a20] shadow-[0_0_44px_rgb(249_148_59/0.6)]"
          />
          <span className="relative">{step.n}</span>
          <motion.span
            aria-hidden
            style={{ opacity: still ? 1 : lit }}
            className="absolute inset-0 grid place-items-center text-[#170c03]"
          >
            {step.n}
          </motion.span>
        </div>
      </div>
      <Reveal delay={index * 0.08} className="glass glass-edge rounded-[24px] p-6 lg:mt-6">
        <h3 className="font-display text-2xl font-medium tracking-[-0.02em]">{step.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
        {detailed && (
          <ul className="mt-5 space-y-2.5 text-[13.5px] leading-snug">
            {step.details.map((d) => (
              <li key={d} className="flex gap-2.5">
                <span aria-hidden className="mt-[6px] size-1.5 shrink-0 rounded-full bg-brand" />
                {d}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-5 flex items-start gap-2 border-t border-line pt-4 text-[13px]">
          <Check size={16} className="mt-px shrink-0 text-brand" />
          <span>
            <span className="text-muted">You get: </span>
            {step.deliverable}
          </span>
        </p>
      </Reveal>
    </li>
  );
}
