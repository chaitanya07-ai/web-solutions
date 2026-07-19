"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Instagram, Mail, MessageCircle, Phone, Send, Sparkles, X } from "lucide-react";
import { SITE } from "@/lib/site";
import { EASE } from "@/lib/utils";

type Msg = {
  id: number;
  role: "user" | "bot";
  text: string;
  contact?: boolean; // render contact buttons under this bot message
  sample?: boolean;
  book?: boolean; // render a "book a call" button under this bot message
};

/* ------------------------------------------------------------------ */
/*  Knowledge base — pricing is deliberately excluded                  */
/* ------------------------------------------------------------------ */

const GREETING =
  "Hi! I'm the Web Solutions assistant 👋 Ask me about our services, the free sample website, timelines, or booking a call.";

const RULES: { match: RegExp; reply: string; contact?: boolean; book?: boolean; sample?: boolean }[] = [
  {
    // Pricing guard — always first.
    match: /(price|pricing|cost|charge|charges|rate|rates|fee|fees|budget|quote|quotation|how much|₹|\$|£|paisa|paise)/i,
    reply:
      "For pricing, we'd rather give you an exact quote for your exact project than a vague range here. Reach us directly and we'll reply fast:",
    contact: true,
  },
  {
    match: /(sample|free|trial|demo site)/i,
    reply:
      "Yes — the sample is genuinely free. We design a homepage concept for your business before you pay anything. Love it? We build the rest. If not, you owe us nothing.",
    sample: true,
  },
  {
    match: /(how long|timeline|time|days|weeks|deliver|delivery|fast|deadline|kitne din)/i,
    reply:
      "Most websites go live in 7–14 days from the first call. Bigger builds with bookings, payments and dashboards get a dated timeline at the discovery call — and we keep to it.",
  },
  {
    match: /(book|call|meet|meeting|appointment|schedule|slot|talk|consult)/i,
    reply:
      "Easy — tap below to see our live calendar, pick a slot that suits you, and a Google Meet invite lands in your inbox automatically.",
    book: true,
  },
  {
    match: /(service|services|what do you|what can you|offer|build|make|website type|menu|qr|chatbot|dashboard|seo|booking|payment|ecommerce|store)/i,
    reply:
      "We build complete website systems: design & development, smart QR e-menus, AI chatbots, booking & payment systems, admin dashboards, and SEO with ongoing care — for restaurants, salons, gyms, clinics, hotels, stores and more.",
  },
  {
    match: /(process|steps|how do you work|start|procedure)/i,
    reply:
      "Six steps: free discovery call → UI design → development → testing → launch → 24/7 support. You get a free sample homepage right after the first call, and a dated timeline for everything else.",
  },
  {
    match: /(country|countries|india|usa|uk|canada|australia|thailand|worldwide|abroad|timezone|language)/i,
    reply:
      "We work worldwide — currently serving clients in the USA, Canada, Australia, the UK, Thailand and India, with calls scheduled around your timezone.",
  },
  {
    match: /(support|maintenance|after launch|update|edit|change|fix|problem|issue|error|broken|help|bug)/i,
    reply:
      "We stay on call after launch — updates, backups, fixes and tweaks are handled 24/7. Describe your issue here, or message us on WhatsApp and a human will jump on it right away.",
    contact: true,
  },
  {
    match: /(contact|whatsapp|instagram|insta|email|mail|phone|number|reach|dm)/i,
    reply: "Here's every way to reach us — we usually reply within the hour:",
    contact: true,
  },
  {
    match: /(payment method|pay online|installment|emi|one.?time|subscription)/i,
    reply:
      "You can own your website outright with a one-time payment — no forced subscriptions. Optional monthly care plans exist only if you want updates handled for you. For exact figures, contact us directly:",
    contact: true,
  },
  {
    match: /(hi|hello|hey|namaste|good (morning|evening|afternoon))/i,
    reply: GREETING,
  },
];

const FALLBACK =
  "Good question! I can help with services, the free sample, timelines, our process and booking. For anything specific to your project — including pricing — the team answers fastest here:";

function answer(text: string): { reply: string; contact?: boolean; book?: boolean; sample?: boolean } {
  for (const r of RULES) if (r.match.test(text)) return r;
  return { reply: FALLBACK, contact: true };
}

const CHIPS = ["Services", "Free sample", "How long?", "Book a call", "Pricing"];

/* ------------------------------------------------------------------ */
/*  Contact buttons rendered inside bot messages                       */
/* ------------------------------------------------------------------ */

function ContactRow() {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <a
        href={SITE.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[11px] font-bold text-paper transition-colors hover:bg-gold hover:text-ink"
      >
        <MessageCircle className="h-3 w-3" /> WhatsApp
      </a>
      <a
        href={SITE.instagram}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-[11px] font-bold text-ink transition-colors hover:border-gold hover:text-gold-deep"
      >
        <Instagram className="h-3 w-3" /> Instagram
      </a>
      <a
        href={SITE.phoneHref}
        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-[11px] font-bold text-ink transition-colors hover:border-gold hover:text-gold-deep"
      >
        <Phone className="h-3 w-3" /> Call
      </a>
      <a
        href={SITE.emailHref}
        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-[11px] font-bold text-ink transition-colors hover:border-gold hover:text-gold-deep"
      >
        <Mail className="h-3 w-3" /> Email
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Widget                                                             */
/* ------------------------------------------------------------------ */

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ id: 0, role: "bot", text: GREETING }]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const idRef = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t || typing) return;
    setMessages((m) => [...m, { id: idRef.current++, role: "user", text: t }]);
    setTyping(true);
    const a = answer(t);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: idRef.current++, role: "bot", text: a.reply, contact: a.contact, book: a.book, sample: a.sample },
      ]);
      setTyping(false);
    }, 750 + Math.random() * 450);
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 3.4, duration: 0.5, ease: EASE }}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close assistant" : "Chat with the Web Solutions assistant"}
        className="fixed bottom-[4.7rem] right-4 z-[85] md:bottom-5 md:right-5 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-gold shadow-lift transition-colors hover:bg-gold hover:text-ink"
      >
        {open ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed bottom-[8.5rem] right-4 z-[85] flex max-h-[62vh] md:bottom-24 md:max-h-[70vh] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-lift sm:right-5"
            role="dialog"
            aria-label="Web Solutions assistant"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-line bg-ink px-5 py-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="" className="h-9 w-9 rounded-full bg-white" />
              <div>
                <p className="text-sm font-bold tracking-tight text-paper">
                  Web Solutions Assistant
                </p>
                <p className="text-[11px] text-gold">Online · replies instantly</p>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="no-scrollbar flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
              aria-live="polite"
            >
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className={`max-w-[86%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
                    m.role === "user"
                      ? "self-end rounded-br-md bg-ink text-paper"
                      : "self-start rounded-bl-md border border-line bg-mist text-ink-soft"
                  }`}
                >
                  {m.text}
                  {m.contact && <ContactRow />}
                  {m.sample && (
                    <a
                      href="#contact"
                      data-sample
                      className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-[11px] font-bold text-ink transition-colors hover:bg-ink hover:text-gold"
                    >
                      Get my free sample →
                    </a>
                  )}
                  {m.book && (
                    <a
                      href={SITE.meet}
                      data-book
                      className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-[11px] font-bold text-ink transition-colors hover:bg-ink hover:text-gold"
                    >
                      See live slots →
                    </a>
                  )}
                </motion.div>
              ))}

              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex w-fit items-center gap-1.5 self-start rounded-2xl rounded-bl-md border border-line bg-mist px-4 py-3.5"
                    aria-label="Assistant is typing"
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.14, ease: "easeInOut" }}
                        className="h-1.5 w-1.5 rounded-full bg-gold-deep"
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick chips */}
            <div className="flex flex-wrap gap-2 border-t border-line px-4 py-2.5">
              {CHIPS.map((c) => (
                <button
                  key={c}
                  onClick={() => send(c)}
                  disabled={typing}
                  className="rounded-full border border-line px-3.5 py-1.5 text-[11px] font-semibold text-ink-soft transition-colors hover:border-gold hover:bg-gold-tint hover:text-gold-deep disabled:opacity-40"
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
                setInput("");
              }}
              className="flex items-center gap-2 border-t border-line bg-mist px-3 py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything…"
                aria-label="Ask the Web Solutions assistant"
                className="h-10 flex-1 rounded-full border border-line bg-white px-4 text-[13px] outline-none transition-colors focus:border-gold"
              />
              <button
                type="submit"
                disabled={typing || !input.trim()}
                aria-label="Send"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-paper transition-colors hover:bg-gold hover:text-ink disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
