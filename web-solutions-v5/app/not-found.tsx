import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="Web Solutions" className="h-20 w-20 rounded-full" />
      <p className="mt-8 font-display text-7xl italic text-gold">404</p>
      <h1 className="mt-3 font-display text-3xl tracking-tight text-paper">
        This page took the day off.
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-paper/50">
        The link may be old or mistyped — but the work is all still here.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center rounded-full bg-gold px-8 text-sm font-bold text-ink transition-colors hover:bg-paper"
      >
        Back to the homepage
      </Link>
    </main>
  );
}
