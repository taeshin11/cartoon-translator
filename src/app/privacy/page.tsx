import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Privacy Policy — CartoonTranslator",
  description: "Privacy policy for CartoonTranslator web app and Chrome extension.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">📖</span>
            <span className="font-semibold text-base tracking-tight text-foreground">
              CartoonTranslator
            </span>
          </Link>
          <Link href="/translate" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Start Translating
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-10">
          <Badge variant="outline" className="mb-4 rounded-full border-indigo-200 text-indigo-600">
            Legal
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: April 3, 2026
          </p>
        </div>

        <div className="prose prose-sm max-w-none space-y-8 text-foreground">

          <section>
            <h2 className="text-lg font-semibold mb-3">1. Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              CartoonTranslator (&quot;we&quot;, &quot;our&quot;, &quot;the service&quot;) provides a web application and
              Chrome browser extension for translating text in manga, comics, and webtoon images.
              This Privacy Policy explains what data we collect, how we use it, and your rights.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">2. Data We Collect</h2>

            <h3 className="text-sm font-semibold mt-4 mb-2 text-foreground">2a. Images You Upload</h3>
            <p className="text-muted-foreground leading-relaxed">
              When you use CartoonTranslator (web or extension), your images are sent to our
              translation API for processing. <strong className="text-foreground">We do not store your images.</strong> Images
              are processed in memory and immediately discarded after the translation response
              is returned to you. We never save, index, or share your images.
            </p>

            <h3 className="text-sm font-semibold mt-4 mb-2 text-foreground">2b. Usage Analytics</h3>
            <p className="text-muted-foreground leading-relaxed">
              We log anonymous metadata per translation request, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1 ml-2">
              <li>Timestamp of the request</li>
              <li>Source and target language pair selected</li>
              <li>Number of text blocks detected</li>
              <li>Browser User-Agent string (anonymized)</li>
              <li>Referring page URL (anonymized)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-2">
              This data is stored in Google Sheets via an Apps Script webhook solely for
              usage analytics. No personally identifiable information (PII) is collected.
            </p>

            <h3 className="text-sm font-semibold mt-4 mb-2 text-foreground">2c. Extension Storage</h3>
            <p className="text-muted-foreground leading-relaxed">
              The Chrome extension stores your language preferences (source and target language)
              locally using Chrome&apos;s <code className="bg-muted px-1 rounded text-xs">chrome.storage.sync</code> API.
              This data stays on your device and synced to your Chrome profile. We do not
              access or transmit this data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">3. Third-Party Services</h2>
            <div className="space-y-3">
              {[
                {
                  name: "OCR.space",
                  purpose: "Optical character recognition (text extraction from images)",
                  privacy: "https://ocr.space/privacy",
                  note: "Images are sent to OCR.space for text detection. Their privacy policy applies.",
                },
                {
                  name: "MyMemory Translation API",
                  purpose: "Machine translation of extracted text",
                  privacy: "https://mymemory.translated.net/",
                  note: "Extracted text (not images) is sent for translation.",
                },
                {
                  name: "Vercel",
                  purpose: "Hosting and edge infrastructure",
                  privacy: "https://vercel.com/legal/privacy-policy",
                  note: "Standard server logs (IP, request metadata) per Vercel's policy.",
                },
              ].map((s) => (
                <div key={s.name} className="rounded-lg border bg-muted/20 p-4">
                  <p className="text-sm font-semibold text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.purpose}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">4. Chrome Extension — Permissions</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The CartoonTranslator Chrome extension requests the following permissions:
            </p>
            <div className="space-y-2">
              {[
                {
                  perm: "Read and change data on all websites",
                  why: "Required to detect images on any manga/comic website and inject the translate button overlay. The extension only activates when you hover over an image and click Translate — it does not read, modify, or transmit any page content automatically.",
                },
                {
                  perm: "Storage",
                  why: "To save your language preferences (e.g., Japanese → Korean) so they persist across browser sessions.",
                },
              ].map((p) => (
                <div key={p.perm} className="rounded-lg border bg-muted/20 p-4">
                  <p className="text-sm font-semibold text-foreground">{p.perm}</p>
                  <p className="text-xs text-muted-foreground mt-1"><span className="font-medium">Why:</span> {p.why}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">5. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              Images are never stored — they are processed in-memory only and discarded immediately.
              Anonymous usage logs (language pair, timestamp) are retained for up to 12 months
              for analytics purposes. Extension preferences are stored locally until you uninstall
              the extension or clear Chrome storage.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">6. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              CartoonTranslator is not directed at children under 13. We do not knowingly collect
              data from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">7. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this policy periodically. The &quot;Last updated&quot; date at the top
              reflects the most recent revision. Continued use of the service after changes
              constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">8. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              Questions about this privacy policy? Reach out via the{" "}
              <Link href="https://github.com/taeshin11/cartoon-translator" className="text-indigo-600 hover:underline">
                GitHub repository
              </Link>.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-border/60 bg-background py-6 mt-8">
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} CartoonTranslator</span>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link href="/translate" className="hover:text-foreground transition-colors">Translate</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
