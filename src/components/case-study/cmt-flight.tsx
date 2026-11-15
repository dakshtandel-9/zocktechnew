"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

/*
 * CompareMyTrip's hero, rebuilt for the case study: frames sampled from the real 372-frame flight
 * (every 8th frame, 47 in all, ~1 MB) drawn to a canvas as the page scrolls. Frames only start
 * downloading when the section is about a screen away.
 */
const FRAMES = 47;
const frameSrc = (i: number) => `/work/case/comparemytrip/flight/f${String(i).padStart(2, "0")}.webp`;

// Offsets must stay within 0–1 (Motion hands these to scroll-driven Web Animations), so the first
// caption starts visible and the last one stays visible instead of using out-of-range stops.
const CAPTIONS = [
  { text: "Window seat.", range: [0, 0.01, 0.26, 0.34], opacity: [1, 1, 1, 0] },
  { text: "Over the mountains.", range: [0.28, 0.36, 0.56, 0.64], opacity: [0, 1, 1, 0] },
  { text: "Down to the beach.", range: [0.6, 0.68, 0.99, 1], opacity: [0, 1, 1, 1] },
] as const;

function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) {
  const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const dw = img.naturalWidth * s;
  const dh = img.naturalHeight * s;
  ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
}

export function CmtFlight() {
  const reduce = useReducedMotion() ?? false;
  if (reduce) return <StillFlight />;
  return <ScrollFlight />;
}

function StillFlight() {
  return (
    <div className="px-4 sm:px-8 lg:px-12">
      <figure className="relative mx-auto aspect-[4/5] max-w-[1280px] overflow-hidden rounded-[28px] bg-black ring-1 ring-white/10 sm:aspect-video">
        {/* eslint-disable-next-line @next/next/no-img-element -- one frame of the sequence */}
        <img src={frameSrc(20)} alt="Flying over snow-capped mountains at sunset" className="size-full object-cover" />
      </figure>
    </div>
  );
}

function ScrollFlight() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const current = useRef(-1);
  const [loaded, setLoaded] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const draw = useCallback((progress: number, force = false) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !images.current.length) return;
    const want = Math.min(FRAMES - 1, Math.max(0, Math.round(progress * (FRAMES - 1))));
    // Nearest frame that has arrived, so scrolling ahead of the download never shows a blank.
    let idx = -1;
    for (let off = 0; off < FRAMES && idx < 0; off++) {
      for (const j of [want - off, want + off]) {
        const img = images.current[j];
        if (img && img.complete && img.naturalWidth) {
          idx = j;
          break;
        }
      }
    }
    if (idx < 0 || (idx === current.current && !force)) return;
    current.current = idx;
    drawCover(ctx, images.current[idx], canvas.width, canvas.height);
  }, []);

  // Start downloading frames when the section is about a screen away.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || images.current.length) return;
        io.disconnect();
        images.current = Array.from({ length: FRAMES }, (_, i) => {
          const img = new Image();
          img.decoding = "async";
          img.onload = () => {
            setLoaded((n) => n + 1);
            draw(scrollYProgress.get(), true);
          };
          img.src = frameSrc(i);
          return img;
        });
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [draw, scrollYProgress]);

  // Keep the canvas at its displayed size (capped at 2x for sharpness without waste).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(([entry]) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(entry.contentRect.width * dpr);
      canvas.height = Math.round(entry.contentRect.height * dpr);
      draw(scrollYProgress.get(), true);
    });
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [draw, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (v) => draw(v));

  const ready = loaded > 0;

  return (
    <div ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center px-4 sm:px-8 lg:px-12">
        <div className="relative aspect-[4/5] w-[min(100%,56svh)] overflow-hidden rounded-[28px] bg-black shadow-[0_60px_120px_-40px_rgb(0_0_0/0.7)] ring-1 ring-white/10 sm:aspect-video sm:w-[min(100%,calc(74svh*16/9),1280px)]">
          {/* eslint-disable-next-line @next/next/no-img-element -- poster until the frames arrive */}
          <img
            src={frameSrc(0)}
            alt="The view from an aeroplane window at sunset, the first frame of the CompareMyTrip hero"
            className="absolute inset-0 size-full object-cover"
          />
          <canvas
            ref={canvasRef}
            aria-hidden
            className="absolute inset-0 size-full transition-opacity duration-500"
            style={{ opacity: ready ? 1 : 0 }}
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />

          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/15 backdrop-blur-md sm:left-6 sm:top-6">
            <span className="size-1.5 rounded-full bg-[var(--cs)]" /> Scroll to fly
          </span>

          <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8">
            <div className="relative h-[1.1em] font-display text-[clamp(1.8rem,4.4vw,3.6rem)] font-semibold leading-none tracking-[-0.035em]">
              {CAPTIONS.map((c) => (
                <Caption key={c.text} text={c.text} range={c.range} visible={c.opacity} progress={scrollYProgress} />
              ))}
            </div>
            <div className="mt-5 h-[3px] overflow-hidden rounded-full bg-white/20">
              <motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left rounded-full bg-[var(--cs)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Caption({
  text,
  range,
  visible,
  progress,
}: {
  text: string;
  range: readonly [number, number, number, number];
  visible: readonly [number, number, number, number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(progress, [...range], [...visible]);
  const y = useTransform(progress, [...range], visible.map((o, i) => (o ? 0 : i === 0 ? 24 : -24)));
  return (
    <motion.p style={{ opacity, y }} className="absolute inset-x-0 bottom-0">
      {text}
    </motion.p>
  );
}
