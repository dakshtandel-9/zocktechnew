import Link from "next/link";
import type { ReactNode } from "react";
import { ConsentNote } from "@/components/site/consent-note";
import { ArrowUpRight, WhatsApp } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { whatsapp } from "@/lib/site";

/** Closing call to action for inner pages (id="cta": the phone CTA bar hides once it's reached). */
export function CtaBand({
  title = (
    <>
      Ready when you <span className="text-brand">are.</span>
    </>
  ),
  body = "Tell us what you need. You'll get a clear plan and a custom quote, usually within 24 hours.",
  message = "Hi ZockTech! I'd like to start a project.",
}: {
  title?: ReactNode;
  body?: string;
  message?: string;
}) {
  return (
    <section id="cta" aria-labelledby="cta-title" className="px-4 pb-24 pt-10 sm:px-8 lg:px-12 lg:pb-32">
      <Reveal className="mx-auto max-w-[1440px]">
        <div className="glass glass-edge relative overflow-hidden rounded-[36px] px-6 py-14 text-center sm:px-10 lg:py-20">
          <div aria-hidden className="pointer-events-none absolute -left-32 -top-40 size-[34rem] rounded-full bg-brand/25 blur-[110px]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-48 right-0 size-[30rem] rounded-full bg-brand-deep/20 blur-[120px]" />
          <div className="relative mx-auto flex max-w-[860px] flex-col items-center">
            <h2
              id="cta-title"
              className="font-display text-[clamp(2.4rem,5.4vw,4.8rem)] font-light leading-[1.02] tracking-[-0.035em]"
            >
              {title}
            </h2>
            <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-muted">{body}</p>
            <div className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
              <a
                href={whatsapp(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary h-13 w-full px-7 py-4 text-[15px] sm:w-auto"
              >
                <WhatsApp size={19} /> Chat on WhatsApp
              </a>
              <Link href="/contact" className="btn btn-ghost h-13 w-full px-7 py-4 text-[15px] sm:w-auto">
                Get a custom quote <ArrowUpRight size={16} />
              </Link>
            </div>
            <ConsentNote align="center" className="mt-5 max-w-md" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
