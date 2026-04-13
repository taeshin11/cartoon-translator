"use client";

import { useT } from "@/lib/i18n/TranslationContext";

const FAQ_KEYS = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q2", a: "faq.a2" },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
  { q: "faq.q5", a: "faq.a5" },
  { q: "faq.q6", a: "faq.a6" },
  { q: "faq.q7", a: "faq.a7" },
  { q: "faq.q8", a: "faq.a8" },
];

export default function FAQPage() {
  const t = useT();

  const faqs = FAQ_KEYS.map((k) => ({
    question: t(k.q),
    answer: t(k.a),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t("faq.title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("faq.subtitle")}
          </p>
        </div>

        {/* FAQ accordion using native details/summary */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-2xl bg-card ring-1 ring-foreground/10 shadow-sm open:shadow-md transition-shadow duration-200"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-medium text-foreground select-none">
                <span>{faq.question}</span>
                {/* Chevron icon — rotates when open */}
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </summary>

              <div className="px-6 pb-5 pt-1 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-14 rounded-2xl bg-card px-6 py-8 text-center ring-1 ring-foreground/10 shadow-sm">
          <p className="text-base font-medium text-foreground">
            {t("faq.cta.title")}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("faq.cta.subtitle")}
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            {t("faq.cta.button")}
          </a>
        </div>
      </div>
    </div>
  );
}
