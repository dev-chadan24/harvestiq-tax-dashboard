import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${plusJakartaSans.variable} font-sans antialiased bg-[#050508] text-[#f4f4f5]`}
      >
        {children}
      </body>
    </html>
  );
}
