"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { Play } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/lib/use-media-query";

const noopSubscribe = () => () => {};

/**
 * Muted looping video. On desktop it plays (and only downloads) while it is on screen.
 * On phones, with Data Saver on, or with reduced motion, it shows the poster and downloads
 * nothing until the visitor taps play, so mobile visitors don't pull megabytes of video.
 */
export function AutoVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion() ?? false;
  const wide = useMediaQuery("(min-width: 1024px)");
  const saveData = useSyncExternalStore(
    noopSubscribe,
    () => !!(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
    () => false,
  );
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const auto = wide && !reduce && !saveData;

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    if (!auto && !started) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [auto, started]);

  return (
    <>
      <video
        ref={ref}
        className="absolute inset-0 size-full object-cover object-top"
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={src} type="video/mp4" />
      </video>
      {!auto && !playing && (
        <button
          type="button"
          onClick={() => {
            setStarted(true);
            ref.current?.play().catch(() => {});
          }}
          aria-label={`Play: ${label}`}
          className="absolute inset-0 grid place-items-center"
        >
          <span className="grid size-10 place-items-center rounded-full bg-black/55 text-white backdrop-blur sm:size-14">
            <Play size={20} />
          </span>
        </button>
      )}
    </>
  );
}

export function Laptop({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className="relative rounded-[clamp(10px,1.6vw,20px)] bg-[#0c0c0e] p-[1.25%] pb-[2.1%] shadow-[0_60px_120px_-40px_rgb(0_0_0/0.7)] ring-1 ring-white/10">
        <span aria-hidden className="absolute left-1/2 top-[0.55%] size-[clamp(3px,0.4vw,6px)] -translate-x-1/2 rounded-full bg-[#2c2c31]" />
        <div className="relative aspect-[16/10] overflow-hidden rounded-[clamp(4px,0.5vw,7px)] bg-black">{children}</div>
      </div>
      <div
        aria-hidden
        className="relative left-1/2 h-[clamp(9px,1.25vw,17px)] w-[112%] -translate-x-1/2 rounded-b-[clamp(8px,1.3vw,18px)] rounded-t-[3px] bg-gradient-to-b from-[#e4e5e9] via-[#b6b8bf] to-[#85888f] dark:from-[#4a4b51] dark:via-[#2c2d32] dark:to-[#17181b]"
      >
        <span className="absolute left-1/2 top-0 h-[42%] w-[14%] -translate-x-1/2 rounded-b-[10px] bg-black/25" />
      </div>
    </div>
  );
}

export function Phone({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "@container relative aspect-[390/844] rounded-[16%/7.4%] bg-[#0c0c0e] p-[3.4%] shadow-[0_50px_90px_-30px_rgb(0_0_0/0.8)] ring-1 ring-white/15",
        className,
      )}
    >
      <div className="relative flex size-full flex-col overflow-hidden rounded-[13%/6.2%] bg-black">
        <div className="relative flex h-[5.4%] shrink-0 items-center justify-between px-[10%] text-[4.4cqw] font-semibold text-white">
          <span>9:41</span>
          <span className="flex items-center gap-[1.6cqw]" aria-hidden>
            <svg viewBox="0 0 18 12" className="h-[3cqw] w-auto fill-current">
              <rect x="0" y="8" width="3" height="4" rx="1" />
              <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
              <rect x="10" y="3" width="3" height="9" rx="1" />
              <rect x="15" y="0" width="3" height="12" rx="1" />
            </svg>
            <svg viewBox="0 0 26 12" className="h-[3cqw] w-auto">
              <rect x="0.5" y="0.5" width="22" height="11" rx="3" fill="none" stroke="currentColor" opacity="0.5" />
              <rect x="2" y="2" width="16" height="8" rx="1.6" fill="currentColor" />
              <rect x="24" y="4" width="1.6" height="4" rx="0.8" fill="currentColor" opacity="0.5" />
            </svg>
          </span>
          <span aria-hidden className="absolute left-1/2 top-[16%] h-[68%] w-[30%] -translate-x-1/2 rounded-full bg-[#050505] ring-1 ring-white/5" />
        </div>
        <div className="relative min-h-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
