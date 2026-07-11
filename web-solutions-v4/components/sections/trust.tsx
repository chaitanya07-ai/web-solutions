"use client";

import { COUNTRIES } from "@/lib/site";
import { Counter, Reveal } from "@/components/ui/primitives";

const STATS: { value: number; suffix: string; label: string; note: string }[] = [
  { value: 50, suffix: "+", label: "Websites delivered", note: "Across restaurants, cafes, clinics & more" },
  { value: 6, suffix: "+", label: "Countries served", note: "From Toronto to Bangkok" },
  { value: 100, suffix: "%", label: "Responsive builds", note: "Flawless on every screen size" },
  { value: 24, suffix: "/7", label: "Support", note: "A real human, whenever you need one" },
];

export default function Trust() {
  return (
    <section id="trust" className="border-y border-line bg-mist">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <Reveal>
          <p className="text-center text-[11px] font-semibold uppercase tracking-widest2 text-ink-faint">
            Trusted by business owners worldwide
          </p>
        </Reveal>

        {/* Counters */}
        <div className="mt-12 grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div
                className={`flex flex-col items-center px-6 text-center ${
                  i > 0 ? "lg:border-l lg:border-line" : ""
                } ${i % 2 === 1 ? "border-l border-line lg:border-l" : ""}`}
              >
                <div className="font-display text-5xl tracking-tight text-ink md:text-6xl">
                  <Counter to={s.value} />
                  <span className="text-gold">{s.suffix}</span>
                </div>
                <p className="mt-3 text-sm font-semibold tracking-wide text-ink">
                  {s.label}
                </p>
                <p className="mt-1 text-xs text-ink-faint">{s.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Country marquee */}
      <div className="relative overflow-hidden border-t border-line py-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-mist to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-mist to-transparent" />
        <div className="flex w-max animate-marquee gap-0 hover:[animation-play-state:paused]">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              {COUNTRIES.map((c) => (
                <span
                  key={`${dup}-${c}`}
                  className="flex items-center gap-8 pr-8 text-sm font-semibold uppercase tracking-widest2 text-ink-soft"
                >
                  {c}
                  <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
