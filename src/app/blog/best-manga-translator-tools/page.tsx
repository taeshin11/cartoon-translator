import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "5 Best Manga Translator Tools Compared (2026) - CartoonTranslator Blog",
  description:
    "We tested five manga translator tools in 2026 — comparing accuracy, speed, language support, vertical text handling, and price. Find the best free manga translation tool for your needs.",
  keywords: [
    "best manga translator",
    "manga translation tools",
    "manga translator comparison",
    "free manga translator 2026",
    "manga OCR tool",
    "Japanese manga translator",
  ],
  openGraph: {
    title: "5 Best Manga Translator Tools Compared (2026)",
    description:
      "We tested five manga translator tools side-by-side on accuracy, speed, language support, and price.",
    url: "https://cartoontranslator.com/blog/best-manga-translator-tools",
    siteName: "CartoonTranslator",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "5 Best Manga Translator Tools Compared (2026)",
    description:
      "We tested five manga translator tools side-by-side on accuracy, speed, language support, and price.",
  },
};

const tools = [
  {
    rank: "01",
    name: "CartoonTranslator",
    badge: "Best Free Overall",
    badgeVariant: "default" as const,
    verdict:
      "Purpose-built for manga. PaddleOCR handles vertical Japanese text natively, batch upload processes full chapters, and the edit-before-download step lets you fix any mistranslations. Completely free with no account required.",
    pros: ["Free forever", "Vertical text OCR", "Batch upload (20 pages)", "Edit before download", "50+ output languages"],
    cons: ["Web-only (no desktop app)"],
  },
  {
    rank: "02",
    name: "Google Lens",
    badge: "Convenient",
    badgeVariant: "secondary" as const,
    verdict:
      "Excellent for quick lookups on your phone — point the camera at a panel and get an instant translation overlay. The OCR is strong for horizontal text but struggles with tategumi vertical columns and doesn't export a translated image file.",
    pros: ["Works on mobile", "Fast for single panels", "No upload required"],
    cons: ["Struggles with vertical text", "No batch processing", "No downloadable output"],
  },
  {
    rank: "03",
    name: "DeepL + Manual OCR",
    badge: "High Quality Translation",
    badgeVariant: "secondary" as const,
    verdict:
      "If translation quality is your top priority, running OCR manually (e.g., with Capture2Text) and then pasting results into DeepL produces some of the most natural English output available. The downside is the multi-step workflow, which is tedious for more than a few panels.",
    pros: ["Outstanding translation quality", "Works in any language pair DeepL supports"],
    cons: ["Multi-step manual workflow", "No image output", "Free tier has word limits"],
  },
  {
    rank: "04",
    name: "Mokuro",
    badge: "Power Users",
    badgeVariant: "secondary" as const,
    verdict:
      "Mokuro is an open-source CLI tool that converts manga volumes into HTML files with hoverable text bubbles. It pairs well with offline OCR and is loved by advanced users who want full control. The setup cost (Python environment, local model weights) is steep for casual readers.",
    pros: ["Offline / privacy-first", "Integrates with Yomichan for lookup", "No usage limits"],
    cons: ["Requires technical setup", "No built-in translation engine", "No web UI"],
  },
  {
    rank: "05",
    name: "Microsoft Translator (Image)",
    badge: "General Purpose",
    badgeVariant: "secondary" as const,
    verdict:
      "Microsoft's image translation covers a wide range of languages and is solid for horizontal text. Manga-specific features are lacking — there's no bubble-aware layout and vertical text detection is inconsistent. Best treated as a fallback when other tools miss a panel.",
    pros: ["Wide language coverage", "Handles multiple scripts"],
    cons: ["Not manga-specific", "Vertical text inconsistent", "No batch processing"],
  },
];

export default function BestMangaTranslatorTools() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">

        {/* Back link */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          &larr; Back to Blog
        </Link>

        {/* Meta */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Badge variant="secondary" className="rounded-full text-xs">Comparison</Badge>
          <time dateTime="2026-03-25" className="text-sm text-muted-foreground">
            March 25, 2026
          </time>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          5 Best Manga Translator Tools Compared
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          We ran five popular manga translation tools through the same test set — a mix of Japanese shonen pages with vertical text, Korean webtoon strips, and Chinese xianxia panels — and scored each on accuracy, speed, ease of use, and price.
        </p>

        {/* Intro */}
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-foreground/80">
          <p>
            The manga translation landscape has shifted dramatically over the last two years. What once required a human translator now takes seconds with the right AI tool. But "the right tool" depends heavily on your workflow: are you reading on a phone, batch-processing an entire volume, or hunting for the most accurate translation possible?
          </p>
          <p>
            Below is an honest breakdown of each tool's strengths and weaknesses, based on real testing in early 2026.
          </p>
        </div>

        {/* Tool list */}
        <div className="mt-10 space-y-6">
          {tools.map((tool) => (
            <Card key={tool.name} className="bg-card">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-2xl font-bold text-primary/30 tabular-nums">
                      {tool.rank}
                    </span>
                    <CardTitle className="text-lg font-bold text-foreground">
                      {tool.name}
                    </CardTitle>
                  </div>
                  <Badge
                    variant={tool.badgeVariant}
                    className="rounded-full text-xs flex-shrink-0"
                  >
                    {tool.badge}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-foreground/80">{tool.verdict}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-green-600">
                      Pros
                    </p>
                    <ul className="space-y-1">
                      {tool.pros.map((pro) => (
                        <li key={pro} className="flex items-start gap-1.5 text-xs text-foreground/70">
                          <span className="mt-0.5 text-green-500" aria-hidden="true">+</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-red-500">
                      Cons
                    </p>
                    <ul className="space-y-1">
                      {tool.cons.map((con) => (
                        <li key={con} className="flex items-start gap-1.5 text-xs text-foreground/70">
                          <span className="mt-0.5 text-red-400" aria-hidden="true">-</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-10 space-y-4 text-sm leading-relaxed text-foreground/80">
          <h2 className="text-xl font-bold text-foreground">Our Verdict</h2>
          <p>
            For the vast majority of manga readers, <strong className="text-foreground">CartoonTranslator</strong> hits the best balance of capability and convenience. It handles the hard parts — vertical OCR, bubble detection, image output — without any setup cost, and it's entirely free.
          </p>
          <p>
            If you're a power user who values privacy and offline access, pair Mokuro with a local language model. If you're reading casually on your phone, Google Lens works in a pinch. But for anyone who wants a full translated page they can actually download and read? CartoonTranslator is the clear winner.
          </p>
        </div>

        {/* CTA */}
        <Card className="mt-12 bg-card">
          <CardContent className="flex flex-col items-center gap-4 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="font-semibold text-foreground">See for yourself.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Upload any manga page and get a translated image in seconds — free, no account.
              </p>
            </div>
            <Link href="/translate" className="flex-shrink-0">
              <Button className="rounded-full bg-primary px-6 text-primary-foreground">
                Try CartoonTranslator Free
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Back link bottom */}
        <div className="mt-10">
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            &larr; Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
