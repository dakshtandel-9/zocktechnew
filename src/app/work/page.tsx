import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { MoreWork } from "@/components/sections/work";
import { SiteShell } from "@/components/site/site-shell";
import { ArrowUpRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";
import { caseStudies } from "@/lib/case-studies";
import { defaultOgImage, ogDefaults, twitterDefaults } from "@/lib/seo";
import { site } from "@/lib/site";

const title = "Work & case studies";
const description =
  "Case studies from ZockTech: an immersive 3D journey for Tuklogic, a smart-home store you can step inside for Heseos, and a full travel platform for CompareMyTrip.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work" },
  openGraph: { ...ogDefaults, url: "/work", title: `${title} | ZockTech`, description, images: [defaultOgImage] },
  twitter: { ...twitterDefaults, title: `${title} | ZockTech`, description, images: [defaultOgImage] },
};

const d = (n: number) => ({ "--d": n }) as CSSProperties;

export default function WorkPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${title} | ZockTech`,
    url: `${site.url}/work`,
    description,
    hasPart: caseStudies.map((c) => ({
      "@type": "CreativeWork",
      name: `${c.name} case study`,
      url: `${site.url}/work/${c.slug}`,
    })),
  };

  return (
    <SiteShell page="work">
      <main>
        <section id="top" className="relative overflow-x-clip px-4 pb-10 pt-36 sm:px-8 lg:px-12 lg:pb-16 lg:pt-44">
          <div className="mx-auto max-w-[1440px] px-1">
            <p className="section-label anim-fade-up" style={d(0.1)}>
              <b>work/</b> case studies
            </p>
            <h1 className="mt-6 max-w-[14ch] font-display text-[clamp(3rem,8vw,7.2rem)] font-light leading-[0.95] tracking-[-0.045em]">
              <span className="reveal-mask">
                <span className="anim-rise" style={d(0.15)}>
                  Three builds.
                </span>
              </span>{" "}
              <span className="reveal-mask">
                <span className="anim-rise" style={d(0.25)}>
                  Three very <span className="text-brand">different</span> problems.
                </span>
              </span>
            </h1>
            <div className="mt-10 grid gap-6 lg:grid-cols-12">
              <p className="anim-fade-up text-[16px] leading-relaxed text-muted lg:col-span-6" style={d(0.4)}>
                No templates and no two alike. Each project started from what made the business different, and each
                case study shows the one idea that made it work, built the way we built it.
              </p>
            </div>
          </div>
        </section>

        <section aria-label="Case studies" className="px-4 pb-10 sm:px-8 lg:px-12">
          <ul className="mx-auto grid max-w-[1440px] gap-6 lg:gap-8">
            {caseStudies.map((c, i) => (
              <Reveal as="li" key={c.slug} amount={0.15}>
                <Link
                  href={`/work/${c.slug}`}
                  prefetch
                  style={{ "--cs": c.accent, "--cs-rgb": c.accentRgb, "--cs-ink": c.accentInk } as CSSProperties}
                  className="case-theme group glass glass-edge grid overflow-hidden rounded-[32px] p-2.5 lg:grid-cols-12 lg:p-3"
                >
                  <div
                    className={cn(
                      "relative aspect-[16/10] overflow-hidden rounded-[24px] bg-black lg:col-span-7 lg:aspect-auto lg:min-h-[480px]",
                      i % 2 === 1 && "lg:order-2",
                    )}
                  >
                    <Image
                      src={c.cover}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-expo)] group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/15 backdrop-blur-md">
                      <span className="size-1.5 rounded-full bg-[var(--cs)]" />
                      {c.signature.title.replace(/\.$/, "")}
                    </span>
                  </div>
                  <div className="flex flex-col p-5 sm:p-8 lg:col-span-5 lg:p-10">
                    <div className="flex items-center justify-between text-[13px] text-muted">
                      <span className="font-semibold text-[var(--cs-text)]">{String(i + 1).padStart(2, "0")}</span>
                      <span>
                        {c.category} · {c.year}
                      </span>
                    </div>
                    <h2 className="mt-8 font-display text-[clamp(2.6rem,5vw,4.4rem)] font-semibold leading-[0.92] tracking-[-0.05em] lg:mt-auto">
                      {c.name}
                    </h2>
                    <p className="mt-4 font-display text-[1.35rem] font-light leading-snug tracking-[-0.01em] sm:text-2xl">
                      {c.headline}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {c.services.slice(0, 4).map((s) => (
                        <li key={s} className="chip">
                          {s}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-8 inline-flex items-center gap-3 text-sm font-semibold">
                      <span className="grid size-11 place-items-center rounded-full bg-[var(--cs)] text-[#0b0b0d] transition-transform duration-500 ease-[var(--ease-expo)] group-hover:rotate-45">
                        <ArrowUpRight size={18} />
                      </span>
                      Read the case study
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </section>

        <section id="cta" aria-label="More work" className="px-4 pb-24 sm:px-8 lg:px-12 lg:pb-32">
          <div className="mx-auto max-w-[1440px]">
            <MoreWork />
          </div>
        </section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </SiteShell>
  );
}
