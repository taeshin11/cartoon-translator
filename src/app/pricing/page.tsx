"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles, Loader2 } from "lucide-react"

const FREE_FEATURES = [
  "5 pages per day",
  "30+ languages",
  "Smart text replacement",
  "Side-by-side comparison",
  "Editable translations",
  "Batch upload (up to 5 pages)",
  "Ad-supported",
]

const PRO_FEATURES = [
  "Unlimited pages per day",
  "30+ languages",
  "Smart text replacement",
  "Side-by-side comparison",
  "Editable translations",
  "Batch upload (up to 50 pages)",
  "Re-render edited translations",
  "No ads",
  "Priority processing",
  "Early access to new features",
]

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [canceled, setCanceled] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("success") === "true") {
      setSuccess(true)
      // Store pro status
      const sessionId = params.get("session_id")
      if (sessionId) {
        localStorage.setItem("ct_pro", "true")
        localStorage.setItem("ct_session_id", sessionId)
      }
    }
    if (params.get("canceled") === "true") {
      setCanceled(true)
    }
  }, [])

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: billing }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || "Payment system is being set up. Check back soon!")
        setLoading(false)
      }
    } catch {
      alert("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="py-12 space-y-4">
            <div className="text-5xl">🎉</div>
            <h1 className="text-2xl font-bold text-foreground">Welcome to Pro!</h1>
            <p className="text-muted-foreground">
              Your subscription is active. Enjoy unlimited translations with no ads.
            </p>
            <Link href="/translate">
              <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white">
                Start Translating
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

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
            <Badge variant="outline" className="mb-4 rounded-full border-indigo-200 text-indigo-600">
              Simple pricing
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Choose Your Plan
            </h1>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
              Start free with 5 pages per day. Upgrade to Pro for unlimited translations and premium features.
            </p>

            {canceled && (
              <p className="mt-4 text-sm text-amber-600 bg-amber-50 rounded-lg py-2 px-4 inline-block">
                Checkout was canceled. No charges were made.
              </p>
            )}
          </div>

          {/* Billing toggle */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-1 rounded-full bg-muted p-1">
              <button
                onClick={() => setBilling("monthly")}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  billing === "monthly"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  billing === "yearly"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Yearly
                <Badge className="ml-2 bg-green-100 text-green-700 text-[10px]">
                  Save 33%
                </Badge>
              </button>
            </div>
          </div>

          {/* Plans */}
          <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
            {/* Free Plan */}
            <Card className="rounded-2xl border-2 border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Free</CardTitle>
                <CardDescription>Perfect for casual readers</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">$0</span>
                  <span className="text-muted-foreground ml-1">/forever</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/translate" className="block">
                  <Button variant="outline" className="w-full">
                    Get Started Free
                  </Button>
                </Link>
                <ul className="space-y-2.5">
                  {FREE_FEATURES.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="rounded-2xl border-2 border-indigo-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                POPULAR
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  Pro <Sparkles className="size-4 text-indigo-600" />
                </CardTitle>
                <CardDescription>For manga enthusiasts & scanlators</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">
                    ${billing === "monthly" ? "4.99" : "3.33"}
                  </span>
                  <span className="text-muted-foreground ml-1">/month</span>
                  {billing === "yearly" && (
                    <p className="text-xs text-muted-foreground mt-1">
                      $39.99 billed annually
                    </p>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin size-4" />
                      Redirecting...
                    </>
                  ) : (
                    "Upgrade to Pro"
                  )}
                </Button>
                <ul className="space-y-2.5">
                  {PRO_FEATURES.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="size-4 text-indigo-600 mt-0.5 shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* FAQ */}
          <div className="mt-16 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Can I cancel anytime?",
                  a: "Yes! Cancel your subscription at any time. You'll keep Pro access until the end of your billing period.",
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept all major credit/debit cards through Stripe's secure payment system.",
                },
                {
                  q: "What happens when I hit the free limit?",
                  a: "You'll see an upgrade prompt. Your existing translations are always available — you just can't translate new pages until the next day or until you upgrade.",
                },
                {
                  q: "Is my payment information secure?",
                  a: "Absolutely. All payments are processed by Stripe. We never see or store your card details.",
                },
              ].map((faq) => (
                <details key={faq.q} className="group rounded-lg border bg-card p-4">
                  <summary className="cursor-pointer text-sm font-medium text-foreground list-none flex items-center justify-between">
                    {faq.q}
                    <span className="text-muted-foreground group-open:rotate-45 transition-transform text-lg">+</span>
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
                </details>
              ))}
            </div>
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
