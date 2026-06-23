# Launch Peak Studio

Marketing site for Launch Peak Studio, built with Next.js 16 (App Router), React 19,
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
