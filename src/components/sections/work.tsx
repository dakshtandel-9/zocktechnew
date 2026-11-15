"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ConsentNote } from "@/components/site/consent-note";
import { AutoVideo, Laptop, Phone } from "@/components/ui/devices";
import { ArrowUpRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { Spotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/cn";
import { moreWork, projects, whatsapp, type Project } from "@/lib/site";
import { useMediaQuery } from "@/lib/use-media-query";

export function Work() {
  return (
    <section id="work" className="relative overflow-x-clip px-4 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col justify-between gap-6 px-1 lg:flex-row lg:items-end">
          <Reveal>
            <p className="section-label">
              <b>03/</b> selected work
            </p>
            <h2 className="mt-5 max-w-[13ch] font-display text-[clamp(2.4rem,5vw,4.6rem)] font-light leading-[1.02] tracking-[-0.035em]">
              Real brands. Built to <span className="text-brand">perform.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="max-w-sm">
            <p className="text-[15px] leading-relaxed text-muted">
              Recent websites we designed and developed, recorded live on desktop and mobile.
            </p>
            <Link href="/work" className="btn btn-ghost mt-5 h-11 px-5 text-sm">
              All case studies <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 space-y-28 lg:mt-24 lg:space-y-40">
          {projects.map((p, i) => (
            <Showcase key={p.id} project={p} index={i} flip={i % 2 === 1} />
          ))}
        </div>

        <MoreWork />
      </div>
    </section>
  );
}

function Showcase({ project, index, flip }: { project: Project; index: number; flip: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const wide = useMediaQuery("(min-width: 1024px)");
  const k = reduce ? 0 : 1;
  // Gentler phone parallax on small screens so it never drifts onto the text below.
  const kp = reduce ? 0 : wide ? 1 : 0.3;
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const laptopScale = useTransform(p, [0, 0.35], [1 - 0.08 * k, 1]);
  const laptopY = useTransform(p, [0, 1], [50 * kp, -50 * kp]);
  const phoneY = useTransform(p, [0, 1], [150 * kp, -120 * kp]);
  const phoneRotate = useTransform(p, [0, 1], [flip ? -6 * k : 6 * k, 0]);
  const glowOpacity = useTransform(p, [0.1, 0.45, 0.8], [0, 1, 0]);

  return (
    <article ref={ref} className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
      <div className={cn("relative mb-10 lg:col-span-8 lg:mb-0", flip && "lg:order-2")}>
        <motion.div
          aria-hidden
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute inset-[8%] -z-10 rounded-full bg-brand/40 blur-[90px]"
        />
        <motion.div style={{ scale: laptopScale, y: laptopY }} className="origin-bottom">
          <Laptop className={cn("w-[94%] lg:w-[90%]", flip && "ml-auto")}>
            <AutoVideo
              src={project.video.desktop}
              poster={project.video.desktopPoster}
              label={`${project.name} website on desktop`}
            />
          </Laptop>
        </motion.div>
        <motion.div
          style={{ y: phoneY, rotate: phoneRotate }}
          className={cn(
            "absolute -bottom-[10%] w-[27%] max-w-[250px] lg:w-[23%]",
            flip ? "left-[1%] lg:-left-[2%]" : "right-[1%] lg:-right-[2%]",
          )}
        >
          <Phone>
            <AutoVideo
              src={project.video.mobile}
              poster={project.video.mobilePoster}
              label={`${project.name} website on mobile`}
            />
          </Phone>
        </motion.div>
      </div>

      <Reveal className={cn("lg:col-span-4", flip && "lg:order-1")}>
        <Spotlight className="glass glass-edge rounded-[28px] p-6 sm:p-7">
          <div className="flex items-center justify-between text-[13px] text-muted">
            <span className="font-semibold text-brand-text">{String(index + 1).padStart(2, "0")}</span>
            <span>{project.category}</span>
          </div>
          <h3 className="mt-8 font-display text-[clamp(2.4rem,4vw,3.5rem)] font-semibold leading-none tracking-[-0.045em]">
            {project.name}
          </h3>
          <p className="mt-3 font-display text-[1.3rem] leading-snug tracking-[-0.01em]">{project.headline}</p>
          <p className="mt-4 text-[14.5px] leading-relaxed text-muted">{project.description}</p>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">What we did</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.services.map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
            <p className="flex items-center gap-2.5 text-xs text-muted">
              <span className="live-dot" /> Live recording · desktop &amp; mobile
            </p>
            <Link
              href={`/work/${project.id}`}
              prefetch
              className="group/cs inline-flex items-center gap-2 text-sm font-semibold text-brand-text"
            >
              Read the case study
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover/cs:-translate-y-0.5 group-hover/cs:translate-x-0.5" />
            </Link>
          </div>
        </Spotlight>
      </Reveal>
    </article>
  );
}

export function MoreWork() {
  return (
    <div className="mt-32 lg:mt-44">
      <Reveal className="flex flex-col justify-between gap-4 px-1 sm:flex-row sm:items-end">
        <h3 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-light leading-tight tracking-[-0.03em]">
          More projects we&apos;ve shipped
        </h3>
        <p className="text-sm text-muted">Hover a card to scroll the page.</p>
      </Reveal>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {moreWork.map((w, i) => (
          <Reveal as="li" key={w.name} delay={(i % 4) * 0.08}>
            <div className="group glass glass-edge rounded-[24px] p-2.5">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[16px] bg-bg-2">
                <div className="absolute inset-x-0 top-0 z-10 flex h-7 items-center gap-1.5 bg-black/55 px-3 backdrop-blur">
                  <i className="size-2 rounded-full bg-[#ff5f57]" />
                  <i className="size-2 rounded-full bg-[#febc2e]" />
                  <i className="size-2 rounded-full bg-[#28c840]" />
                </div>
                <Image
                  src={w.image}
                  alt={`${w.name} website`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top pt-7 transition-[object-position] duration-[4s] ease-in-out group-hover:object-bottom"
                />
              </div>
              <div className="flex items-center justify-between px-2 pb-1.5 pt-3.5">
                <span className="font-display text-lg font-medium tracking-tight">{w.name}</span>
                <span className="text-[13px] text-muted">{w.tag}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
      <Reveal className="mt-14 flex flex-col items-center gap-4 text-center">
        <p className="font-display text-[clamp(1.5rem,2.4vw,2rem)] font-light tracking-[-0.02em]">
          Want results like these?
        </p>
        <a
          href={whatsapp("Hi ZockTech! I saw your work and I'd like to start a project.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary h-12 px-7 text-sm"
        >
          Start your project <ArrowUpRight size={16} />
        </a>
        <ConsentNote align="center" className="max-w-md" />
      </Reveal>
    </div>
  );
}
