import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";
import "./motion.css";

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || (vercelHost ? `https://${vercelHost}` : undefined);
const metadataBase = configuredSiteUrl ? new URL(configuredSiteUrl) : undefined;

export const metadata: Metadata = {
  metadataBase,
  title: { default: "Web Solutions — Beyond ordinary.", template: "%s — Web Solutions" },
  description: "Independent thinking. Extraordinary digital experiences. Web Solutions brings websites, design and intelligent automation together for ambitious businesses.",
  icons: { icon: "/assets/brand-icon.png", apple: "/assets/brand-icon.png" },
  openGraph: { title: "Web Solutions — Beyond ordinary.", description: "Design. Technology. A different kind of digital.", images: metadataBase ? [{ url: new URL('/assets/brand-social.png', metadataBase), width: 1254, height: 1254 }] : undefined, type: "website" },
};
export const viewport: Viewport = { themeColor: "#090a09" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" className="dark"><body><SiteShell>{children}</SiteShell></body></html>;
}