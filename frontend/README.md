# Web Solutions

Frontend-only Next.js 16 App Router site. No API, database, credentials or runtime server are required in production. Content is typed local data in `src/lib/site.ts`; assets are supplied media in `public/assets`.

## Development
`yarn install --frozen-lockfile` then `yarn dev:next` for local Next.js hot reload. `yarn dev` builds and serves the static production export on the environment-provided `PORT`; this is used in the hosted preview because its proxy blocks Next.js HMR WebSockets. To update that preview after edits, restart its frontend process (it rebuilds automatically). This small preview server is not deployed to Vercel.

## Quality gates
`yarn typecheck` and `yarn build`. The production build statically exports all routes to `out/`.

## Vercel
Set the Root Directory to `frontend`, Framework Preset to Next.js, Install Command to `yarn install --frozen-lockfile`, and Build Command to `yarn build`. Next.js uses `output: "export"`. No environment variables or backend are needed. All `/work/[slug]/` routes are generated at build time.

The `backend/` directory at repository root is unused template infrastructure and must not be deployed with this frontend. `index.html` is a legacy template artifact, not the Next.js entry point.

## Content integrity
The visual portfolio is labelled as design explorations based on supplied imagery, not invented live client results. Client quotations and country coverage are preserved from the original source. AI/service diagrams are illustrative, not working integrations. Set `GOOGLE_FORM_URL` in `src/lib/site.ts` once to activate all BOOK A CALL / BOOK AN APPOINTMENT links. It intentionally contains `YOUR_GOOGLE_FORM_URL_HERE` per the latest request; until configured, buttons display a clear notice instead of navigating to a broken link.

## Accessibility and motion
Keyboard-accessible menus and services, visible focus, pause controls, local fonts, reduced-motion support. The 4.1-second opening plays once per session (`ws-opening-seen`) and can be skipped. Desktop uses scroll-linked horizontal projects, pinned services and process chapters. Touch and reduced-motion modes avoid pinning and heavy parallax. No scroll hijacking.