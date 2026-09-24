import Link from "next/link";
export default function NotFound() {
  return <main id="main-content" className="not-found"><p className="eyebrow" data-testid="not-found-label">404 / A LITTLE OFF COURSE</p><h1 data-testid="not-found-title">A different<br />direction.</h1><p data-testid="not-found-copy">That page isn’t here. Something good is just one click away.</p><Link data-testid="not-found-home" className="pill-button lime" href="/">Back to the beginning ↗</Link></main>;
}