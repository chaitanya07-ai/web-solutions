"use client";

import { useRef, useState } from "react";
import { ArrowLeftRight, Check, X } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui/primitives";

const WITHOUT = [
  "Invisible on Google search",
  "\u201CWhat's on the menu?\u201D — call to find out",
  "Missed calls after closing = lost revenue",
  "No reviews, no photos, no trust",
];

const WITH = [
  "Top results on Google Search & Maps",
  "Menu, prices & photos online 24/7",
  "Bookings arrive while you sleep",
  "128 five-star reviews on display",
];

export default function Comparison() {
  const [pos, setPos] = useState(54);
  const dragging = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const update = (clientX: number) => {
    const r = trackRef.current?.getBoundingClientRect();
    if (!r) return;
    const pct = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(90, Math.max(10, pct)));
  };

  return (
    <section className="border-y border-line bg-mist">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-36">
        <SectionHeading
          eyebrow="The difference"
          align="center"
          title={
            <>
              Same restaurant.{" "}
              <span className="italic text-gold-deep">Different future.</span>
            </>
          }
          lede="Drag the handle and watch what a website actually changes for a business like yours."
        />

        <Reveal delay={0.1} className="mt-16">
          <div
            ref={trackRef}
            role="slider"
            aria-label="Compare without and with a website"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") setPos((p) => Math.max(10, p - 4));
              if (e.key === "ArrowRight") setPos((p) => Math.min(90, p + 4));
            }}
            onPointerDown={(e) => {
              dragging.current = true;
              (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
              update(e.clientX);
            }}
            onPointerMove={(e) => dragging.current && update(e.clientX)}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
            style={{ touchAction: "pan-y" }}
            className="relative mx-auto max-w-5xl cursor-ew-resize select-none overflow-hidden rounded-3xl border border-line shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            {/* ---------- BEFORE: no website ---------- */}
            <div className="relative flex h-[480px] flex-col justify-center bg-[#E9E7E0] px-8 py-10 sm:px-14">
              <span className="absolute left-5 top-5 rounded-full border border-ink/15 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest2 text-ink-faint">
                Without a website
              </span>
              <p className="font-sans text-[10px] uppercase tracking-widest2 text-ink-faint">
                Somewhere on page 4 of Google…
              </p>
              <h3 className="mt-3 max-w-md text-3xl font-bold tracking-tight text-ink/50 sm:text-4xl">
                Bella Vista Restaurant
              </h3>
              <p className="mt-2 text-sm italic text-ink-faint">
                No menu found · No photos · Hours unknown
              </p>
              <ul className="mt-8 max-w-sm space-y-3.5">
                {WITHOUT.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-ink-faint">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-dashed border-ink/25">
                      <X className="h-3 w-3" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-9 inline-flex w-fit items-center rounded-lg border border-dashed border-ink/25 px-4 py-2.5 text-xs text-ink-faint">
                ☎ Ring and hope someone answers
              </p>
            </div>

            {/* ---------- AFTER: with Web Solutions ---------- */}
            <div
              className="absolute inset-0 flex flex-col justify-center bg-[#14110C] px-8 py-10 text-paper sm:px-14"
              style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
            >
              <div className="bg-grid absolute inset-0 opacity-[0.35]" aria-hidden />
              <span className="absolute right-5 top-5 rounded-full bg-gold px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest2 text-ink">
                With Web Solutions
              </span>
              <div className="relative">
                <p className="text-[10px] font-bold uppercase tracking-widest2 text-gold">
                  #1 {"\u201C"}italian restaurant near me{"\u201D"}
                </p>
                <h3 className="mt-3 max-w-md font-display text-3xl tracking-tight sm:text-4xl">
                  Bella Vista <span className="italic text-gold">Ristorante</span>
                </h3>
                <p className="mt-2 text-sm text-paper/60">
                  4.9★ · 128 reviews · Reservations open until midnight
                </p>
                <ul className="mt-8 max-w-sm space-y-3.5">
                  {WITH.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm text-paper/80">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                        <Check className="h-3 w-3" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-9 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-xs font-bold text-ink">
                  Reserve a table — 2 taps
                </p>
              </div>
            </div>

            {/* ---------- Handle ---------- */}
            <div
              className="absolute inset-y-0 z-10 w-px bg-gold"
              style={{ left: `${pos}%` }}
              aria-hidden
            >
              <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold bg-paper shadow-lift">
                <ArrowLeftRight className="h-4 w-4 text-gold-deep" />
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 text-center text-sm text-ink-faint">
            Every day without a website, this comparison plays out in your customers&apos; search results.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
