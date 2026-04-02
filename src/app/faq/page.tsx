import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - CartoonTranslator",
  description:
    "Frequently asked questions about CartoonTranslator — the free AI-powered manga and comic translation tool. Learn about supported languages, file formats, accuracy, and privacy.",
};

const faqs = [
  {
    question: "What is CartoonTranslator?",
    answer:
      "CartoonTranslator is a free, AI-powered web app that translates manga, manhwa, manhua, and other comics. Upload a page image and we'll detect all the speech bubbles using PaddleOCR, then translate the text into your chosen language — leaving you a clean, readable panel in seconds.",
  },
  {
    question: "What languages are supported?",
    answer:
      "We currently support translation from Japanese, Chinese (Simplified & Traditional), and Korean as source languages. Output languages include English, Spanish, French, German, Portuguese, Italian, and more. We're actively expanding the list — check the translator page for the full up-to-date selection.",
  },
  {
    question: "Is it really free?",
    answer:
      "Yes, completely free. CartoonTranslator is a passion project built for manga fans. There are no paywalls, no credit systems, and no sign-up required. The site is ad-supported to cover server costs, but core translation is always free.",
  },
  {
    question: "How accurate is the translation?",
    answer:
      "Accuracy depends on image quality and the source language. For clear, high-resolution scans of Japanese or Chinese manga, you can expect very natural translations. Handwritten or stylised fonts are harder for OCR and may occasionally produce errors. We recommend reviewing panel-by-panel for critical reading.",
  },
  {
    question: "What file formats are supported?",
    answer:
      "CartoonTranslator accepts PNG, JPEG/JPG, and WebP images. For best results upload images at 1500 px or wider. PDF support is on the roadmap. Each upload is processed as a single page.",
  },
  {
    question: "Can I translate entire manga volumes?",
    answer:
      "Currently the tool works on a page-by-page basis. Batch upload for entire chapters or volumes is a planned feature. In the meantime, you can upload pages one at a time — each processes in under 10 seconds.",
  },
  {
    question: "How does the AI OCR work?",
    answer:
      "We use PaddleOCR — an open-source, state-of-the-art OCR engine — to detect and extract text from speech bubbles, thought boxes, and sound effects. The extracted text is then passed to a large language model that understands manga context, slang, and honorifics to produce a natural translation.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Your images are processed server-side only for the duration of the translation request and are not stored permanently. We do not share your uploads with third parties. No account is required, so no personal data is collected. See our privacy policy for full details.",
  },
];

export default function FAQPage() {
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
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about CartoonTranslator.
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
            Still have questions?
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Open an issue on GitHub or reach out — we read everything.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            GitHub Issues
          </a>
        </div>
      </div>
    </div>
  );
}
