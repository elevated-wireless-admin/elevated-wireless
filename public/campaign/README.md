# Hoosier Wireless — Campaign (static)

A fan-identity wireless campaign concept (for the Elevated Wireless client), deployed as a
static sub-site of the main `elevated-wireless` site.

**Live URL:** https://getelevatedwireless.com/campaign/

## How it ships
These files live in `public/campaign/`. Next.js (`output: "export"`) copies the entire
`public/` tree verbatim into `out/`, which the existing `Deploy to GitHub Pages` workflow
uploads. No workflow or config changes are needed — pushing to `main` publishes `/campaign/`.

## Pages
- `index.html` — the marketing **website** (landing page). The site's deliverable.
- `board.html` — the **campaign asset board**: all five assets at a glance. Each asset, the
  wordmark, and the header CTA link to the live website. "Save as PDF" prints a one-page board.

## Tokens / brand
- `colors_and_type.css` — the "STADIUM" design system (IU crimson `#990000` + white, Bebas
  Neue + Archivo). `styles.css` just `@import`s it.
- `assets/img/` — placeholder photography (license/replace before any real launch; may contain
  incidental IU marks).

> Independent fan-identity concept — **not affiliated with or endorsed by Indiana University.**
> All pricing, savings, perks, names, dates and stats are **illustrative placeholders (TBD).**

Source package: `~/Downloads/Hoosier-Wireless-Complete-FINAL`.
