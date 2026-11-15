"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Glass surface with a soft orange light that follows the cursor. */
export function Spotlight({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={cn("spotlight", className)}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
        el.style.setProperty("--spot", "1");
      }}
      onPointerLeave={() => ref.current?.style.setProperty("--spot", "0")}
    >
      {children}
    </div>
  );
}
