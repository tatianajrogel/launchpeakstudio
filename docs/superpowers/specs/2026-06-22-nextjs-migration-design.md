# Launch Peak Studio → Next.js Production Migration

**Date:** 2026-06-22
**Status:** Approved design
**Owner:** dyllynwilloughby@hotmail.com

## Summary

Migrate the existing "Launch Peak Studio" marketing site from a Vite + React 18
single-page app to **Next.js 15 (App Router) + React 19**, preserving the existing
shadcn/Radix UI and Tailwind design. Add production-grade SEO (server-rendered
metadata, JSON-LD, sitemap, robots, generated OG images), promote each case study
to its own indexable route, replace placeholder brand assets with generated
production assets, and remove unused backend dependencies.

This is an **in-place migration**: the App Router is added around the existing
component code. All source stays under `src/`, so the `@/* → ./src/*` alias keeps
every existing import valid.

## Current State (verified)

- **Stack:** Vite 5 + React 18.3 + TypeScript + Tailwind 3 + shadcn/ui (already Radix-based).
- **Routes:** `react-router-dom` with `/` (landing) and `*` (404).
- **Landing page:** `src/components/AppLayout.tsx` stacks 11 sections (Header, Hero,
  ClientFlow, Services, Work, Process, Reviews, About, Faq, Contact, Footer).
- **Content:** Single source of truth in `src/data/studio.ts` — exports `STUDIO`,
  `SERVICES`, `WORK` (6 case studies w/ slugs), `REVIEWS`, `TEAM`, `CLIENT_FLOW`,
  `PROCESS`, `FAQS`, `STATS`, `WORK_FILTERS`, `BOOKING_URL`, `SUBSCRIBE_URL`.
- **Case studies (`WORK` slugs):** `northwind-fintech`, `summit-saas`,
  `bloom-wellness`, `harbor-commerce`, `atlas-uiux`, `pine-mobile`. Currently opened
  as a client-side modal (`CaseStudy.tsx`) from the `Work` grid — no real URLs.
- **Backend:** None active. `@supabase/supabase-js` and `@tanstack/react-query` are
  installed but unused (no queries, no Supabase imports). `database/database.sql`
  is orphaned. Contact form POSTs client-side to an external famous.ai CRM
  (`SUBSCRIBE_URL`); booking is an external link.
- **Dead code:** `src/contexts/AppContext.tsx` defines `useAppContext` but it is
  **never consumed** → delete.
- **Placeholders:** favicon = `/placeholder.svg`; `index.html` references a
  missing `/og.jpg`. Content images are real external CloudFront URLs
  (`d64gsuwffb70l.cloudfront.net`), not broken.
- **SEO today:** basic `<title>`/OG in `index.html`, permissive `robots.txt`, no
  sitemap, no JSON-LD, client-rendered (no SSR HTML for crawlers).

## Goals

1. Run on Next.js 15 App Router + React 19 with server-rendered HTML.
2. Keep the existing shadcn/Radix components and Tailwind design intact (no visual regression).
3. Production SEO: per-route metadata, JSON-LD, sitemap, robots, OG/Twitter images.
4. Promote each case study to an indexable `/work/[slug]` route.
5. Replace placeholder favicon + social image with generated production assets.
6. Remove unused deps/files for a lean production build.

## Non-Goals

- No Tailwind 4 upgrade (stay on v3 + existing custom tokens).
- No CMS / Supabase wiring (kept removed; contact form stays as the external POST).
- No redesign — visual parity is required.
- No new content writing beyond filling SEO metadata from existing data.

## Target Architecture

### Stack
- **Next.js 15** (App Router), **React 19**, TypeScript.
- **Tailwind 3** (unchanged config + tokens), **shadcn/ui** (`components.json` → `"rsc": true`).
- Deploy target: **Vercel**, fully statically pre-rendered (SSG). The contact form
  keeps posting client-side to famous.ai.

### File layout (all under `src/`; `@/* → ./src/*` unchanged)
```
src/app/
  layout.tsx            server · metadataBase, title template, next/font, <Providers>,
                                 ProfessionalService/Organization JSON-LD
  page.tsx              server · landing page; renders the 11 sections; FAQPage JSON-LD
  providers.tsx         client · ThemeProvider + TooltipProvider + Toaster + Sonner
  not-found.tsx         404 (ported from src/pages/NotFound.tsx, react-router removed)
  work/[slug]/page.tsx  server · generateStaticParams + generateMetadata; CaseStudy content;
                                 CreativeWork JSON-LD
  sitemap.ts            / and every /work/[slug]
  robots.ts             canonical host + sitemap ref (replaces public/robots.txt)
  globals.css           (from src/index.css)
  icon.svg              branded favicon (peak mark, #FF6B5A)
  apple-icon.tsx        generated via next/og (no binary asset)
  opengraph-image.tsx   generated 1200x630 OG image via next/og
  twitter-image.tsx     (re-exports opengraph-image)
src/components/...       unchanged paths; interactive studio/* get "use client"
src/data/studio.ts       unchanged
src/lib/utils.ts, src/hooks/*   unchanged
```

### Server / client split
- **Server components:** `layout`, `page`, `not-found`, `work/[slug]/page`, `sitemap`,
  `robots`, the `*-image`/`icon` generators. These own all metadata + JSON-LD.
- **Client components:** `providers.tsx` plus any `src/components/studio/*` that uses
  hooks/handlers (`Reveal` → IntersectionObserver; `Header` → scroll/menu; `Work` →
  filter state; `Contact` → form state; etc.). Rule: component using
  state/effects/handlers gets `"use client"`. `src/components/ui/*` already carry
  `"use client"` where Radix needs it (verify, add where missing).
- The server `page.tsx` composes the section components directly (no `AppLayout`
  client wrapper needed; `AppLayout` may be inlined or kept as a thin client wrapper).

### Routing changes
- Remove `react-router-dom`, `BrowserRouter`, `src/App.tsx`, `src/main.tsx`, `src/pages/*`.
- `/` → `app/page.tsx`; 404 → `app/not-found.tsx`; **new** `/work/[slug]`.
- `Work` grid: each card becomes a `next/link` to `/work/[slug]` (replacing the
  `onClick`/modal). `CaseStudy.tsx` is refactored from a modal (props `{ item, onClose }`)
  into a presentational component rendered by the route page, with a "Back to work"
  `next/link` replacing the close button. Modal state removed from `Work`.

### SEO infrastructure
- **Metadata:** `metadataBase` + title template + description + canonical + Open Graph
  + Twitter in `layout.tsx`; landing-specific metadata in `page.tsx`;
  `generateMetadata({ params })` per case study (title, description, canonical,
  OG image) in `work/[slug]/page.tsx`.
- **JSON-LD (via `<script type="application/ld+json">`):**
  - `ProfessionalService`/`Organization` in layout — name, logo, location, email, `sameAs`.
  - `FAQPage` built from `FAQS` on the landing page.
  - `CreativeWork` per case-study page from the `WORK` item.
- **`sitemap.ts`** — `/` plus every `/work/[slug]`, with `lastModified`.
- **`robots.ts`** — allow all, declare sitemap + host (replaces `public/robots.txt`).
- **Core Web Vitals:** `next.config` `images.remotePatterns` for
  `d64gsuwffb70l.cloudfront.net`; convert LCP-critical images (Hero peak image,
  case-study hero images) to `next/image` with explicit dimensions; keep small
  avatars lightweight. Load fonts via `next/font`.

### Production brand assets (replace placeholders)
- `src/app/icon.svg` — branded "peak" favicon in studio orange (`#FF6B5A`).
- `src/app/apple-icon.tsx` and `src/app/opengraph-image.tsx` (+ `twitter-image.tsx`)
  generated at build with `next/og` `ImageResponse` from `STUDIO` name/tagline/colors.
  This removes `/placeholder.svg` and the missing `/og.jpg` with zero binary assets.

### Cleanup & config
- **Remove:** `@supabase/supabase-js`, `@tanstack/react-query`, `database/database.sql`,
  `vite`, `@vitejs/plugin-react-swc`, `vite.config.ts`, `index.html`, `src/main.tsx`,
  `src/App.tsx`, `src/App.css` (if unused), `src/pages/*`, `src/contexts/AppContext.tsx`,
  `tsconfig.app.json`, `tsconfig.node.json`, `public/robots.txt`, `public/placeholder.svg`.
- **Add/replace:** `next`, `eslint-config-next`, React 19 + `@types/react`@19;
  `next.config.mjs`, Next-flavored `tsconfig.json` (jsx `preserve`, `next` plugin,
  `paths`, `moduleResolution: bundler`), `next-env.d.ts`.
- **package.json scripts:** `dev: next dev`, `build: next build`, `start: next start`,
  `lint: next lint`.
- **Keep:** `postcss.config.js`, `tailwind.config.ts` (update `content` globs to
  include `src/app/**`), all shadcn UI + design tokens.

## Risks & Mitigations

- **React 18 → 19:** components are straightforward; risk low. Mitigate by building
  and smoke-testing every route.
- **Client/server boundary errors** (hooks in server components): add `"use client"`
  to all interactive sections; the build surfaces violations.
- **`next/image` remote config:** without `remotePatterns`, CloudFront images fail.
  Config it before converting any image.
- **Case-study route vs. removed modal:** ensure all 6 slugs prerender and link
  correctly; verify `generateStaticParams` returns all of `WORK`.

## Verification

- `npm run build` prerenders `/`, `/work/<each-slug>`, `/404` with no errors.
- `npm run lint` clean.
- Dev smoke test: load `/`, one `/work/<slug>`, and a bad URL (404). Visual parity
  with the current site.
- View source confirms server-rendered `<title>`, OG tags, and JSON-LD on `/` and a
  case-study page.
- `/sitemap.xml` lists all routes; `/robots.txt` served; OG image renders at
  `/opengraph-image`; favicon resolves.
