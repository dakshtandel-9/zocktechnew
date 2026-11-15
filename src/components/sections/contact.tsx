"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ConsentNote } from "@/components/site/consent-note";
import { ArrowUpRight, Check, Clock, Instagram, Mail, Phone, WhatsApp } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";
import { contactServices, phones, site, whatsapp } from "@/lib/site";

const field =
  "w-full rounded-2xl border border-line bg-chip px-4 py-3.5 text-[15px] text-fg placeholder:text-faint outline-none transition-[border-color,box-shadow] duration-300 focus:border-brand/70 focus:shadow-[0_0_0_4px_rgb(249_148_59/0.15)]";

/** The consent wording, kept identical in the form and in the message it sends (your record of the opt-in). */
const CONSENT_TEXT =
  "I agree to ZockTech's Terms & Conditions and Privacy Policy, and to be contacted by ZockTech on WhatsApp, phone and email about my enquiry.";
const OFFERS_TEXT = "Send me occasional offers and updates from ZockTech on WhatsApp.";

function buildMessage(name: string, phone: string, services: string[], details: string, offers: boolean) {
  const enquiry = [
    `Hi ZockTech! I'm ${name}.`,
    services.length ? `I'm interested in: ${services.join(", ")}.` : "",
    details ? `About the project: ${details}` : "",
    phone ? `My WhatsApp number: ${phone}` : "",
  ].filter(Boolean);
  const consent = [`✓ ${CONSENT_TEXT}`, offers ? `✓ ${OFFERS_TEXT}` : "✗ No offers or updates, please."];
  return [...enquiry, "", ...consent].join("\n");
}

/**
 * Enquiry section. On the homepage it's section 05; on /contact (`asPage`) it is the page itself,
 * so its heading becomes the page's h1 and it gets room for the header above it.
 */
export function Contact({ n = "05", asPage = false }: { n?: string; asPage?: boolean }) {
  const Heading = asPage ? "h1" : "h2";
  const [selected, setSelected] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const [lastMessage, setLastMessage] = useState("");

  const toggle = (s: string) => setSelected((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const message = buildMessage(
      String(fd.get("name") ?? "").trim(),
      String(fd.get("phone") ?? "").trim(),
      selected,
      String(fd.get("details") ?? "").trim(),
      fd.get("offers") === "yes",
    );
    setLastMessage(message);
    window.open(whatsapp(message), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <section
      id="contact"
      className={cn("relative px-4 sm:px-8 lg:px-12", asPage ? "pb-16 pt-28 lg:pb-24 lg:pt-36" : "py-24 lg:py-32")}
    >
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <div className="glass glass-edge relative overflow-hidden rounded-[36px] p-6 sm:p-10 lg:p-14">
            <div aria-hidden className="pointer-events-none absolute -left-32 -top-40 size-[34rem] rounded-full bg-brand/25 blur-[110px]" />
            <div aria-hidden className="pointer-events-none absolute -bottom-48 right-0 size-[30rem] rounded-full bg-brand-deep/20 blur-[120px]" />

            <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-14">
              <div className="flex flex-col lg:col-span-5">
                <p className="section-label">
                  <b>{n}/</b> contact
                </p>
                <Heading className="mt-5 font-display text-[clamp(2.4rem,4.8vw,4.4rem)] font-light leading-[1.02] tracking-[-0.035em]">
                  Let&apos;s build something people <span className="text-brand">remember.</span>
                </Heading>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
                  Tell us about your project and you&apos;ll get a clear plan and a custom quote. Most projects are
                  scoped and started within 24 hours.
                </p>

                <a
                  href={whatsapp("Hi ZockTech! I'd like to discuss a project.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-8 h-14 w-full px-7 text-base sm:w-fit"
                >
                  <WhatsApp size={20} /> Chat on WhatsApp
                </a>
                <ConsentNote className="mt-3 max-w-sm" />

                <ul className="mt-10 grid gap-4 text-[15px] lg:mt-auto lg:pt-10">
                  {phones.map((p) => (
                    <li key={p.tel}>
                      <a href={p.tel} className="group flex items-center gap-3">
                        <span className="glass grid size-10 place-items-center rounded-full">
                          <Phone size={16} />
                        </span>
                        <span className="transition-colors group-hover:text-brand">{p.display}</span>
                        <span className="text-xs text-faint">{p.label}</span>
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href={`mailto:${site.email}`} className="group flex items-center gap-3">
                      <span className="glass grid size-10 place-items-center rounded-full">
                        <Mail size={16} />
                      </span>
                      <span className="transition-colors group-hover:text-brand">{site.email}</span>
                    </a>
                  </li>
                  <li>
                    <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
                      <span className="glass grid size-10 place-items-center rounded-full">
                        <Instagram size={16} />
                      </span>
                      <span className="transition-colors group-hover:text-brand">{site.instagramHandle}</span>
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-muted">
                    <span className="glass grid size-10 place-items-center rounded-full text-fg">
                      <Clock size={16} />
                    </span>
                    {site.hours}
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-7">
                <div className="glass rounded-[28px] p-5 sm:p-7 [--glass-bg:var(--chip)]">
                  <AnimatePresence mode="wait" initial={false}>
                    {sent ? (
                      <motion.div
                        key="sent"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.5 }}
                        className="flex min-h-[420px] flex-col items-center justify-center text-center"
                        role="status"
                      >
                        <span className="grid size-16 place-items-center rounded-full bg-brand text-[#170c03] shadow-[0_0_60px_rgb(249_148_59/0.6)]">
                          <Check size={28} />
                        </span>
                        <p className="mt-6 font-display text-3xl font-light tracking-tight">Your message is ready.</p>
                        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                          WhatsApp opened in a new tab with your details. Just hit send, and we&apos;ll reply during
                          business hours.
                        </p>
                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                          <a
                            href={whatsapp(lastMessage)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary h-11 px-5 text-sm"
                          >
                            Open WhatsApp again <ArrowUpRight size={15} />
                          </a>
                          <a
                            href={`mailto:${site.email}?subject=${encodeURIComponent("New project enquiry")}&body=${encodeURIComponent(lastMessage)}`}
                            className="btn btn-ghost h-11 px-5 text-sm"
                          >
                            Send by email instead
                          </a>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSent(false)}
                          className="mt-5 text-sm text-muted underline underline-offset-4"
                        >
                          Edit my details
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.5 }}
                        onSubmit={onSubmit}
                        className="grid gap-5"
                      >
                        <div className="grid gap-5 sm:grid-cols-2">
                          <label className="grid gap-2 text-sm font-medium">
                            Your name
                            <input name="name" required autoComplete="name" placeholder="Priya Sharma" className={field} />
                          </label>
                          <label className="grid gap-2 text-sm font-medium">
                            WhatsApp number
                            <input
                              name="phone"
                              required
                              type="tel"
                              inputMode="tel"
                              autoComplete="tel"
                              placeholder="+91 98765 43210"
                              pattern="[+0-9 ()-]{8,}"
                              title="Please enter a valid phone number"
                              className={field}
                            />
                          </label>
                        </div>

                        <fieldset className="grid gap-3">
                          <legend className="mb-3 text-sm font-medium">What do you need?</legend>
                          <div className="flex flex-wrap gap-2">
                            {contactServices.map((s) => {
                              const on = selected.includes(s);
                              return (
                                <button
                                  key={s}
                                  type="button"
                                  aria-pressed={on}
                                  onClick={() => toggle(s)}
                                  className={cn(
                                    "chip h-10 px-4 text-[13.5px] transition-all duration-300",
                                    on
                                      ? "border-transparent bg-brand font-semibold !text-[#170c03] shadow-[0_8px_24px_-10px_rgb(249_148_59/0.9)]"
                                      : "hover:border-brand/50",
                                  )}
                                >
                                  {on && <Check size={14} />}
                                  {s}
                                </button>
                              );
                            })}
                          </div>
                        </fieldset>

                        <label className="grid gap-2 text-sm font-medium">
                          Tell us a little about it <span className="font-normal text-faint">(optional)</span>
                          <textarea
                            name="details"
                            rows={4}
                            placeholder="What's the business, what are you hoping to achieve, any timeline?"
                            className={cn(field, "resize-none")}
                          />
                        </label>

                        <fieldset className="grid gap-3 rounded-2xl border border-line bg-chip p-4">
                          <legend className="sr-only">Consent</legend>
                          <label className="flex cursor-pointer items-start gap-3 text-[13.5px] leading-snug">
                            <input
                              type="checkbox"
                              name="consent"
                              value="yes"
                              required
                              className="mt-0.5 size-[18px] shrink-0 cursor-pointer accent-[var(--color-brand)]"
                            />
                            <span>
                              I agree to ZockTech&apos;s{" "}
                              <Link href="/terms" target="_blank" className="font-medium underline underline-offset-2 hover:text-brand-text">
                                Terms &amp; Conditions
                              </Link>{" "}
                              and{" "}
                              <Link href="/privacy" target="_blank" className="font-medium underline underline-offset-2 hover:text-brand-text">
                                Privacy Policy
                              </Link>
                              , and to be contacted by ZockTech on WhatsApp, phone and email about my enquiry.{" "}
                              <span className="text-faint">(required)</span>
                            </span>
                          </label>
                          <label className="flex cursor-pointer items-start gap-3 text-[13.5px] leading-snug text-muted">
                            <input
                              type="checkbox"
                              name="offers"
                              value="yes"
                              className="mt-0.5 size-[18px] shrink-0 cursor-pointer accent-[var(--color-brand)]"
                            />
                            <span>
                              {OFFERS_TEXT} <span className="text-faint">(optional, stop any time by replying STOP)</span>
                            </span>
                          </label>
                        </fieldset>

                        <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-[13px] leading-snug text-faint">
                            Opens WhatsApp with your details filled in. Nothing is stored on this site.
                          </p>
                          <button type="submit" className="btn btn-primary h-13 shrink-0 px-7 py-4 text-[15px]">
                            Get my custom quote <ArrowUpRight size={16} />
                          </button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
