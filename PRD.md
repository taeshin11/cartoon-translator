# PRD: CartoonTranslator v2 — AI-Powered Manga & Comic Translation Service

## Overview

CartoonTranslator is a freemium web application that uses AI (OCR + Translation) to automatically detect and translate dialogue text in manga, comics, and webtoons. Users upload comic page images, select source/target languages, and receive translated images with text replaced in-place — preserving the original art style and speech bubble layout.

**v2 focus:** Natural text replacement (smart inpainting), freemium monetization, expanded language support.

---

## Competitive Landscape

| Competitor | Approach | Pricing | Weaknesses |
|-----------|----------|---------|------------|
| manga-image-translator (open source) | Full pipeline: detect+OCR+inpaint+translate | Free (self-host) | Requires technical setup |
| Google Lens | Overlay translation on photos | Free | No inpainting, poor fit |
| Various web apps (mangat.app etc.) | Freemium OCR+translate+render | $5-15/mo | Low quality inpainting |
| Manual scanlation (DeepL + Photoshop) | Human typesetting | Free tools | Extremely slow, manual |

**Our edge:** Web-based (no install), smart bubble-aware inpainting, freemium with generous free tier, 30+ languages, batch processing.

---

## Tech Stack

| Layer | Technology | Cost |
|-------|-----------|------|
| Frontend | Next.js 16 (App Router) + Tailwind CSS v4 + shadcn/ui | Free |
| Backend API | Next.js API Routes (Vercel) + FastAPI (Railway) for OCR | Free |
| OCR | PaddleOCR (Python, hosted on Railway) + OCR.space (fallback) | Free |
| Translation | MyMemory API (free tier, 30+ languages) | Free |
| Image Processing | Sharp (Node.js) — smart background-aware text replacement | Free |
| Hosting | Vercel (auto-deploy from GitHub) | Free |
| Server | Railway free tier (PaddleOCR) | Free |
| Payments | Stripe Checkout (subscription billing) | 2.9% + 30c |
| Data Collection | Google Sheets + Apps Script webhook | Free |
| Ads | Adsterra (banner, native, social bar — free tier only) | Revenue |
| Analytics | Visitor counter via in-memory | Free |

## Architecture

```
[User Browser]
    |
    v
[Vercel: Next.js Frontend + API Routes]
    |
    |---> [Railway: PaddleOCR FastAPI Server]
    |         - Receives image -> returns detected text + bounding boxes
    |         - Supports: Japanese vertical text, manga fonts
    |
    |---> [MyMemory Free Translation API]
    |         - 30+ language pairs
    |
    |---> [Stripe Checkout]
    |         - Pro subscription ($4.99/mo or $39.99/yr)
    |         - License key validation
    |
    |---> [Google Sheets via Apps Script Webhook]
    |         - Logs every translation request
    |
    +---> [In-memory visitor counter]
```

## Monetization Model

### Free Tier
- 5 pages per day
- Ads displayed (Adsterra banner, native, social bar)
- Standard quality reconstruction
- 30+ target languages
- Batch upload (up to 5 pages)
- Side-by-side comparison
- Editable translations

### Pro Tier ($4.99/month or $39.99/year)
- Unlimited pages per day
- No ads
- High quality reconstruction (better font rendering)
- Priority processing
- Batch upload (up to 50 pages)
- Re-render with edited translations
- Download all as ZIP
- Early access to new features

### Revenue Streams
1. **Stripe subscriptions** — Pro tier recurring revenue
2. **Adsterra ads** — Free tier ad impressions
3. **Future:** API access for developers, enterprise/white-label

---

## v2 Milestones

### Milestone 5: Smart Inpainting & Text Replacement
- Background-color-aware fill (sample bubble color, not just white)
- Multi-line text wrapping for long translations
- Language-specific font families (CJK vs Latin)
- Adaptive font sizing with proper padding
- Re-render from edited translation blocks

### Milestone 6: Expanded Language Support
- 30+ target languages (fulfill marketing claim)
- Proper language code mapping for OCR + translation

### Milestone 7: Freemium Model & Payments
- Daily usage tracking (server-side cookie + localStorage)
- Usage limit enforcement (5 pages/day free)
- /pricing page with Free vs Pro comparison
- Stripe Checkout integration (monthly + annual plans)
- License key system for Pro access
- Ads shown only for free-tier users
- Upgrade prompts when daily limit reached

### Milestone 8: Landing Page & UX Polish
- Updated messaging for freemium model
- Pricing link in navigation
- Pro badge for upgraded users
- Updated feature cards reflecting tiers

---

## Constraints

1. ~~$0 budget~~ Minimal budget — Stripe processing fees only cost
2. No GitHub username exposure — All public links use Vercel .vercel.app domain
3. Automation first — If it can be solved via CLI, automate it
4. Privacy — Do not store uploaded images on server. Process in-memory then discard.
5. Stripe keys needed as env vars for payment processing

## Environment Variables (v2)

```env
# OCR
NEXT_PUBLIC_OCR_API_URL=          # PaddleOCR Railway URL
OCR_SPACE_API_KEY=                # OCR.space API key

# Translation
NEXT_PUBLIC_TRANSLATION_API_URL=  # MyMemory API

# Payments
STRIPE_SECRET_KEY=                # Stripe secret key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY= # Stripe publishable key
STRIPE_PRICE_MONTHLY=             # Stripe price ID for monthly plan
STRIPE_PRICE_YEARLY=              # Stripe price ID for yearly plan
STRIPE_WEBHOOK_SECRET=            # Stripe webhook signing secret

# Ads
NEXT_PUBLIC_ADSTERRA_BANNER_KEY=
NEXT_PUBLIC_ADSTERRA_NATIVE_KEY=
NEXT_PUBLIC_ADSTERRA_SOCIAL_KEY=

# Analytics
NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL=
```

*This PRD is the single source of truth.*
