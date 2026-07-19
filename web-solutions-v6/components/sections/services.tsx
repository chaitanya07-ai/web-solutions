"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { EASE } from "@/lib/utils";
import { Reveal, SectionHeading } from "@/components/ui/primitives";

type Service = {
  n: string;
  title: string;
  desc: string;
  tags: string[];
};

const SERVICES: Service[] = [
  {
    n: "01",
    title: "Website design & development",
    desc: "A bespoke, conversion-focused website designed around your brand and built to feel effortless — whether you run a restaurant, salon, gym, clinic, store or studio.",
    tags: ["High-converting design", "Custom build", "Mobile responsive", "Restaurant & cafe sites"],
  },
  {
    n: "02",
    title: "Smart e-menu & QR menu",
    desc: "Guests scan a code and land on a beautiful, always-up-to-date digital menu or price list. Change it in seconds — works for restaurants, salons, hotels and stores alike.",
    tags: ["QR code menus", "Instant updates", "Multi-language", "Photos & specials"],
  },
  {
    n: "03",
    title: "AI chatbots & customer support",
    desc: "A tireless assistant on your website that answers questions, takes reservations and captures leads at 3 a.m. — so you never lose a customer to a slow reply.",
    tags: ["24/7 AI support", "Reservations", "Lead capture", "Trained on your business"],
  },
  {
    n: "04",
    title: "AI voice & messaging automation",
    desc: "AI voice agents that answer your phone, plus WhatsApp and Instagram automation that replies to enquiries, books appointments and follows up — automatically.",
    tags: ["AI voice agents", "WhatsApp automation", "Instagram automation", "AI appointment booking"],
  },
  {
    n: "05",
    title: "Dashboard, CRM & analytics",
    desc: "One elegant control room for your business: orders, bookings, revenue and visitors — live. Every lead flows into your CRM, and you edit content yourself, no developer required.",
    tags: ["Real-time stats", "CRM integration", "Content editing", "Visitor insights"],
  },
  {
    n: "06",
    title: "Payments & booking systems",
    desc: "Take payments and reservations directly on your website. Cards, wallets and local methods — securely handled, automatically confirmed.",
    tags: ["Payment gateway", "Online booking", "Auto-confirmations", "Secure checkout"],
  },
  {
    n: "07",
    title: "SEO, care & maintenance",
    desc: "We keep you fast, secure and visible on Google long after launch — updates, backups, tweaks and technical SEO are all handled for you.",
    tags: ["Technical SEO", "Speed optimisation", "Security updates", "Ongoing support"],
  },
];

export default function Services() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="services" className="scroll-mt-24 bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-36">
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              Everything your business needs{" "}
              <span className="italic text-gold-deep">to win online</span>
            </>
          }
          lede="Websites and AI automation, engineered as one system — your site attracts customers while your AI answers, books and follows up around the clock."
        />

        <div className="mt-16 border-t border-line">
          {SERVICES.map((s, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={s.n} delay={i * 0.04}>
                <div className="border-b border-line">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center gap-5 py-7 text-left sm:gap-10 md:py-9"
                  >
                    <span
                      className={`font-display text-sm italic transition-colors duration-300 sm:text-base ${
                        isOpen ? "text-gold-deep" : "text-ink-faint group-hover:text-gold-deep"
                      }`}
                    >
                      {s.n}
                    </span>
                    <span
                      className={`flex-1 text-xl font-semibold tracking-tight transition-all duration-300 sm:text-3xl md:text-4xl ${
                        isOpen
                          ? "translate-x-2 text-ink"
                          : "text-ink-soft group-hover:translate-x-2 group-hover:text-ink"
                      }`}
                    >
                      {s.title}
                    </span>
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-gold bg-gold text-ink"
                          : "border-line text-ink-faint group-hover:border-gold group-hover:text-gold-deep"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-8 pb-10 pl-0 sm:pl-16 md:grid-cols-[1fr_auto] md:gap-16 md:pl-24">
                          <div>
                            <p className="max-w-xl leading-relaxed text-ink-faint">
                              {s.desc}
                            </p>
                            <div className="mt-6 flex flex-wrap gap-2.5">
                              {s.tags.map((t) => (
                                <span
                                  key={t}
                                  className="rounded-full border border-line bg-mist px-4 py-1.5 text-xs font-medium text-ink-soft"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                          <a
                            href="#contact"
                            className="group/link inline-flex h-fit items-center gap-2 text-sm font-semibold text-gold-deep"
                          >
                            Discuss this service
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:rotate-45" />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
