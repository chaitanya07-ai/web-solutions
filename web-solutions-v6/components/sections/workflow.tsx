"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  CalendarCheck,
  CreditCard,
  Database,
  Filter,
  Globe2,
  RefreshCcw,
  User,
  UserCheck,
} from "lucide-react";
import { EASE } from "@/lib/utils";
import { Reveal, SectionHeading } from "@/components/ui/primitives";

const STEPS = [
  { icon: User, label: "Visitor" },
  { icon: Globe2, label: "Website" },
  { icon: Bot, label: "AI assistant", hot: true },
  { icon: Filter, label: "Lead qualification" },
  { icon: CalendarCheck, label: "Booking" },
  { icon: CreditCard, label: "Payment" },
  { icon: Database, label: "CRM" },
  { icon: RefreshCcw, label: "Follow-up" },
  { icon: UserCheck, label: "Customer" },
];

export default function Workflow() {
  return (
    <section className="border-y border-line bg-mist">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionHeading
          eyebrow="AI automation"
          align="center"
          title={
            <>
              From stranger to customer —{" "}
              <span className="italic text-gold-deep">on autopilot</span>
            </>
          }
          lede="Your website and AI work every step of the journey, so no lead is ever dropped and nothing waits for morning."
        />

        {/* Desktop / tablet: pill chain */}
        <div className="mt-16 hidden flex-wrap items-center justify-center gap-x-2 gap-y-5 md:flex">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
              className="flex items-center gap-2"
            >
              <span
                className={`flex items-center gap-2.5 rounded-full border px-5 py-3 text-sm font-semibold shadow-sm transition-transform duration-300 hover:-translate-y-0.5 ${
                  s.hot
                    ? "border-gold bg-ink text-gold"
                    : "border-line bg-white text-ink"
                }`}
              >
                <s.icon className={`h-4 w-4 ${s.hot ? "text-gold" : "text-gold-deep"}`} />
                {s.label}
              </span>
              {i < STEPS.length - 1 && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 + 0.2 }}
                >
                  <ArrowRight className="h-4 w-4 text-gold" />
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile: gold spine */}
        <ol className="relative mx-auto mt-14 max-w-xs space-y-4 border-l border-gold/40 pl-7 md:hidden">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
              className="relative"
            >
              <span
                className={`absolute -left-[37px] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 ${
                  s.hot ? "border-gold bg-gold" : "border-gold/50 bg-mist"
                }`}
                aria-hidden
              />
              <span
                className={`flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-[13px] font-semibold ${
                  s.hot ? "border-gold bg-ink text-gold" : "border-line bg-white text-ink"
                }`}
              >
                <s.icon className={`h-3.5 w-3.5 ${s.hot ? "text-gold" : "text-gold-deep"}`} />
                {s.label}
              </span>
            </motion.li>
          ))}
        </ol>

        <Reveal delay={0.2}>
          <p className="mt-12 text-center text-sm text-ink-faint">
            Every step automated — you just watch the bookings land.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
