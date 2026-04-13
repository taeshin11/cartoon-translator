"use client"

import * as React from "react"
import Link from "next/link"
import { MenuIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { LanguageSelector } from "@/components/language-selector"
import { useT } from "@/lib/i18n/TranslationContext"

export function Navbar() {
  const t = useT()
  const [open, setOpen] = React.useState(false)

  const navLinks = [
    { href: "/", labelKey: "nav.home" },
    { href: "/translate", labelKey: "nav.translate" },
    { href: "/faq", labelKey: "nav.faq" },
    { href: "/blog", labelKey: "nav.blog" },
    { href: "/about", labelKey: "nav.about" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo / App name */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-colors"
        >
          <span className="text-lg">{t("nav.appName")}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {t(link.labelKey)}
            </Link>
          ))}
          <LanguageSelector />
        </nav>

        {/* Mobile: language selector + hamburger */}
        <div className="md:hidden flex items-center gap-1">
          <LanguageSelector />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Open menu" />
              }
            >
              <MenuIcon className="size-5" />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>{t("nav.appName")}</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1 px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    {t(link.labelKey)}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
