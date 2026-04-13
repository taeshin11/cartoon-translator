"use client";

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
import { useT } from "@/lib/i18n/TranslationContext";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const t = useT();

  const features = [
    {
      icon: "🈯",
      titleKey: "home.features.f1.title",
      descKey: "home.features.f1.description",
    },
    {
      icon: "🌐",
      titleKey: "home.features.f2.title",
      descKey: "home.features.f2.description",
    },
    {
      icon: "📚",
      titleKey: "home.features.f3.title",
      descKey: "home.features.f3.description",
    },
    {
      icon: "🎨",
      titleKey: "home.features.f4.title",
      descKey: "home.features.f4.description",
    },
    {
      icon: "✏️",
      titleKey: "home.features.f5.title",
      descKey: "home.features.f5.description",
    },
    {
      icon: "🔍",
      titleKey: "home.features.f6.title",
      descKey: "home.features.f6.description",
    },
  ];

  const steps = [
    {
      number: "01",
      icon: "⬆️",
      titleKey: "home.howItWorks.step1.title",
      descKey: "home.howItWorks.step1.description",
    },
    {
      number: "02",
      icon: "🤖",
      titleKey: "home.howItWorks.step2.title",
      descKey: "home.howItWorks.step2.description",
    },
    {
      number: "03",
      icon: "⬇️",
      titleKey: "home.howItWorks.step3.title",
      descKey: "home.howItWorks.step3.description",
    },
  ];

  const stats = [
    { value: "50", labelKey: "home.stats.s1.label" },
    { value: "35+", labelKey: "home.stats.s2.label" },
    { value: "Free", labelKey: "home.stats.s3.label" },
    { value: "95%+", labelKey: "home.stats.s4.label" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-24 flex justify-center"
        >
          <div className="h-[500px] w-[900px] rounded-full bg-indigo-400/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <div className="mb-6 flex justify-center">
            <Badge variant="outline" className="gap-1.5 rounded-full px-3 py-1 text-xs font-medium border-indigo-200 text-indigo-600">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
              {t("home.hero.badge")}
            </Badge>
          </div>

          <h1 className="mx-auto max-w-3xl text-4xl font-heading font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t("home.hero.title1")}{" "}
            <span className="text-indigo-600">{t("home.hero.title2")}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("home.hero.description")}
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/translate">
              <Button
                size="lg"
                className="h-11 rounded-full bg-indigo-600 px-8 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-200"
              >
                {t("home.hero.ctaStart")}
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button
                variant="outline"
                size="lg"
                className="h-11 rounded-full px-8 text-sm font-medium"
              >
                {t("home.hero.ctaHow")}
              </Button>
            </Link>
          </div>

          {/* Mock preview */}
          <div className="mt-16 mx-auto max-w-4xl">
            <div className="rounded-2xl ring-1 ring-border shadow-xl shadow-foreground/5 overflow-hidden bg-card">
              <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <span className="ml-3 text-xs text-muted-foreground">
                  {t("home.hero.previewLabel")}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
                <div className="relative flex flex-col items-center justify-center gap-4 bg-muted/20 p-8 min-h-[240px]">
                  <span className="absolute top-3 left-3">
                    <Badge variant="secondary" className="text-[10px] tracking-wide uppercase">{t("home.hero.original")}</Badge>
                  </span>
                  <div className="w-full max-w-[180px] space-y-3 opacity-70">
                    <div className="h-24 rounded-lg bg-muted animate-pulse" />
                    <div className="mx-auto h-5 w-3/4 rounded bg-muted animate-pulse" />
                    <div className="mx-auto h-5 w-1/2 rounded bg-muted animate-pulse" />
                  </div>
                  <div className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm">
                    なるほど！すごい！
                  </div>
                </div>

                <div className="relative flex flex-col items-center justify-center gap-4 bg-indigo-50/40 p-8 min-h-[240px]">
                  <span className="absolute top-3 left-3">
                    <Badge className="text-[10px] tracking-wide uppercase bg-indigo-600">{t("home.hero.translated")}</Badge>
                  </span>
                  <div className="w-full max-w-[180px] space-y-3 opacity-70">
                    <div className="h-24 rounded-lg bg-indigo-100 animate-pulse" />
                    <div className="mx-auto h-5 w-3/4 rounded bg-indigo-100 animate-pulse" />
                    <div className="mx-auto h-5 w-1/2 rounded bg-indigo-100 animate-pulse" />
                  </div>
                  <div className="rounded-xl border border-indigo-200 bg-card px-4 py-2 text-sm font-medium shadow-sm text-indigo-700">
                    I see! Amazing!
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              {t("home.hero.previewCaption")}
            </p>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 rounded-full border-indigo-200 text-indigo-600">
              {t("home.howItWorks.badge")}
            </Badge>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {t("home.howItWorks.title")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("home.howItWorks.subtitle")}
            </p>
          </div>

          <div className="relative grid gap-6 sm:grid-cols-3">
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
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-md shadow-indigo-200">
                    {step.number}
                  </div>
                  <div className="mb-1 text-3xl" aria-hidden="true">
                    {step.icon}
                  </div>
                  <CardTitle className="text-base font-semibold">
                    {t(step.titleKey)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-1">
                  <CardDescription className="text-sm leading-relaxed">
                    {t(step.descKey)}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ad Banner ──────────────────────────────────────────────────── */}
      <div className="flex justify-center py-4">
        <AdBanner />
      </div>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section id="features" className="py-20 sm:py-28 bg-muted/30">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 rounded-full border-indigo-200 text-indigo-600">
              {t("home.features.badge")}
            </Badge>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {t("home.features.title")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("home.features.subtitle")}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.titleKey}
                className="rounded-2xl shadow-sm bg-card border-0 transition-shadow hover:shadow-md"
              >
                <CardHeader>
                  <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-2xl ring-1 ring-indigo-100">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-sm font-semibold">
                    {t(feature.titleKey)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm leading-relaxed">
                    {t(feature.descKey)}
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
              {t("home.stats.title")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("home.stats.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {stats.map((stat) => (
              <Card
                key={stat.labelKey}
                className="rounded-2xl shadow-sm bg-card border-0 text-center"
              >
                <CardContent className="py-6">
                  <p className="font-heading text-4xl font-bold text-indigo-600">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t(stat.labelKey)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 text-5xl" aria-hidden="true">📖✨</div>

          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t("home.cta.title")}
          </h2>
          <p className="mt-4 text-muted-foreground sm:text-lg leading-relaxed">
            {t("home.cta.subtitle")}
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/translate">
              <Button
                size="lg"
                className="h-11 rounded-full bg-indigo-600 px-10 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-200"
              >
                {t("home.cta.button")}
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground">
              {t("home.cta.noSignup")}
            </p>
          </div>

          {/* Language chips */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {[
              "🇯🇵 Japanese", "🇰🇷 Korean", "🇨🇳 Chinese", "🇺🇸 English",
              "🇪🇸 Spanish", "🇫🇷 French", "🇩🇪 German", "🇧🇷 Portuguese",
              "🇮🇹 Italian", "🇷🇺 Russian", "🇹🇭 Thai", "🇻🇳 Vietnamese",
              "+ 23 more",
            ].map((lang) => (
              <Badge key={lang} variant="secondary" className="rounded-full px-3 py-1 text-xs">
                {lang}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <AdSocialBar />

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-border/60 bg-background py-8">
        <div className="mx-auto max-w-6xl px-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span aria-hidden="true">📖</span>
            <span className="font-medium text-foreground">{t("nav.appName")}</span>
          </div>
          <p>&copy; {new Date().getFullYear()} {t("nav.appName")}. {t("footer.freeToUse")}</p>
          <div className="flex items-center gap-4">
            <Link href="/translate" className="hover:text-foreground transition-colors">
              {t("nav.translate")}
            </Link>
            <Link href="#features" className="hover:text-foreground transition-colors">
              {t("home.features.title")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
