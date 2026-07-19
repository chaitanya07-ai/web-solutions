"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bot, ChevronRight, Menu, Monitor, Smartphone } from "lucide-react";
import { EASE } from "@/lib/utils";
import { BrowserFrame, PhoneFrame } from "@/components/ui/frames";
import { Reveal, SectionHeading } from "@/components/ui/primitives";
import { Tilt } from "@/components/effects";

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
  ai: string[];
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
    ai: ["AI order assistant", "WhatsApp ordering", "Automated reservations", "AI customer support"],
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
    ai: ["AI order assistant", "WhatsApp ordering", "Loyalty automation", "Customer support"],
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
    ai: ["AI receptionist", "Appointment booking", "WhatsApp assistant", "Reminder messages"],
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
    ai: ["Membership assistant", "Lead qualification", "Automated renewals", "AI support"],
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
    ai: ["AI concierge", "Room booking assistant", "Guest support", "WhatsApp automation"],
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
    ai: ["AI receptionist", "Appointment scheduling", "Patient follow-ups", "Reminder automation"],
  },
  {
    key: "retail", label: "Retail", brand: "Maison Store", domain: "maisonstore.com",
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
    ai: ["AI shopping assistant", "Order tracking", "Product recommendations", "Customer support"],
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
    ai: ["AI property assistant", "Lead qualification", "Viewing scheduler", "WhatsApp follow-ups"],
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
    ai: ["Student assistant", "Admission automation", "Course recommendations", "FAQ assistant"],
  },
];

/* ------------------------------------------------------------------ */
/*  MiniSite — desktop preview inside the browser frame                */
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
/*  MiniSiteMobile — the same site, as its visitors see it on a phone  */
/* ------------------------------------------------------------------ */

function MiniSiteMobile({ d }: { d: Industry }) {
  return (
    <div className="flex h-[540px] flex-col bg-white">
      {/* status bar */}
      <div className="flex items-center justify-between px-5 pb-1.5 pt-9">
        <span className="text-[9px] font-bold text-ink">9:41</span>
        <div className="flex items-center gap-1" aria-hidden>
          {[3, 4.5, 6].map((h, i) => (
            <span key={i} className="w-[3px] rounded-sm bg-ink" style={{ height: h }} />
          ))}
          <span className="ml-1 h-[8px] w-[15px] rounded-[3px] border border-ink/70 p-[1.5px]">
            <span className="block h-full w-3/4 rounded-[1px] bg-ink" />
          </span>
        </div>
      </div>

      {/* mobile nav */}
      <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: d.accent }} />
          <span className="text-[10px] font-bold tracking-tight text-ink">{d.brand}</span>
        </div>
        <Menu className="h-3.5 w-3.5 text-ink" />
      </div>

      {/* hero */}
      <div className="relative flex flex-1 flex-col justify-center px-5" style={{ background: d.soft }}>
        <div
          className="absolute right-0 top-0 h-24 w-24 rounded-bl-full opacity-[0.14]"
          style={{ background: d.accent }}
          aria-hidden
        />
        <p className="text-[8px] font-bold uppercase tracking-widest" style={{ color: d.accent }}>
          {d.kicker}
        </p>
        <h4 className="mt-1.5 font-display text-[21px] leading-tight tracking-tight text-ink">
          {d.headline}
        </h4>
        <p className="mt-1.5 text-[10px] leading-relaxed text-ink-faint">{d.sub}</p>
        <span
          className="mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-full py-2.5 text-[10px] font-bold text-white"
          style={{ background: d.accent }}
        >
          {d.cta} <ArrowRight className="h-2.5 w-2.5" />
        </span>
        <span className="mt-2 text-center text-[9px] font-semibold underline underline-offset-4" style={{ color: d.accent }}>
          View gallery
        </span>
      </div>

      {/* stacked cards */}
      <div className="space-y-2 border-t border-black/[0.06] bg-white px-4 py-3">
        {d.cards.map((c) => (
          <div
            key={c.title}
            className="flex items-center justify-between rounded-xl border border-black/[0.07] px-3 py-2 shadow-sm"
          >
            <div>
              <p className="text-[10px] font-bold leading-tight text-ink">{c.title}</p>
              <p className="text-[8.5px] text-ink-faint">{c.meta}</p>
            </div>
            <ChevronRight className="h-3 w-3" style={{ color: d.accent }} />
          </div>
        ))}
      </div>

      {/* tab bar */}
      <div className="flex items-center justify-around border-t border-black/[0.06] px-6 py-2.5">
        {["Home", "Explore", "Book"].map((t, i) => (
          <div key={t} className="flex flex-col items-center gap-0.5">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: i === 0 ? d.accent : "#C9C6BD" }}
            />
            <span
              className="text-[7px] font-semibold"
              style={{ color: i === 0 ? d.accent : "#9B978C" }}
            >
              {t}
            </span>
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
  const [device, setDevice] = useState<"desktop" | "phone">("desktop");

  // Default the preview to the visitor's own device.
  useEffect(() => {
    if (window.matchMedia("(max-width: 1023px)").matches) setDevice("phone");
  }, []);

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

  const listRef = useRef<HTMLDivElement>(null);

  // Keep the active chip in view while the auto-tour runs on mobile.
  useEffect(() => {
    const c = listRef.current;
    if (!c || c.scrollWidth <= c.clientWidth) return;
    const chip = c.children[active] as HTMLElement | undefined;
    if (chip) c.scrollTo({ left: Math.max(0, chip.offsetLeft - 24), behavior: "smooth" });
  }, [active]);

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
          lede="Select an industry and watch the website transform live — on desktop or phone. Same craft, completely different personality, whatever business you run."
        />

        <div className="mt-16 grid items-start gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
          {/* Industry selector */}
          <Reveal>
            <div
              ref={listRef}
              className="no-scrollbar -mx-6 flex snap-x gap-2 overflow-x-auto px-6 pb-2 lg:mx-0 lg:flex-col lg:px-0 lg:gap-0 lg:overflow-visible lg:border-l lg:border-line lg:pb-0"
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
                    className={`group relative shrink-0 snap-start rounded-full border px-5 py-2.5 text-left text-sm font-semibold transition-all duration-300 lg:rounded-none lg:border-0 lg:px-6 lg:py-3.5 lg:text-base ${
                      isActive
                        ? "border-gold bg-gold text-ink lg:bg-transparent lg:text-ink"
                        : "border-line bg-white text-ink-faint hover:border-gold hover:text-ink lg:bg-transparent"
                    }`}
                  >
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
            {/* Desktop / phone toggle */}
            <div className="mb-5 flex justify-center lg:justify-end">
              <div
                className="inline-flex rounded-full border border-line bg-white p-1"
                role="group"
                aria-label="Preview device"
              >
                {(
                  [
                    { key: "desktop", label: "Desktop", Icon: Monitor },
                    { key: "phone", label: "Phone", Icon: Smartphone },
                  ] as const
                ).map(({ key, label, Icon }) => (
                  <button
                    key={key}
                    onClick={() => setDevice(key)}
                    aria-pressed={device === key}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                      device === key
                        ? "bg-ink text-paper"
                        : "text-ink-faint hover:text-ink"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute -inset-3 rounded-3xl opacity-60 blur-2xl transition-colors duration-700 sm:-inset-6"
                style={{ background: d.soft }}
                aria-hidden
              />
              <Tilt max={5}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${d.key}-${device}`}
                  initial={{ opacity: 0, y: 26, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -18, scale: 0.99 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="relative"
                >
                  {device === "desktop" ? (
                    <BrowserFrame url={d.domain}>
                      <MiniSite d={d} />
                    </BrowserFrame>
                  ) : (
                    <PhoneFrame className="max-w-[290px]">
                      <MiniSiteMobile d={d} />
                    </PhoneFrame>
                  )}
                </motion.div>
              </AnimatePresence>
              </Tilt>
              <p className="mt-4 text-center text-[11px] uppercase tracking-widest2 text-ink-faint">
                Live preview · {device === "phone" ? "mobile" : "desktop"} concept for a {d.label.toLowerCase()}
              </p>

              {/* AI automation included with this industry */}
              <motion.div
                key={`ai-${d.key}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.12, ease: EASE }}
                className="mx-auto mt-5 max-w-xl rounded-2xl border border-gold/40 bg-gold-tint/70 p-5"
              >
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest2 text-gold-deep">
                  <Bot className="h-3.5 w-3.5" /> AI automation included
                </p>
                <div className="mt-3 grid grid-cols-1 gap-x-5 gap-y-2 sm:grid-cols-2">
                  {d.ai.map((a) => (
                    <p key={a} className="flex items-center gap-2.5 text-[13px] font-medium text-ink-soft">
                      <span className="h-1 w-1 shrink-0 rotate-45 bg-gold-deep" />
                      {a}
                    </p>
                  ))}
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
