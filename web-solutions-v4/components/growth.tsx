"use client";

import { useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Gift, MessageCircle, Phone, TrendingDown } from "lucide-react";
import { SITE } from "@/lib/site";
import { EASE } from "@/lib/utils";
import { Reveal, SectionHeading } from "@/components/ui/primitives";

/* ------------------------------------------------------------------ */
/*  Sticky mobile bar — Call · WhatsApp · Free sample                  */
/* ------------------------------------------------------------------ */

export function StickyBar() {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 640));

  return (
    <motion.div
      initial={false}
      animate={{ y: show ? 0 : 110 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="fixed inset-x-0 bottom-0 z-[75] border-t border-line bg-paper/90 px-3 pb-[max(env(safe-area-inset-bottom),0.6rem)] pt-2.5 backdrop-blur-xl md:hidden"
      role="navigation"
      aria-label="Quick actions"
    >
      <div className="mx-auto flex max-w-md gap-2">
        <a
          href={SITE.phoneHref}
          className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full border border-line bg-white text-[12px] font-bold text-ink"
        >
          <Phone className="h-3.5 w-3.5 text-gold-deep" /> Call
        </a>
        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full border border-line bg-white text-[12px] font-bold text-ink"
        >
          <MessageCircle className="h-3.5 w-3.5 text-gold-deep" /> WhatsApp
        </a>
        <a
          href="#contact"
          data-sample
          className="flex h-11 flex-[1.3] items-center justify-center gap-1.5 rounded-full bg-gold text-[12px] font-bold text-ink shadow-soft"
        >
          <Gift className="h-3.5 w-3.5" /> Free sample
        </a>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  ROI section — "the cost of staying offline"                        */
/* ------------------------------------------------------------------ */

const UPLIFT = 0.15; // conservative illustrative share of extra customers online

const CFG = {
  "$": { min: 5, max: 500, step: 5, def: 25 },
  "₹": { min: 100, max: 5000, step: 100, def: 500 },
} as const;

export function Roi() {
  const [customers, setCustomers] = useState(30);
  const [currency, setCurrency] = useState<"₹" | "$">("$");
  const [ticket, setTicket] = useState<number>(CFG["$"].def);

  const missedMonthly = Math.round(customers * ticket * 30 * UPLIFT);
  const fmt = (n: number) => `${currency}${n.toLocaleString(currency === "₹" ? "en-IN" : "en-US")}`;

  return (
    <section className="border-y border-line bg-mist">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionHeading
          eyebrow="Do the math"
          align="center"
          title={
            <>
              What is staying offline{" "}
              <span className="italic text-gold-deep">costing you?</span>
            </>
          }
          lede="Slide to your numbers. Even a modest share of customers finding and booking you online adds up fast."
        />

        <Reveal delay={0.1}>
          <div className="mx-auto mt-14 max-w-3xl rounded-3xl border border-line bg-white p-7 shadow-soft sm:p-10">
            {/* Sliders */}
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <div className="flex items-baseline justify-between">
                  <label htmlFor="roi-customers" className="text-sm font-semibold text-ink">
                    Customers per day
                  </label>
                  <span className="font-display text-2xl text-gold-deep">{customers}</span>
                </div>
                <input
                  id="roi-customers"
                  type="range"
                  min={5}
                  max={200}
                  step={5}
                  value={customers}
                  onChange={(e) => setCustomers(+e.target.value)}
                  className="mt-3 w-full accent-[#D4AF37]"
                />
              </div>
              <div>
                <div className="flex items-baseline justify-between">
                  <label htmlFor="roi-ticket" className="text-sm font-semibold text-ink">
                    Average sale
                    <button
                      onClick={() =>
                        setCurrency((c) => {
                          const next = c === "₹" ? "$" : "₹";
                          setTicket(CFG[next].def);
                          return next;
                        })
                      }
                      className="ml-2 rounded-full border border-line px-2 py-0.5 text-[10px] font-bold text-ink-faint transition-colors hover:border-gold hover:text-gold-deep"
                      aria-label="Switch currency"
                    >
                      {currency} ⇄
                    </button>
                  </label>
                  <span className="font-display text-2xl text-gold-deep">{fmt(ticket)}</span>
                </div>
                <input
                  id="roi-ticket"
                  type="range"
                  min={CFG[currency].min}
                  max={CFG[currency].max}
                  step={CFG[currency].step}
                  value={ticket}
                  onChange={(e) => setTicket(+e.target.value)}
                  className="mt-3 w-full accent-[#D4AF37]"
                />
              </div>
            </div>

            {/* Result */}
            <div className="mt-10 rounded-2xl bg-ink p-7 text-center sm:p-9">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest2 text-gold">
                <TrendingDown className="h-3.5 w-3.5" />
                Revenue potentially missed every month
              </p>
              <motion.p
                key={missedMonthly}
                initial={{ opacity: 0.3, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="mt-3 font-display text-5xl tracking-tight text-paper sm:text-6xl"
              >
                {fmt(missedMonthly)}
              </motion.p>
              <p className="mt-2 text-sm text-paper/50">
                ≈ {fmt(missedMonthly * 12)} a year
              </p>
              <a
                href="#contact"
                data-sample
                className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-gold px-8 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-paper"
              >
                <Gift className="h-4 w-4" /> Stop the leak — get a free sample
              </a>
            </div>

            <p className="mt-5 text-center text-[11px] leading-relaxed text-ink-faint">
              Illustrative estimate: assumes ~{Math.round(UPLIFT * 100)}% more customers
              could find and book you with a professional website. Every business differs.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
