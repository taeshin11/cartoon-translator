import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog - CartoonTranslator | Manga Translation Tips",
  description:
    "Learn how to translate manga online, compare the best manga translator tools, and explore how AI reads Japanese vertical text. Tips and guides from CartoonTranslator.",
  openGraph: {
    title: "Blog - CartoonTranslator | Manga Translation Tips",
    description:
      "Guides and tips on manga translation, OCR tools, and how CartoonTranslator works.",
    url: "https://cartoontranslator.com/blog",
    siteName: "CartoonTranslator",
    type: "website",
  },
};

const posts = [
  {
    slug: "how-to-translate-manga-online-free",
    title: "How to Translate Manga Online Free in 2026",
    excerpt:
      "A complete guide to translating raw manga chapters without spending a penny — covering tools, workflow tips, and why AI-powered OCR has become the go-to method.",
    date: "2026-03-18",
    badge: "Guide",
  },
  {
    slug: "best-manga-translator-tools",
    title: "5 Best Manga Translator Tools Compared",
    excerpt:
      "We tested five popular manga translation tools side-by-side on accuracy, speed, language support, and price. Here's how they stack up in 2026.",
    date: "2026-03-25",
    badge: "Comparison",
  },
  {
    slug: "japanese-vertical-text-ocr",
    title: "Japanese Vertical Text OCR: How AI Reads Manga",
    excerpt:
      "Tategumi — vertical Japanese writing — has tripped up OCR engines for decades. Learn how modern AI models like PaddleOCR finally cracked the problem.",
    date: "2026-04-01",
    badge: "Deep Dive",
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Blog
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Manga Translation Guides
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Tips, tool comparisons, and deep dives into how AI-powered manga translation works.
          </p>
        </div>

        {/* Post grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <Card className="h-full bg-card transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between">
                    <Badge variant="secondary" className="rounded-full text-xs">
                      {post.badge}
                    </Badge>
                    <time
                      dateTime={post.date}
                      className="text-xs text-muted-foreground"
                    >
                      {formatDate(post.date)}
                    </time>
                  </div>
                  <CardTitle className="text-base font-semibold leading-snug group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {post.excerpt}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
