# Web Solutions — Portfolio Website

A premium, single-page portfolio website for the **Web Solutions** agency.
Luxury-minimal design: white paper, warm grey, black ink, gold `#D4AF37` accents,
Fraunces (display serif) + Manrope (sans), Apple-grade motion throughout.

## Tech stack

- **Next.js 15** (App Router, fully static output) + **React 19** + **TypeScript**
- **Tailwind CSS** with a custom luxury token system
- **Framer Motion** — reveals, counters, sliders, page choreography
- **GSAP ScrollTrigger** — the gold spine in the Process timeline (synced with Lenis)
- **Lenis** — smooth scrolling + buttery anchor navigation
- **shadcn/ui-style components** (Radix Accordion, cva Button)
- **Lucide** icons · self-hosted variable fonts (no external font requests)
- SEO: metadata, Open Graph, JSON-LD, `sitemap.xml`, `robots.txt`

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fully static)
npm start
```

## Customize in one place

**`lib/site.ts`** holds everything personal:

- `SITE_URL` — your production domain (used by SEO/sitemap)
- `phoneDisplay` / `phoneHref` / `whatsapp` — currently set with **+91** country
  code assumed for 78141 08847; adjust if different
- `meet` — replace `https://calendar.app.google/your-booking-link` with your real
  Google Calendar booking page (or Calendly)
- Instagram, nav links, countries

Design tokens (colors, shadows, fonts) live in **`tailwind.config.ts`**.
All copy sits inside each section component in `components/sections/`.

## Sections (in page order)

Loader → Hero (gold-dust canvas, mouse parallax) → Trust counters + country
marquee → Services ledger → **Interactive Industry Showcase** (9 industries,
live-morphing website preview) → Portfolio case studies (coded mockups, metrics)
→ Before/After drag slider → **AI Chatbot demo** (fully interactive) →
**Admin Dashboard demo** (live-ticking stats, animated charts) → Features grid →
Why Us bento → Process timeline (GSAP) → Testimonials slider → FAQ → CTA → Footer.

## Notes

- All "screenshots" are coded UI — no image assets, so the site stays fast and
  license-clean. Swap in real project screenshots any time.
- `prefers-reduced-motion` is respected (loader skips, Lenis/GSAP disable).
- React Three Fiber was deliberately skipped: the hero's custom canvas particle
  field delivers the same atmosphere at a fraction of the bundle. Add R3F later
  only if you want true 3D.
- Deploy anywhere Next.js runs — Vercel is one click (`vercel deploy`).
