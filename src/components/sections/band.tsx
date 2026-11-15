"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Fragment, useRef } from "react";
import { Sparkle } from "@/components/ui/icons";

const words = ["Websites", "Performance ads", "Instagram", "Branding", "E-commerce", "Reels", "Web apps", "Content"];

/** Two crossing ribbons (solid orange + glass) that slide with the scroll. */
export function Band() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], reduce ? ["-10%", "-10%"] : ["0%", "-32%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], reduce ? ["-22%", "-22%"] : ["-34%", "-2%"]);
  const row = [...words, ...words, ...words];

  return (
    <div ref={ref} aria-hidden className="relative z-10 overflow-hidden py-20 lg:py-28">
      <div className="-rotate-[3deg] scale-x-110">
        <div className="bg-gradient-to-r from-[#ffb978] via-brand to-brand-deep py-3 shadow-[0_24px_70px_-24px_rgb(249_148_59/0.8)] lg:py-4">
          <motion.div style={{ x: x1 }} className="flex w-max items-center gap-6 whitespace-nowrap text-[#1a0d03] lg:gap-10">
            {row.map((w, i) => (
              <Fragment key={i}>
                <span className="giant text-[clamp(2.2rem,5.4vw,4.8rem)]">{w}</span>
                <Sparkle className="size-[clamp(1rem,2vw,1.8rem)]" />
              </Fragment>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="-mt-[clamp(2.6rem,6vw,5.2rem)] rotate-[2.5deg] scale-x-110">
        <div className="glass py-3 lg:py-4">
          <motion.div style={{ x: x2 }} className="flex w-max items-center gap-6 whitespace-nowrap lg:gap-10">
            {row.map((w, i) => (
              <Fragment key={i}>
                <span className="giant outline-text text-[clamp(2.2rem,5.4vw,4.8rem)] !opacity-80">{w}</span>
                <Sparkle className="size-[clamp(1rem,2vw,1.8rem)] text-brand" />
              </Fragment>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
