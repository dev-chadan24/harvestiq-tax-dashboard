import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AppProviders } from "@/providers/AppProviders";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "HarvestIQ — Tax Loss Harvesting Dashboard",
  description:
    "Optimize your crypto tax liabilities with intelligent tax-loss harvesting insights and real-time portfolio analytics. Realize losses proportionally to instantly offset realized capital gains.",
  keywords: [
    "HarvestIQ",
    "Crypto Tax",
    "Tax Loss Harvesting",
    "Next.js 14",
    "Fintech",
    "Crypto Portfolio",
    "Web3 Analytics",
  ],
  authors: [{ name: "HarvestIQ Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://harvestiq.com",
    siteName: "HarvestIQ",
    title: "HarvestIQ — Tax Loss Harvesting Dashboard",
    description: "Optimize your crypto tax liabilities with intelligent tax-loss harvesting insights.",
    images: [
      {
        url: "https://harvestiq.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HarvestIQ Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HarvestIQ — Tax Loss Harvesting Dashboard",
    description: "Optimize your crypto tax liabilities with intelligent tax-loss harvesting insights.",
    images: ["https://harvestiq.com/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${plusJakartaSans.variable} font-sans antialiased bg-[#050508] text-[#f4f4f5]`}
      >
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
