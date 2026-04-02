import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdBanner, AdSocialBar } from "@/components/adsterra-ad";

// ─── Feature data ────────────────────────────────────────────────────────────

const features = [
  {
    icon: "🈯",
    title: "Japanese Vertical Text",
    description:
      "Full support for tategumi (vertical writing mode) found in traditional manga and light novels.",
  },
  {
    icon: "🌐",
    title: "50+ Languages",
    description:
      "Translate between Japanese, Korean, Chinese, English, Spanish, French, and dozens more.",
  },
  {
    icon: "📚",
    title: "Batch Upload",
    description:
      "Process up to 20 pages at once. Upload a chapter and let the AI handle everything in parallel.",
  },
  {
    icon: "✏️",
    title: "Edit Before Download",
    description:
      "Review and tweak every translation bubble before exporting. You stay in control.",
  },
  {
    icon: "🔍",
    title: "Side-by-Side Comparison",
    description:
      "View the original and translated pages together to verify accuracy at a glance.",
  },
  {
    icon: "🎉",
    title: "Free Forever",
    description:
      "No credit card, no trial limits. Core translation features are completely free.",
  },
];

// ─── Steps data ───────────────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    icon: "⬆️",
    title: "Upload",
    description: "Drop your manga page image — JPG, PNG, or WebP up to 20 MB.",
  },
  {
    number: "02",
    icon: "🤖",
    title: "AI Processes",
    description:
      "PaddleOCR detects every text bubble, then AI translates with context awareness.",
  },
  {
    number: "03",
    icon: "⬇️",
    title: "Download",
    description:
      "Get your translated page instantly, with clean typography overlaid on the original art.",
  },
];

// ─── Stats data ───────────────────────────────────────────────────────────────

const stats = [
  { value: "2M+", label: "Pages translated" },
  { value: "50+", label: "Languages supported" },
  { value: "150K+", label: "Manga fans" },
  { value: "99%", label: "OCR accuracy" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">📖</span>
            <span className="font-heading font-semibold text-base tracking-tight text-foreground">
              CartoonTranslator
            </span>
            <Badge variant="secondary" className="hidden sm:inline-flex">Beta</Badge>
          </div>
          <nav className="flex items-center gap-3">
            <Link
              href="#how-it-works"
              className="hidden sm:block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How it works
            </Link>
            <Link
              href="#features"
              className="hidden sm:block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link href="/translate">
              <Button size="sm" className="rounded-full px-4">
                Start Translating
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24">
          {/* Decorative radial glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-24 flex justify-center"
          >
            <div className="h-[500px] w-[900px] rounded-full bg-indigo-400/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-6xl px-6 text-center">
            {/* Eyebrow badge */}
            <div className="mb-6 flex justify-center">
              <Badge variant="outline" className="gap-1.5 rounded-full px-3 py-1 text-xs font-medium border-indigo-200 text-indigo-600">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
                AI-Powered OCR Translation
              </Badge>
            </div>

            {/* Heading */}
            <h1 className="mx-auto max-w-3xl text-4xl font-heading font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Translate Any Manga or{" "}
              <span className="text-indigo-600">Comic Instantly</span>
            </h1>

            {/* Subheading */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              AI-powered OCR detects and translates dialogue in manga, comics,
              and webtoons. Supports Japanese vertical text, Korean, Chinese,
              and 50+ languages.
            </p>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/translate">
                <Button
                  size="lg"
                  className="h-11 rounded-full bg-indigo-600 px-8 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-200"
                >
                  Start Translating Free
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-11 rounded-full px-8 text-sm font-medium"
                >
                  See how it works
                </Button>
              </Link>
            </div>

            {/* Mock preview ───────────────────────────────────────────────── */}
            <div className="mt-16 mx-auto max-w-4xl">
              <div className="rounded-2xl ring-1 ring-border shadow-xl shadow-foreground/5 overflow-hidden bg-card">
                {/* Window chrome */}
                <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  <span className="ml-3 text-xs text-muted-foreground">
                    cartoonTranslator — translate
                  </span>
                </div>

                {/* Before / After panels */}
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
                  {/* Original panel */}
                  <div className="relative flex flex-col items-center justify-center gap-4 bg-muted/20 p-8 min-h-[240px]">
                    <span className="absolute top-3 left-3">
                      <Badge variant="secondary" className="text-[10px] tracking-wide uppercase">Original</Badge>
                    </span>
                    {/* Simulated manga page skeleton */}
                    <div className="w-full max-w-[180px] space-y-3 opacity-70">
                      <div className="h-24 rounded-lg bg-muted animate-pulse" />
                      <div className="mx-auto h-5 w-3/4 rounded bg-muted animate-pulse" />
                      <div className="mx-auto h-5 w-1/2 rounded bg-muted animate-pulse" />
                    </div>
                    {/* Fake speech bubble in Japanese */}
                    <div className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm">
                      なるほど！すごい！
                    </div>
                  </div>

                  {/* Translated panel */}
                  <div className="relative flex flex-col items-center justify-center gap-4 bg-indigo-50/40 p-8 min-h-[240px]">
                    <span className="absolute top-3 left-3">
                      <Badge className="text-[10px] tracking-wide uppercase bg-indigo-600">Translated</Badge>
                    </span>
                    <div className="w-full max-w-[180px] space-y-3 opacity-70">
                      <div className="h-24 rounded-lg bg-indigo-100 animate-pulse" />
                      <div className="mx-auto h-5 w-3/4 rounded bg-indigo-100 animate-pulse" />
                      <div className="mx-auto h-5 w-1/2 rounded bg-indigo-100 animate-pulse" />
                    </div>
                    {/* Translated speech bubble */}
                    <div className="rounded-xl border border-indigo-200 bg-card px-4 py-2 text-sm font-medium shadow-sm text-indigo-700">
                      I see! Amazing!
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Before &amp; after — live translation preview
              </p>
            </div>
          </div>
        </section>

        {/* ── How It Works ─────────────────────────────────────────────────── */}
        <section id="how-it-works" className="py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-14">
              <Badge variant="outline" className="mb-4 rounded-full border-indigo-200 text-indigo-600">
                Simple workflow
              </Badge>
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-3 text-muted-foreground">
                From raw scan to translated page in seconds — no setup required.
              </p>
            </div>

            <div className="relative grid gap-6 sm:grid-cols-3">
              {/* Connector line (desktop) */}
              <div
                aria-hidden="true"
                className="absolute top-12 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] hidden h-px bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-200 sm:block"
              />

              {steps.map((step) => (
                <Card
                  key={step.number}
                  className="relative flex flex-col items-center text-center rounded-2xl shadow-sm bg-card border-0"
                >
                  <CardHeader className="w-full items-center pb-0">
                    {/* Step number chip */}
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-md shadow-indigo-200">
                      {step.number}
                    </div>
                    {/* Icon */}
                    <div className="mb-1 text-3xl" aria-hidden="true">
                      {step.icon}
                    </div>
                    <CardTitle className="text-base font-semibold">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-1">
                    <CardDescription className="text-sm leading-relaxed">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────────────────────── */}
        {/* Ad Banner between sections */}
        <div className="flex justify-center py-4">
          <AdBanner />
        </div>

        <section id="features" className="py-20 sm:py-28 bg-muted/30">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-14">
              <Badge variant="outline" className="mb-4 rounded-full border-indigo-200 text-indigo-600">
                Everything you need
              </Badge>
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Built for Manga Readers
              </h2>
              <p className="mt-3 text-muted-foreground">
                Powerful features that handle the quirks of comic and manga translation.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="rounded-2xl shadow-sm bg-card border-0 transition-shadow hover:shadow-md"
                >
                  <CardHeader>
                    <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-2xl ring-1 ring-indigo-100">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-sm font-semibold">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats ────────────────────────────────────────────────────────── */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-14">
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Trusted by Manga Fans Worldwide
              </h2>
              <p className="mt-3 text-muted-foreground">
                Numbers that speak for themselves.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
              {stats.map((stat) => (
                <Card
                  key={stat.label}
                  className="rounded-2xl shadow-sm bg-card border-0 text-center"
                >
                  <CardContent className="py-6">
                    <p className="font-heading text-4xl font-bold text-indigo-600">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────────────────── */}
        <section className="py-20 sm:py-28 bg-muted/30">
          <div className="mx-auto max-w-3xl px-6 text-center">
            {/* Decorative emoji */}
            <div className="mb-5 text-5xl" aria-hidden="true">📖✨</div>

            <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Ready to translate your favorite manga?
            </h2>
            <p className="mt-4 text-muted-foreground sm:text-lg leading-relaxed">
              No account required. Just upload a page and get a translation in
              seconds — completely free.
            </p>

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/translate">
                <Button
                  size="lg"
                  className="h-11 rounded-full bg-indigo-600 px-10 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-200"
                >
                  Start Translating Free
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground">
                No credit card &bull; No sign-up required
              </p>
            </div>

            {/* Language chips */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {["🇯🇵 Japanese", "🇰🇷 Korean", "🇨🇳 Chinese", "🇺🇸 English", "🇪🇸 Spanish", "🇫🇷 French", "+ 44 more"].map(
                (lang) => (
                  <Badge key={lang} variant="secondary" className="rounded-full px-3 py-1 text-xs">
                    {lang}
                  </Badge>
                )
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Adsterra Social Bar */}
      <AdSocialBar />

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-border/60 bg-background py-8">
        <div className="mx-auto max-w-6xl px-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span aria-hidden="true">📖</span>
            <span className="font-medium text-foreground">CartoonTranslator</span>
          </div>
          <p>© {new Date().getFullYear()} CartoonTranslator. Free to use.</p>
          <div className="flex items-center gap-4">
            <Link href="/translate" className="hover:text-foreground transition-colors">
              Translate
            </Link>
            <Link href="#features" className="hover:text-foreground transition-colors">
              Features
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
