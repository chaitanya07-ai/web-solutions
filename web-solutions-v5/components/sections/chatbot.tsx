"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, CalendarCheck, Clock, CreditCard, LifeBuoy, Send, UtensilsCrossed } from "lucide-react";
import { EASE } from "@/lib/utils";
import { PhoneFrame } from "@/components/ui/frames";
import { Reveal, SectionHeading } from "@/components/ui/primitives";

type Msg = { id: number; role: "user" | "bot"; text: string };

const QUICK = [
  {
    icon: Clock,
    label: "Opening hours",
    reply:
      "We're open Monday to Sunday, 11:00 – 23:00. Friday and Saturday evenings book out fast — shall I hold you a table? 🕰️",
  },
  {
    icon: CalendarCheck,
    label: "Reservations",
    reply:
      "Happy to help! Tonight I have 19:00 or 21:30 free for two guests. Which works better? I'll confirm instantly.",
  },
  {
    icon: UtensilsCrossed,
    label: "Menu",
    reply:
      "Tonight's highlights: the 7-course tasting menu (₹2,400), chef's specials, and a full vegan selection. Want the QR menu link? 🍽️",
  },
  {
    icon: CreditCard,
    label: "Payments",
    reply:
      "We accept all major cards, UPI, Apple Pay and Google Pay — and you can pre-pay securely when you reserve online.",
  },
  {
    icon: LifeBuoy,
    label: "Support",
    reply:
      "I've pinged the team — a human will jump in within minutes. Meanwhile, is there anything else I can sort for you?",
  },
];

const FALLBACK =
  "Great question! On your website, I'd be trained on your exact menu, hours and policies — so I'd answer this perfectly. Book a call and we'll show you. ✨";

export default function ChatbotDemo() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 0,
      role: "bot",
      text: "Hi! I'm the Saffron House assistant 👋 Ask me anything — hours, reservations, the menu…",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const idRef = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string, reply: string) => {
    if (typing) return;
    setMessages((m) => [...m, { id: idRef.current++, role: "user", text }]);
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { id: idRef.current++, role: "bot", text: reply }]);
      setTyping(false);
    }, 1100 + Math.random() * 500);
  };

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-36">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Copy */}
          <div>
            <SectionHeading
              eyebrow="AI chatbot"
              title={
                <>
                  Your best employee{" "}
                  <span className="italic text-gold-deep">never sleeps</span>
                </>
              }
              lede="A live demo — go on, tap a question. On your website, this assistant is trained on your business — services, prices, hours, policies — whether you run a restaurant, salon, clinic or gym."
            />
            <Reveal delay={0.15}>
              <ul className="mt-10 space-y-4">
                {[
                  "Answers instantly, 24/7 — even at 3 a.m.",
                  "Takes reservations and captures leads on the spot",
                  "Hands off to a human whenever it should",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-4 text-ink-soft">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                    <span className="leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Phone */}
          <Reveal delay={0.1}>
            <PhoneFrame>
              {/* header */}
              <div className="flex items-center gap-3 border-b border-line bg-mist px-5 pb-4 pt-10">
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-ink text-gold">
                  <Bot className="h-5 w-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-mist bg-gold" />
                </span>
                <div>
                  <p className="text-sm font-bold tracking-tight text-ink">
                    Saffron House Assistant
                  </p>
                  <p className="text-[11px] text-gold-deep">Online · replies instantly</p>
                </div>
              </div>

              {/* messages */}
              <div
                ref={scrollRef}
                className="no-scrollbar flex h-[350px] flex-col gap-3 overflow-y-auto bg-white px-4 py-5"
                aria-live="polite"
              >
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 14, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
                      m.role === "user"
                        ? "self-end rounded-br-md bg-ink text-paper"
                        : "self-start rounded-bl-md border border-line bg-mist text-ink-soft"
                    }`}
                  >
                    {m.text}
                  </motion.div>
                ))}

                <AnimatePresence>
                  {typing && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex w-fit items-center gap-1.5 self-start rounded-2xl rounded-bl-md border border-line bg-mist px-4 py-3.5"
                      aria-label="Assistant is typing"
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          animate={{ y: [0, -4, 0] }}
                          transition={{
                            duration: 0.7,
                            repeat: Infinity,
                            delay: i * 0.14,
                            ease: "easeInOut",
                          }}
                          className="h-1.5 w-1.5 rounded-full bg-gold-deep"
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* quick replies */}
              <div className="flex flex-wrap gap-2 border-t border-line bg-white px-4 py-3">
                {QUICK.map((q) => (
                  <button
                    key={q.label}
                    onClick={() => send(q.label, q.reply)}
                    disabled={typing}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-[11px] font-semibold text-ink-soft transition-all duration-300 hover:border-gold hover:bg-gold-tint hover:text-gold-deep disabled:opacity-40"
                  >
                    <q.icon className="h-3 w-3 text-gold-deep" />
                    {q.label}
                  </button>
                ))}
              </div>

              {/* input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const t = input.trim();
                  if (!t) return;
                  setInput("");
                  send(t, FALLBACK);
                }}
                className="flex items-center gap-2 border-t border-line bg-mist px-4 py-3"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message…"
                  aria-label="Type a message to the demo assistant"
                  className="h-10 flex-1 rounded-full border border-line bg-white px-4 text-[13px] outline-none transition-colors focus:border-gold"
                />
                <button
                  type="submit"
                  disabled={typing || !input.trim()}
                  aria-label="Send message"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-paper transition-colors hover:bg-gold hover:text-ink disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </PhoneFrame>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
