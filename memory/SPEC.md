# Web Solutions — Living Spec

## What it does

Web Solutions is a frontend-only, statically exported Next.js 16 App Router site. Brand: supplied black/white/neon-lime logo. Local Manrope, Instrument Sans and JetBrains Mono fonts. Routes: `/`, `/work/`, `/work/forma/`, `/work/soniq/`, `/work/elan/`, `/work/roast/`, and custom 404. Preview: https://glass-interface-7.preview.emergentagent.com.

## Data model

There is no runtime backend, database or API dependency. Typed static Project and Service data live in `frontend/src/lib/site.ts`. As explicitly requested in the latest turn, `GOOGLE_FORM_URL` in that file is set to `YOUR_GOOGLE_FORM_URL_HERE`; this is the only value to replace. Navbar/mobile menu say BOOK A CALL; all other primary inquiries say BOOK AN APPOINTMENT. Until a valid HTTPS URL is supplied, clicking shows an honest Sonner notice rather than navigating to a broken URL. Once configured, links open the form in a new tab. No fake booking success state. Service diagrams are illustrative, not connected AI services. Portfolio images are supplied design explorations, explicitly labelled, with no invented deployments or result metrics. Testimonials and geographic reach come from the original source archive.

## Key flows

- Once per session: a 4.1-second cinematic black opening with the supplied logo, focus reveal, scale 95–100%, reflection sweep, skip control and upward clip-path curtain. Session key: `ws-opening-seen`. Skipped for reduced-motion and direct anchor arrivals; no spinner/progress bar. Video is present underneath. Navbar, split-character hero text, glass annotation and CTA entrance form a staggered sequence.
- Full-viewport video hero pins on desktop; text separates horizontally, video scales, and a closing headline emerges as the next chapter approaches. Mobile has no pinning or cursor parallax.
- Floating, centered 86vw glass pill navbar (80vw scrolled), active capsules, magnetic BOOK A CALL, compact mobile variant, fullscreen masked glass menu with staggered links.
- Full-screen FORMA/SONIQ/ÉLAN/ROAST scenes in a sticky horizontal desktop sequence, oversized animated titles, refractive metadata, pointer parallax and dedicated case studies. Mobile/reduced motion is vertical. Work index and case study visuals are full-bleed.
- Seven scroll-driven service chapters share one pinned desktop stage; navigation allows direct selection. Each has a glass object and distinct browser, QR scan, connected nodes, workflow, chart, commerce or assembled-layer motion. Mobile uses touch chapter buttons instead of pinning.
- Kinetic typographic interlude, expanding full-bleed video, editorial studio with parallax imagery, scroll-driven four-step Discover/Design/Develop/Evolve timeline and drawn rail. Interactive technology ecosystem, original testimonials and FAQ retained.
- Project links open dedicated statically generated case studies with galleries, concept disclaimer, contact and next-project navigation.
- Custom desktop hover cursor and magnetic/reflection CTAs; reduced-motion and touch fallbacks. Native smooth scrolling with Motion useScroll/useTransform; no extra GSAP/Lenis weight or scroll hijacking. Final CTA shifts from dark to lime with split-character typography.
- All imagery/video/logo is supplied and local, converted to WebP and compressed H.264 excerpts where appropriate. No stock imagery or remote font dependency.

## Auth / roles

No authentication or gated areas.

## Architecture and build
`frontend/package.json`: yarn dev → production build + static preview via `scripts/preview.ts` (PORT supplied by supervisor), because the hosted ingress rejects Next HMR WebSockets and blocks dev hydration. yarn dev:next → conventional local Next hot reload. yarn typecheck → strict Next.js tsconfig; yarn build → static export in `frontend/out`. Restart frontend after edits to rebuild the hosted static preview. Supervisor already runs yarn dev, so no supervisor edits needed. Existing FastAPI/Mongo infrastructure is untouched and unused. Vercel root: frontend, no env vars required. Video uses WebM first and MP4 fallback for broad codec support. Next metadata replaces unused index.html.

## Source inspection
Original source archive: Next.js 15, npm package-lock, Tailwind 3, Framer Motion, GSAP/Lenis; single App Router homepage composed of services, portfolio demos, AI demos, process, testimonials, FAQ, local/mock booking flows. Preserved original services and useful copy; replaced generic modal project and local/mock form flows. Main source media, 21 additional videos and 105 supplied images inspected. No original code or assets in `/app/work` modified.

## Verification
Browser suite `/app/test_reports/iteration_1.json`: 8/8 passing; first-session intro/revisit/skip, glass nav/menu, media/dialogs, project routes, seven services/process, honest booking placeholder, responsive 390/768/1280 widths, reduced-motion/keyboard/no-console-errors. Hero chapter overlap and narrow service grid overflow fixed and reverified. Typecheck and static production build passed. Social metadata derives its origin only from NEXT_PUBLIC_SITE_URL or Vercel-provided host variables; with no host, absolute social image metadata is omitted rather than publishing localhost/preview URLs. Build artifacts and environment files are ignored in source control.