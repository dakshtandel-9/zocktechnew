"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

const statement =
  "We don't just design websites. We build the digital engine that helps your brand get found, get chosen and keep growing.";
const accent = new Set(["digital", "engine"]);

function Word({
  children,
  progress,
  range,
  highlight,
  still,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  highlight: boolean;
  still: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span
      style={{ opacity: still ? 1 : opacity }}
      className={cn("mr-[0.24em] inline-block", highlight && "text-brand")}
    >
      {children}
    </motion.span>
  );
}

export function Philosophy() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({ target: textRef, offset: ["start 0.85", "end 0.45"] });
  const { scrollYProgress: imgP } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
  const imgY = useTransform(imgP, [0, 1], reduce ? ["0%", "0%"] : ["-9%", "9%"]);

  const tokens = statement.split(" ");

  return (
    <section id="about" className="relative px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="section-label">
              <b>01/</b> philosophy
            </p>
          </Reveal>
          <p
            ref={textRef}
            className="font-display text-[clamp(1.85rem,3.5vw,3.35rem)] font-normal leading-[1.12] tracking-[-0.025em] lg:col-span-8"
          >
            {tokens.map((w, i) => (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[i / tokens.length, (i + 1) / tokens.length]}
                highlight={accent.has(w)}
                still={reduce}
              >
                {w}
              </Word>
            ))}
          </p>
        </div>

        <div className="mt-16 grid gap-5 lg:mt-24 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-3 lg:pb-2 lg:pr-6">
            <p className="text-[13px] font-bold uppercase tracking-[0.08em]">
              Build. Grow.
              <br />
              Create.
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              We cut through the noise to find what makes your business different, then turn it into a website,
              campaigns and content that work together.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div
              ref={imageRef}
              className="relative aspect-[16/10] overflow-hidden rounded-[28px] ring-1 ring-line lg:aspect-auto lg:h-[300px]"
            >
              <motion.div style={{ y: imgY }} className="absolute -inset-y-[12%] inset-x-0">
                <Image
                  src="/media/tunnel.jpg"
                  alt="A lone figure walking through a glowing orange tunnel"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="glass absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium !text-white [--glass-bg:rgb(20_14_10/0.35)] [--glass-border:rgb(255_255_255/0.18)]">
                <span className="live-dot" /> One team · every channel
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="lg:col-span-4">
            <div className="relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-[28px] bg-ink p-7 text-ink-fg lg:h-[300px]">
              <span aria-hidden className="flex items-center justify-end gap-1">
                <i className="h-1.5 w-8 rounded-full bg-current" />
                <i className="size-1.5 rounded-full bg-brand" />
                <i className="size-1.5 rounded-full bg-brand" />
                <i className="size-1.5 rounded-full bg-brand" />
              </span>
              <div>
                <h3 className="font-display text-[2.4rem] font-normal leading-none tracking-[-0.03em]">
                  Zero templates
                </h3>
                <p className="mt-3 max-w-sm text-[13px] leading-relaxed opacity-70">
                  Every site, campaign and post is made from scratch for your brand, so you never look like everyone
                  else.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
