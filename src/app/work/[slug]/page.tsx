import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/case-study/case-study-page";
import { SiteShell } from "@/components/site/site-shell";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { ogDefaults, twitterDefaults } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

// Every case study is prerendered from generateStaticParams. The page reads `params` at the top
// (not inside <Suspense>) so an unknown slug gets a real 404 status; links into this route use
// prefetch={true}, which serves the whole static page ahead of the click.
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  // The share image comes from the colocated opengraph-image.tsx.
  const title = `${cs.name} case study · ${cs.category}`;
  const description = cs.summary;
  return {
    title,
    description,
    alternates: { canonical: `/work/${cs.slug}` },
    openGraph: { ...ogDefaults, type: "article", url: `/work/${cs.slug}`, title, description },
    twitter: { ...twitterDefaults, title, description },
  };
}

export default async function CaseStudyRoute({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const url = `${site.url}/work/${cs.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `${url}#case-study`,
      name: `${cs.name} case study`,
      headline: cs.headline,
      description: cs.summary,
      url,
      image: `${site.url}${cs.project.video.desktopPoster}`,
      dateCreated: cs.year,
      genre: cs.category,
      keywords: [...cs.services, ...cs.stack].join(", "),
      creator: { "@id": `${site.url}/#business` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Work", item: `${site.url}/work` },
        { "@type": "ListItem", position: 3, name: cs.name, item: url },
      ],
    },
  ];

  return (
    <SiteShell page="work">
      <CaseStudyPage cs={cs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </SiteShell>
  );
}
