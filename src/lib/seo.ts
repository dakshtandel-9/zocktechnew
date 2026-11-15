import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Next.js replaces (does not merge) nested metadata objects such as `openGraph` between a layout
 * and its pages, so every page that sets its own `openGraph` spreads these defaults first.
 */
export const ogDefaults = {
  type: "website",
  siteName: site.name,
  locale: "en_IN",
  title: "ZockTech — Build. Grow. Create.",
  description: "One studio for your website, marketing and content.",
} satisfies NonNullable<Metadata["openGraph"]>;

/** The site-wide share image (src/app/opengraph-image.jpg), for pages that set their own `openGraph`. */
export const defaultOgImage = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "ZockTech — Build. Grow. Create. One studio for your website, marketing and content.",
};

export const twitterDefaults = {
  card: "summary_large_image",
  title: ogDefaults.title,
  description: ogDefaults.description,
} satisfies NonNullable<Metadata["twitter"]>;

/** Metadata for an inner page: "<title> | ZockTech", its own canonical URL and the site share image. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const full = `${title} | ZockTech`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...ogDefaults, url: path, title: full, description, images: [defaultOgImage] },
    twitter: { ...twitterDefaults, title: full, description, images: [defaultOgImage] },
  };
}
