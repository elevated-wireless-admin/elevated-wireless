# Gamecock Wireless — Campaign (static)

A fan-identity wireless campaign concept (for the Elevated Wireless client), deployed as a
static sub-site of the main `elevated-wireless` site. This is the University of South Carolina
(Gamecocks) reskin of the Indiana campaign.

**Live URL:** https://getelevatedwireless.com/campaign/south-carolina/

## How it ships
These files live in `public/campaign/south-carolina/`. Next.js (`output: "export"`) copies the
entire `public/` tree verbatim into `out/`, which the existing `Deploy to GitHub Pages` workflow
uploads. No workflow or config changes are needed — pushing to `main` publishes
`/campaign/south-carolina/`.

## Pages
- `index.html` — the marketing **website** (landing page). The site's deliverable.
- `board.html` — the **campaign asset board**: all five assets at a glance. Each asset, the
  wordmark, and the header CTA link to the live website. "Save as PDF" prints a one-page board.

## Tokens / brand
- `colors_and_type.css` — the "STADIUM" design system (USC garnet `#73000A` + white, Bebas
  Neue + Archivo). `styles.css` just `@import`s it.
- `assets/img/` — placeholder photography. All 4 images are **inherited Indiana stand-ins** and
  must be replaced with licensed South Carolina / Gamecocks photography before any real launch.

> Independent fan-identity concept — **not affiliated with, endorsed by, or sponsored by the
> University of South Carolina.** All pricing, savings, perks, names, dates and stats are
> **illustrative placeholders (TBD).**
