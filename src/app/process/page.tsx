import Link from "next/link";
import type { ReactNode } from "react";
import { Process } from "@/components/sections/process";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { SiteShell } from "@/components/site/site-shell";
import { ArrowUpRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { pageMetadata } from "@/lib/seo";
import { needFromYou, timelines, workingTogether } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Our process",
  description:
    "How a ZockTech project works: discover, plan, create, launch and grow. Typical timelines, what we need from you, and how payments and revisions work.",
  path: "/process",
});

function Heading({ id, label, title, body }: { id: string; label: string; title: ReactNode; body?: string }) {
  return (
    <div className="flex flex-col justify-between gap-6 px-1 lg:flex-row lg:items-end">
      <Reveal>
        <p className="section-label">
          <b>{label}/</b>
        </p>
        <h2 id={id} className="mt-5 max-w-[15ch] font-display text-[clamp(2.2rem,4.6vw,4.2rem)] font-light leading-[1.02] tracking-[-0.035em]">
          {title}
        </h2>
      </Reveal>
      {body && (
        <Reveal delay={0.1} className="max-w-sm">
          <p className="text-[15px] leading-relaxed text-muted">{body}</p>
        </Reveal>
      )}
    </div>
  );
}

export default function ProcessPage() {
  return (
    <SiteShell page="process">
      <main>
        <PageHero
          crumb="Process"
          label="process"
          title={
            <>
              From first chat to <span className="text-brand">real results.</span>
            </>
          }
          intro="Simple, fast and transparent. The same four steps whether we're building a site, running ads or creating content, so you always know what happens next."
        />

        <Process standalone />

        <section aria-labelledby="timelines-title" className="px-4 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1440px]">
            <Heading
              id="timelines-title"
              label="timelines"
              title={
                <>
                  How long it <span className="text-brand">takes.</span>
                </>
              }
              body="Typical timelines, counted from when we have your advance and content. Your quote gives the exact date."
            />
            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[28px] border border-line bg-line lg:mt-16 lg:grid-cols-3">
              {timelines.map((t, i) => (
                <Reveal key={t.name} delay={(i % 3) * 0.06} className="flex flex-col-reverse justify-end bg-bg p-6 sm:p-8">
                  <dt className="mt-3 text-sm text-muted">{t.name}</dt>
                  <dd className="font-display text-[clamp(1.8rem,3.6vw,3rem)] font-semibold leading-none tracking-[-0.04em]">{t.time}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        <section aria-labelledby="need-title" className="px-4 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1440px]">
            <Heading
              id="need-title"
              label="from you"
              title={
                <>
                  What we need <span className="text-brand">from you.</span>
                </>
              }
              body="Not much. Send what you have and we'll guide you through the rest."
            />
            <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
              {needFromYou.map((n, i) => (
                <Reveal as="li" key={n.title} delay={i * 0.06} className="h-full">
                  <div className="glass glass-edge h-full rounded-[26px] p-6">
                    <span className="font-display text-sm font-semibold text-brand-text">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-6 font-display text-[1.35rem] font-medium tracking-[-0.02em]">{n.title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{n.desc}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="together-title" className="px-4 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Reveal className="px-1 lg:sticky lg:top-32">
                <p className="section-label">
                  <b>together/</b>
                </p>
                <h2
                  id="together-title"
                  className="mt-5 font-display text-[clamp(2.2rem,4.6vw,4.2rem)] font-light leading-[1.02] tracking-[-0.035em]"
                >
                  How we work <span className="text-brand">together.</span>
                </h2>
                <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted">
                  No surprises on scope, timing or payment. The details are in our terms, written in plain English.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/faq" className="btn btn-ghost h-11 px-5 text-sm">
                    Read the FAQ <ArrowUpRight size={16} />
                  </Link>
                  <Link href="/terms" prefetch className="btn btn-ghost h-11 px-5 text-sm">
                    Terms &amp; Conditions
                  </Link>
                </div>
              </Reveal>
            </div>
            <ul className="lg:col-span-7">
              {workingTogether.map((w, i) => (
                <Reveal
                  as="li"
                  key={w.title}
                  className="grid gap-2 border-t border-line px-1 py-7 last:border-b sm:grid-cols-[3rem_minmax(0,14rem)_1fr] sm:gap-6"
                >
                  <span className="font-display text-sm font-semibold text-brand-text">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-[1.3rem] font-medium leading-tight tracking-[-0.02em]">{w.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted">{w.desc}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <CtaBand
          title={
            <>
              Start with a <span className="text-brand">quick chat.</span>
            </>
          }
          body="Step one takes ten minutes. Tell us what you need and you'll have a scope and a custom quote, usually within 24 hours."
          message="Hi ZockTech! I'd like to start a project. Can we set up a quick call?"
        />
      </main>
    </SiteShell>
  );
}
