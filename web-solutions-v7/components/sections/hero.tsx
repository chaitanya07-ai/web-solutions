"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Video } from "lucide-react";
import { SITE } from "@/lib/site";
import { EASE } from "@/lib/utils";
import { Magnetic } from "@/components/ui/primitives";
import { RotatingWord } from "@/components/effects";

/* ------------------------------------------------------------------ */
/*  Gold-dust particle field (lightweight canvas, no WebGL needed)     */
/* ------------------------------------------------------------------ */

function GoldDust() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;

    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number };
    let dots: P[] = [];

    const seed = () => {
      const count = Math.min(90, Math.floor((w * h) / 16000));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -Math.random() * 0.22 - 0.04,
        a: Math.random() * 0.45 + 0.12,
      }));
    };

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    window.addEventListener("pointermove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of dots) {
        // Gentle repulsion around the cursor
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 130 && dist > 0.01) {
          const f = (130 - dist) / 130;
          p.x += (dx / dist) * f * 0.9;
          p.y += (dy / dist) * f * 0.9;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -6) {
          p.y = h + 6;
          p.x = Math.random() * w;
        }
        if (p.x < -6) p.x = w + 6;
        if (p.x > w + 6) p.x = -6;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    if (reduced) {
      dots.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.a})`;
        ctx.fill();
      });
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}

/* ------------------------------------------------------------------ */
/*  Headline line with a masked rise-up reveal                         */
/* ------------------------------------------------------------------ */

function Line({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        initial={{ y: "112%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease: EASE }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export default function Hero() {
  // Mouse parallax for the background layers
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const gridX = useTransform(sx, (v) => v * 18);
  const gridY = useTransform(sy, (v) => v * 18);
  const glowX = useTransform(sx, (v) => v * -34);
  const glowY = useTransform(sy, (v) => v * -34);

  const D = 2.55; // start after the loader curtain lifts

  return (
    <section
      id="top"
      onPointerMove={(e) => {
        const { innerWidth, innerHeight } = window;
        mx.set(e.clientX / innerWidth - 0.5);
        my.set(e.clientY / innerHeight - 0.5);
      }}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-20 pt-36"
    >
      {/* Background layers */}
      <motion.div style={{ x: gridX, y: gridY }} className="absolute -inset-24" aria-hidden>
        <div className="bg-grid mask-fade absolute inset-0" />
      </motion.div>
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute left-1/2 top-1/3 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.13] blur-[140px]"
        aria-hidden
      />
      <GoldDust />

      <div className="relative mx-auto w-full max-w-7xl px-6">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: D, ease: EASE }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest2 text-ink-soft backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulseDot" />
          Websites + AI automation — worldwide
        </motion.div>

        {/* Headline */}
        <h1 className="font-display text-[13.5vw] font-normal leading-[0.94] tracking-[-0.02em] text-ink sm:text-[11vw] lg:text-[8.6rem]">
          <Line delay={D + 0.05}>We build websites</Line>
          <Line delay={D + 0.17}>
            that <span className="italic text-gold-deep">build</span>
          </Line>
          <Line delay={D + 0.29}>
            businesses<span className="text-gold">.</span>
          </Line>
        </h1>

        {/* Sub + CTAs */}
        <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: D + 0.45, ease: EASE }}
            className="max-w-md text-base leading-relaxed text-ink-faint sm:text-lg"
          >
            Premium websites for <RotatingWord /> — powered by AI that
            answers, books and follows up while you sleep. Trusted in{" "}
            <span className="font-semibold text-ink">6+ countries</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: D + 0.55, ease: EASE }}
            className="flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#work"
                className="group inline-flex h-14 items-center gap-2.5 rounded-full bg-ink px-9 text-[15px] font-semibold text-paper shadow-soft transition-all duration-300 hover:bg-gold hover:text-ink hover:shadow-lift"
              >
                View portfolio
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={SITE.meet}
                data-book
                className="inline-flex h-14 items-center gap-2.5 rounded-full border border-line bg-white/60 px-9 text-[15px] font-semibold text-ink backdrop-blur transition-all duration-300 hover:border-gold hover:text-gold-deep"
              >
                <Video className="h-4 w-4 text-gold-deep" />
                Book a free Google Meet
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#trust"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: D + 1 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-widest2 text-ink-faint transition-colors hover:text-gold-deep sm:flex"
        aria-label="Scroll to explore"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.span>
      </motion.a>
    </section>
  );
}
