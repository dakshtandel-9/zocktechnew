import { CmtCompare } from "@/components/case-study/cmt-compare";
import { CmtFlight } from "@/components/case-study/cmt-flight";
import { HeseosLights } from "@/components/case-study/heseos-lights";
import { TuklogicTimeline } from "@/components/case-study/tuklogic-timeline";
import type { CaseSlug } from "@/lib/case-studies";

/** The one section that is different on every case study: a hands-on piece of the project itself. */
export function Signature({ slug }: { slug: CaseSlug }) {
  switch (slug) {
    case "heseos":
      return <HeseosLights />;
    case "tuklogic":
      return <TuklogicTimeline />;
    case "comparemytrip":
      return (
        <>
          <CmtFlight />
          <CmtCompare />
        </>
      );
  }
}
