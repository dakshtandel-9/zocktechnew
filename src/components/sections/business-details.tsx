import { Reveal } from "@/components/ui/reveal";
import { offices, site } from "@/lib/site";

/** Business details as registered on the Udyam certificate, shown on /contact for customers and verification reviewers. */
export function BusinessDetails() {
  const registered = offices.find((o) => o.city === "Honnavar") ?? offices[0];
  const other = offices.filter((o) => o !== registered);
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "Trading name", value: site.name },
    { label: "Legal name (proprietor)", value: site.legalName },
    { label: "Business type", value: "Sole proprietorship (Udyam-registered micro enterprise)" },
    { label: "Udyam Registration No.", value: site.udyam },
    { label: "Registered office", value: registered.lines.join(" ") },
    ...other.map((o) => ({ label: "Additional office", value: o.lines.join(" ") })),
    { label: "Email", value: <a href={`mailto:${site.email}`} className="hover:text-brand-text">{site.email}</a> },
    { label: "Phone & WhatsApp", value: <a href={site.phoneHref} className="hover:text-brand-text">{site.phoneDisplay}</a> },
    { label: "Business hours", value: site.hours },
    { label: "Website", value: site.url.replace("https://", "") },
  ];
  return (
    <section aria-labelledby="business-details-title" className="px-4 pb-16 sm:px-8 lg:px-12 lg:pb-24">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <div className="glass glass-edge rounded-[28px] p-6 sm:p-9">
            <h2
              id="business-details-title"
              className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-tight tracking-[-0.02em]"
            >
              Business details
            </h2>
            <dl className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {rows.map((r, i) => (
                <div key={`${r.label}-${i}`} className="border-t border-line pt-4">
                  <dt className="text-[12.5px] uppercase tracking-wider text-faint">{r.label}</dt>
                  <dd className="mt-1 text-[15px] leading-relaxed text-fg">{r.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
