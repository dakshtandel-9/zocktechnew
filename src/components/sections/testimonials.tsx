import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";
import { testimonials } from "@/lib/site";

type T = (typeof testimonials)[number];

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

function Row({ items, duration, reverse }: { items: readonly T[]; duration: string; reverse?: boolean }) {
  const list = [...items, ...items];
  return (
    <div className="marquee fade-x overflow-hidden py-2">
      <ul
        className={cn("marquee-track flex w-max gap-5 px-2.5", reverse && "reverse")}
        style={{ "--marquee-duration": duration } as CSSProperties}
      >
        {list.map((t, i) => (
          <li
            key={`${t.name}-${i}`}
            aria-hidden={i >= items.length || undefined}
            className="glass glass-edge flex w-[min(80vw,390px)] shrink-0 flex-col rounded-[26px] p-6"
          >
            <svg aria-hidden viewBox="0 0 32 24" className="h-5 w-auto text-brand" fill="currentColor">
              <path d="M0 24V14C0 6 4.5 1.2 12.5 0l1.3 3.6C9 5 6.8 8 6.6 12H13v12H0Zm19 0V14c0-8 4.5-12.8 12.5-14l1.3 3.6C28 5 25.8 8 25.6 12H32v12H19Z" />
            </svg>
            <blockquote className="mt-4 flex-1 font-display text-[1.2rem] leading-snug tracking-[-0.01em]">
              {t.quote}
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-[#ffb978] to-[#e5600c] text-[13px] font-bold text-[#1a0d03]">
                {initials(t.name)}
              </span>
              <span className="text-sm font-semibold">{t.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Testimonials() {
  const half = Math.ceil(testimonials.length / 2);
  return (
    <section aria-labelledby="testimonials-title" className="relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="section-label">
              <b>04/</b> kind words
            </p>
            <h2
              id="testimonials-title"
              className="mt-5 font-display text-[clamp(2.4rem,5vw,4.6rem)] font-light leading-[1.02] tracking-[-0.035em]"
            >
              What our clients <span className="text-brand">say.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-muted">
            Real feedback from businesses we&apos;ve built for across India.
          </p>
        </Reveal>
      </div>
      <div className="mt-12 space-y-3 lg:mt-16">
        <Row items={testimonials.slice(0, half)} duration="58s" />
        <Row items={testimonials.slice(half)} duration="64s" reverse />
      </div>
    </section>
  );
}
