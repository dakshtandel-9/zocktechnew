import { FAQ } from "@/components/sections/faq";
import { CtaBand } from "@/components/site/cta-band";
import { FaqJsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { SiteShell } from "@/components/site/site-shell";
import { pageMetadata } from "@/lib/seo";
import { faqGroups } from "@/lib/site";

export const metadata = pageMetadata({
  title: "FAQ",
  description:
    "Answers about working with ZockTech: how custom quotes and payments work, timelines, what we need to start, website ownership, ads and Instagram management.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <SiteShell page="faq">
      <main>
        <PageHero
          crumb="FAQ"
          label="questions"
          title={
            <>
              Questions, <span className="text-brand">answered.</span>
            </>
          }
          intro="Everything clients usually ask before we start. Can't find your answer? Just ask us on WhatsApp."
        >
          <ul className="flex flex-wrap gap-2 lg:hidden">
            {faqGroups.map((g) => (
              <li key={g.id}>
                <a href={`#${g.id}`} className="chip h-10 px-4">
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </PageHero>
        <FAQ />
        <CtaBand />
      </main>
      <FaqJsonLd />
    </SiteShell>
  );
}
