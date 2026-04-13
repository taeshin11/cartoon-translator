"use client";

import { useT } from "@/lib/i18n/TranslationContext";

const STEP_KEYS = [
  { number: "01", titleKey: "about.step1.title", descKey: "about.step1.description" },
  { number: "02", titleKey: "about.step2.title", descKey: "about.step2.description" },
  { number: "03", titleKey: "about.step3.title", descKey: "about.step3.description" },
  { number: "04", titleKey: "about.step4.title", descKey: "about.step4.description" },
];

const TECH_STACK_KEYS = [
  { labelKey: "about.tech.ocr", value: "PaddleOCR (PP-OCRv4)" },
  { labelKey: "about.tech.translation", value: "LLM with manga-aware prompting" },
  { labelKey: "about.tech.framework", value: "Next.js 16 App Router" },
  { labelKey: "about.tech.styling", value: "Tailwind CSS v4" },
  { labelKey: "about.tech.hosting", value: "Vercel Edge Network" },
  { labelKey: "about.tech.imageProcessing", value: "Sharp" },
];

export default function AboutPage() {
  const t = useT();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">

        {/* Hero */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            {t("about.subtitle")}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t("about.title1")}
            <br />
            {t("about.title2")}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {t("about.intro")}
          </p>
        </div>

        {/* How it works */}
        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
            {t("about.howItWorks.title")}
          </h2>

          <div className="space-y-4">
            {STEP_KEYS.map((step) => (
              <div
                key={step.number}
                className="flex gap-5 rounded-2xl bg-card px-6 py-5 ring-1 ring-foreground/10 shadow-sm"
              >
                <span className="mt-0.5 flex-shrink-0 text-2xl font-bold tabular-nums text-primary/30">
                  {step.number}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{t(step.titleKey)}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {t(step.descKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech stack */}
        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
            {t("about.techStack.title")}
          </h2>

          <div className="rounded-2xl bg-card ring-1 ring-foreground/10 shadow-sm overflow-hidden">
            {TECH_STACK_KEYS.map((item, index) => (
              <div
                key={item.labelKey}
                className={`flex items-center justify-between px-6 py-4 text-sm ${
                  index < TECH_STACK_KEYS.length - 1
                    ? "border-b border-border"
                    : ""
                }`}
              >
                <span className="font-medium text-muted-foreground">
                  {t(item.labelKey)}
                </span>
                <span className="font-semibold text-foreground">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy */}
        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
            {t("about.philosophy.title")}
          </h2>

          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>{t("about.philosophy.p1")}</p>
            <p>{t("about.philosophy.p2")}</p>
            <p>{t("about.philosophy.p3")}</p>
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-card px-6 py-10 text-center ring-1 ring-foreground/10 shadow-sm sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-semibold text-foreground">{t("about.cta.title")}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("about.cta.subtitle")}
            </p>
          </div>
          <a
            href="/translate"
            className="inline-block flex-shrink-0 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            {t("about.cta.button")}
          </a>
        </div>
      </div>
    </div>
  );
}
