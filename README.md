# Elevated Wireless — Production site

Next.js 14 (App Router) + Tailwind static export of the homepage wireframe, ready for GitHub Pages at [tonyflo79.github.io/elevated-wireless](https://tonyflo79.github.io/elevated-wireless).

## Local dev

```bash
npm install
npm run dev          # http://localhost:3000 — no basePath
```

## Static export (matches Pages)

```bash
npm run build:pages  # writes to ./out with /elevated-wireless basePath
```

Then open `out/index.html` via a local server (not `file://`) because of asset paths.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml` which builds with `NEXT_PUBLIC_BASE_PATH=/elevated-wireless` and publishes `out/` to GitHub Pages.

One-time repo setup on GitHub:
1. Settings → Pages → Source: **GitHub Actions**

## Design notes

- **Direction B tokens only** — all three theme variants exist in the original system.jsx, but Quiet Luxury is the locked final. See `lib/tokens.ts`.
- **DuotonePhoto** is SVG-filter-based, never CSS. Each instance has a unique filter ID (`useId()`). Default `intensity={0.78}` — 78% duotone, 22% source photo blended back. See `components/primitives.tsx`.
- **Team + advisor portraits** use a CSS filter (`grayscale(1) contrast(1.05) brightness(0.98)`) — this unifies disparate portrait sources. On hover, grayscale lifts to 0.2 over 600ms.
- **Wireframe motion annotations** (the yellow `<Anno>` chips) are intentionally dropped — they were wireframe-only.
- **Fonts**: Inter Tight (display), Inter (body), JetBrains Mono (labels) via `next/font/google`. Self-hosted at build time.

## Still to wire

- Replace `team/ben.jpg` with a higher-resolution source (current is a 192×192 upscale).
- Waitlist form endpoint for Engine 05 CTA and the "For Members" block — currently `mailto:` links.
- Favicon + `og:image`.
- Legal + Privacy pages (footer links are placeholder text).
