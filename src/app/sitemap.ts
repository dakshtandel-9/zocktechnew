import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: "monthly" | "yearly" = "monthly") => ({
    url: `${site.url}${path}`,
    changeFrequency,
    priority,
  });
  return [
    page("", 1),
    page("/services", 0.9),
    page("/work", 0.8),
    ...caseStudies.map((c) => page(`/work/${c.slug}`, 0.7, "yearly")),
    page("/process", 0.6),
    page("/faq", 0.6),
    page("/contact", 0.8),
    page("/privacy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
  ];
}
