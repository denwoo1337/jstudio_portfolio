import type { Metadata } from "next";
import localFont from "next/font/local";
import { Outfit } from "next/font/google";
import "./globals.css";

const cabinetGrotesk = localFont({
  src: [
    {
      path: "./fonts/CabinetGrotesk-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/CabinetGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/CabinetGrotesk-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-cabinet",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://j-studio.de"),
  title: "J. Studio — Websites für lokale Dienstleister im Allgäu",
  description:
    "Professionelle Websites für Handwerker und lokale Betriebe. Kein Marketing-Bla-Bla, faire Preise, direkte Kommunikation.",
  openGraph: {
    title: "J. Studio",
    description: "Websites für lokale Dienstleister im Allgäu.",
    url: "https://j-studio.de",
    siteName: "J. Studio",
    locale: "de_DE",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <body
        className={`${cabinetGrotesk.variable} ${outfit.variable} antialiased bg-background text-foreground font-body`}
      >
        {children}
      </body>
    </html>
  );
}
