"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, SectionHeading } from "@/components/ui/primitives";

const FAQS = [
  {
    q: "Is the sample website really free?",
    a: "Yes — genuinely. Before you commit to anything, we design a sample homepage for your business so you can judge the quality with your own eyes. If it's not love at first sight, you walk away owing nothing.",
  },
  {
    q: "How long does a website take?",
    a: "Most projects go from first call to launch in 7–14 days. Larger builds with bookings, payments and dashboards can take a little longer — you'll get a dated timeline at the discovery call, and we keep to it.",
  },
  {
    q: "What does the one-time payment include?",
    a: "Everything: design, development, mobile responsiveness, SEO setup, launch, and training on your admin panel. You own the website outright. Optional monthly care plans exist only if you want ongoing updates handled for you.",
  },
  {
    q: "Can you handle bookings, payments and QR menus?",
    a: "That's our specialty. Table reservations, appointment booking, secure payment gateways, smart e-menus with QR codes, AI chatbots and admin dashboards — built in, not bolted on.",
  },
  {
    q: "Do you work with businesses outside India?",
    a: "Every week. We currently serve clients across the USA, Canada, Australia, the United Kingdom, Thailand and India, and we schedule calls around your timezone, not ours.",
  },
  {
    q: "What happens after launch?",
    a: "We don't disappear. You get 24/7 support, and we handle updates, backups, security and tweaks. Need a new section or a seasonal menu next year? One message away.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FAQ() {
  return (
    <section id="faq" className="scroll-mt-24 border-y border-line bg-mist">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-36">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-24">
          <SectionHeading
            eyebrow="FAQ"
            title={
              <>
                Fair questions,{" "}
                <span className="italic text-gold-deep">straight answers</span>
              </>
            }
            lede="Anything we haven't covered? Ask on the call — first one's free, and so is the sample."
          />

          <Reveal delay={0.1}>
            <Accordion type="single" collapsible defaultValue="item-0" className="border-t border-line">
              {FAQS.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
