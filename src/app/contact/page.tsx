import { Contact } from "@/components/sections/contact";
import { NextSteps } from "@/components/sections/home-links";
import { SiteShell } from "@/components/site/site-shell";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell us about your website, marketing or content project and get a clear plan and a custom quote, usually within 24 hours. WhatsApp, phone or email.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <SiteShell page="contact">
      <main id="top">
        <Contact asPage n="hello" />
        <div className="pb-24 lg:pb-32">
          <NextSteps />
        </div>
      </main>
    </SiteShell>
  );
}
