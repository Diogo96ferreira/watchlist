import type { Metadata } from "next";
import { Inter, Noto_Serif } from "next/font/google";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { SiteEntryLoader } from "@/components/watch/site-entry-loader";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Watch List",
  description: "A curated reflection of time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSerif.variable}`}>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased">
        <LenisProvider>
          <SiteEntryLoader>{children}</SiteEntryLoader>
        </LenisProvider>
      </body>
    </html>
  );
}
