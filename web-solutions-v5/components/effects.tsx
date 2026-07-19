"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn, EASE } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Cursor — gold dot + lagging ring, desktop pointers only            */
/* ------------------------------------------------------------------ */

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 24, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 260, damping: 24, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest?.("a, button, [role='button'], input, textarea, [role='slider']"));
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[120]" aria-hidden>
      {/* Dot — pinned to the pointer */}
      <motion.span
        style={{ x, y }}
        className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-gold"
      />
      {/* Ring — glides behind, grows over interactive things */}
      <motion.span
        style={{ x: rx, y: ry }}
        animate={{ scale: hovering ? 1.9 : 1, opacity: hovering ? 0.9 : 0.5 }}
        transition={{ duration: 0.25 }}
        className="absolute -ml-[18px] -mt-[18px] h-9 w-9 rounded-full border border-gold"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tilt — mouse-driven 3D perspective on cards & mockups              */
/* ------------------------------------------------------------------ */

export function Tilt({
  children,
  max = 7,
  className,
}: {
  children: ReactNode;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1100 }}
      className={cn("will-change-transform", className)}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  MarqueeBand — giant editorial text strip between sections          */
/* ------------------------------------------------------------------ */

export function MarqueeBand({
  items,
  dark = false,
}: {
  items: string[];
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden border-y py-6 md:py-8",
        dark ? "border-paper/10 bg-ink" : "border-line bg-paper"
      )}
      aria-hidden
    >
      <div className="flex w-max animate-marquee [animation-duration:26s] hover:[animation-play-state:paused]">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center">
            {items.map((it, i) => (
              <span key={`${dup}-${i}`} className="flex items-center">
                <span
                  className={cn(
                    "whitespace-nowrap px-6 text-4xl tracking-tight md:px-9 md:text-6xl",
                    i % 2 === 0
                      ? cn("font-sans font-extrabold", dark ? "text-paper" : "text-ink")
                      : "font-display italic text-gold-deep"
                  )}
                >
                  {it}
                </span>
                <span className="h-2.5 w-2.5 rotate-45 bg-gold md:h-3 md:w-3" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  RotatingWord — flips through industries in the hero                */
/* ------------------------------------------------------------------ */

const WORDS = [
  "restaurants",
  "salons",
  "gyms",
  "clinics",
  "hotels",
  "stores",
  "cafes",
  "academies",
];

export function RotatingWord() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % WORDS.length), 2100);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-flex h-[1.5em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={WORDS[i]}
          initial={{ y: "105%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-105%", opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="inline-block font-display text-[1.15em] italic leading-[1.3] text-gold-deep"
        >
          {WORDS[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Burst — one-shot gold confetti (used when the wizard completes)    */
/* ------------------------------------------------------------------ */

export function Burst() {
  const parts = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 320,
    y: (Math.random() - 0.5) * 260 - 40,
    r: Math.random() * 340 - 170,
    s: Math.random() * 0.7 + 0.5,
    d: Math.random() * 0.15,
    gold: i % 3 !== 0,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {parts.map((p) => (
        <motion.span
          key={p.id}
          initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 1 }}
          animate={{ x: p.x, y: p.y, scale: p.s, rotate: p.r, opacity: 0 }}
          transition={{ duration: 1.1, delay: p.d, ease: EASE }}
          className={cn(
            "absolute left-1/2 top-1/3 h-2.5 w-1.5 rounded-[2px]",
            p.gold ? "bg-gold" : "bg-ink/70"
          )}
        />
      ))}
    </div>
  );
}
