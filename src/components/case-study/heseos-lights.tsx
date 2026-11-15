"use client";

import { useState, type CSSProperties } from "react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

/*
 * A small version of the Heseos Simulation. The overhead plate exists twice (lights on, lights off);
 * each room's lit version is shown through a feathered mask of that room's outline, so one switch
 * changes one room. Outlines are the ones measured for the real simulation (heseos-site,
 * lib/experience-scenes.ts), as percentages of the plate.
 */

type RoomId = "living" | "kitchen" | "bath" | "bedroom" | "bedroom2";
type Point = { x: number; y: number };

const PLATE_RATIO = 3 / 2;
const ART = "/work/case/heseos";

// Illustrative lighting loads (they add up to the simulation's 120 W lighting circuit total).
const ROOMS: { id: RoomId; name: string; watts: number; area: [number, number][]; label: Point }[] = [
  { id: "living", name: "Living", watts: 36, area: [[7.4, 13.4], [41.4, 13.4], [41.4, 49.5], [39.7, 49.5], [39.7, 89.6], [3.2, 89.8]], label: { x: 23, y: 49 } },
  { id: "kitchen", name: "Kitchen", watts: 24, area: [[41.4, 13.4], [69.4, 13.4], [69.4, 38.6], [92.6, 38.6], [93, 49.5], [41.4, 49.5]], label: { x: 55.5, y: 30 } },
  { id: "bath", name: "Bath", watts: 12, area: [[69.4, 13.4], [92.2, 13.4], [92.6, 38.6], [69.4, 38.6]], label: { x: 81, y: 26 } },
  { id: "bedroom", name: "Bedroom", watts: 28, area: [[39.7, 49.5], [68.1, 49.5], [68.4, 89.6], [39.7, 89.6]], label: { x: 54, y: 67 } },
  { id: "bedroom2", name: "Bedroom 2", watts: 20, area: [[68.1, 49.5], [93, 49.5], [97.6, 89.4], [68.4, 89.6]], label: { x: 81.5, y: 68 } },
];
const TOTAL = ROOMS.reduce((s, r) => s + r.watts, 0);

type Lights = Record<RoomId, boolean>;
const SCENES: { id: string; name: string; lights: Lights }[] = [
  { id: "home", name: "Home", lights: { living: true, kitchen: true, bath: true, bedroom: true, bedroom2: true } },
  { id: "evening", name: "Evening", lights: { living: true, kitchen: false, bath: false, bedroom: true, bedroom2: false } },
  { id: "away", name: "Away", lights: { living: false, kitchen: false, bath: false, bedroom: false, bedroom2: false } },
];

/** Feathered SVG mask for one room's outline (same technique as the live simulation). */
function areaMask(area: [number, number][]) {
  const points = area.map(([x, y]) => `${(x * PLATE_RATIO).toFixed(2)},${y}`).join(" ");
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${100 * PLATE_RATIO} 100' preserveAspectRatio='none'><filter id='f' x='-20%' y='-20%' width='140%' height='140%'><feGaussianBlur stdDeviation='0.9'/></filter><polygon points='${points}' filter='url(%23f)'/></svg>`;
  return `url("data:image/svg+xml,${svg.replace(/</g, "%3C").replace(/>/g, "%3E")}")`;
}
const MASKS = Object.fromEntries(ROOMS.map((r) => [r.id, areaMask(r.area)])) as Record<RoomId, string>;

export function HeseosLights() {
  const [lights, setLights] = useState<Lights>(SCENES[1].lights);
  const [dim, setDim] = useState(70);

  const watts = ROOMS.reduce((s, r) => s + (lights[r.id] ? r.watts : 0), 0);
  const litCount = ROOMS.filter((r) => lights[r.id]).length;
  const scene = SCENES.find((s) => ROOMS.every((r) => s.lights[r.id] === lights[r.id]))?.id;

  return (
    <div className="px-4 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-[1440px] gap-4 lg:grid-cols-12 lg:gap-5">
        <Reveal className="lg:col-span-8">
          <div className="glass glass-edge rounded-[28px] p-2 sm:p-2.5">
            <div
              className="relative overflow-hidden rounded-[20px] bg-[#0b0d10]"
              style={{ aspectRatio: "1600 / 1062" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- static plate layered under CSS masks */}
              <img
                src={`${ART}/home-dark.webp`}
                alt="Overhead view of the apartment: living room, kitchen, bathroom and two bedrooms"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover"
              />
              {ROOMS.map((r) => (
                <div
                  key={r.id}
                  aria-hidden
                  className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-[var(--ease-smooth)]"
                  style={{
                    backgroundImage: `url(${ART}/home-lit.webp)`,
                    maskImage: MASKS[r.id],
                    WebkitMaskImage: MASKS[r.id],
                    maskSize: "100% 100%",
                    WebkitMaskSize: "100% 100%",
                    opacity: lights[r.id] ? 1 : 0,
                  }}
                />
              ))}
              {ROOMS.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  aria-pressed={lights[r.id]}
                  aria-label={`${r.name} lights`}
                  onClick={() => setLights((l) => ({ ...l, [r.id]: !l[r.id] }))}
                  style={{ left: `${r.label.x}%`, top: `${r.label.y}%` } as CSSProperties}
                  className={cn(
                    "absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-semibold whitespace-nowrap shadow-[0_8px_24px_-8px_rgb(0_0_0/0.7)] backdrop-blur-md transition-[background-color,color,transform] duration-300 hover:scale-105 sm:gap-2 sm:px-3.5 sm:py-2 sm:text-[13px]",
                    lights[r.id] ? "bg-[var(--cs)] text-[#06222c]" : "bg-black/55 text-white ring-1 ring-white/20",
                  )}
                >
                  <span
                    className={cn(
                      "size-1.5 rounded-full sm:size-2",
                      lights[r.id] ? "bg-[#06222c]" : "bg-white/50",
                    )}
                  />
                  {r.name}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-4">
          <div className="glass glass-edge flex h-full flex-col rounded-[28px] p-6 sm:p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">Scenes</p>
            <div className="mt-3 grid grid-cols-3 gap-1.5 rounded-full border border-line bg-chip p-1">
              {SCENES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={scene === s.id}
                  onClick={() => setLights(s.lights)}
                  className={cn(
                    "rounded-full py-2.5 text-[13px] font-semibold transition-colors duration-300",
                    scene === s.id ? "bg-[var(--cs)] text-[#06222c]" : "text-muted hover:text-fg",
                  )}
                >
                  {s.name}
                </button>
              ))}
            </div>

            <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">Lighting load</p>
            <p className="mt-2 font-display text-[3.4rem] font-semibold leading-none tracking-[-0.05em]" aria-live="polite">
              {watts}
              <span className="ml-1 text-xl font-medium tracking-tight text-muted">W</span>
            </p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-chip ring-1 ring-line">
              <div
                className="h-full rounded-full bg-[var(--cs)] shadow-[0_0_16px_rgb(var(--cs-rgb)/0.8)] transition-[width] duration-700 ease-[var(--ease-expo)]"
                style={{ width: `${(watts / TOTAL) * 100}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-muted">
              {litCount} of {ROOMS.length} rooms lit · {TOTAL} W at full brightness
            </p>

            <p className="mt-auto pt-8 text-xs leading-relaxed text-faint">
              Tap a room on the plan to switch it. Loads are illustrative, as they are on the live site.
            </p>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-12">
          <div className="glass glass-edge grid gap-5 rounded-[28px] p-2 sm:p-2.5 lg:grid-cols-12 lg:items-center lg:gap-8">
            <div className="relative overflow-hidden rounded-[20px] bg-[#0b0d10] lg:col-span-8" style={{ aspectRatio: "1600 / 905" }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- two exposures cross-faded by the dimmer */}
              <img
                src={`${ART}/living-dark.webp`}
                alt="Living room with a walnut media wall, television and ceiling fan at dusk"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover"
              />
              {/* eslint-disable-next-line @next/next/no-img-element -- see above */}
              <img
                src={`${ART}/living-lit.webp`}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover"
                style={{ opacity: dim / 100 }}
              />
            </div>
            <div className="px-4 pb-6 sm:px-5 lg:col-span-4 lg:py-6 lg:pl-0 lg:pr-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">Living room dimmer</p>
              <p className="mt-2 font-display text-[3.4rem] font-semibold leading-none tracking-[-0.05em]">
                {dim}
                <span className="ml-1 text-xl font-medium tracking-tight text-muted">%</span>
              </p>
              <input
                type="range"
                min={0}
                max={100}
                value={dim}
                onChange={(e) => setDim(Number(e.target.value))}
                aria-label="Living room brightness"
                className="mt-5 w-full accent-[var(--cs)]"
              />
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Two photographs from the same camera, lights on and lights off. The dimmer blends between them, which
                looks real because it is.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
