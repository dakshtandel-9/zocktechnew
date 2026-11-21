import Link from "next/link";
import { ConsentNote } from "@/components/site/consent-note";
import { PageHero } from "@/components/site/page-hero";
import { Mail, WhatsApp } from "@/components/ui/icons";
import type { LegalDoc } from "@/lib/legal";
import { legalLinks, site, whatsapp } from "@/lib/site";

/** Readable legal document: numbered sections with a sticky contents list on wide screens. */
export function LegalPage({ doc, path }: { doc: LegalDoc; path: string }) {
  const other = legalLinks.find((l) => l.href !== path);
  return (
    <main>
      <PageHero
        crumb={doc.title}
        label="legal"
        title={doc.title}
        intro={
          <>
            <p>{doc.intro}</p>
            <p className="mt-4 text-sm text-faint">Last updated {doc.updated}</p>
          </>
        }
      />

      <div className="px-4 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-12 lg:gap-14">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <details className="glass glass-edge group rounded-[24px] p-5 lg:hidden">
                <summary className="cursor-pointer list-none font-display text-lg font-medium">
                  Contents <span className="text-sm font-normal text-muted">({doc.sections.length} sections)</span>
                </summary>
                <Contents doc={doc} />
              </details>
              <nav aria-label="Contents" className="glass glass-edge hidden rounded-[24px] p-6 lg:block">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">Contents</p>
                <Contents doc={doc} />
              </nav>
              <div className="glass glass-edge mt-4 hidden rounded-[24px] p-6 lg:block">
                <p className="font-display text-lg font-medium tracking-tight">Questions?</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">We&apos;re happy to explain anything here.</p>
                <div className="mt-4 grid gap-2 text-sm">
                  <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-brand">
                    <Mail size={15} /> {site.email}
                  </a>
                  <a
                    href={whatsapp(`Hi ZockTech! I have a question about your ${doc.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-colors hover:text-brand"
                  >
                    <WhatsApp size={15} /> {site.phoneDisplay}
                  </a>
                </div>
                <ConsentNote className="mt-4" />
              </div>
            </div>
          </aside>

          <article className="lg:col-span-8">
            {doc.sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-28 border-t border-line py-9 first:border-t-0 first:pt-0">
                <h2 id={`${s.id}-title`} className="flex items-baseline gap-4 font-display text-[clamp(1.45rem,2.4vw,1.9rem)] font-medium leading-tight tracking-[-0.02em]">
                  <span className="shrink-0 text-sm font-semibold text-brand-text sm:w-8">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                <div className="mt-4 space-y-4 text-[15.5px] sm:pl-12 leading-[1.75] text-muted">
                  {s.body.map((b, j) =>
                    Array.isArray(b) ? (
                      <ul key={j} className="space-y-2.5">
                        {b.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-brand" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p key={j}>{b}</p>
                    ),
                  )}
                </div>
              </section>
            ))}
            {other && (
              <p className="mt-6 border-t border-line pt-8 text-sm sm:pl-12 text-muted">
                See also our{" "}
                <Link href={other.href} prefetch className="font-medium text-brand-text underline underline-offset-4">
                  {other.label}
                </Link>
                .
              </p>
            )}
          </article>
        </div>
      </div>
    </main>
  );
}

function Contents({ doc }: { doc: LegalDoc }) {
  return (
    <ol className="mt-4 space-y-1 text-sm">
      {doc.sections.map((s, i) => (
        <li key={s.id}>
          <a href={`#${s.id}`} className="flex gap-3 rounded-lg py-1.5 text-muted transition-colors hover:text-fg">
            <span className="w-5 shrink-0 text-faint">{String(i + 1).padStart(2, "0")}</span>
            {s.title}
          </a>
        </li>
      ))}
    </ol>
  );
}
