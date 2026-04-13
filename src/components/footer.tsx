"use client"

import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { VisitorCounter } from "@/components/visitor-counter"
import { useT } from "@/lib/i18n/TranslationContext"

export function Footer() {
  const t = useT()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <span className="font-semibold text-foreground">{t("nav.appName")}</span>
            <span className="text-xs text-muted-foreground">
              {t("footer.tagline")}
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              {t("nav.home")}
            </Link>
            <Link href="/translate" className="hover:text-foreground transition-colors">
              {t("nav.translate")}
            </Link>
            <Link href="/blog" className="hover:text-foreground transition-colors">
              {t("nav.blog")}
            </Link>
            <Link href="/faq" className="hover:text-foreground transition-colors">
              {t("nav.faq")}
            </Link>
            <Link href="/about" className="hover:text-foreground transition-colors">
              {t("nav.about")}
            </Link>
          </nav>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} {t("nav.appName")}. {t("footer.allRightsReserved")}
          </p>

          {/* Visitor counter */}
          <VisitorCounter />
        </div>
      </div>
    </footer>
  )
}
