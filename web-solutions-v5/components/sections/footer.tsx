import { Instagram, Mail, MessageCircle, Phone, Video } from "lucide-react";
import { COUNTRIES, NAV_LINKS, SITE } from "@/lib/site";

const SERVICE_LINKS = [
  "Website development",
  "Smart e-menu & QR",
  "AI chatbots",
  "Admin dashboards",
  "Payments & booking",
  "SEO & maintenance",
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-paper/10 bg-ink text-paper">
      <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-20 sm:pb-40">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="" className="h-10 w-10 rounded-full bg-white" />
              <span className="text-lg font-bold tracking-tight">
                Web Solutions<span className="text-gold">.</span>
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/50">
              Smart websites. Stronger businesses. Premium web design for every
              kind of business — restaurants to real estate — in six countries
              and counting.
            </p>
            <div className="mt-7 flex gap-3">
              {[
                { icon: Phone, href: SITE.phoneHref, label: "Call Web Solutions" },
                { icon: MessageCircle, href: SITE.whatsapp, label: "WhatsApp Web Solutions" },
                { icon: Instagram, href: SITE.instagram, label: "Web Solutions on Instagram" },
                { icon: Mail, href: SITE.emailHref, label: "Email Web Solutions" },
                { icon: Video, href: SITE.meet, label: "Book a Google Meet", book: true },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target={s.href.startsWith("http") && !("book" in s) ? "_blank" : undefined}
                  rel="noreferrer"
                  {...("book" in s ? { "data-book": true } : {})}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/15 text-paper/70 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer navigation">
            <p className="text-[11px] font-bold uppercase tracking-widest2 text-gold">
              Explore
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {[...NAV_LINKS, { label: "Contact", href: "#contact" }].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-paper/60 transition-colors hover:text-gold">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services">
            <p className="text-[11px] font-bold uppercase tracking-widest2 text-gold">
              Services
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {SERVICE_LINKS.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-paper/60 transition-colors hover:text-gold">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest2 text-gold">
              Contact
            </p>
            <ul className="mt-5 space-y-3 text-sm text-paper/60">
              <li>
                <a href={SITE.phoneHref} className="transition-colors hover:text-gold">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={SITE.emailHref} className="transition-colors hover:text-gold">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-gold"
                >
                  {SITE.instagramHandle}
                </a>
              </li>
              <li className="pt-2 text-[11px] uppercase tracking-widest text-paper/35">
                {COUNTRIES.join(" · ")}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-paper/10 pt-8 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Web Solutions. All rights reserved.</p>
          <p>
            Designed & built with obsession —{" "}
            <span className="text-gold">every pixel intentional.</span>
          </p>
        </div>
      </div>

      {/* Watermark */}
      <div
        className="text-stroke pointer-events-none absolute -bottom-6 left-1/2 w-full -translate-x-1/2 select-none whitespace-nowrap text-center font-display text-[16vw] font-bold leading-none tracking-tight sm:-bottom-10"
        aria-hidden
      >
        WEB SOLUTIONS
      </div>
    </footer>
  );
}
