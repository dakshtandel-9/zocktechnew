import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { caseStudies, getCaseStudy, type CaseSlug } from "@/lib/case-studies";

export const alt = "ZockTech case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Covers are JPEG copies of each case study's cover (the image renderer cannot read WebP).
const covers = Object.fromEntries(
  await Promise.all(
    caseStudies.map(async (c) => {
      const data = await readFile(join(process.cwd(), "src/assets/og", `${c.slug}.jpg`));
      return [c.slug, `data:image/jpeg;base64,${data.toString("base64")}`] as const;
    }),
  ),
) as Record<CaseSlug, string>;

export async function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug) ?? caseStudies[0];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#070605" }}>
        {/* eslint-disable-next-line jsx-a11y/alt-text -- rendered to a PNG, not HTML */}
        <img src={covers[cs.slug]} width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, objectFit: "cover" }} />
        {/* the image renderer has no `inset`, so the scrim is sized explicitly */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            backgroundImage: "linear-gradient(90deg, rgba(7,6,5,0.94) 0%, rgba(7,6,5,0.78) 48%, rgba(7,6,5,0.1) 100%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, color: "rgba(246,241,234,0.75)", fontSize: 24, letterSpacing: 3 }}>
            <div style={{ width: 14, height: 14, borderRadius: 999, background: cs.accent }} />
            CASE STUDY · {cs.category.toUpperCase()}
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
            <div style={{ fontSize: 112, fontWeight: 700, letterSpacing: -5, lineHeight: 1, color: "#f6f1ea" }}>{cs.name}</div>
            <div style={{ marginTop: 22, fontSize: 38, lineHeight: 1.2, color: "rgba(246,241,234,0.85)" }}>{cs.headline}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 26, fontWeight: 700, color: "#f9943b" }}>
            ZockTech
            <span style={{ color: "rgba(246,241,234,0.6)", fontWeight: 400 }}>· Build. Grow. Create.</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
