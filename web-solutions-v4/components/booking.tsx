"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, MessageCircle, Phone, X } from "lucide-react";
import { SITE } from "@/lib/site";
import { EASE } from "@/lib/utils";

const PLACEHOLDER = SITE.meet.includes("your-booking-link");

/**
 * Global booking modal.
 * Any anchor with a `data-book` attribute opens it (href stays as a no-JS fallback).
 * When SITE.meet is a real Google appointment-schedule link, visitors see live
 * slots, pick one, and Google emails both sides + attaches the Meet link.
 */
export default function BookingModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest?.("[data-book]");
      if (!el) return;
      e.preventDefault();
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[96] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-md"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Book a free Google Meet"
        >
          <motion.div
            initial={{ y: 40, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 30, scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="flex h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-paper shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line bg-mist px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-gold">
                  <CalendarCheck className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-bold tracking-tight text-ink">
                    Book a free Google Meet
                  </p>
                  <p className="text-[11px] text-ink-faint">
                    Pick a slot — confirmation lands in your inbox instantly.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close booking"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors hover:border-gold hover:text-gold-deep"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            {PLACEHOLDER ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
                <p className="max-w-sm text-sm leading-relaxed text-ink-faint">
                  Live slot booking is being connected. Meanwhile, reach us
                  directly and we&apos;ll lock in a time that suits you — usually
                  within the hour.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <a
                    href={SITE.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-paper transition-colors hover:bg-gold hover:text-ink"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp us
                  </a>
                  <a
                    href={SITE.phoneHref}
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-7 text-sm font-semibold text-ink transition-colors hover:border-gold hover:text-gold-deep"
                  >
                    <Phone className="h-4 w-4" /> {SITE.phoneDisplay}
                  </a>
                </div>
              </div>
            ) : (
              <iframe
                src={SITE.meet}
                title="Choose a meeting slot"
                className="h-full w-full flex-1 border-0"
                loading="lazy"
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
