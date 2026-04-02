# PRD: CartoonTranslator — AI-Powered Manga & Comic Translation Service

## Overview

CartoonTranslator is a web application that uses AI (OCR + Translation) to automatically detect and translate dialogue text in manga, comics, and webtoons. Users upload comic page images, select source/target languages, and receive translated images with text replaced in-place — preserving the original art style and speech bubble layout.

---

## Tech Stack

| Layer | Technology | Cost |
|-------|-----------|------|
| Frontend | Next.js 14 (App Router) + Tailwind CSS + shadcn/ui | Free |
| Backend API | Next.js API Routes (Vercel) + FastAPI (Railway) for OCR | Free |
| OCR | PaddleOCR (Python, hosted on Railway) — superior CJK/vertical text recognition | Free |
| Translation | LibreTranslate self-hosted on Railway free tier OR MyMemory API (free tier) | Free |
| Image Processing | Sharp (Node.js) + Canvas API | Free |
| Hosting | Vercel (auto-deploy from GitHub) | Free |
| Server | Railway free tier (PaddleOCR + optional LibreTranslate) | Free |
| Data Collection | Google Sheets + Apps Script webhook | Free |
| Ads | Adsterra (banner, native, popunder units) | Revenue |
| Analytics | Visitor counter via Vercel KV (free tier) or in-memory | Free |
| Domain Routing | Vercel auto-generated `.vercel.app` domain (no GitHub username exposure) | Free |

## Architecture

```
[User Browser]
    |
    v
[Vercel: Next.js Frontend + API Routes]
    |
    |---> [Railway: PaddleOCR FastAPI Server]
    |         - Receives image -> returns detected text + bounding boxes
    |         - Supports: Japanese vertical text, manga fonts, sound effects
    |         - CPU-only PaddlePaddle (fits Railway free tier ~512MB)
    |
    |---> [Railway: LibreTranslate] or [MyMemory Free API]
    |         - Receives extracted text -> returns translated text
    |
    |---> [Google Sheets via Apps Script Webhook]
    |         - Logs every translation request automatically
    |
    +---> [Vercel KV / In-memory]
              - Visitor counter (today + total)
```

## Milestones & Git Push Schedule

### Milestone 1: Project Scaffold + Landing Page -> git push + Vercel deploy
### Milestone 2: Core Translation Engine (PaddleOCR + Translation + Image Reconstruction) -> git push + Vercel deploy  
### Milestone 3: Enhanced UX (Batch, Side-by-Side, Edit, History) -> git push + Vercel deploy
### Milestone 4: Growth & SEO (Blog, FAQ structured data, PWA, Adsterra live, Lighthouse 90+) -> git push + Vercel deploy (production)

## Constraints

1. $0 budget — Every service must be on a free tier
2. No GitHub username exposure — All public links use Vercel .vercel.app domain
3. Automation first — If it can be solved via CLI, automate it
4. gcloud is available for Google Cloud auth
5. Privacy — Do not store uploaded images on server. Process in-memory then discard.

*This PRD is the single source of truth.*
