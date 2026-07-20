"use client";

import { Reveal, SectionHeading } from "@/components/ui/primitives";

type App = { n: string; c: string };

const ROW_A: App[] = [
  { n: "WhatsApp", c: "#25D366" },
  { n: "Instagram", c: "#E1306C" },
  { n: "Facebook", c: "#1877F2" },
  { n: "Google Calendar", c: "#4285F4" },
  { n: "Gmail", c: "#EA4335" },
  { n: "Stripe", c: "#635BFF" },
  { n: "PayPal", c: "#003087" },
  { n: "Razorpay", c: "#3395FF" },
  { n: "HubSpot", c: "#FF7A59" },
  { n: "Zoho CRM", c: "#E42527" },
];

const ROW_B: App[] = [
  { n: "Salesforce", c: "#00A1E0" },
  { n: "Shopify", c: "#95BF47" },
  { n: "WooCommerce", c: "#96588A" },
  { n: "OpenAI", c: "#10A37F" },
  { n: "Claude", c: "#D97757" },
  { n: "Google Gemini", c: "#4E86F7" },
  { n: "Twilio", c: "#F22F46" },
  { n: "Zapier", c: "#FF4F00" },
  { n: "Make", c: "#6D00CC" },
  { n: "n8n", c: "#EA4B71" },
];

function Row({ apps, reverse = false }: { apps: App[]; reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden py-2.5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-paper to-transparent" />
      <div
        className={`flex w-max animate-marquee gap-3 [animation-duration:38s] hover:[animation-play-state:paused] ${
          reverse ? "[animation-direction:reverse]" : ""
        }`}
      >
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 gap-3 pr-3" aria-hidden={dup === 1}>
            {apps.map((a) => (
              <span
                key={`${dup}-${a.n}`}
                className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink-soft shadow-sm transition-colors hover:border-gold"
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: a.c }}
                />
                {a.n}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Integrations() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionHeading
          eyebrow="Integrations"
          align="center"
          title={
            <>
              Plays nicely with the tools{" "}
              <span className="italic text-gold-deep">you already use</span>
            </>
          }
          lede="Payments, calendars, CRMs, messaging, AI models — we wire your website into your stack, not the other way around."
        />

        <Reveal delay={0.1} className="mt-14">
          <Row apps={ROW_A} />
          <Row apps={ROW_B} reverse />
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-sm text-ink-faint">
            Don&apos;t see yours? If it has an API, we can connect it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
