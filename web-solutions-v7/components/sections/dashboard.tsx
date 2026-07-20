"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  BarChart3,
  CalendarCheck,
  LayoutDashboard,
  Settings,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import { EASE } from "@/lib/utils";
import { BrowserFrame } from "@/components/ui/frames";
import { Reveal, SectionHeading } from "@/components/ui/primitives";

/* ------------------------------------------------------------------ */
/*  Smooth line path helper                                            */
/* ------------------------------------------------------------------ */

const PTS = [128, 112, 118, 94, 102, 76, 86, 58, 68, 42, 50, 24].map((y, i) => ({
  x: (i * 520) / 11,
  y,
}));

function smoothPath(pts: { x: number; y: number }[]) {
  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i].x + pts[i + 1].x) / 2;
    const my = (pts[i].y + pts[i + 1].y) / 2;
    d += ` Q ${pts[i].x},${pts[i].y} ${mx},${my}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${last.x},${last.y}`;
  return d;
}

const LINE = smoothPath(PTS);
const AREA = `${LINE} L 520,160 L 0,160 Z`;
const BARS = [42, 58, 36, 72, 64, 88, 52];
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

/* ------------------------------------------------------------------ */
/*  Ticking number                                                     */
/* ------------------------------------------------------------------ */

function Tick({ value, prefix = "" }: { value: number; prefix?: string }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0.4, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="inline-block"
    >
      {prefix}
      {value.toLocaleString()}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

const ORDERS = [
  { name: "Table 12 · A. Kapoor", item: "Tasting menu ×2", amount: "₹4,800", status: "Paid" },
  { name: "Online · S. Bailey", item: "Chef's special ×1", amount: "₹1,150", status: "Preparing" },
  { name: "Table 4 · M. Rossi", item: "Wine pairing ×2", amount: "₹2,600", status: "Paid" },
  { name: "Online · P. Anand", item: "Vegan menu ×3", amount: "₹3,300", status: "Completed" },
];

const STATUS_STYLE: Record<string, string> = {
  Paid: "bg-gold-tint text-gold-deep",
  Preparing: "bg-mist text-ink-soft",
  Completed: "bg-[#EAF2EC] text-[#2F5D3A]",
};

export default function DashboardDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });

  const [revenue, setRevenue] = useState(12480);
  const [orders, setOrders] = useState(348);
  const [visitors, setVisitors] = useState(8921);
  const [bookings, setBookings] = useState(96);

  // Real-time feel: numbers drift upward while the section is on screen.
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setRevenue((v) => v + 18 + Math.floor(Math.random() * 70));
      setVisitors((v) => v + 2 + Math.floor(Math.random() * 8));
      if (Math.random() < 0.45) setOrders((v) => v + 1);
      if (Math.random() < 0.28) setBookings((v) => v + 1);
    }, 2400);
    return () => clearInterval(id);
  }, [inView]);

  const stats = [
    { icon: TrendingUp, label: "Revenue today", value: <Tick value={revenue} prefix="₹" />, delta: "+8.2%" },
    { icon: ShoppingBag, label: "Orders", value: <Tick value={orders} />, delta: "+12" },
    { icon: Users, label: "Visitors", value: <Tick value={visitors} />, delta: "+4.6%" },
    { icon: CalendarCheck, label: "Bookings", value: <Tick value={bookings} />, delta: "+9" },
  ];

  return (
    <section className="border-y border-line bg-mist">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-36" ref={ref}>
        <SectionHeading
          eyebrow="Admin dashboard"
          align="center"
          title={
            <>
              Your business,{" "}
              <span className="italic text-gold-deep">live on one screen</span>
            </>
          }
          lede="Orders, revenue, visitors and bookings — updating in real time below. Shown here for a restaurant; yours is built around your business."
        />

        <Reveal delay={0.1} className="mt-16">
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute -inset-3 rounded-[2.5rem] bg-gold/[0.07] blur-3xl sm:-inset-8" aria-hidden />
            <BrowserFrame url="dashboard.saffronhouse.com" className="relative">
              <div className="bg-gradient-to-br from-[#F6F4EE] via-white to-gold-tint/60 p-4 sm:p-6">
                <div className="flex gap-4 sm:gap-6">
                  {/* Sidebar */}
                  <div className="hidden w-14 flex-col items-center gap-2 rounded-2xl border border-white/60 bg-white/55 py-4 shadow-glass backdrop-blur-md sm:flex">
                    {[LayoutDashboard, ShoppingBag, CalendarCheck, BarChart3, Settings].map(
                      (Icon, i) => (
                        <span
                          key={i}
                          className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                            i === 0 ? "bg-ink text-gold" : "text-ink-faint"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                      )
                    )}
                  </div>

                  {/* Main */}
                  <div className="min-w-0 flex-1">
                    {/* Header */}
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold tracking-tight text-ink sm:text-base">
                          Overview
                        </p>
                        <p className="text-[11px] text-ink-faint">Saffron House · Today</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold-tint px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold-deep">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulseDot" />
                          Live
                        </span>
                        <span className="h-8 w-8 rounded-full bg-ink text-center font-display text-sm italic leading-8 text-gold">
                          A
                        </span>
                      </div>
                    </div>

                    {/* Stat cards */}
                    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                      {stats.map((s) => (
                        <div
                          key={s.label}
                          className="rounded-2xl border border-white/60 bg-white/55 p-4 shadow-glass backdrop-blur-md"
                        >
                          <div className="flex items-center justify-between">
                            <s.icon className="h-4 w-4 text-gold-deep" />
                            <span className="text-[10px] font-bold text-[#2F5D3A]">{s.delta}</span>
                          </div>
                          <p className="mt-3 text-lg font-bold tabular-nums tracking-tight text-ink sm:text-xl">
                            {s.value}
                          </p>
                          <p className="text-[11px] text-ink-faint">{s.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Charts */}
                    <div className="mt-3 grid gap-3 lg:grid-cols-3">
                      <div className="rounded-2xl border border-white/60 bg-white/55 p-4 shadow-glass backdrop-blur-md lg:col-span-2">
                        <div className="mb-2 flex items-center justify-between">
                          <p className="text-xs font-bold text-ink">Revenue — last 12 weeks</p>
                          <p className="text-[10px] text-ink-faint">↑ trending</p>
                        </div>
                        <svg viewBox="0 0 520 160" className="h-36 w-full" role="img" aria-label="Rising revenue chart">
                          <defs>
                            <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.35" />
                              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          {[40, 80, 120].map((y) => (
                            <line key={y} x1="0" x2="520" y1={y} y2={y} stroke="#0E0D0B" strokeOpacity="0.05" />
                          ))}
                          <motion.path
                            d={AREA}
                            fill="url(#goldFill)"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.6 }}
                          />
                          <motion.path
                            d={LINE}
                            fill="none"
                            stroke="#A8862B"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.8, ease: EASE }}
                          />
                          <motion.circle
                            cx={520}
                            cy={24}
                            r="4"
                            fill="#D4AF37"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.7 }}
                          />
                        </svg>
                      </div>

                      <div className="rounded-2xl border border-white/60 bg-white/55 p-4 shadow-glass backdrop-blur-md">
                        <p className="mb-3 text-xs font-bold text-ink">Orders this week</p>
                        <div className="flex h-32 items-end justify-between gap-2">
                          {BARS.map((h, i) => (
                            <div key={i} className="flex w-full flex-col items-center gap-1.5">
                              <motion.div
                                initial={{ scaleY: 0 }}
                                whileInView={{ scaleY: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
                                style={{ height: `${h}%` }}
                                className={`w-full origin-bottom rounded-md ${
                                  i === 5 ? "bg-gold" : "bg-ink/[0.12]"
                                }`}
                              />
                              <span className="text-[9px] text-ink-faint">{DAYS[i]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Orders table */}
                    <div className="mt-3 overflow-hidden rounded-2xl border border-white/60 bg-white/55 shadow-glass backdrop-blur-md">
                      <p className="border-b border-line/70 px-4 py-3 text-xs font-bold text-ink">
                        Recent orders
                      </p>
                      {ORDERS.map((o, i) => (
                        <motion.div
                          key={o.name}
                          initial={{ opacity: 0, x: -16 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: EASE }}
                          className="flex items-center justify-between gap-3 border-b border-line/50 px-4 py-3 last:border-0"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-ink">{o.name}</p>
                            <p className="truncate text-[11px] text-ink-faint">{o.item}</p>
                          </div>
                          <div className="flex shrink-0 items-center gap-3">
                            <span className="text-xs font-bold tabular-nums text-ink">{o.amount}</span>
                            <span
                              className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${STATUS_STYLE[o.status]}`}
                            >
                              {o.status}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </BrowserFrame>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
