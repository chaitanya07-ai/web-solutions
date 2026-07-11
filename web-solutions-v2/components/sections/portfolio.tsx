"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, MessageCircle, Video, X } from "lucide-react";
import { SITE } from "@/lib/site";
import { EASE } from "@/lib/utils";
import { BrowserFrame, PhoneFrame } from "@/components/ui/frames";
import { Reveal, SectionHeading } from "@/components/ui/primitives";

type Project = {
  brand: string;
  domain: string;
  sector: string;
  location: string;
  dark: boolean;
  bg: string;
  fg: string;
  accent: string;
  heroKicker: string;
  heroTitle: string;
  heroSub: string;
  ctaLabel: string;
  footNote: string;
  problem: string;
  solution: string;
  metrics: { value: string; label: string }[];
  features: string[];
  tech: string[];
};

const PROJECTS: Project[] = [
  {
    brand: "Saffron House",
    domain: "saffronhouse.com",
    sector: "Fine dining restaurant",
    location: "Mumbai, India",
    dark: true,
    bg: "#161210",
    fg: "#F5EFE6",
    accent: "#D4AF37",
    heroKicker: "Modern Indian · Est. 2016",
    heroTitle: "Twelve tables. One unforgettable evening.",
    heroSub: "The seasonal tasting menu, reserved online.",
    ctaLabel: "Reserve a table",
    footNote: "Open today · 11:00 – 23:00",
    problem:
      "Reservations lived on a phone line that rang out during service, and the menu was a PDF nobody could read on mobile.",
    solution:
      "A cinematic website with live reservations, a QR e-menu updated in seconds, and an AI concierge answering guests at any hour.",
    metrics: [
      { value: "+212%", label: "online reservations" },
      { value: "38%", label: "fewer missed calls" },
      { value: "0.9s", label: "load time" },
    ],
    features: ["Table reservations", "QR e-menu", "AI concierge", "Admin dashboard"],
    tech: ["Next.js", "Tailwind CSS", "Stripe"],
  },
  {
    brand: "Atlas Fitness",
    domain: "atlasfit.ca",
    sector: "Strength gym",
    location: "Toronto, Canada",
    dark: true,
    bg: "#0E1410",
    fg: "#EAF2EC",
    accent: "#6FAF7C",
    heroKicker: "Strength club · Est. 2019",
    heroTitle: "Stronger starts here.",
    heroSub: "Classes, coaches and memberships — booked online.",
    ctaLabel: "Start free week",
    footNote: "Open daily · 5 am – 11 pm",
    problem:
      "Sign-ups happened on paper sheets at the front desk, and class bookings were juggled through Instagram DMs.",
    solution:
      "A bold booking-first site: live class schedule, memberships with online payment, and a coach roster that sells itself.",
    metrics: [
      { value: "+180%", label: "trial sign-ups" },
      { value: "640", label: "members online" },
      { value: "92", label: "Lighthouse score" },
    ],
    features: ["Class booking", "Memberships", "Online payments", "Coach profiles"],
    tech: ["Next.js", "TypeScript", "Stripe"],
  },
  {
    brand: "Lumière",
    domain: "lumiere.co.uk",
    sector: "Hair & beauty salon",
    location: "London, United Kingdom",
    dark: false,
    bg: "#FAF3F1",
    fg: "#33222A",
    accent: "#A65E6E",
    heroKicker: "Hair · Skin · Bridal",
    heroTitle: "Walk out feeling like the main character.",
    heroSub: "Choose your stylist and book in under a minute.",
    ctaLabel: "Book online",
    footNote: "Tue – Sat · By appointment",
    problem:
      "Bookings were scattered across DMs, texts and a paper diary — double-bookings weekly, and no-shows costing real money.",
    solution:
      "An elegant booking-first website: live stylist calendars, deposits at checkout, and reminders clients actually love.",
    metrics: [
      { value: "-71%", label: "no-shows" },
      { value: "52%", label: "bookings after hours" },
      { value: "3×", label: "gift card sales" },
    ],
    features: ["Online booking", "Deposits", "SMS reminders", "Gift cards"],
    tech: ["Next.js", "Stripe", "Resend"],
  },
  {
    brand: "CarePoint",
    domain: "carepoint.health",
    sector: "Family clinic",
    location: "Austin, USA",
    dark: false,
    bg: "#F0F7F6",
    fg: "#123B37",
    accent: "#0E6B63",
    heroKicker: "Family health · All ages",
    heroTitle: "Care that fits your schedule.",
    heroSub: "Same-week appointments, booked in a minute.",
    ctaLabel: "Book a visit",
    footNote: "Mon – Fri · Walk-ins welcome",
    problem:
      "Every appointment meant phone tag with the front desk, and one in five patients simply never showed up.",
    solution:
      "A calm, trustworthy site with online scheduling, automated reminders and telehealth — built to reassure at first glance.",
    metrics: [
      { value: "63%", label: "book online now" },
      { value: "-44%", label: "no-shows" },
      { value: "0.8s", label: "load time" },
    ],
    features: ["Online scheduling", "Reminders", "Telehealth", "Patient portal"],
    tech: ["Next.js", "Tailwind CSS", "Twilio"],
  },
  {
    brand: "The Meridian",
    domain: "meridianbkk.com",
    sector: "Boutique hotel",
    location: "Bangkok, Thailand",
    dark: true,
    bg: "#101823",
    fg: "#EAF0F6",
    accent: "#C8A44D",
    heroKicker: "Riverside · 34 suites",
    heroTitle: "The river view you came for.",
    heroSub: "Book direct for our best rate — always.",
    ctaLabel: "Check availability",
    footNote: "Reception 24/7 · Free transfer",
    problem:
      "Nearly every booking arrived through OTAs taking 18–22% commission — the hotel had no relationship with its own guests.",
    solution:
      "A five-star direct-booking experience: immersive suite pages, live availability, and a best-rate promise.",
    metrics: [
      { value: "+47%", label: "direct bookings" },
      { value: "$96k", label: "OTA fees saved / yr" },
      { value: "96", label: "Lighthouse score" },
    ],
    features: ["Booking engine", "Multi-currency", "AI concierge", "Analytics"],
    tech: ["Next.js", "React", "Stripe"],
  },
  {
    brand: "Maison Store",
    domain: "maisonstore.au",
    sector: "Curated retail",
    location: "Sydney, Australia",
    dark: false,
    bg: "#F5F4F0",
    fg: "#26251F",
    accent: "#2B2A26",
    heroKicker: "Curated goods · Since 2021",
    heroTitle: "Objects worth keeping.",
    heroSub: "New drops weekly. Checkout in seconds.",
    ctaLabel: "Shop new in",
    footNote: "Free shipping over $80",
    problem:
      "The shop lived on Instagram alone — checkout happened in DMs, and every sale depended on the algorithm's mood.",
    solution:
      "A minimal storefront with real checkout, click & collect, and weekly drops customers can actually subscribe to.",
    metrics: [
      { value: "3.2×", label: "online sales" },
      { value: "41%", label: "click & collect" },
      { value: "4.8★", label: "store rating" },
    ],
    features: ["Online store", "Click & collect", "Drop alerts", "Analytics"],
    tech: ["Next.js", "Shopify", "Tailwind CSS"],
  },
];

/* ------------------------------------------------------------------ */
/*  Desktop preview                                                    */
/* ------------------------------------------------------------------ */

function ProjectPreview({ p }: { p: Project }) {
  return (
    <div
      className="relative flex h-[360px] flex-col overflow-hidden sm:h-[400px]"
      style={{ background: p.bg, color: p.fg }}
    >
      <div
        className="flex items-center justify-between px-6 py-4 text-[10px] font-semibold uppercase tracking-widest"
        style={{ borderBottom: `1px solid ${p.fg}14` }}
      >
        <span className="font-display text-sm normal-case italic tracking-normal">{p.brand}</span>
        <div className="hidden gap-5 opacity-60 sm:flex">
          <span>Explore</span>
          <span>Story</span>
          <span>Visit</span>
        </div>
        <span
          className="rounded-full px-3.5 py-1.5 text-[9px] font-bold"
          style={{ background: p.accent, color: p.dark ? "#14110C" : "#fff" }}
        >
          {p.ctaLabel}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col justify-center px-6 sm:px-10">
        <div
          className="pointer-events-none absolute -right-16 top-1/2 hidden -translate-y-1/2 select-none font-display text-[11rem] italic leading-none opacity-[0.06] sm:block"
          aria-hidden
        >
          {p.brand.charAt(0)}
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: p.accent }}>
          {p.heroKicker}
        </p>
        <h4 className="mt-3 max-w-md font-display text-[1.7rem] leading-[1.12] tracking-tight sm:text-4xl">
          {p.heroTitle}
        </h4>
        <p className="mt-3 max-w-sm text-xs leading-relaxed opacity-70 sm:text-sm">{p.heroSub}</p>
        <div className="mt-6 flex items-center gap-4">
          <span
            className="rounded-full px-5 py-2.5 text-[11px] font-bold"
            style={{ background: p.accent, color: p.dark ? "#14110C" : "#fff" }}
          >
            {p.ctaLabel}
          </span>
          <span className="text-[11px] font-semibold underline underline-offset-4 opacity-80">
            Explore
          </span>
        </div>
      </div>

      <div
        className="flex items-center justify-between px-6 py-3 text-[9px] uppercase tracking-widest opacity-60"
        style={{ borderTop: `1px solid ${p.fg}14` }}
      >
        <span>{p.location}</span>
        <span>{p.footNote}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile preview — how the same site looks on a phone                */
/* ------------------------------------------------------------------ */

function ProjectPreviewMobile({ p }: { p: Project }) {
  return (
    <div className="flex h-[540px] flex-col" style={{ background: p.bg, color: p.fg }}>
      {/* status bar */}
      <div className="flex items-center justify-between px-5 pb-1.5 pt-9">
        <span className="text-[9px] font-bold">9:41</span>
        <div className="flex items-center gap-1" aria-hidden>
          {[3, 4.5, 6].map((h, i) => (
            <span key={i} className="w-[3px] rounded-sm" style={{ height: h, background: p.fg }} />
          ))}
          <span className="ml-1 h-[8px] w-[15px] rounded-[3px] border p-[1.5px]" style={{ borderColor: `${p.fg}B0` }}>
            <span className="block h-full w-3/4 rounded-[1px]" style={{ background: p.fg }} />
          </span>
        </div>
      </div>

      {/* nav */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ borderBottom: `1px solid ${p.fg}14` }}
      >
        <span className="font-display text-[12px] italic">{p.brand}</span>
        <div className="space-y-[3px]" aria-hidden>
          <span className="block h-[2px] w-4 rounded" style={{ background: p.fg }} />
          <span className="block h-[2px] w-4 rounded" style={{ background: p.fg }} />
        </div>
      </div>

      {/* hero */}
      <div className="relative flex flex-1 flex-col justify-center px-5">
        <div
          className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 select-none font-display text-[8rem] italic leading-none opacity-[0.07]"
          aria-hidden
        >
          {p.brand.charAt(0)}
        </div>
        <p className="text-[8px] font-bold uppercase tracking-[0.22em]" style={{ color: p.accent }}>
          {p.heroKicker}
        </p>
        <h4 className="mt-2 font-display text-[22px] leading-[1.15] tracking-tight">{p.heroTitle}</h4>
        <p className="mt-2 text-[10px] leading-relaxed opacity-70">{p.heroSub}</p>
        <span
          className="mt-4 flex w-full items-center justify-center rounded-full py-2.5 text-[10px] font-bold"
          style={{ background: p.accent, color: p.dark ? "#14110C" : "#fff" }}
        >
          {p.ctaLabel}
        </span>
        <span className="mt-2 text-center text-[9px] font-semibold underline underline-offset-4 opacity-80">
          Explore
        </span>
      </div>

      {/* footer strip */}
      <div
        className="flex items-center justify-between px-5 py-3 text-[8px] uppercase tracking-widest opacity-60"
        style={{ borderTop: `1px solid ${p.fg}14` }}
      >
        <span>{p.location}</span>
        <span>{p.footNote}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Case study row                                                     */
/* ------------------------------------------------------------------ */

function CaseStudy({
  p,
  index,
  onOpen,
}: {
  p: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [42, -42]);
  const flipped = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
        flipped ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Clickable mockup: desktop frame on md+, phone frame on mobile */}
      <motion.div style={{ y }}>
        <Reveal>
          <button
            onClick={() => onOpen(p)}
            aria-label={`Open ${p.brand} preview`}
            className="group block w-full cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <div className="hidden transition-transform duration-500 group-hover:scale-[1.015] md:block">
              <BrowserFrame url={p.domain} dark={p.dark}>
                <ProjectPreview p={p} />
              </BrowserFrame>
            </div>
            <div className="transition-transform duration-500 group-hover:scale-[1.015] md:hidden">
              <PhoneFrame className="max-w-[290px]">
                <ProjectPreviewMobile p={p} />
              </PhoneFrame>
            </div>
            <p className="mt-3 text-center text-[10px] uppercase tracking-widest2 text-ink-faint transition-colors group-hover:text-gold-deep">
              Tap to preview
            </p>
          </button>
        </Reveal>
      </motion.div>

      {/* Story */}
      <div>
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-widest2 text-gold-deep">
            {String(index + 1).padStart(2, "0")} — {p.sector} · {p.location}
          </p>
          <h3 className="mt-4 font-display text-3xl tracking-tight text-ink sm:text-4xl">{p.brand}</h3>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-ink-faint">
            <p>
              <span className="font-semibold text-ink">The problem. </span>
              {p.problem}
            </p>
            <p>
              <span className="font-semibold text-ink">The solution. </span>
              {p.solution}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-8 grid grid-cols-3 gap-4 border-y border-line py-6">
            {p.metrics.map((m) => (
              <div key={m.label}>
                <p className="font-display text-2xl tracking-tight text-gold-deep sm:text-3xl">{m.value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-ink-faint">{m.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-7 flex flex-wrap gap-2">
            {p.features.map((f) => (
              <span key={f} className="rounded-full border border-line bg-mist px-3.5 py-1.5 text-xs font-medium text-ink-soft">
                {f}
              </span>
            ))}
            {p.tech.map((t) => (
              <span key={t} className="rounded-full border border-gold/40 bg-gold-tint px-3.5 py-1.5 text-xs font-medium text-gold-deep">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => onOpen(p)}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-paper transition-all duration-300 hover:bg-gold hover:text-ink"
            >
              Live preview
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </button>
            <a
              href={SITE.meet}
              data-book
              className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-7 text-sm font-semibold text-ink transition-all duration-300 hover:border-gold hover:text-gold-deep"
            >
              <Video className="h-4 w-4" />
              Discuss on a call
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section + preview lightbox                                         */
/* ------------------------------------------------------------------ */

export default function Portfolio() {
  const [open, setOpen] = useState<Project | null>(null);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section id="work" className="scroll-mt-24 bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-36">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Six industries, six countries{" "}
              <span className="italic text-gold-deep">— real results</span>
            </>
          }
          lede="Every project started with a business problem, not a design brief. Tap any preview to see it up close."
        />

        <div className="mt-24 space-y-28 md:space-y-40">
          {PROJECTS.map((p, i) => (
            <CaseStudy key={p.brand} p={p} index={i} onOpen={setOpen} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-md sm:p-8"
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${open.brand} preview`}
          >
            <motion.div
              initial={{ y: 40, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 30, scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest2 text-paper/70">
                  {open.brand} · concept preview
                </p>
                <button
                  onClick={() => setOpen(null)}
                  aria-label="Close preview"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/25 text-paper transition-colors hover:border-gold hover:text-gold"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="hidden sm:block">
                <BrowserFrame url={open.domain} dark={open.dark}>
                  <ProjectPreview p={open} />
                </BrowserFrame>
              </div>
              <div className="sm:hidden">
                <PhoneFrame className="max-w-[300px]">
                  <ProjectPreviewMobile p={open} />
                </PhoneFrame>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-paper/60">Want yours built like this?</p>
                <div className="flex gap-3">
                  <a
                    href={SITE.meet}
                    data-book
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-gold px-6 text-sm font-bold text-ink transition-colors hover:bg-paper"
                  >
                    <Video className="h-4 w-4" /> Book a free call
                  </a>
                  <a
                    href={SITE.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-paper/25 px-6 text-sm font-semibold text-paper transition-colors hover:border-gold hover:text-gold"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
