// Direction B — "Quiet Luxury" — the locked, shipping token set.
export const tokens = {
  navy: "#0E1E3A",
  navyDeep: "#071029",
  navyMid: "#1A2C4D",
  ink: "#0E1E3A",
  paper: "#F5F6F8",
  paperDim: "#E7E9EE",
  line: "#C7CCD6",
  metal: "#9AA3B2",
  metalBright: "#C4CAD5",
  accent: "#9AA3B2",
  sansDisplay:
    "var(--font-display), 'Helvetica Neue', Helvetica, Arial, sans-serif",
  sans: "var(--font-sans), 'Helvetica Neue', Helvetica, Arial, sans-serif",
  mono: "var(--font-mono), ui-monospace, monospace",
} as const;

export type Tokens = typeof tokens;
