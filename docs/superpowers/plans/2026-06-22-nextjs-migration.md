# Launch Peak Studio → Next.js Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the Vite + React 18 single-page "Launch Peak Studio" site to Next.js 15 App Router + React 19 with production SEO, per-case-study routes, generated brand assets, and a lean dependency set — with zero visual regression.

**Architecture:** In-place migration. The App Router is added under `src/app/`; all existing components stay under `src/` so the `@/* → ./src/*` alias keeps every import valid. Server components own metadata/JSON-LD; interactive sections are marked `"use client"`. The current client-modal case study becomes an indexable `/work/[slug]` route.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind 3 (unchanged tokens), shadcn/ui (Radix), `next/font`, `next/image`, `next/og`.

## Global Constraints

- **Framework:** Next.js 15 App Router, React 19, React DOM 19.
- **No Tailwind 4 upgrade** — keep `tailwind.config.ts` tokens; only update `fontFamily` to CSS vars.
- **Keep all source under `src/`**; alias `@/*` → `./src/*` must remain valid.
- **Canonical site URL:** `https://launchpeakstudio.com` (use this constant everywhere).
- **No visual regression** — preserve existing classes/markup; only restructure routing/data plumbing.
- **Brand colors:** primary `#FF6B5A`, accent `#FFA24A`, paper `#FFFBF5`, ink `#2B211C`.
- **Remove (unused):** `@supabase/supabase-js`, `@tanstack/react-query`, `uuid` (+`@types/uuid` if unused after AppContext deletion), `database/database.sql`.
- After every task, the project must `npm run build` clean (except Task 1–2 which predate the Next config — they verify install only).

---

### Task 1: Branch + baseline commit

**Files:**
- Create: none (git only)

**Interfaces:**
- Produces: a `nextjs-migration` branch with the current Vite state committed, so the migration is a reviewable diff and revertible.

- [ ] **Step 1: Create the migration branch**

Run:
```bash
git checkout -b nextjs-migration
```

- [ ] **Step 2: Stage the current project as the baseline**

Run:
```bash
git add -A
```

- [ ] **Step 3: Commit the baseline**

Run:
```bash
git commit -m "chore: baseline Vite + React shadcn site before Next.js migration"
```
Expected: a commit is created listing the existing project files.

---

### Task 2: Swap dependencies (Vite → Next)

**Files:**
- Modify: `package.json` (dependencies, devDependencies, scripts)

**Interfaces:**
- Produces: `next@^15`, `react@^19`, `react-dom@^19` installed; `vite`/Supabase/React-Query/uuid removed; npm scripts point at Next.

- [ ] **Step 1: Remove Vite + unused runtime deps**

Run:
```bash
npm uninstall vite @vitejs/plugin-react-swc @supabase/supabase-js @tanstack/react-query uuid @types/uuid eslint-plugin-react-refresh
```

- [ ] **Step 2: Add Next.js + React 19 + Next ESLint config**

Run:
```bash
npm install next@latest react@^19 react-dom@^19
npm install -D eslint-config-next@latest @types/react@^19 @types/react-dom@^19
```
Expected: install completes without peer-dependency errors. (If npm reports a peer conflict from a Radix package, re-run the failing install with `--legacy-peer-deps` and note it in the commit message.)

- [ ] **Step 3: Replace npm scripts in `package.json`**

Replace the `"scripts"` block with:
```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
```

- [ ] **Step 4: Verify the dependency tree resolves**

Run:
```bash
npm ls next react react-dom --depth=0
```
Expected: `next@15.x`, `react@19.x`, `react-dom@19.x` listed with no missing/invalid markers.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "build: replace Vite toolchain with Next.js 15 and React 19"
```

---

### Task 3: Next.js, TypeScript, ESLint, Tailwind & shadcn config

**Files:**
- Create: `next.config.mjs`, `.eslintrc.json`
- Modify: `tsconfig.json`, `tailwind.config.ts` (fontFamily + content), `components.json` (`rsc`)
- Delete: `vite.config.ts`, `tsconfig.app.json`, `tsconfig.node.json`, `eslint.config.js`, `index.html`

**Interfaces:**
- Produces: a buildable Next config with CloudFront images allowed; `@/*` paths resolved by Next's TS plugin; Tailwind reading `--font-sans`/`--font-mono`.

- [ ] **Step 1: Create `next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'd64gsuwffb70l.cloudfront.net' },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 2: Replace `tsconfig.json` with a Next-flavored config**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create `.eslintrc.json` and delete the flat config**

`.eslintrc.json`:
```json
{
  "extends": "next/core-web-vitals"
}
```
Run:
```bash
rm eslint.config.js
```

- [ ] **Step 4: Delete Vite-only config files**

Run:
```bash
rm vite.config.ts tsconfig.app.json tsconfig.node.json index.html
```

- [ ] **Step 5: Update `tailwind.config.ts` fontFamily to CSS variables**

Replace the `fontFamily` block (currently `mono: ['JetBrains Mono', 'monospace']`, `sans: ['Inter', 'sans-serif']`) with:
```ts
      fontFamily: {
        mono: ['var(--font-mono)', 'monospace'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
```
Leave the `content` array as-is (it already includes `"./src/**/*.{ts,tsx}"`, which covers `src/app`).

- [ ] **Step 6: Flip shadcn `components.json` to RSC**

In `components.json` change `"rsc": false` to `"rsc": true`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "build: add Next.js/TS/ESLint config, remove Vite config"
```

---

### Task 4: Global stylesheet + fonts

**Files:**
- Create: `src/app/globals.css` (from `src/index.css`, minus the Google Fonts `@import`)
- Delete: `src/index.css`, `src/App.css`

**Interfaces:**
- Produces: `src/app/globals.css` imported by the root layout; fonts now loaded via `next/font` (Task 6), not a render-blocking `@import`.

- [ ] **Step 1: Create `src/app/globals.css`**

Copy the entire contents of `src/index.css` into `src/app/globals.css`, but **delete the first line**:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
```
so the file now begins with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
(Keep every `@layer base { :root { … } }` token block unchanged.)

- [ ] **Step 2: Delete the old stylesheets**

`src/App.css` is unused (no import anywhere) and `src/index.css` is superseded.
Run:
```bash
rm src/index.css src/App.css
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "style: move global CSS into app/globals.css, drop font @import"
```

---

### Task 5: Client providers wrapper

**Files:**
- Create: `src/app/providers.tsx`

**Interfaces:**
- Consumes: `@/components/theme-provider`, `@/components/ui/tooltip`, `@/components/ui/toaster`, `@/components/ui/sonner`.
- Produces: `Providers` (named export) — a client component wrapping children with theme + tooltip + toasters. **No React Query** (removed).

- [ ] **Step 1: Create `src/app/providers.tsx`**

```tsx
'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        {children}
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </ThemeProvider>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/providers.tsx
git commit -m "feat: add client Providers wrapper (theme, tooltip, toasters)"
```

---

### Task 6: Root layout, landing page, 404, and client directives

**Files:**
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/not-found.tsx`
- Modify (add `'use client'`): `src/components/studio/Reveal.tsx`, `Header.tsx`, `Faq.tsx`, `Work.tsx`, `Contact.tsx`, `Footer.tsx`
- Delete: `src/App.tsx`, `src/main.tsx`, `src/pages/Index.tsx`, `src/pages/NotFound.tsx`, `src/contexts/AppContext.tsx`

**Interfaces:**
- Consumes: `Providers` (Task 5), `@/components/AppLayout`, `@/data/studio` (`STUDIO`, `FAQS`).
- Produces: a server-rendered `/` and `/404`; site-wide metadata + `ProfessionalService` JSON-LD; `FAQPage` JSON-LD on `/`.

- [ ] **Step 1: Add `'use client'` to the interactive section components**

For each of these six files, ensure the **first line** is `'use client';` (followed by a blank line, then the existing `import …`):
`src/components/studio/Reveal.tsx`, `src/components/studio/Header.tsx`, `src/components/studio/Faq.tsx`, `src/components/studio/Work.tsx`, `src/components/studio/Contact.tsx`, `src/components/studio/Footer.tsx`.

Verify none were missed:
```bash
grep -rL "use client" $(grep -rl "useState\|useEffect\|useRef\|onClick\|onChange\|onSubmit\|matchMedia" src/components/studio)
```
Expected: prints nothing (every interactive studio file now has the directive). Note: `CaseStudy.tsx` is intentionally excluded here — it is refactored to a server component in Task 7.

- [ ] **Step 2: Create `src/app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { STUDIO } from '@/data/studio';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

const SITE_URL = 'https://launchpeakstudio.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      'UI/UX Design and Web Development Studio | Portland and Global — Launch Peak Studio',
    template: '%s — Launch Peak Studio',
  },
  description:
    'Launch Peak Studio designs, builds, launches, and scales digital products. UI/UX, web, and mobile development for startups and growing teams in Portland and worldwide.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: STUDIO.name,
    title: STUDIO.name,
    description:
      'A premium design and development studio for startups and growing businesses, offering UI/UX, web, and mobile services globally.',
    url: SITE_URL,
  },
  twitter: { card: 'summary_large_image', title: STUDIO.name },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: STUDIO.name,
    description: STUDIO.positioning,
    email: STUDIO.email,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    areaServed: STUDIO.location,
    founder: STUDIO.owner,
    slogan: STUDIO.tagline,
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Providers>{children}</Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Create `src/app/page.tsx`**

```tsx
import AppLayout from '@/components/AppLayout';
import { FAQS } from '@/data/studio';

export default function HomePage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <AppLayout />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
```

- [ ] **Step 4: Create `src/app/not-found.tsx`** (ported from `src/pages/NotFound.tsx`, react-router removed)

```tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8 rounded-lg border border-border bg-card shadow-md">
        <h1 className="text-5xl font-bold mb-6 text-primary">404</h1>
        <p className="text-xl text-card-foreground mb-6">Page not found</p>
        <Link
          href="/"
          className="text-primary hover:text-primary/80 underline transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Delete the Vite entry, router, pages, and dead context**

`AppContext`/`useAppContext` is never consumed; `App.tsx`/`main.tsx`/`pages/*` are replaced by the App Router.
Run:
```bash
rm src/App.tsx src/main.tsx src/pages/Index.tsx src/pages/NotFound.tsx src/contexts/AppContext.tsx
rmdir src/pages src/contexts 2>/dev/null || true
```

- [ ] **Step 6: Build and smoke-test**

Run:
```bash
npm run build
```
Expected: build succeeds; output lists `/` and `/_not-found` as prerendered routes. If it errors with "useX only works in a Client Component", add `'use client'` to the named file and rebuild.

Then:
```bash
npm run dev
```
Open `http://localhost:3000/` — the full landing page renders with visual parity to the old site (header, hero, sections, footer). Stop the dev server (Ctrl-C).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add App Router layout, landing page, 404; mark client sections"
```

---

### Task 7: Case-study routes (`/work/[slug]`)

**Files:**
- Modify: `src/components/studio/CaseStudy.tsx` (modal → presentational server component), `src/components/studio/Work.tsx` (cards → links, remove modal state)
- Create: `src/app/work/[slug]/page.tsx`

**Interfaces:**
- Consumes: `@/data/studio` (`WORK`, `WorkItem`, `BOOKING_URL`), `@/components/studio/CaseStudy`.
- Produces: `CaseStudy` now takes `{ item: WorkItem }` (no `onClose`); `generateStaticParams()` returns one `{ slug }` per `WORK` item; each route renders the case study with a "Back to work" link + `CreativeWork` JSON-LD.

- [ ] **Step 1: Refactor `src/components/studio/CaseStudy.tsx` to a server presentational component**

Replace the **entire file** with:
```tsx
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Target,
  Compass,
  Code2,
  TrendingUp,
  Quote,
} from 'lucide-react';
import Link from 'next/link';
import { WorkItem, BOOKING_URL } from '@/data/studio';

interface CaseStudyProps {
  item: WorkItem;
}

const SectionTitle: React.FC<{ icon: React.ReactNode; eyebrow: string; title: string }> = ({
  icon,
  eyebrow,
  title,
}) => (
  <div className="mb-5 flex items-center gap-3">
    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6B5A] to-[#FF8A5B] text-white shadow-md shadow-orange-200">
      {icon}
    </span>
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF6B5A]">{eyebrow}</p>
      <h3 className="text-xl font-extrabold text-[#2B211C]">{title}</h3>
    </div>
  </div>
);

const CaseStudy: React.FC<CaseStudyProps> = ({ item }) => {
  return (
    <article className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-[#FFFBF5] shadow-2xl">
      {/* hero */}
      <div className="relative">
        <img src={item.image} alt={item.title} className="h-64 w-full object-cover sm:h-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 sm:p-8">
          <span className="inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#FF6B5A]">
            {item.category}
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">{item.title}</h1>
          <p className="mt-1 max-w-lg text-white/90">{item.blurb}</p>
        </div>
      </div>

      {/* meta strip */}
      <div className="grid grid-cols-2 gap-px border-b border-orange-100 bg-orange-100 sm:grid-cols-4">
        {[
          { k: 'Client', v: item.client },
          { k: 'Industry', v: item.industry },
          { k: 'Timeline', v: item.timeline },
          { k: 'Services', v: item.services.join(', ') },
        ].map((m) => (
          <div key={m.k} className="bg-[#FFFBF5] px-4 py-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#FF6B5A]">{m.k}</p>
            <p className="mt-1 text-sm font-medium text-[#2B211C]">{m.v}</p>
          </div>
        ))}
      </div>

      <div className="space-y-12 px-5 py-10 sm:px-8 sm:py-12">
        <section>
          <SectionTitle icon={<Target className="h-5 w-5" />} eyebrow="The problem" title="The challenge" />
          <p className="text-[15px] leading-relaxed text-[#4a3c33]">{item.challenge}</p>
        </section>

        <section>
          <SectionTitle icon={<Compass className="h-5 w-5" />} eyebrow="What we did" title="Our approach" />
          <ul className="grid gap-3 sm:grid-cols-2">
            {item.approach.map((a) => (
              <li key={a} className="flex items-start gap-2.5 rounded-2xl border border-orange-100 bg-white p-4 text-sm text-[#4a3c33]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FF6B5A]" />
                {a}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionTitle icon={<ArrowUpRight className="h-5 w-5" />} eyebrow="The look" title="Design" />
          <p className="mb-5 text-[15px] leading-relaxed text-[#4a3c33]">{item.designNote}</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {item.gallery.map((g, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">
                <img src={g} alt={`${item.title} screen ${i + 1}`} className="h-44 w-full object-cover" />
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle icon={<Code2 className="h-5 w-5" />} eyebrow="Under the hood" title="The build" />
          <ul className="grid gap-3 sm:grid-cols-2">
            {item.build.map((b) => (
              <li key={b} className="flex items-start gap-2.5 rounded-2xl border border-orange-100 bg-white p-4 text-sm text-[#4a3c33]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FF6B5A]" />
                {b}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionTitle icon={<TrendingUp className="h-5 w-5" />} eyebrow="The outcome" title="Results" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {item.results.map((r) => (
              <div key={r.label} className="rounded-2xl bg-gradient-to-br from-[#FF6B5A] to-[#FF8A5B] p-6 text-center text-white shadow-lg shadow-orange-200">
                <div className="text-3xl font-extrabold">{r.value}</div>
                <div className="mt-1 text-xs font-medium text-white/90">{r.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative rounded-3xl border border-orange-100 bg-white p-7 shadow-sm">
          <Quote className="h-8 w-8 text-orange-200" />
          <blockquote className="mt-3 text-lg font-medium leading-relaxed text-[#2B211C]">
            &ldquo;{item.quote.text}&rdquo;
          </blockquote>
          <div className="mt-4 text-sm">
            <span className="font-bold text-[#2B211C]">{item.quote.name}</span>
            <span className="text-[#5a4a40]"> · {item.quote.role}</span>
          </div>
        </section>

        <section className="rounded-3xl bg-gradient-to-br from-[#2B211C] to-[#4a352a] p-8 text-center text-white sm:p-10">
          <h3 className="text-2xl font-extrabold sm:text-3xl">Want results like {item.client}?</h3>
          <p className="mx-auto mt-3 max-w-md text-white/80">
            Let us design and build your next product. Book a free discovery call and we will map your climb to the summit.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF6B5A] to-[#FF8A5B] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Start a project like this
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              href="/#work"
              className="rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Back to work
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
};

export default CaseStudy;
```

- [ ] **Step 2: Update `src/components/studio/Work.tsx` — cards link to the route, remove the modal**

Make these edits (the file keeps `'use client'` and the `filter` state):
1. Remove the `CaseStudy` import (line 4: `import CaseStudy from './CaseStudy';`).
2. Add a Next link import at the top of the imports: `import Link from 'next/link';`.
3. Remove the `active` state line: `const [active, setActive] = useState<WorkItem | null>(null);`.
4. Remove the modal render line near the end: `{active && <CaseStudy item={active} onClose={() => setActive(null)} />}`.
5. Change each work card from a `<button onClick={() => setActive(w)} …>` to a link. Replace the opening `<button onClick={() => setActive(w)} className="group block w-full …">` with:
   ```tsx
   <Link href={`/work/${w.slug}`} className="group block w-full overflow-hidden rounded-3xl border border-orange-100 bg-white text-left shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-orange-100">
   ```
   and change its matching closing `</button>` to `</Link>`.

After editing, verify no stale references remain:
```bash
grep -n "CaseStudy\|setActive\|active" src/components/studio/Work.tsx
```
Expected: prints nothing.

- [ ] **Step 3: Create `src/app/work/[slug]/page.tsx`**

```tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { WORK } from '@/data/studio';
import CaseStudy from '@/components/studio/CaseStudy';

export function generateStaticParams() {
  return WORK.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = WORK.find((w) => w.slug === slug);
  if (!item) return {};
  return {
    title: `${item.title} — Case Study`,
    description: item.blurb,
    alternates: { canonical: `/work/${item.slug}` },
    openGraph: {
      title: `${item.title} — Case Study`,
      description: item.blurb,
      images: [item.image],
      url: `/work/${item.slug}`,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = WORK.find((w) => w.slug === slug);
  if (!item) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: item.title,
    headline: item.title,
    description: item.blurb,
    image: item.image,
    about: item.industry,
  };

  return (
    <main className="min-h-screen bg-[#FFFBF5] py-6 font-sans text-[#2B211C] antialiased">
      <div className="mx-auto max-w-4xl px-4">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#5a4a40] transition-colors hover:text-[#FF6B5A]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to work
        </Link>
      </div>
      <div className="mt-4 px-3 sm:px-6">
        <CaseStudy item={item} />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
```

- [ ] **Step 4: Build and smoke-test the routes**

Run:
```bash
npm run build
```
Expected: output shows `/work/[slug]` prerendered with **6** static paths (`northwind-fintech`, `summit-saas`, `bloom-wellness`, `harbor-commerce`, `atlas-uiux`, `pine-mobile`).

Then `npm run dev`, open `http://localhost:3000/`, click a work card → lands on `/work/<slug>` with the full case study and a working "Back to work" link. Stop the server.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: indexable /work/[slug] case-study routes; remove modal"
```

---

### Task 8: `next/image` for LCP-critical images

**Files:**
- Modify: `src/components/studio/Hero.tsx`, `src/components/studio/Work.tsx`, `src/components/studio/CaseStudy.tsx`

**Interfaces:**
- Consumes: `next/image` `<Image>`; `next.config.mjs` `remotePatterns` (added in Task 3) authorizes `d64gsuwffb70l.cloudfront.net`.
- Produces: optimized, dimensioned hero/thumbnail images for better LCP/CLS.

- [ ] **Step 1: Convert the Hero peak image to `<Image>`**

In `src/components/studio/Hero.tsx`:
1. Add `import Image from 'next/image';` to the imports.
2. Replace `<img src={peakImg} alt="Warm peak summit illustration" className="h-full w-full object-cover" />` with:
   ```tsx
   <Image src={peakImg} alt="Warm peak summit illustration" width={1200} height={900} priority className="h-full w-full object-cover" />
   ```

- [ ] **Step 2: Convert the Work card thumbnail to `<Image>`**

In `src/components/studio/Work.tsx`:
1. Add `import Image from 'next/image';`.
2. Replace the card `<img src={w.image} alt={w.title} className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" />` with:
   ```tsx
   <Image src={w.image} alt={w.title} width={640} height={224} className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
   ```

- [ ] **Step 3: Convert the case-study hero image to `<Image>`**

In `src/components/studio/CaseStudy.tsx`:
1. Add `import Image from 'next/image';`.
2. Replace `<img src={item.image} alt={item.title} className="h-64 w-full object-cover sm:h-80" />` with:
   ```tsx
   <Image src={item.image} alt={item.title} width={1024} height={320} priority className="h-64 w-full object-cover sm:h-80" />
   ```
   (Leave the small `item.gallery` `<img>` thumbnails as plain `<img>` — they are below the fold and not LCP-critical.)

- [ ] **Step 4: Build and verify images load**

Run `npm run build` (clean), then `npm run dev`, open `/` and a `/work/<slug>` — hero and thumbnails render via `/_next/image?...`. If an image 400s, confirm the hostname in `next.config.mjs` `remotePatterns` matches `d64gsuwffb70l.cloudfront.net`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "perf: serve LCP-critical images through next/image"
```

---

### Task 9: Sitemap + robots

**Files:**
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`
- Delete: `public/robots.txt`

**Interfaces:**
- Consumes: `@/data/studio` (`WORK`).
- Produces: `/sitemap.xml` (home + all case studies) and `/robots.txt` (allow-all + sitemap ref) generated by Next.

- [ ] **Step 1: Create `src/app/sitemap.ts`**

```ts
import type { MetadataRoute } from 'next';
import { WORK } from '@/data/studio';

const SITE_URL = 'https://launchpeakstudio.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...WORK.map((w) => ({
      url: `${SITE_URL}/work/${w.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
```

- [ ] **Step 2: Create `src/app/robots.ts`**

```ts
import type { MetadataRoute } from 'next';

const SITE_URL = 'https://launchpeakstudio.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
```

- [ ] **Step 3: Delete the static robots file** (replaced by `robots.ts`)

```bash
rm public/robots.txt
```

- [ ] **Step 4: Build and verify**

Run `npm run build`, then `npm run dev` and confirm:
- `http://localhost:3000/sitemap.xml` lists `/` plus all 6 `/work/<slug>` URLs.
- `http://localhost:3000/robots.txt` shows `Allow: /` and the `Sitemap:` line.
Stop the server.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add dynamic sitemap.xml and robots.txt"
```

---

### Task 10: Production brand assets (favicon + OG/Twitter/apple icons)

**Files:**
- Create: `src/app/icon.svg`, `src/app/opengraph-image.tsx`, `src/app/twitter-image.tsx`, `src/app/apple-icon.tsx`
- Delete: `public/placeholder.svg`

**Interfaces:**
- Consumes: `next/og` `ImageResponse`, `@/data/studio` (`STUDIO`).
- Produces: a branded favicon and build-time-generated 1200×630 OG/Twitter images + 180×180 apple icon — replacing `/placeholder.svg` and the missing `/og.jpg`.

- [ ] **Step 1: Create `src/app/icon.svg`** (branded peak favicon)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="#FFFBF5"/>
  <path d="M12 48 L26 22 L34 36 L42 20 L52 48 Z" fill="url(#g)"/>
  <path d="M26 22 L30 29 L24 34 Z" fill="#ffffff" opacity="0.85"/>
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FF6B5A"/>
      <stop offset="1" stop-color="#FFA24A"/>
    </linearGradient>
  </defs>
</svg>
```

- [ ] **Step 2: Create `src/app/opengraph-image.tsx`**

```tsx
import { ImageResponse } from 'next/og';
import { STUDIO } from '@/data/studio';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = STUDIO.name;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: 'linear-gradient(135deg, #FF6B5A, #FFA24A)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 600, opacity: 0.9 }}>{STUDIO.location}</div>
        <div style={{ fontSize: 88, fontWeight: 800, marginTop: 16, lineHeight: 1.05 }}>
          {STUDIO.name}
        </div>
        <div style={{ fontSize: 40, marginTop: 16, maxWidth: 900 }}>{STUDIO.tagline}</div>
      </div>
    ),
    { ...size },
  );
}
```

- [ ] **Step 3: Create `src/app/twitter-image.tsx`** (re-export the OG image)

```tsx
export { default, size, contentType, alt } from './opengraph-image';
```

- [ ] **Step 4: Create `src/app/apple-icon.tsx`**

```tsx
import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #FF6B5A, #FFA24A)',
          color: '#ffffff',
          fontSize: 110,
          fontWeight: 800,
          fontFamily: 'sans-serif',
        }}
      >
        ▲
      </div>
    ),
    { ...size },
  );
}
```

- [ ] **Step 5: Delete the placeholder asset**

```bash
rm public/placeholder.svg
```

- [ ] **Step 6: Build and verify assets**

Run `npm run build`, then `npm run dev` and confirm:
- `http://localhost:3000/opengraph-image` renders the branded 1200×630 image.
- `http://localhost:3000/icon.svg` renders the favicon and the browser tab shows it.
- View-source of `/` includes `<meta property="og:image" …/opengraph-image…>` and `<link rel="apple-touch-icon" …>`.
Stop the server.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: branded favicon + generated OG/Twitter/apple images"
```

---

### Task 11: Final cleanup, README, and full verification

**Files:**
- Delete: `database/database.sql` (and the `database/` dir if empty)
- Modify: `README.md`

**Interfaces:**
- Produces: a clean production build with no Vite/Supabase remnants and accurate run instructions.

- [ ] **Step 1: Remove the orphaned SQL and confirm no remnants**

```bash
rm database/database.sql
rmdir database 2>/dev/null || true
grep -rn "vite\|supabase\|react-router\|@tanstack/react-query\|placeholder.svg" src public package.json || echo "CLEAN"
```
Expected: prints `CLEAN` (no remaining references). If any line prints, remove that reference before continuing.

- [ ] **Step 2: Update `README.md`**

Replace its contents with:
````markdown
# Launch Peak Studio

Marketing site for Launch Peak Studio, built with Next.js 15 (App Router), React 19,
TypeScript, Tailwind CSS, and shadcn/ui.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build
npm run start
```

## Notes

- Content lives in `src/data/studio.ts` (single source of truth).
- Case studies are indexable routes at `/work/[slug]`.
- SEO: per-route metadata + JSON-LD, `src/app/sitemap.ts`, `src/app/robots.ts`,
  and generated OG/Twitter images via `next/og`.
````

- [ ] **Step 3: Lint**

Run:
```bash
npm run lint
```
Expected: completes with no errors. (If `next lint` prompts to install config, accept it; warnings are acceptable, errors are not.)

- [ ] **Step 4: Full production build**

Run:
```bash
npm run build
```
Expected: clean build; route list shows `/` (Static), `/work/[slug]` (SSG, 6 paths), `/_not-found`, plus `sitemap.xml`, `robots.txt`, `opengraph-image`, `twitter-image`, `apple-icon`, `icon` entries.

- [ ] **Step 5: Production smoke test**

Run:
```bash
npm run start
```
In a browser, verify against `http://localhost:3000`:
- `/` renders with full visual parity to the original site.
- A `/work/<slug>` page renders and "Back to work" returns to `/#work`.
- A bad URL (e.g. `/work/nope`) shows the 404 page.
- View-source of `/` contains the server-rendered `<title>`, `og:` tags, and the `ProfessionalService` + `FAQPage` JSON-LD blocks.
- View-source of a case-study page contains its `CreativeWork` JSON-LD and canonical link.
Stop the server.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: remove orphaned SQL, update README, final migration pass"
```

---

## Self-Review

**Spec coverage:**
- Next 15 + React 19 SSR → Tasks 2, 6. ✓
- Keep shadcn/Radix + Tailwind, no regression → Tasks 3–8 preserve markup/classes; parity checks in Tasks 6/7/11. ✓
- Production SEO (metadata, JSON-LD, sitemap, robots, OG) → Tasks 6 (metadata + Org/FAQ JSON-LD), 7 (per-case metadata + CreativeWork), 9 (sitemap/robots), 10 (OG/Twitter/apple). ✓
- `/work/[slug]` indexable routes → Task 7. ✓
- Replace placeholder favicon + social image → Task 10 (and `public/placeholder.svg` removed). ✓
- Remove unused deps/files → Tasks 2 (deps), 6 (AppContext), 9 (robots.txt), 11 (database.sql); React Query removed in Task 5's Providers. ✓
- Core Web Vitals: `next/font` (Tasks 4/6), `next/image` (Task 8). ✓

**Placeholder scan:** No "TBD/TODO/handle edge cases" — every step has concrete code/commands. ✓

**Type/name consistency:** `CaseStudy` prop is `{ item }` in Task 7 (refactor), Task 7 Step 3 (route usage), and Task 8 (image edit) — consistent; old `onClose` removed everywhere. `WORK`/`WorkItem`/`STUDIO.{name,tagline,positioning,email,location,owner}`/`FAQS.{q,a}` match `src/data/studio.ts`. `Providers` named export matches layout import. `SITE_URL = 'https://launchpeakstudio.com'` consistent across layout/sitemap/robots. ✓
