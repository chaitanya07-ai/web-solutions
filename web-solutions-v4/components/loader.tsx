"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/utils";

const WORD = "WEB SOLUTIONS";

export default function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShow(false);
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => {
      setShow(false);
      document.documentElement.style.overflow = "";
    }, 2450);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: EASE }}
          aria-hidden
        >
          {/* Logo */}
          <motion.img
            src="/logo.png"
            alt=""
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="mb-7 h-20 w-20 rounded-full sm:h-24 sm:w-24"
          />

          {/* Wordmark */}
          <div className="overflow-hidden px-6">
            <div className="flex">
              {WORD.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15 + i * 0.035, ease: EASE }}
                  className="font-display text-2xl tracking-[0.3em] text-paper sm:text-4xl"
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Gold line sweep */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
            className="mt-6 h-px w-48 origin-left bg-gold sm:w-64"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-6 text-[10px] font-semibold uppercase tracking-widest2 text-paper/40"
          >
            Smart websites. Stronger businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-8 left-8 hidden items-center gap-3 text-[10px] uppercase tracking-widest2 text-paper/30 sm:flex"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulseDot" />
            Crafting your experience
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
