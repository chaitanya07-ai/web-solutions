"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";
import { BrowserFrame } from "@/components/ui/frames";
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
    heroSub: "Chef Arjun Mehta's seasonal tasting menu, reserved online.",
    problem:
      "Reservations lived on a phone line that rang out during service. The menu was a PDF nobody could read on mobile, and weekends ran half-empty despite rave reviews.",
    solution:
      "A cinematic website with live table reservations, a QR e-menu updated in seconds, and an AI concierge answering guests at any hour — all managed from one dashboard.",
    metrics: [
      { value: "+212%", label: "online reservations" },
      { value: "38%", label: "fewer missed calls" },
      { value: "0.9s", label: "load time" },
    ],
    features: ["Table reservations", "QR e-menu", "AI concierge", "Admin dashboard"],
    tech: ["Next.js", "Tailwind CSS", "Stripe", "Framer Motion"],
  },
  {
    brand: "Brew & Co",
    domain: "brewandco.au",
    sector: "Specialty cafe",
    location: "Sydney, Australia",
    dark: false,
    bg: "#F4EDE3",
    fg: "#2A2119",
    accent: "#6F4A2F",
    heroKicker: "Specialty coffee · Surry Hills",
    heroTitle: "Slow mornings, serious coffee.",
    heroSub: "Order ahead and skip the queue — your cup is waiting.",
    problem:
      "A loyal crowd but no digital presence: the menu changed weekly on a chalkboard, and the morning queue turned away exactly the customers they wanted to keep.",
    solution:
      "A warm, editorial site with order-ahead, a living menu the team edits from a phone, and a loyalty club that quietly turned regulars into advocates.",
    metrics: [
      { value: "+64%", label: "weekday orders" },
      { value: "1,900+", label: "loyalty members" },
      { value: "4.9★", label: "Google rating" },
    ],
    features: ["Order ahead", "Smart e-menu", "Loyalty club", "Google Maps"],
    tech: ["Next.js", "Tailwind CSS", "Sanity CMS", "Vercel"],
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
    problem:
      "Bookings were juggled across Instagram DMs, texts and a paper diary. Double-bookings happened weekly and no-shows cost real money.",
    solution:
      "An elegant booking-first website: live stylist calendars, deposits at checkout to end no-shows, and automated reminders that clients actually love.",
    metrics: [
      { value: "-71%", label: "no-shows" },
      { value: "52%", label: "bookings after hours" },
      { value: "3×", label: "gift card sales" },
    ],
    features: ["Online booking", "Deposits & payments", "SMS reminders", "Gift cards"],
    tech: ["Next.js", "TypeScript", "Stripe", "Resend"],
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
    problem:
      "Nearly every booking arrived through OTAs taking 18–22% commission. The hotel had no direct relationship with its own guests.",
    solution:
      "A five-star direct-booking experience: immersive suite pages, a live availability engine, and a best-rate promise — commission-free revenue from day one.",
    metrics: [
      { value: "+47%", label: "direct bookings" },
      { value: "$96k", label: "OTA fees saved / yr" },
      { value: "96", label: "Lighthouse score" },
    ],
    features: ["Booking engine", "Multi-currency", "AI concierge", "Analytics"],
    tech: ["Next.js", "React", "Tailwind CSS", "Stripe"],
  },
];

/* ------------------------------------------------------------------ */
/*  Coded website preview for each case study                          */
/* ------------------------------------------------------------------ */

function ProjectPreview({ p }: { p: Project }) {
  return (
    <div
      className="relative flex h-[360px] flex-col overflow-hidden sm:h-[400px]"
      style={{ background: p.bg, color: p.fg }}
    >
      {/* nav */}
      <div
        className="flex items-center justify-between px-6 py-4 text-[10px] font-semibold uppercase tracking-widest"
        style={{ borderBottom: `1px solid ${p.fg}14` }}
      >
        <span className="font-display text-sm normal-case italic tracking-normal">
          {p.brand}
        </span>
        <div className="hidden gap-5 opacity-60 sm:flex">
          <span>Menu</span>
          <span>Story</span>
          <span>Visit</span>
        </div>
        <span
          className="rounded-full px-3.5 py-1.5 text-[9px] font-bold"
          style={{ background: p.accent, color: p.dark ? "#14110C" : "#fff" }}
        >
          Book now
        </span>
      </div>

      {/* hero */}
      <div className="relative flex flex-1 flex-col justify-center px-6 sm:px-10">
        <div
          className="pointer-events-none absolute -right-16 top-1/2 hidden -translate-y-1/2 select-none font-display text-[11rem] italic leading-none opacity-[0.06] sm:block"
          aria-hidden
        >
          {p.brand.charAt(0)}
        </div>
        <p
          className="text-[10px] font-bold uppercase tracking-[0.25em]"
          style={{ color: p.accent }}
        >
          {p.heroKicker}
        </p>
        <h4 className="mt-3 max-w-md font-display text-[1.7rem] leading-[1.12] tracking-tight sm:text-4xl">
          {p.heroTitle}
        </h4>
        <p className="mt-3 max-w-sm text-xs leading-relaxed opacity-70 sm:text-sm">
          {p.heroSub}
        </p>
        <div className="mt-6 flex items-center gap-4">
          <span
            className="rounded-full px-5 py-2.5 text-[11px] font-bold"
            style={{ background: p.accent, color: p.dark ? "#14110C" : "#fff" }}
          >
            {p.dark ? "Reserve a table" : "Book online"}
          </span>
          <span className="text-[11px] font-semibold underline underline-offset-4 opacity-80">
            Explore
          </span>
        </div>
      </div>

      {/* footer strip */}
      <div
        className="flex items-center justify-between px-6 py-3 text-[9px] uppercase tracking-widest opacity-60"
        style={{ borderTop: `1px solid ${p.fg}14` }}
      >
        <span>{p.location}</span>
        <span>Open today · 11:00 – 23:00</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Case study row                                                     */
/* ------------------------------------------------------------------ */

function CaseStudy({ p, index }: { p: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [42, -42]);
  const flipped = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
        flipped ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Mockup with parallax drift */}
      <motion.div style={{ y }}>
        <Reveal>
          <BrowserFrame url={p.domain} dark={p.dark}>
            <ProjectPreview p={p} />
          </BrowserFrame>
        </Reveal>
      </motion.div>

      {/* Story */}
      <div>
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-widest2 text-gold-deep">
            {String(index + 1).padStart(2, "0")} — {p.sector} · {p.location}
          </p>
          <h3 className="mt-4 font-display text-3xl tracking-tight text-ink sm:text-4xl">
            {p.brand}
          </h3>
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
                <p className="font-display text-2xl tracking-tight text-gold-deep sm:text-3xl">
                  {m.value}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-ink-faint">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-7 flex flex-wrap gap-2">
            {p.features.map((f) => (
              <span
                key={f}
                className="rounded-full border border-line bg-mist px-3.5 py-1.5 text-xs font-medium text-ink-soft"
              >
                {f}
              </span>
            ))}
            {p.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-gold/40 bg-gold-tint px-3.5 py-1.5 text-xs font-medium text-gold-deep"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-paper transition-all duration-300 hover:bg-gold hover:text-ink"
            >
              Live preview
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-7 text-sm font-semibold text-ink transition-all duration-300 hover:border-gold hover:text-gold-deep"
            >
              <FileText className="h-4 w-4" />
              Full case study
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section id="work" className="scroll-mt-24 bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-36">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Case studies, not screenshots{" "}
              <span className="italic text-gold-deep">— results, not promises</span>
            </>
          }
          lede="Every project below started with a business problem, not a design brief. Here's what changed after launch."
        />

        <div className="mt-24 space-y-28 md:space-y-40">
          {PROJECTS.map((p, i) => (
            <CaseStudy key={p.brand} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
