import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Sora } from "next/font/google";

import { GlobalFooter } from "@/components/layout/GlobalFooter";
import { GlobalHeader } from "@/components/layout/GlobalHeader";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { ClientBootstrap } from "@/components/layout/ClientBootstrap";
import {
  JsonLd,
  absoluteUrl,
  personSchema,
  realEstateAgentSchema,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

/**
 * Fonts are self-hosted by `next/font`. Nothing is fetched from Google at
 * runtime, so there is no third-party request, no font-related privacy
 * exposure, and no render-blocking external stylesheet.
 */
const sora = Sora({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.defaultTitle,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  applicationName: siteConfig.defaultTitle,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: { canonical: absoluteUrl("/") },
  formatDetection: { telephone: true, address: false, email: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.defaultTitle,
    url: absoluteUrl("/"),
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0D10",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper pb-[var(--action-bar-height)]">
        {/*
          Skip link. Visually hidden until focused, then pinned above the
          sticky header.
        */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-button focus:bg-signal focus:px-5 focus:py-3 focus:font-semibold focus:text-ink"
        >
          Skip to main content
        </a>

        <GlobalHeader />

        <main id="main" className="flex-1">
          {children}
        </main>

        <GlobalFooter />
        <MobileActionBar />
        <ClientBootstrap />

        {/*
          Site-wide entity graph. Emitted once from the root layout so every
          page inherits the agent and person nodes; page-level graphs reference
          them by `@id` rather than repeating them.
        */}
        <JsonLd graph={[realEstateAgentSchema(), personSchema()]} />
      </body>
    </html>
  );
}
