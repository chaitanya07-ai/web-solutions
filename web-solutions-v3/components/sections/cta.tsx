"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, MessageCircle, Phone, Video } from "lucide-react";
import { SITE } from "@/lib/site";
import { EASE } from "@/lib/utils";
import { Eyebrow, Magnetic, Reveal } from "@/components/ui/primitives";

export default function CTA() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden bg-ink text-paper">
      <div className="bg-grid absolute inset-0 opacity-[0.16]" aria-hidden />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6 }}
        className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-[160px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
        <Reveal>
          <Eyebrow light>Let&apos;s talk</Eyebrow>
        </Reveal>

        <div className="mt-6 overflow-hidden">
          <motion.h2
            initial={{ y: "60%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1, ease: EASE }}
            className="max-w-4xl font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            Your competitors have a head start.{" "}
            <span className="italic text-gold">Let&apos;s fix that.</span>
          </motion.h2>
        </div>

        <Reveal delay={0.15}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/60">
            Book a free Google Meet — 20 minutes, no pressure. You&apos;ll leave
            with a plan, a timeline, and a free sample homepage on the way.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href={SITE.meet}
                data-book
                className="group inline-flex h-14 items-center gap-2.5 rounded-full bg-gold px-9 text-[15px] font-bold text-ink shadow-lift transition-all duration-300 hover:bg-paper"
              >
                <Video className="h-4 w-4" />
                Book a free Google Meet
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={SITE.phoneHref}
                className="inline-flex h-14 items-center gap-2.5 rounded-full border border-paper/25 px-9 text-[15px] font-semibold text-paper transition-all duration-300 hover:border-gold hover:text-gold"
              >
                <Phone className="h-4 w-4" />
                Call now
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-14 items-center gap-2.5 rounded-full border border-paper/25 px-9 text-[15px] font-semibold text-paper transition-all duration-300 hover:border-gold hover:text-gold"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-14 items-center gap-2.5 rounded-full border border-paper/25 px-9 text-[15px] font-semibold text-paper transition-all duration-300 hover:border-gold hover:text-gold"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <a
            href="#contact"
            data-sample
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-paper"
          >
            Prefer to see first? Get a free sample homepage →
          </a>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-paper/10 pt-8 text-sm text-paper/50">
            <a href={SITE.phoneHref} className="transition-colors hover:text-gold">
              {SITE.phoneDisplay}
            </a>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-gold"
            >
              {SITE.instagramHandle}
            </a>
            <span className="text-[11px] uppercase tracking-widest2 text-paper/35">
              Replies within hours — every timezone
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
