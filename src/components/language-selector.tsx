"use client";

import * as React from "react";
import { useI18n, LOCALE_NAMES, Locale } from "@/lib/i18n/TranslationContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlobeIcon } from "lucide-react";

const LOCALES = Object.keys(LOCALE_NAMES) as Locale[];

export function LanguageSelector() {
  const { locale, setLocale } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Select language"
      >
        <GlobeIcon className="size-4" />
        <span className="hidden sm:inline text-xs font-medium">
          {LOCALE_NAMES[locale]}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LOCALES.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => setLocale(loc)}
            className={loc === locale ? "font-semibold" : ""}
          >
            {LOCALE_NAMES[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
