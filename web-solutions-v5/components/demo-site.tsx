"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, MapPin } from "lucide-react";
import { EASE } from "@/lib/utils";
import { Burst } from "@/components/effects";
import type { Project } from "@/components/sections/portfolio";

type View = "home" | "menu" | "about" | "book" | "done";

/**
 * A fully clickable mini-website for the portfolio lightbox.
 * Navigation, items, and the booking flow all work — visitors experience
 * exactly what their own customers would.
 */
export default function InteractiveDemo({
  p,
  mobile = false,
}: {
  p: Project;
  mobile?: boolean;
}) {
  const [view, setView] = useState<View>("home");
  const [item, setItem] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);

  const d = p.demo;
  const line = `1px solid ${p.fg}14`;
  const onDark = p.dark;
  const btnFg = onDark ? "#14110C" : "#fff";

  const go = (v: View) => setView(v);
  const pick = (name: string) => {
    setItem(name);
    setView("book");
  };

  const NavLink = ({ v, label }: { v: View; label: string }) => (
    <button
      onClick={() => go(v)}
      className={`uppercase tracking-widest transition-opacity ${
        view === v ? "opacity-100" : "opacity-55 hover:opacity-100"
      }`}
      style={view === v ? { color: p.accent } : undefined}
    >
      {label}
    </button>
  );

  const Cta = ({ label, small = false }: { label: string; small?: boolean }) => (
    <button
      onClick={() => go("book")}
      className={`rounded-full font-bold transition-transform hover:scale-[1.04] ${
        small ? "px-3.5 py-1.5 text-[9px]" : "px-5 py-2.5 text-[11px]"
      }`}
      style={{ background: p.accent, color: btnFg }}
    >
      {label}
    </button>
  );

  return (
    <div
      className={`flex flex-col ${mobile ? "h-[520px]" : "h-[430px] sm:h-[460px]"}`}
      style={{ background: p.bg, color: p.fg }}
    >
      {/* status bar (phone) */}
      {mobile && (
        <div className="flex items-center justify-between px-5 pb-1 pt-9">
          <span className="text-[9px] font-bold">9:41</span>
          <div className="flex items-center gap-1" aria-hidden>
            {[3, 4.5, 6].map((h, i) => (
              <span key={i} className="w-[3px] rounded-sm" style={{ height: h, background: p.fg }} />
            ))}
          </div>
        </div>
      )}

      {/* top nav */}
      <div
        className="flex items-center justify-between px-5 py-3 text-[9px] font-semibold sm:px-6"
        style={{ borderBottom: line }}
      >
        <button onClick={() => go("home")} className="font-display text-[13px] normal-case italic tracking-normal">
          {p.brand}
        </button>
        {!mobile && (
          <div className="flex gap-5">
            <NavLink v="menu" label={d.navMenu} />
            <NavLink v="about" label="About" />
          </div>
        )}
        <Cta label={p.ctaLabel} small />
      </div>

      {/* views */}
      <div className="no-scrollbar relative flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {/* ------------------------------- HOME ------------------------ */}
          {view === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative flex h-full flex-col justify-center px-6 sm:px-9"
            >
              <div
                className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 select-none font-display text-[9rem] italic leading-none opacity-[0.06]"
                aria-hidden
              >
                {p.brand.charAt(0)}
              </div>
              <p className="text-[9px] font-bold uppercase tracking-[0.24em]" style={{ color: p.accent }}>
                {p.heroKicker}
              </p>
              <h4 className="mt-2.5 max-w-sm font-display text-[24px] leading-[1.14] tracking-tight sm:text-3xl">
                {p.heroTitle}
              </h4>
              <p className="mt-2.5 max-w-xs text-[11px] leading-relaxed opacity-70">{p.heroSub}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Cta label={p.ctaLabel} />
                <button
                  onClick={() => go("menu")}
                  className="text-[11px] font-semibold underline underline-offset-4 opacity-80 transition-opacity hover:opacity-100"
                >
                  {d.navMenu} →
                </button>
              </div>
            </motion.div>
          )}

          {/* ------------------------------- MENU ------------------------ */}
          {view === "menu" && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="px-5 py-5 sm:px-8"
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.24em]" style={{ color: p.accent }}>
                {d.navMenu}
              </p>
              <h4 className="mt-1.5 font-display text-xl tracking-tight">Pick anything — it works.</h4>
              <div className="mt-4 space-y-2.5">
                {d.items.map((it) => (
                  <button
                    key={it.name}
                    onClick={() => pick(it.name)}
                    className="flex w-full items-center justify-between gap-3 rounded-xl p-3 text-left transition-transform hover:scale-[1.015]"
                    style={{ border: line, background: `${p.fg}08` }}
                  >
                    <span>
                      <span className="block text-[12px] font-bold">{it.name}</span>
                      <span className="block text-[10px] opacity-60">{it.desc}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-2">
                      <span className="text-[12px] font-bold" style={{ color: p.accent }}>
                        {it.price}
                      </span>
                      <ArrowRight className="h-3 w-3 opacity-60" />
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ------------------------------- ABOUT ----------------------- */}
          {view === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="px-5 py-5 sm:px-8"
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.24em]" style={{ color: p.accent }}>
                Our story
              </p>
              <p className="mt-2.5 max-w-sm text-[12px] leading-relaxed opacity-85">{d.about}</p>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(d.address)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex h-20 items-center justify-center gap-2 rounded-xl text-[10px] font-bold transition-transform hover:scale-[1.01]"
                style={{ border: line, background: `${p.fg}08`, color: p.accent }}
              >
                <MapPin className="h-3.5 w-3.5" />
                {d.address} · Open in Maps ↗
              </a>

              <div className="mt-3 flex items-center justify-between text-[10px] opacity-70">
                <span>{d.hours}</span>
                <span>{p.location}</span>
              </div>
              <div className="mt-4">
                <Cta label={p.ctaLabel} />
              </div>
            </motion.div>
          )}

          {/* ------------------------------- BOOK ------------------------ */}
          {view === "book" && (
            <motion.div
              key="book"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="px-5 py-5 sm:px-8"
            >
              <button
                onClick={() => go("home")}
                className="mb-3 inline-flex items-center gap-1 text-[10px] font-semibold opacity-60 transition-opacity hover:opacity-100"
              >
                <ArrowLeft className="h-3 w-3" /> Back
              </button>
              <h4 className="font-display text-xl tracking-tight">{p.ctaLabel}</h4>
              {item && (
                <p className="mt-1 text-[11px] opacity-70">
                  Selected: <span className="font-bold" style={{ color: p.accent }}>{item}</span>
                </p>
              )}
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
                {d.slotLabel}
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {d.slots.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSlot(s)}
                    className="rounded-full px-4 py-2 text-[11px] font-bold transition-transform hover:scale-[1.04]"
                    style={
                      slot === s
                        ? { background: p.accent, color: btnFg }
                        : { border: line, background: `${p.fg}08` }
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
              <button
                onClick={() => slot && go("done")}
                disabled={!slot}
                className="mt-5 w-full rounded-full py-3 text-[12px] font-bold transition-all hover:scale-[1.01] disabled:opacity-40"
                style={{ background: p.accent, color: btnFg }}
              >
                Confirm {slot ? `· ${slot}` : ""}
              </button>
              <p className="mt-2.5 text-center text-[9px] opacity-50">
                Demo only — nothing is really booked.
              </p>
            </motion.div>
          )}

          {/* ------------------------------- DONE ------------------------ */}
          {view === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative flex h-full flex-col items-center justify-center px-6 text-center"
            >
              <Burst />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 16 }}
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: p.accent, color: btnFg }}
              >
                <Check className="h-6 w-6" />
              </motion.span>
              <h4 className="mt-4 font-display text-2xl tracking-tight">Confirmed!</h4>
              <p className="mt-1.5 text-[11px] opacity-70">
                {item ? `${item} · ` : ""}{slot} — see how easy that was?
              </p>
              <p className="mt-4 max-w-[240px] text-[10px] leading-relaxed opacity-55">
                Your customers get this exact experience on a website by Web Solutions.
              </p>
              <button
                onClick={() => {
                  setSlot(null);
                  setItem(null);
                  go("home");
                }}
                className="mt-5 rounded-full px-5 py-2.5 text-[11px] font-bold"
                style={{ border: line }}
              >
                Back to the site
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* bottom bar */}
      {mobile ? (
        <div className="flex items-center justify-around px-4 py-2.5" style={{ borderTop: line }}>
          {(
            [
              ["home", "Home"],
              ["menu", d.navMenu],
              ["book", "Book"],
              ["about", "About"],
            ] as [View, string][]
          ).map(([v, label]) => (
            <button key={v} onClick={() => go(v)} className="flex flex-col items-center gap-1">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: view === v ? p.accent : `${p.fg}45` }}
              />
              <span
                className="text-[8px] font-semibold"
                style={{ color: view === v ? p.accent : `${p.fg}90` }}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div
          className="flex items-center justify-between px-6 py-2.5 text-[9px] uppercase tracking-widest opacity-60"
          style={{ borderTop: line }}
        >
          <span>{p.location}</span>
          <span>{p.footNote}</span>
        </div>
      )}
    </div>
  );
}
