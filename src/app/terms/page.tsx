import { LegalPage } from "@/components/site/legal-page";
import { SiteShell } from "@/components/site/site-shell";
import { terms } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description: "How working with ZockTech works: quotes, payments, timelines, revisions, ownership, cancellations and more.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <SiteShell page="legal">
      <LegalPage doc={terms} path="/terms" />
    </SiteShell>
  );
}
