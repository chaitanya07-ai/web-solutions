import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/manrope";
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/fraunces/opsz-italic.css";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import { SITE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Web Solutions — We Build Websites That Build Businesses",
    template: "%s — Web Solutions",
  },
  description: SITE.description,
  keywords: [
    "web design agency",
    "restaurant website design",
    "cafe website",
    "QR menu",
    "smart e-menu",
    "AI chatbot for website",
    "admin dashboard",
    "booking system website",
    "premium website design",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE.name,
    title: "Web Solutions — We Build Websites That Build Businesses",
    description: SITE.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Solutions — We Build Websites That Build Businesses",
    description: SITE.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

export const viewport: Viewport = {
  themeColor: "#FCFCFA",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.name,
  description: SITE.description,
  url: SITE_URL,
  telephone: "+917814108847",
  sameAs: [SITE.instagram],
  areaServed: ["US", "CA", "AU", "GB", "TH", "IN"],
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
