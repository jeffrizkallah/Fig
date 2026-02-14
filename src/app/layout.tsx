import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fig | Digital Transformation Agency",
  description:
    "We help companies digitise, modernise, and build custom digital systems to improve efficiency, drive innovation, and increase ROI.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Fig | Digital Transformation Agency",
    description:
      "We help companies digitise, modernise, and build custom digital systems to improve efficiency, drive innovation, and increase ROI.",
    type: "website",
    locale: "en_GB",
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
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased grain`}
      >
        {children}
      </body>
    </html>
  );
}
