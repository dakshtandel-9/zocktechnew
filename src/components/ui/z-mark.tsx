import type { SVGProps } from "react";

/** The "Z" from the ZockTech logo, traced to a vector so it stays crisp at any size. */
export function ZMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 151 187" fill="currentColor" aria-hidden {...props}>
      <path d="M0 0H57L89 46.5H0Z" />
      <path d="M151 1.3V64.1L68.8 141H151V186.5H0V143.7Z" />
    </svg>
  );
}
