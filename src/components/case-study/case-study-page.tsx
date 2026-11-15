import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Signature } from "@/components/case-study/signature";
import { ConsentNote } from "@/components/site/consent-note";
import { AutoVideo, Laptop, Phone } from "@/components/ui/devices";
import { ArrowRight, ArrowUpRight, Check, WhatsApp } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { Spotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/cn";
import { caseStudies, nextCaseStudy, type CaseStudy } from "@/lib/case-studies";
import { whatsapp } from "@/lib/site";

const d = (n: number) => ({ "--d": n }) as CSSProperties;
const shell = "px-4 sm:px-8 lg:px-12";

/**
 * One template for every case study. The shared sections tell the story in the same order
 * (brief → signature → what's different → numbers → how it's built → what shipped); the
 * signature section and the accent colour are unique to each project.
 */
export function CaseStudyPage({ cs }: { cs: CaseStudy }) {
  const theme = { "--cs": cs.accent, "--cs-rgb": cs.accentRgb, "--cs-ink": cs.accentInk } as CSSProperties;
  const index = caseStudies.findIndex((c) => c.slug === cs.slug);
  return (
    <main className="case-theme" style={theme}>
      <Hero cs={cs} index={index} />
      <Brief cs={cs} />
      <section aria-labelledby="signature-title" className="relative py-24 lg:py-32">
        <div className={shell}>
          <div className="mx-auto max-w-[1440px]">
            <Head id="signature-title" n="02" label={cs.signature.label} title={cs.signature.title} body={cs.signature.body} />
          </div>
        </div>
        <div className="mt-12 lg:mt-16">
          <Signature slug={cs.slug} />
        </div>
      </section>
      <Highlights cs={cs} />
      <Numbers cs={cs} />
      <UnderTheHood cs={cs} />
      <Delivered cs={cs} />
      <NextStudy next={nextCaseStudy(cs.slug)} />
      <Cta cs={cs} />
    </main>
  );
}

function Head({ id, n, label, title, body }: { id?: string; n: string; label: string; title: ReactNode; body?: string }) {
  return (
    <div className="flex flex-col justify-between gap-6 px-1 lg:flex-row lg:items-end">
      <Reveal>
        <p className="section-label">
          <b className="text-[var(--cs-text)]">{n}/</b> {label.toLowerCase()}
        </p>
        <h2
          id={id}
          className="mt-5 max-w-[15ch] font-display text-[clamp(2.2rem,4.6vw,4.2rem)] font-light leading-[1.02] tracking-[-0.035em]"
        >
          {title}
        </h2>
      </Reveal>
      {body && (
        <Reveal delay={0.1} className="max-w-md">
          <p className="text-[15px] leading-relaxed text-muted">{body}</p>
        </Reveal>
      )}
    </div>
  );
}

function Hero({ cs, index }: { cs: CaseStudy; index: number }) {
  const p = cs.project;
  return (
    <section id="top" className={cn("relative overflow-x-clip pb-16 pt-32 lg:pb-24 lg:pt-40", shell)}>
      <div
        aria-hidden
        className="cs-glow pointer-events-none absolute -right-[20vmax] -top-[22vmax] -z-10 size-[80vmax] max-h-[1300px] max-w-[1300px]"
      />
      <div className="mx-auto max-w-[1440px]">
        <nav aria-label="Breadcrumb" className="anim-fade-up px-1 text-sm text-muted" style={d(0.1)}>
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-fg">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-faint">
              /
            </li>
            <li>
              <Link href="/work" className="transition-colors hover:text-fg">
                Work
              </Link>
            </li>
            <li aria-hidden className="text-faint">
              /
            </li>
            <li aria-current="page" className="text-fg">
              {cs.name}
            </li>
          </ol>
        </nav>

        <div className="mt-10 grid gap-8 px-1 lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-8">
            <p
              className="anim-fade-up flex items-center gap-3 text-[12.5px] font-medium uppercase tracking-[0.16em] text-muted"
              style={d(0.15)}
            >
              <span className="size-2 rounded-full bg-[var(--cs)] shadow-[0_0_14px_rgb(var(--cs-rgb)/0.9)]" />
              Case study {String(index + 1).padStart(2, "0")} · {cs.category}
            </p>
            <h1 className="mt-5 font-display text-[clamp(3.2rem,10.5vw,9.5rem)] font-semibold leading-[0.9] tracking-[-0.055em]">
              <span className="reveal-mask">
                <span className="anim-rise" style={d(0.2)}>
                  {cs.name}
                </span>
              </span>
            </h1>
            <p
              className="anim-fade-up mt-6 max-w-[24ch] font-display text-[clamp(1.5rem,2.8vw,2.4rem)] font-light leading-[1.12] tracking-[-0.02em]"
              style={d(0.35)}
            >
              {cs.headline}
            </p>
          </div>
          <div className="anim-fade-up lg:col-span-4" style={d(0.45)}>
            <p className="text-[15.5px] leading-relaxed text-muted">{cs.summary}</p>
          </div>
        </div>

        <dl
          className="anim-fade-up glass glass-edge mt-12 grid grid-cols-2 overflow-hidden rounded-[24px] lg:grid-cols-4"
          style={d(0.55)}
        >
          {cs.facts.map((f, i) => (
            <div
              key={f.label}
              className={cn(
                "border-line p-5 sm:p-6",
                i % 2 === 1 && "border-l",
                i >= 2 && "border-t lg:border-t-0",
                i === 2 && "lg:border-l",
              )}
            >
              <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">{f.label}</dt>
              <dd className="mt-2 font-display text-[1.05rem] font-medium leading-snug tracking-tight sm:text-lg">{f.value}</dd>
            </div>
          ))}
        </dl>

        <Reveal y={60} amount={0.1} className="relative mx-auto mt-16 max-w-[1240px] pb-[9%] lg:mt-24">
          <div aria-hidden className="cs-glow pointer-events-none absolute inset-[10%] -z-10 rounded-full" />
          <Laptop className="w-[90%] lg:w-[86%]">
            <AutoVideo src={p.video.desktop} poster={p.video.desktopPoster} label={`${cs.name} website on desktop`} />
          </Laptop>
          <div className="absolute bottom-0 right-[1%] w-[26%] max-w-[270px] lg:right-[3%] lg:w-[22%]">
            <Phone>
              <AutoVideo src={p.video.mobile} poster={p.video.mobilePoster} label={`${cs.name} website on mobile`} />
            </Phone>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Brief({ cs }: { cs: CaseStudy }) {
  return (
    <section aria-labelledby="brief-title" className={cn("py-24 lg:py-32", shell)}>
      <div className="mx-auto max-w-[1440px]">
        <Head id="brief-title" n="01" label="The brief" title="What they needed." />
        <div className="mt-12 grid gap-10 px-1 lg:mt-16 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <p className="font-display text-[clamp(1.3rem,2.2vw,1.85rem)] font-light leading-[1.4] tracking-[-0.012em]">
              {cs.brief}
            </p>
            <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">What we did</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {cs.services.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <Spotlight className="glass glass-edge rounded-[28px] p-6 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">The challenge</p>
              <ol className="mt-6 space-y-6">
                {cs.challenges.map((c, i) => (
                  <li key={c} className="flex gap-4">
                    <span className="pt-0.5 font-display text-sm font-semibold text-[var(--cs-text)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[15px] leading-relaxed text-muted">{c}</p>
                  </li>
                ))}
              </ol>
            </Spotlight>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Highlights({ cs }: { cs: CaseStudy }) {
  return (
    <section aria-labelledby="different-title" className={cn("py-24 lg:py-32", shell)}>
      <div className="mx-auto max-w-[1440px]">
        <Head
          id="different-title"
          n="03"
          label="What makes it different"
          title={
            <>
              Six things you <span className="text-[var(--cs-text)]">won&apos;t</span> find on a template.
            </>
          }
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-5">
          {cs.highlights.map((h, i) => (
            <Reveal as="li" key={h.title} delay={(i % 3) * 0.08} className="h-full">
              <Spotlight className="glass glass-edge flex h-full flex-col rounded-[26px] p-6 sm:p-7">
                <span className="grid size-10 place-items-center rounded-full border border-[rgb(var(--cs-rgb)/0.45)] bg-[rgb(var(--cs-rgb)/0.12)] font-display text-sm font-semibold text-[var(--cs-text)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 font-display text-[1.45rem] font-medium leading-tight tracking-[-0.02em]">{h.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{h.body}</p>
              </Spotlight>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Numbers({ cs }: { cs: CaseStudy }) {
  return (
    <section aria-labelledby="numbers-title" className={cn("pt-20 lg:pt-28", shell)}>
      <div className="mx-auto max-w-[1440px]">
        <Head id="numbers-title" n="04" label="By the numbers" title="The work, in numbers." />
        <dl className="mt-12 grid grid-cols-2 border-t border-line lg:mt-16 lg:grid-cols-4">
          {cs.numbers.map((n, i) => (
            <Reveal
              key={n.label}
              delay={i * 0.08}
              className={cn(
                "flex flex-col-reverse justify-end border-line px-1 py-8 sm:py-10 lg:pr-8",
                i % 2 === 1 && "border-l pl-5 sm:pl-8",
                i >= 2 && "border-t lg:border-t-0",
                i === 2 && "lg:border-l lg:pl-8",
              )}
            >
              {/* label first for screen readers; shown under the figure */}
              <dt className="mt-4 max-w-[24ch] text-sm leading-relaxed text-muted">{n.label}</dt>
              <dd className="font-display text-[clamp(2.8rem,6vw,5.4rem)] font-semibold leading-none tracking-[-0.05em] text-[var(--cs-text)]">
                {n.value}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

function UnderTheHood({ cs }: { cs: CaseStudy }) {
  return (
    <section aria-labelledby="hood-title" className={cn("py-24 lg:py-32", shell)}>
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal className="px-1">
              <p className="section-label">
                <b className="text-[var(--cs-text)]">05/</b> under the hood
              </p>
              <h2
                id="hood-title"
                className="mt-5 font-display text-[clamp(2.2rem,4.6vw,4.2rem)] font-light leading-[1.02] tracking-[-0.035em]"
              >
                How it&apos;s built.
              </h2>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted">
                The parts nobody sees, and the reason it feels fast and never breaks.
              </p>
              <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">Built with</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {cs.stack.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
        <ol className="lg:col-span-8">
          {cs.engineering.map((e, i) => (
            <Reveal
              as="li"
              key={e.title}
              className="grid gap-3 border-t border-line px-1 py-8 last:border-b sm:grid-cols-[3rem_minmax(0,15rem)_1fr] sm:gap-6"
            >
              <span className="font-display text-sm font-semibold text-[var(--cs-text)]">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-[1.35rem] font-medium leading-tight tracking-[-0.02em]">{e.title}</h3>
              <p className="text-[15px] leading-relaxed text-muted">{e.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Delivered({ cs }: { cs: CaseStudy }) {
  return (
    <section aria-labelledby="delivered-title" className={cn("py-16 lg:py-24", shell)}>
      <Reveal className="mx-auto max-w-[1440px]">
        <div className="glass glass-edge relative overflow-hidden rounded-[32px] p-7 sm:p-10 lg:p-14">
          <div aria-hidden className="cs-glow pointer-events-none absolute -bottom-1/2 -left-1/4 -z-10 size-[60vmax] opacity-70" />
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <p className="section-label">
                <b className="text-[var(--cs-text)]">06/</b> what we delivered
              </p>
              <h2
                id="delivered-title"
                className="mt-5 font-display text-[clamp(2.1rem,4vw,3.6rem)] font-light leading-[1.04] tracking-[-0.035em]"
              >
                Everything that shipped.
              </h2>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted">
                Designed, built and launched by ZockTech, from the first wireframe to the live site.
              </p>
            </div>
            <ul className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-7">
              {cs.delivered.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-line bg-chip px-4 py-3.5 text-[14.5px] leading-snug"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[var(--cs)] text-[#0b0b0d]">
                    <Check size={15} strokeWidth={2.4} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function NextStudy({ next }: { next: CaseStudy }) {
  return (
    <section aria-label="Next case study" className={cn("py-16 lg:py-24", shell)}>
      <Reveal className="mx-auto max-w-[1440px]">
        <Link
          href={`/work/${next.slug}`}
          prefetch
          className="group relative block aspect-[4/5] overflow-hidden rounded-[32px] bg-black ring-1 ring-white/10 sm:aspect-[16/9] lg:aspect-[21/9]"
        >
          <Image
            src={next.cover}
            alt=""
            fill
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-expo)] group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-6 text-white sm:flex-row sm:items-end sm:justify-between sm:p-10 lg:p-14">
            <div>
              <p className="flex items-center gap-3 text-[12.5px] font-medium uppercase tracking-[0.16em] text-white/70">
                <span className="size-2 rounded-full" style={{ background: next.accent }} />
                Next case study · {next.category}
              </p>
              <p className="mt-4 font-display text-[clamp(2.8rem,8vw,7rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
                {next.name}
              </p>
              <p className="mt-4 max-w-[30ch] font-display text-lg font-light leading-snug text-white/80 sm:text-2xl">
                {next.headline}
              </p>
            </div>
            <span
              className="grid size-16 shrink-0 place-items-center rounded-full text-[#0b0b0d] transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-110 sm:size-20"
              style={{ background: next.accent }}
            >
              <ArrowRight size={26} />
            </span>
          </div>
        </Link>
      </Reveal>
    </section>
  );
}

function Cta({ cs }: { cs: CaseStudy }) {
  return (
    <section id="cta" aria-labelledby="cta-title" className={cn("pb-24 pt-16 lg:pb-32", shell)}>
      <Reveal className="mx-auto flex max-w-[980px] flex-col items-center text-center">
        <p className="section-label">
          <b>→</b> your project next
        </p>
        <h2
          id="cta-title"
          className="mt-5 font-display text-[clamp(2.4rem,5.4vw,4.8rem)] font-light leading-[1.02] tracking-[-0.035em]"
        >
          Want a website people <span className="text-brand">remember?</span>
        </h2>
        <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-muted">
          Tell us what you&apos;re building. You&apos;ll get a clear plan and a custom quote, usually within 24 hours.
        </p>
        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href={whatsapp(`Hi ZockTech! I read the ${cs.name} case study and I'd like to start a project.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary h-13 px-7 text-[15px]"
          >
            <WhatsApp size={19} /> Start your project
          </a>
          <Link href="/work" className="btn btn-ghost h-13 px-7 text-[15px]">
            See all work <ArrowUpRight size={16} />
          </Link>
        </div>
        <ConsentNote align="center" className="mt-5 max-w-md" />
      </Reveal>
    </section>
  );
}
