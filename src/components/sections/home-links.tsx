import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { faqs, pillars, process } from "@/lib/site";

/** Homepage: the three pillars at a glance, each linking to its part of /services. */
export function ServicesPreview() {
  return (
    <section id="services" className="relative px-4 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col justify-between gap-6 px-1 lg:flex-row lg:items-end">
          <Reveal>
            <p className="section-label">
              <b>02/</b> expertise
            </p>
            <h2 className="mt-5 max-w-[14ch] font-display text-[clamp(2.4rem,5vw,4.6rem)] font-light leading-[1.02] tracking-[-0.035em]">
              Everything your brand needs <span className="text-brand">online.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="max-w-sm">
            <p className="text-[15px] leading-relaxed text-muted">
              Pick one service or let us run all three. Every project is scoped and quoted around your goals, never
              from a price list.
            </p>
            <Link href="/services" className="btn btn-ghost mt-5 h-11 px-5 text-sm">
              All services <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-3 lg:gap-5">
          {pillars.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 0.08} className="h-full">
              <Link
                href={`/services#${p.id}`}
                className="group glass glass-edge flex h-full flex-col overflow-hidden rounded-[30px] p-2.5"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[22px]">
                  <Image
                    src={p.image.src}
                    alt={p.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-expo)] group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <span className="giant absolute bottom-3 left-5 text-[clamp(3rem,5vw,4.4rem)] text-white">
                    {p.name}
                    <span className="text-brand">.</span>
                  </span>
                  <span className="absolute right-4 top-4 font-display text-sm font-semibold text-white/80">{p.index}</span>
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <p className="text-[13px] text-muted">{p.kicker}</p>
                  <p className="mt-2 font-display text-[1.35rem] leading-snug tracking-[-0.01em]">{p.title}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.services.map((s) => (
                      <li key={s.name} className="chip">
                        {s.name}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-2 pt-1 text-sm font-semibold text-brand-text lg:mt-auto lg:pt-6">
                    Explore {p.name}
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Homepage: how we work and common questions, each with its own page. */
export function NextSteps() {
  const cards = [
    {
      href: "/process",
      label: "How we work",
      title: "From first chat to launch in four steps.",
      body: process.map((s) => s.title).join(" → "),
      cta: "See the process",
    },
    {
      href: "/faq",
      label: "Questions",
      title: "Pricing, timelines, ownership and more.",
      body: `${faqs.length} answers to what clients ask us most, before they start.`,
      cta: "Read the FAQ",
    },
  ];
  return (
    <section aria-label="How we work and FAQ" className="px-4 pb-8 pt-4 sm:px-8 lg:px-12">
      <ul className="mx-auto grid max-w-[1440px] gap-4 md:grid-cols-2 lg:gap-5">
        {cards.map((c, i) => (
          <Reveal as="li" key={c.href} delay={i * 0.08} className="h-full">
            <Link href={c.href} className="group glass glass-edge flex h-full flex-col rounded-[30px] p-7 sm:p-9">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-text">{c.label}</p>
              <p className="mt-4 max-w-[20ch] font-display text-[clamp(1.7rem,2.8vw,2.5rem)] font-light leading-[1.08] tracking-[-0.03em]">
                {c.title}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{c.body}</p>
              <span className="mt-8 inline-flex items-center gap-3 text-sm font-semibold">
                <span className="grid size-11 place-items-center rounded-full bg-brand text-[#170c03] transition-transform duration-500 ease-[var(--ease-expo)] group-hover:rotate-45">
                  <ArrowUpRight size={18} />
                </span>
                {c.cta}
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
