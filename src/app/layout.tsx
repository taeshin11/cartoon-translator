import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CartoonTranslator - AI Manga & Comic Translation | Free Online Tool",
  description:
    "Translate manga, comics, and webtoons instantly with AI-powered OCR. Supports Japanese vertical text, Korean, Chinese. Free online manga translator.",
  keywords: [
    "manga translator",
    "comic translation",
    "webtoon translator",
    "AI OCR",
    "Japanese manga translation",
    "Korean webtoon translation",
    "Chinese comic translation",
    "free manga translator",
    "online comic translator",
    "vertical text OCR",
  ],
  openGraph: {
    title: "CartoonTranslator - AI Manga & Comic Translation",
    description:
      "Translate manga, comics, and webtoons instantly with AI-powered OCR. Supports Japanese vertical text, Korean, Chinese.",
    url: "https://cartoontranslator.com",
    siteName: "CartoonTranslator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CartoonTranslator - AI Manga & Comic Translation",
    description:
      "Translate manga, comics, and webtoons instantly with AI-powered OCR. Supports Japanese vertical text, Korean, Chinese.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
