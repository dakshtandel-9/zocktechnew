import Link from "next/link";
import { ConsentNote } from "@/components/site/consent-note";
import { ArrowUp, Instagram, WhatsApp } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";
import { ZMark } from "@/components/ui/z-mark";
import { legalLinks, navLinks, offices, phones, pillars, site, whatsapp, type SitePage } from "@/lib/site";

async function Year() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function Footer({ page = "home" }: { page?: SitePage }) {
  return (
    <footer className="relative overflow-hidden px-4 pb-6 pt-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="glass glass-edge relative overflow-hidden rounded-[32px] p-7 sm:p-10 lg:p-12">
          <ZMark
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-16 h-[140%] w-auto rotate-12 text-[var(--z-mark)]"
          />
          <div className="relative grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Logo className="h-8 w-auto" />
              <p className="mt-5 max-w-xs font-display text-2xl font-light leading-snug tracking-[-0.02em]">
                {site.tagline}
              </p>
              <div className="mt-6 flex gap-2">
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="ZockTech on Instagram"
                  className="glass grid size-11 place-items-center rounded-full transition-transform hover:scale-105"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={whatsapp()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with ZockTech on WhatsApp"
                  className="glass grid size-11 place-items-center rounded-full transition-transform hover:scale-105"
                >
                  <WhatsApp size={18} />
                </a>
              </div>
              <ConsentNote className="mt-5 max-w-xs" />
            </div>

            <nav aria-label="Services" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
              {pillars.map((p) => (
                <div key={p.id}>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-brand-text">{p.name}</p>
                  <ul className="mt-4 space-y-2.5 text-sm text-muted">
                    {p.services.map((s) => (
                      <li key={s.name}>
                        <Link href={`/services#${p.id}`} className="transition-colors hover:text-fg">
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3 lg:grid-cols-1">
              <nav aria-label="Pages">
                <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-brand-text">Explore</p>
                <ul className="mt-4 space-y-2.5 text-sm text-muted">
                  <li>
                    <Link href="/" className="transition-colors hover:text-fg">
                      Home
                    </Link>
                  </li>
                  {navLinks.map((l) => (
                    <li key={l.id}>
                      <Link
                        href={l.href}
                        aria-current={page === l.id ? "page" : undefined}
                        className="transition-colors hover:text-fg aria-[current=page]:text-fg"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            <div className="sm:col-span-2 lg:col-span-1">
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-brand-text">Contact</p>
              <ul className="mt-4 space-y-2.5 text-sm text-muted">
                {phones.map((p) => (
                  <li key={p.tel}>
                    <a href={p.tel} className="transition-colors hover:text-fg">
                      {p.display}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${site.email}`} className="transition-colors hover:text-fg">
                    {site.email}
                  </a>
                </li>
                <li>{site.hours}</li>
                {offices.map((o) => (
                  <li key={o.name}>
                    <span className="font-medium text-fg">{o.name}</span>
                    <br />
                    {o.lines.join(" ")}
                  </li>
                ))}
                <li>Serving clients across {site.location}</li>
              </ul>
            </div>
            </div>
          </div>
        </div>

        <p
          aria-hidden
          className="giant mt-4 select-none bg-gradient-to-b from-fg/[0.13] to-transparent bg-clip-text text-center text-[23vw] leading-[0.82] text-transparent"
        >
          zocktech
        </p>

        <div className="mt-2 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-[13px] text-muted sm:flex-row">
          <p>
            © <Year /> ZockTech · Made in India
          </p>
          <nav aria-label="Legal" className="flex items-center gap-5">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} prefetch className="transition-colors hover:text-fg">
                {l.label}
              </Link>
            ))}
          </nav>
          <a href="#top" className="inline-flex items-center gap-2 transition-colors hover:text-fg">
            Back to top <ArrowUp size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}
