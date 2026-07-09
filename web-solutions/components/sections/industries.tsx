"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EASE } from "@/lib/utils";
import { BrowserFrame } from "@/components/ui/frames";
import { Reveal, SectionHeading } from "@/components/ui/primitives";

type Industry = {
  key: string;
  label: string;
  brand: string;
  domain: string;
  accent: string;
  soft: string;
  kicker: string;
  headline: string;
  sub: string;
  cta: string;
  cards: { title: string; meta: string }[];
};

const INDUSTRIES: Industry[] = [
  {
    key: "restaurant", label: "Restaurant", brand: "Saffron House", domain: "saffronhouse.com",
    accent: "#9A3E1E", soft: "rgba(154,62,30,0.08)",
    kicker: "Fine dining · Mumbai",
    headline: "A table is waiting for you.",
    sub: "Seasonal tasting menus, reserved in two taps.",
    cta: "Reserve a table",
    cards: [
      { title: "Tasting menu", meta: "7 courses · ₹2,400" },
      { title: "QR e-menu", meta: "Scan & order" },
      { title: "Private dining", meta: "Up to 24 guests" },
    ],
  },
  {
    key: "cafe", label: "Cafe", brand: "Brew & Co", domain: "brewandco.au",
    accent: "#6F4A2F", soft: "rgba(111,74,47,0.08)",
    kicker: "Specialty coffee · Sydney",
    headline: "Your morning, perfected.",
    sub: "Single-origin roasts and slow Sundays.",
    cta: "Order ahead",
    cards: [
      { title: "Seasonal roast", meta: "Ethiopia · light" },
      { title: "Loyalty club", meta: "9th cup free" },
      { title: "Brunch menu", meta: "Till 2 pm daily" },
    ],
  },
  {
    key: "salon", label: "Salon", brand: "Lumière", domain: "lumiere.co.uk",
    accent: "#A65E6E", soft: "rgba(166,94,110,0.08)",
    kicker: "Hair & beauty · London",
    headline: "Beauty, booked in seconds.",
    sub: "Pick your stylist, pick your time. Done.",
    cta: "Book appointment",
    cards: [
      { title: "Colour & cut", meta: "From £85" },
      { title: "Bridal studio", meta: "By consultation" },
      { title: "Gift cards", meta: "Instant delivery" },
    ],
  },
  {
    key: "gym", label: "Gym", brand: "Atlas Fitness", domain: "atlasfit.ca",
    accent: "#2F5D3A", soft: "rgba(47,93,58,0.08)",
    kicker: "Strength club · Toronto",
    headline: "Train harder. Book smarter.",
    sub: "Classes, coaches and memberships — online.",
    cta: "Start free week",
    cards: [
      { title: "Class schedule", meta: "42 classes / week" },
      { title: "Personal coaching", meta: "1-on-1 plans" },
      { title: "Membership", meta: "From $49 / mo" },
    ],
  },
  {
    key: "hotel", label: "Hotel", brand: "The Meridian", domain: "meridianbkk.com",
    accent: "#1F3A5F", soft: "rgba(31,58,95,0.08)",
    kicker: "Boutique stays · Bangkok",
    headline: "Five-star stays start online.",
    sub: "Direct booking. Best rate, always.",
    cta: "Check availability",
    cards: [
      { title: "River suites", meta: "From ฿4,900" },
      { title: "Rooftop dining", meta: "Sunset seatings" },
      { title: "Airport transfer", meta: "Complimentary" },
    ],
  },
  {
    key: "clinic", label: "Clinic", brand: "CarePoint", domain: "carepoint.health",
    accent: "#0E6B63", soft: "rgba(14,107,99,0.08)",
    kicker: "Family health · Austin",
    headline: "Healthcare that feels human.",
    sub: "Same-week appointments, zero phone tag.",
    cta: "Book a visit",
    cards: [
      { title: "General practice", meta: "All ages" },
      { title: "Online results", meta: "Secure portal" },
      { title: "Telehealth", meta: "From your sofa" },
    ],
  },
  {
    key: "retail", label: "Retail", brand: "Maison Store", domain: "maisonstore.us",
    accent: "#2B2A26", soft: "rgba(43,42,38,0.07)",
    kicker: "Curated goods · New York",
    headline: "Your storefront, always open.",
    sub: "Browse the collection. Checkout in seconds.",
    cta: "Shop new arrivals",
    cards: [
      { title: "New arrivals", meta: "Weekly drops" },
      { title: "Click & collect", meta: "Ready in 2 hrs" },
      { title: "Free returns", meta: "30 days" },
    ],
  },
  {
    key: "realestate", label: "Real Estate", brand: "Landmark Estates", domain: "landmark.homes",
    accent: "#7A5C28", soft: "rgba(122,92,40,0.08)",
    kicker: "Property · Vancouver",
    headline: "Homes that sell themselves.",
    sub: "Virtual tours, instant viewings, real answers.",
    cta: "Browse listings",
    cards: [
      { title: "Featured homes", meta: "128 active" },
      { title: "Book a viewing", meta: "Same day" },
      { title: "Free valuation", meta: "In 24 hrs" },
    ],
  },
  {
    key: "education", label: "Education", brand: "Bright Academy", domain: "brightacademy.in",
    accent: "#3E3A8C", soft: "rgba(62,58,140,0.08)",
    kicker: "Learning centre · Chandigarh",
    headline: "Learning without limits.",
    sub: "Courses, batches and fees — all in one place.",
    cta: "Enrol today",
    cards: [
      { title: "Course catalogue", meta: "40+ programs" },
      { title: "Online classes", meta: "Live & recorded" },
      { title: "Parent portal", meta: "Track progress" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  MiniSite — the live preview rendered inside the browser frame      */
/* ------------------------------------------------------------------ */

function MiniSite({ d }: { d: Industry }) {
  return (
    <div className="flex h-[430px] flex-col bg-white sm:h-[470px]">
      {/* mini nav */}
      <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.accent }} />
          <span className="text-[11px] font-bold tracking-tight text-ink">{d.brand}</span>
        </div>
        <div className="hidden gap-4 text-[9px] font-medium uppercase tracking-widest text-ink-faint sm:flex">
          <span>Menu</span><span>About</span><span>Gallery</span><span>Contact</span>
        </div>
        <span
          className="rounded-full px-3 py-1 text-[9px] font-bold text-white"
          style={{ background: d.accent }}
        >
          {d.cta}
        </span>
      </div>

      {/* mini hero */}
      <div className="relative flex flex-1 flex-col justify-center px-6 py-6 sm:px-9" style={{ background: d.soft }}>
        <div
          className="absolute right-0 top-0 h-40 w-40 rounded-bl-full opacity-[0.14]"
          style={{ background: d.accent }}
          aria-hidden
        />
        <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: d.accent }}>
          {d.kicker}
        </p>
        <h4 className="mt-2 max-w-[16ch] font-display text-2xl leading-tight tracking-tight text-ink sm:text-[2rem]">
          {d.headline}
        </h4>
        <p className="mt-2 max-w-xs text-[11px] leading-relaxed text-ink-faint sm:text-xs">{d.sub}</p>
        <div className="mt-4 flex items-center gap-3">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[10px] font-bold text-white"
            style={{ background: d.accent }}
          >
            {d.cta} <ArrowRight className="h-2.5 w-2.5" />
          </span>
          <span className="text-[10px] font-semibold underline underline-offset-4" style={{ color: d.accent }}>
            View gallery
          </span>
        </div>
      </div>

      {/* mini cards */}
      <div className="grid grid-cols-3 gap-3 border-t border-black/[0.06] bg-white px-5 py-4 sm:px-7">
        {d.cards.map((c) => (
          <div key={c.title} className="rounded-xl border border-black/[0.07] bg-white p-3 shadow-sm">
            <div className="mb-2 h-1 w-6 rounded-full" style={{ background: d.accent }} />
            <p className="text-[10px] font-bold leading-tight text-ink">{c.title}</p>
            <p className="mt-0.5 text-[9px] text-ink-faint">{c.meta}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export default function Industries() {
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);

  // Gentle auto-tour until the visitor takes over.
  useEffect(() => {
    if (interacted) return;
    const id = setInterval(() => setActive((i) => (i + 1) % INDUSTRIES.length), 3800);
    return () => clearInterval(id);
  }, [interacted]);

  const select = (i: number) => {
    setInteracted(true);
    setActive(i);
  };

  const d = INDUSTRIES[active];

  return (
    <section id="industries" className="scroll-mt-24 border-y border-line bg-mist">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-36">
        <SectionHeading
          eyebrow="Industries"
          title={
            <>
              One studio,{" "}
              <span className="italic text-gold-deep">nine industries</span>,
              zero templates
            </>
          }
          lede="Select an industry and watch the website transform live. Same craft, completely different personality — because your business deserves its own."
        />

        <div className="mt-16 grid items-start gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
          {/* Industry selector */}
          <Reveal>
            <div
              className="no-scrollbar flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-l lg:border-line lg:pb-0"
              role="tablist"
              aria-label="Choose an industry"
            >
              {INDUSTRIES.map((ind, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={ind.key}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => select(i)}
                    className={`group relative shrink-0 rounded-full border px-5 py-2.5 text-left text-sm font-semibold transition-all duration-300 lg:rounded-none lg:border-0 lg:px-6 lg:py-3.5 lg:text-base ${
                      isActive
                        ? "border-gold bg-gold text-ink lg:bg-transparent lg:text-ink"
                        : "border-line bg-white text-ink-faint hover:border-gold hover:text-ink lg:bg-transparent"
                    }`}
                  >
                    {/* Active gold rail (desktop) */}
                    {isActive && (
                      <motion.span
                        layoutId="industry-rail"
                        className="absolute -left-px top-0 hidden h-full w-[2px] bg-gold lg:block"
                        transition={{ duration: 0.45, ease: EASE }}
                      />
                    )}
                    <span className="hidden font-display text-xs italic text-gold-deep lg:mr-3 lg:inline">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {ind.label}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Live preview */}
          <Reveal delay={0.1}>
            <div className="relative">
              <div
                className="absolute -inset-6 rounded-3xl opacity-60 blur-2xl transition-colors duration-700"
                style={{ background: d.soft }}
                aria-hidden
              />
              <BrowserFrame url={d.domain} className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={d.key}
                    initial={{ opacity: 0, y: 26, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -18, scale: 0.99 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <MiniSite d={d} />
                  </motion.div>
                </AnimatePresence>
              </BrowserFrame>
              <p className="mt-4 text-center text-[11px] uppercase tracking-widest2 text-ink-faint">
                Live preview · concept design for a {d.label.toLowerCase()}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
