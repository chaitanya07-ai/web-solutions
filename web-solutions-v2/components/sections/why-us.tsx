"use client";

import {
  ArrowUpRight,
  Gem,
  Gift,
  Globe2,
  Headset,
  Rocket,
  Store,
  Wallet,
} from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui/primitives";

const CARDS = [
  {
    icon: Gem,
    title: "Premium UI, always",
    desc: "Design held to the standard of the world's best product companies — never a template.",
  },
  {
    icon: Store,
    title: "Built for your industry",
    desc: "Restaurants, salons, gyms, clinics, stores — we design for how your customers buy.",
  },
  {
    icon: Wallet,
    title: "One-time payment available",
    desc: "Own your website outright. No forced subscriptions, no hostage fees.",
  },
  {
    icon: Rocket,
    title: "Fast delivery",
    desc: "Most projects launch in 7–14 days without cutting a single corner.",
  },
  {
    icon: Globe2,
    title: "Worldwide clients",
    desc: "Trusted across the USA, Canada, Australia, the UK, Thailand and India.",
  },
  {
    icon: Headset,
    title: "Professional support",
    desc: "A real person on call 24/7 — before launch, and long after.",
  },
];

export default function WhyUs() {
  return (
    <section className="border-y border-line bg-mist">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-36">
        <SectionHeading
          eyebrow="Why Web Solutions"
          title={
            <>
              Reasons owners choose us —{" "}
              <span className="italic text-gold-deep">and stay</span>
            </>
          }
          lede="We win projects the honest way: by showing our work before you spend anything."
        />

        <div className="mt-16 grid gap-4 md:grid-cols-4">
          {/* Hero card: the free sample */}
          <Reveal className="md:col-span-2 md:row-span-2">
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-ink p-8 text-paper shadow-lift sm:p-10">
              <div className="bg-grid absolute inset-0 opacity-20" aria-hidden />
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" aria-hidden />
              <div className="relative">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold text-ink">
                  <Gift className="h-5 w-5" />
                </span>
                <h3 className="mt-8 font-display text-3xl leading-tight tracking-tight sm:text-[2.6rem]">
                  See your website{" "}
                  <span className="italic text-gold">before you pay.</span>
                </h3>
                <p className="mt-5 max-w-sm leading-relaxed text-paper/60">
                  We design a free sample homepage for your business first. If
                  you love it, we build the rest. If not, you owe us nothing —
                  and you keep the compliment.
                </p>
              </div>
              <a
                href="#contact"
                className="group relative mt-10 inline-flex w-fit items-center gap-2.5 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-ink transition-all duration-300 hover:bg-paper"
              >
                Get my free sample
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </a>
            </div>
          </Reveal>

          {/* Supporting cards */}
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={0.08 + (i % 2) * 0.06} className="h-full">
              <div className="group h-full rounded-3xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-soft">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-tint text-gold-deep transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
                  <c.icon className="h-5 w-5" />
                </span>
                <p className="mt-5 font-semibold tracking-tight text-ink">{c.title}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-faint">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
