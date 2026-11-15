import { faqs, phones, pillars, site } from "@/lib/site";

function Script({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Structured data so search engines understand the business (homepage). */
export function JsonLd() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${site.url}/#business`,
        name: site.name,
        url: site.url,
        logo: `${site.url}/brand/zocktech-logo-light.png`,
        image: `${site.url}/opengraph-image.jpg`,
        description:
          "Digital studio for websites, performance marketing, graphic design, Instagram page management and creator content.",
        telephone: site.phoneDisplay,
        contactPoint: phones.map((p) => ({
          "@type": "ContactPoint",
          telephone: p.display,
          contactType: "customer service",
          areaServed: "IN",
        })),
        email: site.email,
        areaServed: { "@type": "Country", name: "India" },
        address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: site.region, addressCountry: "IN" },
        sameAs: [site.instagram],
        founder: { "@type": "Person", name: site.founder },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:30",
            closes: "18:30",
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: pillars.flatMap((p) =>
            p.services.map((s) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: s.name, description: s.desc },
            })),
          ),
        },
      }}
    />
  );
}

/** FAQPage structured data, only on /faq where the answers are shown. */
export function FaqJsonLd() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  );
}
