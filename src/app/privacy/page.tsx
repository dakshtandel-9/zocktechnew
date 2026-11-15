import { LegalPage } from "@/components/site/legal-page";
import { SiteShell } from "@/components/site/site-shell";
import { privacy } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "What personal information ZockTech collects, why, how it's protected, and your rights under Indian law.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <SiteShell page="legal">
      <LegalPage doc={privacy} path="/privacy" />
    </SiteShell>
  );
}
