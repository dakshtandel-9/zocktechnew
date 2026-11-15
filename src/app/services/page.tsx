import Link from "next/link";
import { Band } from "@/components/sections/band";
import { Services } from "@/components/sections/services";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { SiteShell } from "@/components/site/site-shell";
import { ArrowUpRight, Check } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { pageMetadata } from "@/lib/seo";
import { included, pillars } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Services: websites, marketing & content",
  description:
    "Websites, e-commerce and web apps; Meta and Google Ads; graphic design, Instagram management and creator content. Everything your brand needs online, from one studio, custom-quoted.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <SiteShell page="services">
      <main>
        <PageHero
          crumb="Services"
          label="services"
          title={
            <>
              Build. Grow. <span className="text-brand">Create.</span>
            </>
          }
          intro="Everything your brand needs online, from one studio. Pick one service or let us run all three. Every project is scoped and quoted around your goals, never from a price list."
        >
          <ul className="flex flex-wrap gap-2">
            {pillars.map((p) => (
              <li key={p.id}>
                <a href={`#${p.id}`} className="btn btn-ghost h-11 px-5 text-sm">
                  <span className="text-brand-text">{p.index}</span> {p.name} · {p.kicker}
                </a>
              </li>
            ))}
          </ul>
        </PageHero>

        <Services standalone />

        <Band />

        <section aria-labelledby="included-title" className="px-4 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col justify-between gap-6 px-1 lg:flex-row lg:items-end">
              <Reveal>
                <p className="section-label">
                  <b>✓/</b> with every website
                </p>
                <h2
                  id="included-title"
                  className="mt-5 max-w-[14ch] font-display text-[clamp(2.2rem,4.6vw,4.2rem)] font-light leading-[1.02] tracking-[-0.035em]"
                >
                  Included, <span className="text-brand">always.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1} className="max-w-sm">
                <p className="text-[15px] leading-relaxed text-muted">
                  The basics a website should never be missing. No add-ons, no small print.
                </p>
              </Reveal>
            </div>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-5">
              {included.map((item, i) => (
                <Reveal as="li" key={item.title} delay={(i % 3) * 0.08} className="h-full">
                  <div className="glass glass-edge h-full rounded-[26px] p-6 sm:p-7">
                    <span className="grid size-10 place-items-center rounded-full bg-brand text-[#170c03]">
                      <Check size={18} strokeWidth={2.4} />
                    </span>
                    <h3 className="mt-6 font-display text-[1.4rem] font-medium tracking-[-0.02em]">{item.title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal className="mt-12 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
              <Link href="/work" className="btn btn-ghost h-12 px-6 text-sm">
                See the work <ArrowUpRight size={16} />
              </Link>
              <Link href="/process" className="btn btn-ghost h-12 px-6 text-sm">
                How we work <ArrowUpRight size={16} />
              </Link>
            </Reveal>
          </div>
        </section>

        <CtaBand
          title={
            <>
              Not sure what you <span className="text-brand">need?</span>
            </>
          }
          body="Tell us about your business and goals. We'll suggest the right mix and send a clear custom quote, usually within 24 hours."
          message="Hi ZockTech! I'm not sure which service I need. Can you help?"
        />
      </main>
    </SiteShell>
  );
}
