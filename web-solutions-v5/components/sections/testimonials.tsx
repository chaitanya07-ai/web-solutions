"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { EASE } from "@/lib/utils";
import { Reveal, SectionHeading } from "@/components/ui/primitives";

const TESTIMONIALS = [
  {
    quote:
      "The free sample sold me before the first call ended. Three weeks after launch, our Saturday bookings had doubled — the website genuinely paid for itself within a month.",
    name: "Priya Sharma",
    role: "Owner, Saffron House",
    country: "India",
  },
  {
    quote:
      "I've hired agencies at three times the budget that delivered half this quality. The admin dashboard alone saves my manager an hour every single day.",
    name: "James Whitfield",
    role: "Director, The Crown Bistro",
    country: "United Kingdom",
  },
  {
    quote:
      "They understood cafe culture better than the agencies here in Sydney. Our regulars order ahead now, and the queue complaints just… stopped.",
    name: "Sarah Mitchell",
    role: "Founder, Brew & Co",
    country: "Australia",
  },
  {
    quote:
      "Direct bookings were 9% of our revenue. A year later they're 47%. That's the entire OTA commission line back in our pocket.",
    name: "Michael Torres",
    role: "General Manager, The Meridian",
    country: "Thailand",
  },
  {
    quote:
      "One-time payment, delivered in twelve days, and it still looks better than anything my competitors pay monthly for.",
    name: "Emily Chen",
    role: "Owner, Lumière Studio",
    country: "Canada",
  },
];

export default function Testimonials() {
  const [[index, dir], setIndex] = useState<[number, number]>([0, 1]);
  const t = TESTIMONIALS[index];

  const go = (d: number) =>
    setIndex(([i]) => [(i + d + TESTIMONIALS.length) % TESTIMONIALS.length, d]);

  return (
    <section className="overflow-hidden bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-36">
        <SectionHeading
          eyebrow="Kind words"
          align="center"
          title={
            <>
              What owners say{" "}
              <span className="italic text-gold-deep">after launch</span>
            </>
          }
        />

        <Reveal delay={0.1}>
          <div className="relative mx-auto mt-14 max-w-3xl">
            {/* Oversized quote mark */}
            <span
              className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 select-none font-display text-[9rem] italic leading-none text-gold/20"
              aria-hidden
            >
              &ldquo;
            </span>

            <div className="relative min-h-[300px] sm:min-h-[260px]">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.figure
                  key={index}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -60 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -70) go(1);
                    else if (info.offset.x > 70) go(-1);
                  }}
                  className="cursor-grab text-center active:cursor-grabbing"
                >
                  <div className="flex justify-center gap-1" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <blockquote className="mt-7 font-display text-2xl leading-snug tracking-tight text-ink sm:text-[1.9rem]">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-8">
                    <p className="font-semibold text-ink">{t.name}</p>
                    <p className="mt-1 text-sm text-ink-faint">{t.role}</p>
                    <p className="mt-3 inline-block rounded-full border border-line bg-mist px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-gold-deep">
                      {t.country}
                    </p>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-12 flex items-center justify-center gap-6">
              <button
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-line transition-all duration-300 hover:border-gold hover:bg-gold-tint hover:text-gold-deep"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-2.5">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex([i, i > index ? 1 : -1])}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-400 ${
                      i === index ? "w-7 bg-gold" : "w-1.5 bg-line hover:bg-gold/50"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-line transition-all duration-300 hover:border-gold hover:bg-gold-tint hover:text-gold-deep"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
