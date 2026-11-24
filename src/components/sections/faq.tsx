"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { ConsentNote } from "@/components/site/consent-note";
import { Plus, WhatsApp } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";
import { faqGroups, site, whatsapp } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The /faq page body: questions grouped by topic, with a sticky topic list and a WhatsApp card. */
export function FAQ() {
  // One open answer at a time, across all groups ("group:index").
  const [open, setOpen] = useState<string | null>(`${faqGroups[0].id}:0`);

  return (
    <section id="questions" aria-label="Questions and answers" className="relative px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <nav aria-label="FAQ topics" className="glass glass-edge hidden rounded-[26px] p-6 lg:block">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">Topics</p>
              <ol className="mt-4 space-y-1 text-[15px]">
                {faqGroups.map((g, i) => (
                  <li key={g.id}>
                    <a href={`#${g.id}`} className="flex items-baseline gap-3 rounded-lg py-1.5 text-muted transition-colors hover:text-fg">
                      <span className="w-5 text-sm text-faint">{String(i + 1).padStart(2, "0")}</span>
                      {g.title}
                      <span className="ml-auto text-xs text-faint">{g.items.length}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="glass glass-edge rounded-[26px] p-6 lg:mt-4">
              <p className="font-display text-xl font-medium tracking-tight">Still have questions?</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                Chat with {site.founder.split(" ")[0]} directly on WhatsApp. {site.hours}.
              </p>
              <a
                href={whatsapp("Hi ZockTech! I have a question.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-5 h-11 px-5 text-sm"
              >
                <WhatsApp size={17} fill="#000" /> Chat on WhatsApp
              </a>
              <ConsentNote className="mt-4" />
            </div>
          </div>
        </div>

        <div className="space-y-14 lg:col-span-8">
          {faqGroups.map((g) => (
            <div key={g.id} id={g.id} className="scroll-mt-28">
              <Reveal>
                <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-light tracking-[-0.025em]">{g.title}</h2>
              </Reveal>
              <ul className="mt-5 space-y-3">
                {g.items.map((f, i) => {
                  const key = `${g.id}:${i}`;
                  const isOpen = open === key;
                  return (
                    <Reveal as="li" key={f.q} delay={Math.min(i, 4) * 0.04} amount={0.4}>
                      <div className={cn("glass rounded-[22px] transition-colors", isOpen && "glass-edge")}>
                        <h3>
                          <button
                            type="button"
                            id={`faq-q-${key}`}
                            aria-expanded={isOpen}
                            aria-controls={`faq-a-${key}`}
                            onClick={() => setOpen(isOpen ? null : key)}
                            className="flex w-full items-center justify-between gap-6 rounded-[22px] px-5 py-5 text-left sm:px-6"
                          >
                            <span className="font-display text-[1.1rem] font-medium leading-snug tracking-[-0.01em] sm:text-[1.2rem]">
                              {f.q}
                            </span>
                            <span
                              className={cn(
                                "grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-[var(--ease-expo)]",
                                isOpen ? "rotate-45 border-transparent bg-brand text-[#170c03]" : "border-line",
                              )}
                            >
                              <Plus size={16} />
                            </span>
                          </button>
                        </h3>
                        <motion.div
                          id={`faq-a-${key}`}
                          role="region"
                          aria-labelledby={`faq-q-${key}`}
                          initial={false}
                          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                          transition={{ duration: 0.55, ease: EASE }}
                          className="overflow-hidden"
                          inert={!isOpen}
                        >
                          <p className="px-5 pb-6 text-[15px] leading-relaxed text-muted sm:px-6">{f.a}</p>
                        </motion.div>
                      </div>
                    </Reveal>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
