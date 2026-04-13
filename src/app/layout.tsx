import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FeedbackWidget } from "@/components/feedback-widget";
import { LocaleDetector } from "@/components/locale-detector";
import { AdBanner, AdSocialBar } from "@/components/adsterra-ad";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://cartoon-translator.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "CartoonTranslator – Free AI Manga & Comic Translator Online",
    template: "%s | CartoonTranslator",
  },
  description:
    "Translate manga, comics, and webtoons instantly with AI-powered OCR. Supports Japanese vertical text (tategumi), Korean, Chinese, and 35+ languages. Free online manga translator — no sign-up required.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/icon-192.png",
  },
  keywords: [
    "manga translator",
    "comic translation",
    "webtoon translator",
    "AI OCR manga",
    "Japanese manga translation",
    "Korean webtoon translation",
    "Chinese comic translation",
    "free manga translator",
    "online comic translator",
    "vertical text OCR",
    "tategumi OCR",
    "PaddleOCR manga",
    "speech bubble translator",
    "scan translator",
    "manga OCR online",
    "translate manga free",
    "webtoon English translation",
    "AI comic translation tool",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en": `${BASE_URL}`,
      "ko": `${BASE_URL}`,
      "ja": `${BASE_URL}`,
      "zh": `${BASE_URL}`,
      "zh-TW": `${BASE_URL}`,
      "es": `${BASE_URL}`,
      "fr": `${BASE_URL}`,
      "de": `${BASE_URL}`,
      "pt": `${BASE_URL}`,
      "x-default": `${BASE_URL}`,
    },
  },
  openGraph: {
    title: "CartoonTranslator – Free AI Manga & Comic Translator Online",
    description:
      "Translate manga, comics, and webtoons instantly with AI-powered OCR. Supports Japanese vertical text, Korean, Chinese, and 35+ languages.",
    url: BASE_URL,
    siteName: "CartoonTranslator",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/icon-512.png`,
        width: 512,
        height: 512,
        alt: "CartoonTranslator – AI Manga Translator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CartoonTranslator – Free AI Manga & Comic Translator Online",
    description:
      "Translate manga, comics, and webtoons instantly with AI-powered OCR. Supports Japanese vertical text, Korean, Chinese, and 35+ languages.",
    images: [`${BASE_URL}/icon-512.png`],
  },
  verification: {
    google: "WddgcbVJsL2BGHNAje5m6DK56IcR0Mw5UOqozI2Xtrc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "CartoonTranslator",
  description:
    "AI-powered manga and comic translation tool. Upload a page, OCR detects text bubbles, AI translates, and the result is rendered back into the image.",
  url: BASE_URL,
  applicationCategory: "UtilityApplication",
  operatingSystem: "All",
  browserRequirements: "Requires JavaScript",
  inLanguage: ["en", "ja", "ko", "zh", "es", "fr", "de", "pt"],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free unlimited translations — no sign-up required",
  },
  featureList: [
    "Japanese vertical text (tategumi) OCR",
    "35+ target languages",
    "Smart speech bubble inpainting",
    "Batch upload up to 20 pages",
    "Side-by-side comparison view",
    "Editable translation blocks",
  ],
  screenshot: `${BASE_URL}/icon-512.png`,
  creator: {
    "@type": "Organization",
    name: "CartoonTranslator",
    url: BASE_URL,
  },
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
      <head>
        <meta name="naver-site-verification" content="640af82bbf9713085d37bbd310cac92acc45d568" />
        <meta name="google-adsense-account" content="ca-pub-7098271335538021" />
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7098271335538021"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        {/* hreflang alternate links */}
        <link rel="alternate" hrefLang="en" href={BASE_URL} />
        <link rel="alternate" hrefLang="ko" href={BASE_URL} />
        <link rel="alternate" hrefLang="ja" href={BASE_URL} />
        <link rel="alternate" hrefLang="zh" href={BASE_URL} />
        <link rel="alternate" hrefLang="zh-TW" href={BASE_URL} />
        <link rel="alternate" hrefLang="es" href={BASE_URL} />
        <link rel="alternate" hrefLang="fr" href={BASE_URL} />
        <link rel="alternate" hrefLang="de" href={BASE_URL} />
        <link rel="alternate" hrefLang="pt" href={BASE_URL} />
        <link rel="alternate" hrefLang="x-default" href={BASE_URL} />
      </head>
      <body className="min-h-full flex flex-col bg-background">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LocaleDetector />
        <Navbar />
        <div className="flex justify-center py-1">
          <AdBanner />
        </div>
        <main className="flex-1">{children}</main>
        <Footer />
        <FeedbackWidget />
        <AdSocialBar />
      </body>
    </html>
  );
}
