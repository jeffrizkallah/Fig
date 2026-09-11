import type { Metadata } from "next";
import { Newsreader, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Headlines: a calm, Times-like serif at regular weight (the Harvey / Frontify recipe).
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Body and UI: Switzer (Fontshare, ITF Free Font License), self-hosted.
const switzer = localFont({
  variable: "--font-switzer",
  display: "swap",
  src: [
    { path: "../fonts/Switzer-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Switzer-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Switzer-Semibold.woff2", weight: "600", style: "normal" },
  ],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fig-xi.vercel.app"),
  title: "Fig | We build the tools your business is missing",
  description:
    "We build the tools your business is missing. Software, dashboards, automation, and AI where it genuinely helps. Based in Portugal, working across Europe.",
  icons: {
    icon: "/Sliced Fig Logo with Cartoon Style.png",
    apple: "/Sliced Fig Logo with Cartoon Style.png",
  },
  openGraph: {
    title: "Fig | We build the tools your business is missing",
    description:
      "We build the tools your business is missing. Software, dashboards, automation, and AI where it genuinely helps. Based in Portugal, working across Europe.",
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Fig Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${switzer.variable} ${newsreader.variable} ${jetbrainsMono.variable} antialiased grain`}
      >
        {children}
      </body>
    </html>
  );
}
