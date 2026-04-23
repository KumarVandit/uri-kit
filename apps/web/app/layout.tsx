import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ReactNode } from "react";
import { DrawerShell } from "@/components/drawer-shell";
import { SidebarSlotProvider } from "@/components/sidebar-slot";
import { ThemeProvider } from "@/components/theme-provider";
import { TopNav } from "@/components/top-nav";
import "@/styles/index.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://uri-kit-web.vercel.app";
const SITE_NAME = "uri-kit";
const SITE_DESCRIPTION = "Declarative deep links for Apple platforms. Typed iOS settings URLs, system app schemes, universal links, and x-callback-url.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  title: {
    template: `${SITE_NAME} › %s`,
    default: SITE_NAME,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  keywords: [
    "deep links",
    "iOS settings",
    "URI schemes",
    "universal links",
    "x-callback-url",
    "Apple platforms",
    "macOS",
    "iOS",
    "iPadOS",
    "uri-kit",
  ],
  authors: [{ name: "Kumar Vandit", url: "https://github.com/KumarVandit" }],
  creator: "Kumar Vandit",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <NuqsAdapter>
          <Analytics />
          <SpeedInsights />
          <ThemeProvider>
            <SidebarSlotProvider>
              <DrawerShell>
                <TopNav />
                {children}
              </DrawerShell>
            </SidebarSlotProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
