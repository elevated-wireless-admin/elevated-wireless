import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
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
      },
      fontFamily: {
        display: ["var(--font-display)", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        sans: ["var(--font-sans)", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: { none: "0", DEFAULT: "0" },
    },
  },
  plugins: [],
};
export default config;
