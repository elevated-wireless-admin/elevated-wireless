"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { tokens as t } from "@/lib/tokens";

// ————————————————————————————————————————————————
// Revenue calculator — the proposal finance slide, live.
// audience × conversion × $10/sub/mo royalty → monthly + yearly.
//
// The control is a plotted value curve rather than a bare slider: dragging
// moves a marker along the ladder, so a partner sees what the deal is worth at
// every other audience size, not only their own.
//
// Two things about the look are deliberate.
//
// It is a DARK panel. It used to be a white card, which made it the highest
// contrast event on an otherwise black page — the thing read as a widget
// dropped onto the site rather than part of it, which is the lead-magnet
// quality the move out of the hero was meant to avoid.
//
// The ladder stops at 25M, not 100M. On a 100M axis a 10M audience sits at a
// tenth of full height, so the curve was pinned to the floor across most of
// its width and the plot was mostly empty. 25M is also the honest top of the
// range: the biggest college fan bases are around 10M, and a 100M ceiling
// existed to flatter nobody. The trade is that an audience above 25M can no
// longer be modelled here.
//
// Note the curve bends because the ladder is log-spaced, not because the
// model is non-linear. Royalty is strictly linear in audience.
// ————————————————————————————————————————————————

// Audience stops, 500K → 25M. Densest in the 500K–10M band where every
// university and collective actually lives.
function buildStops(): number[] {
  const stops: number[] = [];
  for (let v = 500_000; v < 2_000_000; v += 100_000) stops.push(v);
  for (let v = 2_000_000; v < 10_000_000; v += 250_000) stops.push(v);
  for (let v = 10_000_000; v <= 25_000_000; v += 500_000) stops.push(v);
  return stops;
}
const STOPS = buildStops();
const LAST = STOPS.length - 1;
const CEILING = STOPS[LAST];

function nearestStopIndex(value: number): number {
  let best = 0;
  for (let i = 1; i < STOPS.length; i++) {
    if (Math.abs(STOPS[i] - value) < Math.abs(STOPS[best] - value)) best = i;
  }
  return best;
}

const ROYALTY = 10;
const CONV_PRESETS = [0.5, 1, 2];

// Four ticks, not five. The axis is shorter now and the labels were the
// fiddliest thing in the panel.
const TICKS = [1_000_000, 5_000_000, 10_000_000, 25_000_000];

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
// computed once per conversion rate rather than on every resize. Half the
// height it was: with the curve now filling its box vertically it reads as a
// measure rather than as a chart with a void above it.
const VB_W = 1000;
const VB_H = 64;
const PAD_TOP = 4;

function curvePoints(conv: number): string {
  const max = CEILING * (conv / 100) * ROYALTY;
  const pts: string[] = [];
  for (let i = 0; i <= LAST; i += 2) {
    const x = (i / LAST) * VB_W;
    const rev = STOPS[i] * (conv / 100) * ROYALTY;
    const y = VB_H - (rev / max) * (VB_H - PAD_TOP) - 1;
    pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  pts.push(`${VB_W} ${(PAD_TOP - 1).toFixed(1)}`);
  return pts.map((p, i) => (i === 0 ? "M" : "L") + p).join(" ");
}

function markerAt(idx: number, conv: number): { x: number; y: number } {
  const max = CEILING * (conv / 100) * ROYALTY;
  const rev = STOPS[idx] * (conv / 100) * ROYALTY;
  return {
    x: (idx / LAST) * VB_W,
    y: VB_H - (rev / max) * (VB_H - PAD_TOP) - 1,
  };
}

type Variant = "home" | "university";

const VARIANTS: Record<
  Variant,
  {
    audienceLabel: string;
    convLabel: string;
    defaultAudience: number;
    ctaLabel: string;
    ctaHref: string;
  }
> = {
  home: {
    audienceLabel: "Audience size",
    convLabel: "Share who sign up",
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
    defaultAudience: 2_000_000,
    ctaLabel: "Get your exact number",
    ctaHref:
      "mailto:partnerships@getelevatedwireless.com?subject=University%20Briefing%20%E2%80%94%20Our%20Numbers",
  },
};

// Panel-local colours. The instrument always sits on the dark band, so these
// are plain values rather than a light/dark pair.
const DIM = "rgba(255,255,255,0.52)";
const RULE = "rgba(255,255,255,0.13)";

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
      setAudienceIdx(nearestStopIndex(Math.min(CEILING, Math.max(500_000, a))));
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
    color: DIM,
    margin: 0,
  };

  return (
    <div
      className={className}
      style={{
        background: t.baseMid,
        color: t.paper,
        borderTop: `3px solid ${t.accent}`,
        padding: "26px 30px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      {/* ——— Crown ———
          Monthly and yearly stack as a pair. They used to sit at opposite
          corners of the panel with the full width empty between them, which
          was most of why it read wide and underfilled. */}
      <div className="ew-calc-crown">
        <div className="ew-calc-fig">
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
          <span style={microLabel}>per month</span>
        </div>
        <div className="ew-calc-fig">
          <p
            style={{
              fontFamily: t.sansDisplay,
              fontSize: 22,
              lineHeight: 1,
              fontWeight: 500,
              letterSpacing: "-0.018em",
              fontVariantNumeric: "tabular-nums",
              margin: 0,
              color: "rgba(255,255,255,0.88)",
            }}
          >
            {fmtMoney(yearly)}
          </p>
          <span style={microLabel}>per year</span>
        </div>
      </div>

      {/* ——— The plot, and the rail that drives it ———
          The rail carries its own label and live readout, matching the
          conversion control below it. Without them the only clue that the
          thing being dragged was audience size was the axis ticks, which is
          not a connection a visitor should have to make. */}
      <div>
        <div className="ew-calc-rowtop">
          <label htmlFor={`ew-audience-${variant}`} style={microLabel}>
            {brand ? `${brand} fans` : v.audienceLabel}:
          </label>
          <p
            style={{
              fontFamily: t.sansDisplay,
              fontSize: 17,
              fontWeight: 500,
              letterSpacing: "-0.012em",
              fontVariantNumeric: "tabular-nums",
              margin: 0,
            }}
          >
            {fmtInt(audience)}
          </p>
        </div>
        <svg
          className="ew-calc-plot"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path d={`${path} L${VB_W} ${VB_H} L0 ${VB_H} Z`} fill="rgba(205,4,11,0.12)" />
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
            stroke="rgba(255,255,255,0.42)"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
          <circle cx={marker.x} cy={marker.y} r={4} fill={t.paper} />
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
            aria-valuetext={fmtInt(audience)}
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
      <div className="ew-calc-foot" style={{ borderTopColor: RULE }}>
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
                    background: active ? t.paper : "transparent",
                    color: active ? t.ink : "rgba(255,255,255,0.8)",
                    border: `1px solid ${active ? t.paper : "rgba(255,255,255,0.26)"}`,
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
            color: t.paper,
            borderBottom: "1px solid rgba(255,255,255,0.4)",
            paddingBottom: 4,
          }}
        >
          {v.ctaLabel}
          <span aria-hidden="true" style={{ fontSize: 14, opacity: 0.8, lineHeight: 1 }}>
            →
          </span>
        </a>
      </div>

      {/* The number above is a model, and says so. In a first meeting that is
          the difference between a projection and a promise. */}
      <p
        style={{
          fontFamily: t.mono,
          fontSize: 10.5,
          letterSpacing: "0.04em",
          color: "rgba(255,255,255,0.42)",
          margin: 0,
        }}
      >
        Illustrative. Assumes a ${ROYALTY} monthly royalty per subscriber. Your terms
        are set in the agreement.
      </p>
    </div>
  );
}
