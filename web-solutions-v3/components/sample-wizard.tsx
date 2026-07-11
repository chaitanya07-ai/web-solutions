"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Gift, MessageCircle, Video, X } from "lucide-react";
import { SITE } from "@/lib/site";
import { EASE } from "@/lib/utils";

const INDUSTRIES = [
  "Restaurant", "Cafe", "Salon", "Gym", "Hotel",
  "Clinic", "Retail", "Real Estate", "Education", "Something else",
];

const WA_NUMBER = "917814108847";

/**
 * "Get my free sample" wizard.
 * Any element with a `data-sample` attribute opens it.
 * On finish it opens WhatsApp with a pre-filled lead message — no backend needed.
 */
export default function SampleWizard() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [industry, setIndustry] = useState("");
  const [name, setName] = useState("");
  const [biz, setBiz] = useState("");
  const [loc, setLoc] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest?.("[data-sample]");
      if (!el) return;
      e.preventDefault();
      setStep(0);
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

  const waLink = () => {
    const msg =
      `Hi Web Solutions! I'd like my FREE sample homepage 🎁\n\n` +
      `Business: ${biz || "—"} (${industry || "—"})\n` +
      `Name: ${name || "—"}\n` +
      `Location: ${loc || "—"}` +
      (note ? `\nNote: ${note}` : "");
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  const canNext = step === 0 ? !!industry : step === 1 ? name.trim() && biz.trim() : true;

  const field =
    "h-12 w-full rounded-xl border border-line bg-white px-4 text-sm outline-none transition-colors focus:border-gold";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[97] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-md"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Get your free sample website"
        >
          <motion.div
            initial={{ y: 40, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 30, scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="w-full max-w-lg overflow-hidden rounded-3xl bg-paper shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line bg-ink px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-ink">
                  <Gift className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-bold tracking-tight text-paper">
                    Your free sample website
                  </p>
                  <p className="text-[11px] text-gold">
                    See it before you pay — no strings attached
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/25 text-paper transition-colors hover:border-gold hover:text-gold"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Progress */}
            <div className="flex gap-1.5 px-6 pt-5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                    i <= step ? "bg-gold" : "bg-line"
                  }`}
                />
              ))}
            </div>

            {/* Steps */}
            <div className="px-6 pb-6 pt-5">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div
                    key="s0"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <h3 className="font-display text-2xl tracking-tight text-ink">
                      What do you run?
                    </h3>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {INDUSTRIES.map((i) => (
                        <button
                          key={i}
                          onClick={() => setIndustry(i)}
                          className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                            industry === i
                              ? "border-gold bg-gold text-ink"
                              : "border-line bg-white text-ink-soft hover:border-gold hover:text-ink"
                          }`}
                        >
                          {i}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="s1"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="space-y-3.5"
                  >
                    <h3 className="font-display text-2xl tracking-tight text-ink">
                      Tell us who it&apos;s for
                    </h3>
                    <input className={field} placeholder="Your name *" value={name}
                      onChange={(e) => setName(e.target.value)} aria-label="Your name" />
                    <input className={field} placeholder="Business name *" value={biz}
                      onChange={(e) => setBiz(e.target.value)} aria-label="Business name" />
                    <input className={field} placeholder="City & country" value={loc}
                      onChange={(e) => setLoc(e.target.value)} aria-label="City and country" />
                    <textarea
                      className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
                      rows={2}
                      placeholder="Anything we should know? (optional)"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      aria-label="Additional notes"
                    />
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="s2"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <h3 className="font-display text-2xl tracking-tight text-ink">
                      Perfect. Send it over 🎉
                    </h3>
                    <div className="mt-4 rounded-2xl border border-line bg-mist p-5 text-sm leading-relaxed text-ink-soft">
                      <p><span className="font-bold text-ink">{biz}</span> · {industry}</p>
                      <p className="mt-1">{name}{loc ? ` — ${loc}` : ""}</p>
                      {note && <p className="mt-1 text-ink-faint">&ldquo;{note}&rdquo;</p>}
                    </div>
                    <a
                      href={waLink()}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setOpen(false)}
                      className="mt-5 flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-gold text-[15px] font-bold text-ink shadow-soft transition-colors hover:bg-ink hover:text-gold"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Send request on WhatsApp
                    </a>
                    <a
                      href={SITE.meet}
                      data-book
                      onClick={() => setOpen(false)}
                      className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-gold-deep transition-colors hover:text-ink"
                    >
                      <Video className="h-4 w-4" /> Prefer a call? Book a free Google Meet
                    </a>
                    <p className="mt-4 text-center text-[11px] text-ink-faint">
                      Your sample homepage is usually ready within a few days.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Nav */}
              {step < 2 && (
                <div className="mt-7 flex items-center justify-between">
                  <button
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-faint transition-colors hover:text-ink disabled:invisible"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    onClick={() => canNext && setStep((s) => s + 1)}
                    disabled={!canNext}
                    className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-8 text-sm font-bold text-paper transition-colors hover:bg-gold hover:text-ink disabled:opacity-40"
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
