import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - CartoonTranslator",
  description:
    "Learn about CartoonTranslator — a free, open-source manga and comic translation tool built with PaddleOCR and AI. Built for manga fans, by manga fans.",
};

const steps = [
  {
    number: "01",
    title: "Upload a page",
    description:
      "Drop in any PNG, JPEG, or WebP scan of your manga or comic. Works with raw raws, scanlation pages, and phone camera shots.",
  },
  {
    number: "02",
    title: "OCR detects the text",
    description:
      "PaddleOCR — a state-of-the-art open-source engine — locates every speech bubble, thought box, and sound effect on the page and extracts the text with high precision.",
  },
  {
    number: "03",
    title: "AI translates in context",
    description:
      "A large language model receives the extracted text along with positional context so it understands reading order and narrative flow, producing natural translations instead of robotic word-for-word output.",
  },
  {
    number: "04",
    title: "Rendered back onto the panel",
    description:
      "The translated text is composited back over the original bubbles, giving you a clean, readable page — no copy-pasting required.",
  },
];

const techStack = [
  { label: "OCR engine", value: "PaddleOCR (PP-OCRv4)" },
  { label: "Translation", value: "LLM with manga-aware prompting" },
  { label: "Framework", value: "Next.js 16 App Router" },
  { label: "Styling", value: "Tailwind CSS v4" },
  { label: "Hosting", value: "Vercel Edge Network" },
  { label: "Image processing", value: "Sharp" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">

        {/* Hero */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            About the project
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Built for manga fans,
            <br />
            by manga fans.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            CartoonTranslator started as a weekend experiment to scratch a
            personal itch: reading untranslated manga chapters the same day they
            drop in Japan. It grew into a proper tool — and now it&apos;s free
            for everyone.
          </p>
        </div>

        {/* How it works */}
        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
            How it works
          </h2>

          <div className="space-y-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex gap-5 rounded-2xl bg-card px-6 py-5 ring-1 ring-foreground/10 shadow-sm"
              >
                <span className="mt-0.5 flex-shrink-0 text-2xl font-bold tabular-nums text-primary/30">
                  {step.number}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech stack */}
        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
            Tech stack
          </h2>

          <div className="rounded-2xl bg-card ring-1 ring-foreground/10 shadow-sm overflow-hidden">
            {techStack.map((item, index) => (
              <div
                key={item.label}
                className={`flex items-center justify-between px-6 py-4 text-sm ${
                  index < techStack.length - 1
                    ? "border-b border-border"
                    : ""
                }`}
              >
                <span className="font-medium text-muted-foreground">
                  {item.label}
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
            Philosophy
          </h2>

          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Professional localisation is an art form — it takes talented
              translators, letterers, and editors months of work per volume.
              CartoonTranslator is not a replacement for that; it&apos;s a
              reading aid for fans who want to follow ongoing series or explore
              titles that may never receive an official release.
            </p>
            <p>
              We believe tools like this should be free, fast, and
              privacy-respecting. Your images are never stored beyond the
              lifetime of a request, no account is required, and the code is
              open source.
            </p>
            <p>
              If you enjoy the project, consider supporting the official English
              releases of the manga you love — your purchases fund the creators
              who make this art possible.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-card px-6 py-10 text-center ring-1 ring-foreground/10 shadow-sm sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-semibold text-foreground">Ready to translate?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              No sign-up required. Just drop in a page.
            </p>
          </div>
          <a
            href="/translate"
            className="inline-block flex-shrink-0 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Try it free
          </a>
        </div>
      </div>
    </div>
  );
}
