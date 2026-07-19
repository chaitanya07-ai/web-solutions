"use client";

import {
  BarChart3,
  Bot,
  CalendarCheck,
  CreditCard,
  LayoutDashboard,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui/primitives";

const FEATURES = [
  { icon: Sparkles, title: "Modern UI", desc: "Design that makes your business look expensive." },
  { icon: Zap, title: "Blazing fast", desc: "Sub-second loads. Nobody waits, nobody leaves." },
  { icon: Search, title: "SEO ready", desc: "Built to rank from the first day it's live." },
  { icon: ShieldCheck, title: "Secure", desc: "SSL, backups and hardening — handled." },
  { icon: Smartphone, title: "Fully responsive", desc: "Flawless on every phone, tablet and desktop." },
  { icon: MapPin, title: "Google Maps", desc: "Customers find your door, not just your name." },
  { icon: MessageCircle, title: "WhatsApp", desc: "One tap and they're chatting with you." },
  { icon: CreditCard, title: "Online payments", desc: "Cards, wallets and UPI — money while you sleep." },
  { icon: CalendarCheck, title: "Booking system", desc: "Reservations confirmed without a phone call." },
  { icon: LayoutDashboard, title: "Admin panel", desc: "Edit menus, prices and photos yourself." },
  { icon: BarChart3, title: "Analytics", desc: "Know exactly what's working, in plain numbers." },
  { icon: Bot, title: "AI chatbot", desc: "Every question answered, around the clock." },
];

export default function Features() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-36">
        <SectionHeading
          eyebrow="Built into every website"
          align="center"
          title={
            <>
              Not extras. <span className="italic text-gold-deep">Standards.</span>
            </>
          }
          lede="Other agencies sell these as add-ons. We consider them the baseline for a website that actually works."
        />

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 4) * 0.06} className="h-full">
              <div className="group h-full rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-soft">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-tint text-gold-deep transition-all duration-300 group-hover:bg-gold group-hover:text-ink">
                  <f.icon className="h-5 w-5" />
                </span>
                <p className="mt-5 font-semibold tracking-tight text-ink">{f.title}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-faint">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
