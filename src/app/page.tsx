import type { Metadata } from "next";
import { Band } from "@/components/sections/band";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { NextSteps, ServicesPreview } from "@/components/sections/home-links";
import { Philosophy } from "@/components/sections/philosophy";
import { Work } from "@/components/sections/work";
import { JsonLd } from "@/components/site/json-ld";
import { SiteShell } from "@/components/site/site-shell";
import { ogDefaults } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...ogDefaults, url: "/" },
};

/** The front door: who we are, what we do and proof, with Services, Process and FAQ on their own pages. */
export default function Home() {
  return (
    <SiteShell page="home">
      <main>
        <Hero />
        <Philosophy />
        <ServicesPreview />
        <Band />
        <Work />
        <NextSteps />
        <Contact />
      </main>
      <JsonLd />
    </SiteShell>
  );
}
