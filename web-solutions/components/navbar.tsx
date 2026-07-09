"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";
import { EASE } from "@/lib/utils";

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="group flex items-center gap-2.5" aria-label="Web Solutions — home">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink font-display text-[13px] italic text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
        W
      </span>
      <span
        className={`text-[15px] font-bold tracking-tight ${light ? "text-paper" : "text-ink"}`}
      >
        Web Solutions<span className="text-gold">.</span>
      </span>
    </a>
  );
}

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 420 && !open);
    setScrolled(latest > 24);
  });

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
        className="fixed inset-x-0 top-0 z-[70] px-4 pt-4 sm:px-6"
      >
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-5 py-3 transition-all duration-500 ${
            scrolled
              ? "border-line/80 bg-paper/75 shadow-soft backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <Logo />

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative text-[13px] font-semibold tracking-wide text-ink-soft transition-colors hover:text-ink"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="group hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-paper transition-all duration-300 hover:bg-gold hover:text-ink sm:inline-flex"
            >
              Book a call
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45" />
            </a>
            <button
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper/70 backdrop-blur lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-[18px] w-[18px]" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-[90] flex flex-col bg-ink px-6 pb-10 pt-5"
          >
            <div className="flex items-center justify-between">
              <Logo light />
              <button
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 text-paper"
                aria-label="Close menu"
              >
                <X className="h-[18px] w-[18px]" />
              </button>
            </div>

            <ul className="mt-14 flex flex-col gap-2">
              {[...NAV_LINKS, { label: "Contact", href: "#contact" }].map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.a
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: EASE }}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 font-display text-4xl text-paper transition-colors hover:text-gold"
                  >
                    <span className="text-xs tracking-widest2 text-gold">
                      0{i + 1}
                    </span>
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-auto space-y-2 text-sm text-paper/50"
            >
              <p>{SITE.phoneDisplay}</p>
              <p>{SITE.instagramHandle}</p>
              <p className="text-[10px] uppercase tracking-widest2 text-gold">
                USA · Canada · Australia · UK · Thailand · India
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
