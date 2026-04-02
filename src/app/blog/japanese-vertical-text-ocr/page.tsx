import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Japanese Vertical Text OCR: How AI Reads Manga - CartoonTranslator Blog",
  description:
    "Tategumi — Japanese vertical writing — stumped OCR engines for years. Learn how modern AI models like PaddleOCR detect and read vertical text in manga with near-human accuracy.",
  keywords: [
    "Japanese vertical text OCR",
    "tategumi OCR",
    "manga OCR",
    "PaddleOCR manga",
    "vertical Japanese writing AI",
    "how manga translation works",
  ],
  openGraph: {
    title: "Japanese Vertical Text OCR: How AI Reads Manga",
    description:
      "Learn how PaddleOCR and modern AI models handle tategumi — the vertical Japanese text found in traditional manga.",
    url: "https://cartoontranslator.com/blog/japanese-vertical-text-ocr",
    siteName: "CartoonTranslator",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Japanese Vertical Text OCR: How AI Reads Manga",
    description:
      "Learn how PaddleOCR and modern AI models handle tategumi — the vertical Japanese text found in traditional manga.",
  },
};

export default function JapaneseVerticalTextOCR() {
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
          <Badge variant="secondary" className="rounded-full text-xs">Deep Dive</Badge>
          <time dateTime="2026-04-01" className="text-sm text-muted-foreground">
            April 1, 2026
          </time>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Japanese Vertical Text OCR: How AI Reads Manga
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Traditional manga uses <em>tategumi</em> — text that flows top-to-bottom and right-to-left. For decades this defeated OCR engines built for horizontal Latin scripts. Here's how modern AI finally cracked it.
        </p>

        {/* Article body */}
        <div className="mt-10 space-y-8 text-sm leading-relaxed text-foreground/80">

          <section>
            <h2 className="mb-3 text-xl font-bold text-foreground">
              What Is Tategumi?
            </h2>
            <p>
              Japanese has two layout modes: <em>yokogumi</em> (horizontal, left-to-right — used in most digital text today) and <em>tategumi</em> (vertical, top-to-bottom, with columns ordered right-to-left). Traditional print media — newspapers, novels, and almost all manga — defaults to tategumi. A single manga speech bubble might contain a narrow column of kanji stacked vertically, often decorated with furigana (small phonetic characters) running alongside.
            </p>
            <p className="mt-3">
              For an OCR engine trained primarily on horizontal Latin or horizontal CJK text, tategumi is deeply confusing. The engine must detect that it is looking at vertical columns, segment those columns in the correct right-to-left order, read each character top-to-bottom, and handle the furigana separately from the main text — all without misidentifying gutter space between panels as character boundaries.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-foreground">
              Why Classic OCR Struggled
            </h2>
            <p>
              Early OCR systems (1990s–2010s) used rule-based approaches: detect horizontal runs of pixels, segment into character-height chunks, match against templates. These pipelines had zero notion of text direction. Feeding them a vertical Japanese column produced garbled nonsense — characters read in the wrong order, or entire columns merged into a single misread blob.
            </p>
            <p className="mt-3">
              Even as deep-learning OCR improved dramatically for English, the training data skewed heavily horizontal. Vertical CJK text is rarer in digitized datasets, so models that excelled at documents still stumbled on manga pages.
            </p>
            <p className="mt-3">
              On top of the direction problem, manga introduces additional challenges:
            </p>
            <ul className="mt-3 space-y-2 pl-4">
              <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary">
                <strong className="text-foreground">Non-rectangular text regions.</strong> Speech bubbles are organic shapes — ovals, spiky "shouting" clouds, thought bubble chains — not tidy text boxes.
              </li>
              <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary">
                <strong className="text-foreground">Hand-lettered fonts.</strong> Sound effects and some dialogue use artistic, hand-drawn characters that deviate far from standard typefaces.
              </li>
              <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary">
                <strong className="text-foreground">Low contrast.</strong> Text on screentone (the crosshatch patterns used for shading) has much lower contrast than black on white.
              </li>
              <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary">
                <strong className="text-foreground">Furigana interference.</strong> The small ruby characters alongside kanji are often smaller than a pixel cluster at standard scan resolution, and can cause column-detection algorithms to split a single bubble's text into dozens of fragments.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-foreground">
              How PaddleOCR Solves It
            </h2>
            <p>
              PaddleOCR (developed by Baidu) is the engine powering CartoonTranslator, and it takes a multi-stage deep learning approach that handles tategumi natively.
            </p>
            <p className="mt-3">
              The pipeline has three main phases:
            </p>

            <div className="mt-4 space-y-4">
              <div className="rounded-xl bg-card px-5 py-4 ring-1 ring-foreground/10">
                <p className="font-semibold text-foreground">1. Text Detection (DB — Differentiable Binarization)</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  A fully convolutional network produces a probability map of the image, scoring each pixel for how likely it belongs to a text region. A threshold and shrinkage step converts this into tight polygon boxes around each text region — handles irregular bubble shapes naturally, and is direction-agnostic at this stage.
                </p>
              </div>
              <div className="rounded-xl bg-card px-5 py-4 ring-1 ring-foreground/10">
                <p className="font-semibold text-foreground">2. Direction Classification</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Each detected region is passed through a lightweight classification model that determines whether the text runs horizontally or vertically. This means the engine does not assume a fixed direction — it adapts per-bubble. Useful when a manga page mixes vertical dialogue with horizontal sound effects on the same page.
                </p>
              </div>
              <div className="rounded-xl bg-card px-5 py-4 ring-1 ring-foreground/10">
                <p className="font-semibold text-foreground">3. Text Recognition (SVTR / CRNN)</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  The cropped, direction-corrected region is fed into a sequence recognition model. For vertical text, the crop is rotated 90 degrees before recognition, so the same horizontal sequence model can read it without any special-casing. The model outputs a string of Unicode characters with confidence scores.
                </p>
              </div>
            </div>

            <p className="mt-4">
              The result is a bounding-polygon, direction label, and character string for every text region on the page — ready to be handed off to a translation model.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-foreground">
              From OCR to Translation
            </h2>
            <p>
              Raw OCR output for a manga page is a list of character strings with no narrative context. Feeding these directly to a translation API — one bubble at a time — produces technically correct but often unnatural results. Pronouns are dropped (Japanese frequently omits them), honorifics need decisions, and tense can be ambiguous.
            </p>
            <p className="mt-3">
              CartoonTranslator addresses this by sending the full set of detected strings from a page together, along with reading-order metadata, to a large language model. The LLM can infer pronoun references from context, maintain consistent character voice across bubbles, and flag ambiguous passages for the user to review. This is why the translation quality of a context-aware system is noticeably higher than a simple machine translation API call.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-foreground">
              Accuracy Numbers
            </h2>
            <p>
              On clean, high-resolution scans (300 dpi+) of standard typeface manga, PaddleOCR achieves character-level accuracy above 98% for Japanese. This drops to roughly 90–94% on stylized or hand-lettered fonts, and can fall further on low-quality phone photographs with motion blur or uneven lighting.
            </p>
            <p className="mt-3">
              The key takeaway: scan quality is the single biggest lever you can pull to improve results. A crisp 600 dpi scan of a physical volume will almost always outperform a compressed JPG from an unofficial source.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-foreground">
              What's Next for Manga OCR
            </h2>
            <p>
              Vision-language models — which process image and text jointly rather than in a pipeline — are beginning to outperform dedicated OCR engines on complex document layouts. Applied to manga, these models could read a full page in a single forward pass: detecting, reading, and contextually translating simultaneously. We're actively exploring this direction for future versions of CartoonTranslator.
            </p>
          </section>
        </div>

        {/* CTA */}
        <Card className="mt-12 bg-card">
          <CardContent className="flex flex-col items-center gap-4 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="font-semibold text-foreground">Put it to the test.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Upload a vertical-text manga page and see PaddleOCR in action — free, no sign-up.
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
