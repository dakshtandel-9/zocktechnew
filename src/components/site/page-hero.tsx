import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

const d = (n: number) => ({ "--d": n }) as CSSProperties;

/** Opening section for an inner page: breadcrumb, label, big title and a short intro. Carries id="top". */
export function PageHero({
  crumb,
  label,
  title,
  intro,
  children,
  className,
}: {
  crumb: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section id="top" className={cn("relative overflow-x-clip px-4 pb-12 pt-32 sm:px-8 lg:px-12 lg:pb-16 lg:pt-40", className)}>
      <div className="mx-auto max-w-[1440px] px-1">
        <nav aria-label="Breadcrumb" className="anim-fade-up text-sm text-muted" style={d(0.05)}>
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-fg">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-faint">
              /
            </li>
            <li aria-current="page" className="text-fg">
              {crumb}
            </li>
          </ol>
        </nav>
        <p className="section-label anim-fade-up mt-10 lg:mt-14" style={d(0.1)}>
          <b>{label}/</b>
        </p>
        <h1 className="anim-fade-up mt-5 max-w-[15ch] font-display text-[clamp(2.9rem,7.4vw,6.6rem)] font-light leading-[0.96] tracking-[-0.045em]" style={d(0.15)}>
          {title}
        </h1>
        {intro && (
          <div className="anim-fade-up mt-8 max-w-2xl text-[16px] leading-relaxed text-muted" style={d(0.3)}>
            {intro}
          </div>
        )}
        {children && (
          <div className="anim-fade-up mt-8" style={d(0.4)}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
