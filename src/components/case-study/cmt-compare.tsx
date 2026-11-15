"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, Plus } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

/*
 * The CompareMyTrip comparison tray, working the way the live site does (src/lib/useCompare.ts):
 * three fixed slots; a pick fills the first empty slot; once all three are full, picks wrap round
 * (slot 1, then 2, then 3), so a fourth pick replaces the oldest instead of being dropped; picking
 * a trip that is already in the tray empties its slot. Trips here are samples for illustration.
 */
const TRIPS = [
  { id: "kerala", name: "Kerala Temples & Backwaters", days: "6 days", style: "Temples & backwaters", bestFor: "Couples", stay: "Houseboat + resort" },
  { id: "goa", name: "Goa Beach Escape", days: "4 days", style: "Beaches & sunsets", bestFor: "Friends", stay: "Beach resort" },
  { id: "mumbai", name: "Mumbai City Break", days: "3 days", style: "City & food", bestFor: "First-timers", stay: "Sea-view hotel" },
  { id: "dharmashala", name: "Dharamshala Hills", days: "5 days", style: "Mountains & monasteries", bestFor: "Slow travel", stay: "Hill homestay" },
  { id: "newdelhi", name: "Delhi Heritage Trail", days: "3 days", style: "History & food", bestFor: "Families", stay: "Heritage hotel" },
] as const;

type TripId = (typeof TRIPS)[number]["id"];
const SLOTS = 3;
const ROWS = [
  { key: "days", label: "Duration" },
  { key: "style", label: "Travel style" },
  { key: "bestFor", label: "Best for" },
  { key: "stay", label: "Stay" },
] as const;

const tripImage = (id: TripId) => `/work/case/comparemytrip/trips/${id}.webp`;

export function CmtCompare() {
  const [slots, setSlots] = useState<(TripId | null)[]>(["kerala", "goa", null]);
  const [cursor, setCursor] = useState(0);

  function pick(id: TripId) {
    const at = slots.indexOf(id);
    if (at >= 0) {
      setSlots(slots.map((s, i) => (i === at ? null : s)));
      return;
    }
    const empty = slots.indexOf(null);
    if (empty >= 0) {
      setSlots(slots.map((s, i) => (i === empty ? id : s)));
      return;
    }
    setSlots(slots.map((s, i) => (i === cursor ? id : s)));
    setCursor((cursor + 1) % SLOTS);
  }

  const chosen = slots.map((id) => TRIPS.find((t) => t.id === id) ?? null);

  return (
    <div className="mt-24 px-4 sm:px-8 lg:mt-32 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <Reveal className="flex flex-col justify-between gap-5 px-1 lg:flex-row lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--cs-text)]">Try the compare tray</p>
            <h3 className="mt-3 max-w-[18ch] font-display text-[clamp(1.9rem,3.4vw,3rem)] font-light leading-[1.05] tracking-[-0.03em]">
              Three trips, side by side.
            </h3>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-muted">
            Pick up to three. A fourth pick replaces the oldest, exactly like on the site, so nothing you choose is silently
            dropped. <span className="text-faint">Sample trips, for illustration.</span>
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <ul className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:px-0">
            {TRIPS.map((t) => {
              const inTray = slots.includes(t.id);
              return (
                <li key={t.id} className="w-[40vw] max-w-[220px] shrink-0 snap-start sm:w-auto sm:max-w-none">
                  <button
                    type="button"
                    aria-pressed={inTray}
                    onClick={() => pick(t.id)}
                    className={cn(
                      "group relative block aspect-[3/4] w-full overflow-hidden rounded-[22px] text-left ring-1 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5",
                      inTray ? "shadow-[0_0_0_3px_var(--cs)] ring-transparent" : "ring-line",
                    )}
                  >
                    <Image src={tripImage(t.id)} alt="" fill sizes="(max-width: 640px) 40vw, 20vw" className="object-cover" />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <span
                      className={cn(
                        "absolute right-3 top-3 grid size-8 place-items-center rounded-full transition-colors duration-300",
                        inTray ? "bg-[var(--cs)] text-[#1a1300]" : "bg-black/50 text-white ring-1 ring-white/25 backdrop-blur",
                      )}
                    >
                      {inTray ? <Check size={16} strokeWidth={2.4} /> : <Plus size={16} />}
                    </span>
                    <span className="absolute inset-x-0 bottom-0 p-3.5 text-white sm:p-4">
                      <span className="block font-display text-[15px] font-semibold leading-tight sm:text-base">{t.name}</span>
                      <span className="mt-1 block text-xs text-white/70">{t.days}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal className="mt-4">
          <div className="glass glass-edge overflow-x-auto rounded-[26px] p-2 sm:p-3">
            <table className="w-full min-w-[560px] table-fixed border-separate border-spacing-0 text-left text-sm">
              <caption className="sr-only">Comparison of the trips in the tray</caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[22%] p-3 align-bottom text-[11px] font-semibold uppercase tracking-[0.14em] text-faint sm:p-4">
                    Compare
                  </th>
                  {chosen.map((t, i) => (
                    <th key={i} scope="col" className="p-2 align-bottom font-normal sm:p-3">
                      {t ? (
                        <div key={t.id} className="anim-fade-up flex items-center gap-3">
                          <span className="relative size-11 shrink-0 overflow-hidden rounded-xl sm:size-12">
                            <Image src={tripImage(t.id)} alt="" fill sizes="48px" className="object-cover" />
                          </span>
                          <span className="font-display text-[15px] font-semibold leading-tight">{t.name}</span>
                        </div>
                      ) : (
                        <div className="grid h-11 place-items-center rounded-xl border border-dashed border-line text-xs text-faint sm:h-12">
                          Slot {i + 1} · pick a trip
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.key}>
                    <th scope="row" className="border-t border-line p-3 font-medium text-muted sm:p-4">
                      {row.label}
                    </th>
                    {chosen.map((t, i) => (
                      <td key={i} className="border-t border-line p-3 sm:p-4">
                        {t ? (
                          <span key={t.id} className="anim-fade-up block">
                            {t[row.key]}
                          </span>
                        ) : (
                          <span className="text-faint">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
