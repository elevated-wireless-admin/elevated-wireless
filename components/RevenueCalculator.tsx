"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { tokens as t } from "@/lib/tokens";

// ————————————————————————————————————————————————
// Revenue calculator — the proposal finance slide, live.
// audience × conversion × $10/sub/mo royalty → monthly + yearly.
//
// The control is a plotted value curve rather than a bare slider: dragging
// moves a marker along the whole 500K–100M ladder, so a partner sees what the
// deal is worth at every other audience size, not only their own. That is the
// argument the decks make, made interactive.
//
// Note the curve bends because the audience ladder below is log-spaced, not
// because the model is non-linear — royalty is strictly linear in audience.
// ————————————————————————————————————————————————

// Audience stops, 500K → 100M. Log-ish ladder, densest in the
// 500K–10M band where every university and collective lives.
function buildStops(): number[] {
  const stops: number[] = [];
  for (let v = 500_000; v < 2_000_000; v += 100_000) stops.push(v);
  for (let v = 2_000_000; v < 10_000_000; v += 250_000) stops.push(v);
  for (let v = 10_000_000; v < 30_000_000; v += 1_000_000) stops.push(v);
  for (let v = 30_000_000; v <= 100_000_000; v += 5_000_000) stops.push(v);
  return stops;
}
const STOPS = buildStops();
const LAST = STOPS.length - 1;

function nearestStopIndex(value: number): number {
  let best = 0;
  for (let i = 1; i < STOPS.length; i++) {
    if (Math.abs(STOPS[i] - value) < Math.abs(STOPS[best] - value)) best = i;
  }
  return best;
}

const ROYALTY = 10;
const CONV_PRESETS = [0.5, 1, 2];

// Ticks a partner can locate themselves against. Kept to five so the axis
// stays readable at the narrow end of the band.
const TICKS = [1_000_000, 10_000_000, 25_000_000, 50_000_000, 100_000_000];

function fmtInt(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

function trimZeros(s: string): string {
  return s.replace(/\.0+$|(\.\d*[1-9])0+$/, "$1");
}

function fmtMoney(n: number): string {
  if (n >= 995_000_000) return "$" + trimZeros((n / 1e9).toFixed(2)) + "B";
  if (n >= 995_000) return "$" + trimZeros((n / 1e6).toFixed(1)) + "M";
  return "$" + fmtInt(n);
}

function fmtConv(c: number): string {
  return trimZeros(c.toFixed(1)) + "%";
}

function fmtShort(n: number): string {
  if (n >= 1e6) return trimZeros((n / 1e6).toFixed(n % 1e6 === 0 ? 0 : 1)) + "M";
  if (n >= 1e3) return Math.round(n / 1e3) + "K";
  return String(n);
}

// Eased count-up toward a moving target; snaps when motion is reduced.
function useCountUp(target: number, duration = 550): number {
  const [value, setValue] = useState(target);
  const current = useRef(target);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      current.current = target;
      setValue(target);
      return;
    }
    const from = current.current;
    if (from === target) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = from + (target - from) * eased;
      current.current = v;
      setValue(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

// ——— Curve geometry ———————————————————————————
// Plotted in a fixed viewBox and stretched by the SVG, so the shape is
// computed once per conversion rate rather than on every resize.
const VB_W = 1000;
const VB_H = 118;
const PAD_TOP = 6;

function curvePoints(conv: number): string {
  // Revenue is linear in audience, so normalising against the top stop makes
  // the path independent of conversion — but we recompute anyway to keep the
  // relationship explicit for anyone reading this later.
  const max = STOPS[LAST] * (conv / 100) * ROYALTY;
  const pts: string[] = [];
  for (let i = 0; i <= LAST; i += 3) {
    const x = (i / LAST) * VB_W;
    const rev = STOPS[i] * (conv / 100) * ROYALTY;
    const y = VB_H - (rev / max) * (VB_H - PAD_TOP) - 2;
    pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  const xEnd = VB_W;
  const yEnd = VB_H - (VB_H - PAD_TOP) - 2;
  pts.push(`${xEnd} ${yEnd.toFixed(1)}`);
  return pts.map((p, i) => (i === 0 ? "M" : "L") + p).join(" ");
}

function markerAt(idx: number, conv: number): { x: number; y: number } {
  const max = STOPS[LAST] * (conv / 100) * ROYALTY;
  const rev = STOPS[idx] * (conv / 100) * ROYALTY;
  return {
    x: (idx / LAST) * VB_W,
    y: VB_H - (rev / max) * (VB_H - PAD_TOP) - 2,
  };
}

type Variant = "home" | "university";

const VARIANTS: Record<
  Variant,
  {
    audienceLabel: string;
    convLabel: string;
    noun: string;
    defaultAudience: number;
    ctaLabel: string;
    ctaHref: string;
  }
> = {
  home: {
    audienceLabel: "Your audience",
    convLabel: "Share who sign up",
    noun: "people",
    // NOTE: this is the number a first-time visitor sees before touching
    // anything — 10M at 1% opens the page on $1M a month. Lower it here if
    // the opening figure should read more conservative.
    defaultAudience: 10_000_000,
    ctaLabel: "Get your exact number",
    ctaHref: "#partner",
  },
  university: {
    audienceLabel: "Fans & alumni",
    convLabel: "Fans who sign up",
    noun: "fans",
    defaultAudience: 2_000_000,
    ctaLabel: "Get your exact number",
    ctaHref:
      "mailto:partnerships@getelevatedwireless.com?subject=University%20Briefing%20%E2%80%94%20Our%20Numbers",
  },
};

export function RevenueCalculator({
  variant,
  className,
}: {
  variant: Variant;
  className?: string;
}) {
  const v = VARIANTS[variant];
  const [audienceIdx, setAudienceIdx] = useState(() =>
    nearestStopIndex(v.defaultAudience)
  );
  const [conv, setConv] = useState(1);
  const [brand, setBrand] = useState<string | null>(null);

  // Prefill from URL (?audience=850000&conv=1&brand=Sun%20Devils) —
  // powers personalized outbound links; static-export safe.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const a = Number(q.get("audience"));
    if (Number.isFinite(a) && a > 0) {
      setAudienceIdx(nearestStopIndex(Math.min(100_000_000, Math.max(500_000, a))));
    }
    const c = Number(q.get("conv"));
    if (Number.isFinite(c) && c > 0) {
      setConv(Math.round(Math.min(5, Math.max(0.1, c)) * 10) / 10);
    }
    const b = q.get("brand");
    if (b) {
      const clean = b.replace(/[^A-Za-z0-9 &'.\-]/g, "").trim().slice(0, 40);
      if (clean) setBrand(clean);
    }
  }, []);

  const audience = STOPS[audienceIdx];
  const subs = Math.round(audience * (conv / 100));
  const monthly = useCountUp(subs * ROYALTY);
  const yearly = monthly * 12;

  const path = curvePoints(conv);
  const marker = markerAt(audienceIdx, conv);

  const microLabel: CSSProperties = {
    fontFamily: t.mono,
    fontSize: 10.5,
    fontWeight: 600,
    letterSpacing: "0.17em",
    textTransform: "uppercase",
    color: t.metal,
    margin: 0,
  };

  return (
    <div
      className={className}
      style={{
        background: t.paper,
        color: t.ink,
        borderTop: `3px solid ${t.accent}`,
        padding: "28px 32px 26px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {/* ——— Crown: the figure leads, the inputs follow ——— */}
      <div className="ew-calc-crown">
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <p
            className="ew-num-shimmer"
            style={{
              fontFamily: t.sansDisplay,
              fontSize: "clamp(38px, 5.4vw, 58px)",
              lineHeight: 1,
              fontWeight: 500,
              letterSpacing: "-0.028em",
              fontVariantNumeric: "tabular-nums",
              margin: 0,
            }}
          >
            {fmtMoney(monthly)}
          </p>
          <p style={{ ...microLabel, letterSpacing: "0.14em" }}>
            per month at {fmtConv(conv)} of {fmtInt(audience)}{" "}
            {brand ? `${brand} fans` : v.noun}
          </p>
        </div>
        <div className="ew-calc-yearly">
          <p style={microLabel}>Per year</p>
          <p
            style={{
              fontFamily: t.sansDisplay,
              fontSize: 21,
              fontWeight: 500,
              letterSpacing: "-0.018em",
              fontVariantNumeric: "tabular-nums",
              margin: 0,
            }}
          >
            {fmtMoney(yearly)}
          </p>
        </div>
      </div>

      {/* ——— The plot, and the rail that drives it ——— */}
      <div>
        <svg
          className="ew-calc-plot"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path d={`${path} L${VB_W} ${VB_H} L0 ${VB_H} Z`} fill="rgba(205,4,11,0.09)" />
          <path
            d={path}
            fill="none"
            stroke={t.accent}
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1={marker.x}
            x2={marker.x}
            y1={marker.y}
            y2={VB_H}
            stroke={t.ink}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
          <circle cx={marker.x} cy={marker.y} r={4.5} fill={t.accent} />
        </svg>

        <div className="ew-calc-rail">
          <input
            id={`ew-audience-${variant}`}
            className="ew-range"
            type="range"
            min={0}
            max={LAST}
            step={1}
            value={audienceIdx}
            style={{ ["--pct" as string]: `${(audienceIdx / LAST) * 100}%` }}
            aria-label={brand ? `${brand} fans` : v.audienceLabel}
            aria-valuetext={`${fmtInt(audience)} ${v.noun}`}
            onChange={(e) => setAudienceIdx(Number(e.target.value))}
          />
          <div className="ew-calc-ticks" aria-hidden="true">
            {TICKS.map((n) => (
              <div
                key={n}
                className="ew-calc-tick"
                style={{ left: `${(nearestStopIndex(n) / LAST) * 100}%` }}
              >
                <i />
                <em>{fmtShort(n)}</em>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ——— Conversion, disclosure, CTA ——— */}
      <div className="ew-calc-foot">
        <div className="ew-calc-conv">
          <span style={microLabel}>{v.convLabel}</span>
          <div style={{ display: "flex", gap: 6 }}>
            {CONV_PRESETS.map((c) => {
              const active = Math.abs(conv - c) < 0.001;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setConv(c)}
                  style={{
                    padding: "6px 13px",
                    fontFamily: t.mono,
                    fontSize: 10.5,
                    letterSpacing: "0.12em",
                    fontWeight: 600,
                    cursor: "pointer",
                    background: active ? t.base : "transparent",
                    color: active ? t.paper : t.ink,
                    border: `1px solid ${active ? t.base : t.line}`,
                  }}
                >
                  {fmtConv(c)}
                </button>
              );
            })}
          </div>
        </div>

        <a
          href={v.ctaHref}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            fontFamily: t.mono,
            fontSize: 11.5,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: t.base,
            borderBottom: `1px solid ${t.metal}`,
            paddingBottom: 4,
          }}
        >
          {v.ctaLabel}
          <span aria-hidden="true" style={{ fontSize: 14, opacity: 0.8, lineHeight: 1 }}>
            →
          </span>
        </a>
      </div>

      {/* The number above is a model, and says so. Cheap to print, and it is
          the difference between a projection and a promise in a first
          meeting. */}
      <p
        style={{
          fontFamily: t.mono,
          fontSize: 10.5,
          letterSpacing: "0.04em",
          color: t.metal,
          margin: 0,
          borderTop: `1px solid ${t.line}`,
          paddingTop: 12,
        }}
      >
        Illustrative. Assumes a ${ROYALTY} monthly royalty per subscriber and{" "}
        {fmtInt(subs)} subscribers at {fmtConv(conv)} sign-up. Your terms are set in the
        agreement.
      </p>
    </div>
  );
}
