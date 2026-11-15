import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * The consent line shown under WhatsApp and quote buttons (and in the footer on every page).
 * Meta's WhatsApp Business Messaging Policy requires opt-in that names the business and says the
 * person agrees to be contacted; this line plus the form's tick-box covers that.
 */
export function ConsentNote({ className, align = "left" }: { className?: string; align?: "left" | "center" }) {
  return (
    <p className={cn("text-[12.5px] leading-relaxed text-faint", align === "center" && "text-center", className)}>
      By contacting us you agree to our{" "}
      <Link href="/terms" className="underline underline-offset-2 transition-colors hover:text-fg">
        Terms &amp; Conditions
      </Link>{" "}
      and{" "}
      <Link href="/privacy" className="underline underline-offset-2 transition-colors hover:text-fg">
        Privacy Policy
      </Link>
      , and to hear from ZockTech on WhatsApp about your enquiry.
    </p>
  );
}
