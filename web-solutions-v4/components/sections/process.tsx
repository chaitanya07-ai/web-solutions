"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/ui/primitives";

const STEPS = [
  {
    n: "1",
    title: "Discovery call",
    time: "Day 0",
    desc: "A free 20-minute Google Meet. We learn your business and your goals — and within days you receive a free sample homepage, no strings attached.",
  },
  {
    n: "2",
    title: "UI design",
    time: "Days 1–3",
    desc: "We design a premium concept around your brand: typography, colour, layout, motion. You review it live and we refine until it feels inevitable.",
  },
  {
    n: "3",
    title: "Development",
    time: "Days 4–9",
    desc: "The design becomes a pixel-perfect, animated website — bookings, payments, e-menus and dashboard wired in and tested as we build.",
  },
  {
    n: "4",
    title: "Testing",
    time: "Days 10–11",
    desc: "Every device, every browser, every edge case. Speed is tuned until Lighthouse turns green and the experience is silk on a three-year-old phone.",
  },
  {
    n: "5",
    title: "Launch",
    time: "Day 12",
    desc: "Domain, hosting, SSL, analytics and Google indexing — all handled. You do exactly one thing: share the link.",
  },
  {
    n: "6",
    title: "Support",
    time: "Ongoing",
    desc: "We stay on call after launch. Updates, tweaks, new sections, honest advice — 24/7, for as long as you need us.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Gold spine draws itself as you travel through the process.
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
            end: "bottom 78%",
            scrub: 0.5,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".process-step").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 44 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="scroll-mt-24 bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-36">
        <SectionHeading
          eyebrow="The process"
          title={
            <>
              From first call to launch{" "}
              <span className="italic text-gold-deep">in about two weeks</span>
            </>
          }
          lede="No mystery, no months of silence. Six steps, each with a date on it — you always know exactly where your project stands."
        />

        <div className="relative mt-20 max-w-3xl lg:mx-auto">
          {/* Spine */}
          <div className="absolute bottom-4 left-[22px] top-4 w-px bg-line sm:left-[26px]" aria-hidden>
            <div ref={lineRef} className="h-full w-full origin-top bg-gold" />
          </div>

          <ol className="space-y-14 md:space-y-20">
            {STEPS.map((s) => (
              <li key={s.n} className="process-step relative flex gap-7 sm:gap-10">
                <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold bg-paper font-display text-lg italic text-gold-deep shadow-soft sm:h-[52px] sm:w-[52px] sm:text-xl">
                  {s.n}
                </span>
                <div className="pt-1">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-display text-2xl tracking-tight text-ink sm:text-3xl">
                      {s.title}
                    </h3>
                    <span className="rounded-full bg-gold-tint px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold-deep">
                      {s.time}
                    </span>
                  </div>
                  <p className="mt-3 max-w-xl leading-relaxed text-ink-faint">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
