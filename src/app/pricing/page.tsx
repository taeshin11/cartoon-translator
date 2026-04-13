"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Check } from "lucide-react"

const FREE_FEATURES = [
  "Unlimited pages",
  "30+ languages",
  "Smart text replacement",
  "Side-by-side comparison",
  "Editable translations",
  "Batch upload (up to 20 pages)",
  "Re-render edited translations",
  "No account required",
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">📖</span>
            <span className="font-semibold text-base tracking-tight text-foreground">
              CartoonTranslator
            </span>
          </Link>
          <nav className="flex items-center gap-3">
            <Link href="/translate">
              <Button size="sm" variant="outline" className="rounded-full px-4">
                Translate
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 py-16 px-4">
        <div className="mx-auto max-w-5xl">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Free. Forever.
            </h1>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
              CartoonTranslator is completely free with no limits. No account, no credit card, no subscription needed.
            </p>
          </div>

          {/* Single free plan */}
          <div className="flex justify-center">
            <Card className="rounded-2xl border-2 border-indigo-300 max-w-sm w-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Free</CardTitle>
                <CardDescription>Everything you need, always free</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">$0</span>
                  <span className="text-muted-foreground ml-1">/forever</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/translate" className="block">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                    Start Translating
                  </Button>
                </Link>
                <ul className="space-y-2.5">
                  {FREE_FEATURES.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="size-4 text-indigo-600 mt-0.5 shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-background py-6">
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} CartoonTranslator</span>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link href="/translate" className="hover:text-foreground transition-colors">Translate</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
