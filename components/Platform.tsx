"use client";

import { tokens as t } from "@/lib/tokens";
import { DuotonePhoto, Label, Reveal } from "./primitives";

// ————————————————————————————————————————————————
// 6a — NetworkDiagram
// Verizon 5G → Elevated (hub) → Brand carriers → Members
// (Reach Mobile intentionally omitted from the public topology.)
// ————————————————————————————————————————————————
function NetworkDiagram() {
  const W = 560;
  const H = 420;
  const cols = [
    { x: 100, label: "Verizon 5G", sub: "Network", r: 28, hub: false },
    { x: 260, label: "Elevated", sub: "Operating co", r: 36, hub: true },
    { x: 400, label: "Brand carrier", sub: "White-label", r: 22, hub: false },
    { x: 510, label: "Members", sub: "", r: 10, hub: false },
  ];
  const HUB_IDX = 1;
  const BRAND_IDX = 2;
  const MEMBER_IDX = 3;
  const cy = H / 2;
  const brandYs = [cy - 80, cy, cy + 80];
  const memberDots = (bx: number, by: number) => {
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i < 5; i++) {
      const ang = -Math.PI / 3 + ((Math.PI * 2) / 3) * (i / 4);
      pts.push({ x: bx + Math.cos(ang) * 50, y: by + Math.sin(ang) * 28 });
    }
    return pts;
  };
  return (
    <div
      style={{
        height: 420,
        border: `1px solid ${t.line}`,
        background: t.paper,
        position: "relative",
        overflow: "hidden",
        padding: 24,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 18,
          left: 24,
          fontFamily: t.mono,
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: t.metal,
          opacity: 0.7,
        }}
      >
        Fig. 6a — Network topology
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ display: "block" }}>
        <defs>
          <pattern id="grid6a" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={t.line} strokeWidth="0.4" opacity="0.5" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#grid6a)" />

        {/* Verizon → Elevated */}
        <line
          x1={cols[0].x + cols[0].r}
          y1={cy}
          x2={cols[HUB_IDX].x - cols[HUB_IDX].r}
          y2={cy}
          stroke={t.ink}
          strokeWidth="1"
        />

        {/* Elevated → 3 brand carriers */}
        {brandYs.map((by, i) => (
          <line
            key={`eb${i}`}
            x1={cols[HUB_IDX].x + cols[HUB_IDX].r}
            y1={cy}
            x2={cols[BRAND_IDX].x - cols[BRAND_IDX].r}
            y2={by}
            stroke={t.ink}
            strokeWidth="1"
            opacity="0.85"
          />
        ))}

        {/* Brands → members */}
        {brandYs.map((by, i) => {
          const pts = memberDots(cols[MEMBER_IDX].x, by);
          return (
            <g key={`bm${i}`}>
              {pts.map((p, j) => (
                <line
                  key={j}
                  x1={cols[BRAND_IDX].x + cols[BRAND_IDX].r}
                  y1={by}
                  x2={p.x}
                  y2={p.y}
                  stroke={t.metal}
                  strokeWidth="0.6"
                  strokeDasharray="2 3"
                  opacity="0.7"
                />
              ))}
              {pts.map((p, j) => (
                <circle key={`m${j}`} cx={p.x} cy={p.y} r="2.2" fill={t.ink} opacity="0.75" />
              ))}
            </g>
          );
        })}

        {/* Nodes */}
        {cols.map((c, i) => {
          if (i === BRAND_IDX) {
            return brandYs.map((by, j) => (
              <g key={`brand-${j}`}>
                <circle cx={c.x} cy={by} r={c.r} fill={t.paper} stroke={t.ink} strokeWidth="1" />
                <circle cx={c.x} cy={by} r="5" fill={t.ink} opacity="0.9" />
              </g>
            ));
          }
          if (i === MEMBER_IDX) return null;
          return (
            <g key={c.label}>
              {c.hub && (
                <>
                  <circle
                    cx={c.x}
                    cy={cy}
                    r={c.r + 10}
                    fill="none"
                    stroke={t.metal}
                    strokeWidth="0.5"
                    opacity="0.4"
                  />
                  <circle
                    cx={c.x}
                    cy={cy}
                    r={c.r + 18}
                    fill="none"
                    stroke={t.metal}
                    strokeWidth="0.5"
                    opacity="0.2"
                  />
                </>
              )}
              <circle
                cx={c.x}
                cy={cy}
                r={c.r}
                fill={c.hub ? t.navy : t.paper}
                stroke={c.hub ? t.navy : t.ink}
                strokeWidth="1.25"
              />
              {c.hub && (
                <text
                  x={c.x}
                  y={cy + 4}
                  textAnchor="middle"
                  fill={t.metalBright}
                  style={{ fontFamily: "serif", fontSize: 16, fontStyle: "italic", fontWeight: 500 }}
                >
                  E
                </text>
              )}
              {!c.hub && <circle cx={c.x} cy={cy} r={c.r * 0.35} fill={t.ink} opacity="0.85" />}
            </g>
          );
        })}

        {/* Labels */}
        {cols.map((c, i) => {
          const y = i === BRAND_IDX ? brandYs[0] - c.r - 14 : cy - c.r - 14;
          return (
            <g key={`lbl-${i}`}>
              <text
                x={c.x}
                y={y}
                textAnchor="middle"
                fill={t.ink}
                style={{ fontFamily: "inherit", fontSize: 11, fontWeight: 600, letterSpacing: "0.02em" }}
              >
                {c.label}
              </text>
              {c.sub && (
                <text
                  x={c.x}
                  y={y + 12}
                  textAnchor="middle"
                  fill={t.metal}
                  style={{
                    fontFamily: t.mono,
                    fontSize: 8.5,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  {c.sub}
                </text>
              )}
            </g>
          );
        })}

        {/* Brand-layer bracket */}
        <g opacity="0.6">
          <path
            d={`M ${cols[BRAND_IDX].x + cols[BRAND_IDX].r + 8} ${brandYs[0]} L ${cols[BRAND_IDX].x + cols[BRAND_IDX].r + 12} ${brandYs[0]} L ${cols[BRAND_IDX].x + cols[BRAND_IDX].r + 12} ${brandYs[2]} L ${cols[BRAND_IDX].x + cols[BRAND_IDX].r + 8} ${brandYs[2]}`}
            fill="none"
            stroke={t.metal}
            strokeWidth="0.7"
          />
          <text
            x={cols[BRAND_IDX].x + cols[BRAND_IDX].r + 18}
            y={cy + 3}
            fill={t.metal}
            style={{
              fontFamily: t.mono,
              fontSize: 8,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            n brands
          </text>
        </g>
      </svg>
    </div>
  );
}

// ————————————————————————————————————————————————
// 6b — DataPyramid
// Prescriptive → Predictive → Diagnostic → Descriptive
// ————————————————————————————————————————————————
function DataPyramid() {
  const W = 560;
  const H = 420;
  const cx = W / 2;
  const pyTop = 70;
  const pyBottom = 340;
  const pyHalfBase = 200;
  const tiers = [
    { label: "Prescriptive", sub: "What should we do?", note: "Churn saves · capacity plans" },
    { label: "Predictive", sub: "What will happen?", note: "Forecasts · cohort intent" },
    { label: "Diagnostic", sub: "Why did it happen?", note: "Root cause · attribution" },
    { label: "Descriptive", sub: "What happened?", note: "Activation · usage · churn" },
  ];
  const tierH = (pyBottom - pyTop) / tiers.length;
  const halfAt = (y: number) => ((y - pyTop) / (pyBottom - pyTop)) * pyHalfBase;

  return (
    <div
      style={{
        height: 420,
        border: `1px solid ${t.line}`,
        background: t.paper,
        position: "relative",
        overflow: "hidden",
        padding: 24,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 18,
          left: 24,
          fontFamily: t.mono,
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: t.metal,
          opacity: 0.7,
        }}
      >
        Fig. 6b — Analytics maturity
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ display: "block" }}>
        <defs>
          <pattern id="grid6b" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={t.line} strokeWidth="0.4" opacity="0.5" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#grid6b)" />

        {tiers.map((tier, i) => {
          const yTop = pyTop + i * tierH;
          const yBot = yTop + tierH;
          const hTop = halfAt(yTop);
          const hBot = halfAt(yBot);
          const fillOpacity = 0.06 + i * 0.07;
          return (
            <g key={tier.label}>
              <polygon
                points={`${cx - hTop},${yTop} ${cx + hTop},${yTop} ${cx + hBot},${yBot} ${cx - hBot},${yBot}`}
                fill={t.navy}
                fillOpacity={fillOpacity}
                stroke={t.ink}
                strokeWidth="1"
              />
              <text
                x={cx}
                y={yTop + tierH / 2 - 2}
                textAnchor="middle"
                fill={t.ink}
                style={{
                  fontFamily: "inherit",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "-0.005em",
                }}
              >
                {tier.label}
              </text>
              <text
                x={cx}
                y={yTop + tierH / 2 + 13}
                textAnchor="middle"
                fill={t.metal}
                style={{ fontFamily: "inherit", fontSize: 10, fontStyle: "italic" }}
              >
                {tier.sub}
              </text>
            </g>
          );
        })}

        {tiers.map((tier, i) => {
          const yMid = pyTop + i * tierH + tierH / 2;
          const xLabel = cx + pyHalfBase + 24;
          return (
            <g key={`ann-${i}`} opacity="0.85">
              <line
                x1={cx + halfAt(yMid) + 4}
                y1={yMid}
                x2={xLabel - 6}
                y2={yMid}
                stroke={t.metal}
                strokeWidth="0.6"
                strokeDasharray="2 3"
              />
              <text
                x={xLabel}
                y={yMid + 3}
                fill={t.metal}
                style={{
                  fontFamily: t.mono,
                  fontSize: 8.5,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {tier.note}
              </text>
            </g>
          );
        })}

        <g opacity="0.7">
          <line x1="28" y1={pyBottom} x2="28" y2={pyTop + 6} stroke={t.ink} strokeWidth="0.8" />
          <polygon points={`28,${pyTop} 25,${pyTop + 8} 31,${pyTop + 8}`} fill={t.ink} />
          <text
            x="16"
            y={pyTop + (pyBottom - pyTop) / 2}
            fill={t.metal}
            transform={`rotate(-90 16 ${pyTop + (pyBottom - pyTop) / 2})`}
            textAnchor="middle"
            style={{
              fontFamily: t.mono,
              fontSize: 9,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Maturity →
          </text>
        </g>

        <text
          x={cx}
          y={pyBottom + 24}
          textAnchor="middle"
          fill={t.ink}
          opacity="0.65"
          style={{
            fontFamily: t.mono,
            fontSize: 9,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Every layer of the business
        </text>
      </svg>
    </div>
  );
}

// ————————————————————————————————————————————————
// Platform section
// ————————————————————————————————————————————————
type Row = {
  label: string;
  title: string;
  body: string;
  bullets: string[];
  diagram?: "network" | "pyramid";
  img?: string;
  src?: string;
};

const ROWS: Row[] = [
  {
    label: "6a · Network + Operations",
    title: "Verizon 5G, end-to-end.",
    body: "Connectivity via our MVNO partnership. SIM provisioning, device activation, billing, customer support, regulatory compliance, carrier reporting — all handled.",
    bullets: [
      "Verizon 5G nationwide (same network, different experience)",
      "MVNO operations end-to-end",
      "Billing, compliance, support infrastructure",
      "Onboard a brand in weeks, not quarters",
    ],
    diagram: "network",
  },
  {
    label: "6b · Data + Intelligence",
    title: "Descriptive to prescriptive.",
    body: "Purpose-built analytics across every layer of the business. We don't just run the wireless; we learn from it.",
    bullets: [
      "User-level metrics: activation, usage, engagement, churn",
      "Cohort intelligence and segmentation",
      "Churn prediction, revenue forecasting, capacity planning",
      "Partner dashboards and A/B testing infrastructure",
    ],
    diagram: "pyramid",
  },
  {
    label: "6c · Branded Experience",
    title: "Your audience, closer.",
    body: "A customized branded experience that maintains — and often enhances — the relationship you've already built with your audience. Members get exclusive benefits they can't find anywhere else. What's inside is shaped with each partner, so the experience fits what makes your audience yours.",
    bullets: [
      "Your name on the service, your voice in the communication",
      "Exclusive member-only benefits not available anywhere else",
      "Your audience stays yours — no cross-carrier sharing, no list commingling",
      "Shaped with each partner — no one-size-fits-all",
    ],
    img: "editorial · branded experience",
    src: "/img/platform-6c.jpg",
  },
];

function RowContent({ r }: { r: Row }) {
  return (
    <div>
      <Label style={{ opacity: 0.55, marginBottom: 16 }}>{r.label}</Label>
      <h3
        style={{
          fontFamily: t.sansDisplay,
          fontSize: "clamp(32px, 3.6vw, 44px)",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          lineHeight: 1.08,
          margin: "0 0 20px",
        }}
      >
        {r.title}
      </h3>
      <p style={{ fontSize: 16, lineHeight: 1.6, margin: "0 0 24px", opacity: 0.8, maxWidth: 560 }}>
        {r.body}
      </p>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {r.bullets.map((b) => (
          <li
            key={b}
            style={{
              display: "flex",
              gap: 14,
              fontSize: 14,
              lineHeight: 1.5,
              opacity: 0.82,
            }}
          >
            <span
              style={{
                color: t.metal,
                flexShrink: 0,
                fontFamily: t.mono,
                fontSize: 11,
                paddingTop: 3,
              }}
            >
              —
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RowVisual({ r }: { r: Row }) {
  if (r.diagram === "network") return <NetworkDiagram />;
  if (r.diagram === "pyramid") return <DataPyramid />;
  return (
    <DuotonePhoto
      ratio="4 / 3"
      shadow={t.navy}
      highlight={t.paper}
      midtone={t.metal}
      src={r.src!}
      alt={r.img || ""}
      style={{ height: 420, aspectRatio: "auto" }}
    />
  );
}

export function Platform() {
  return (
    <section
      id="platform"
      data-screen-label="06 Platform"
      className="ew-pad-md"
      style={{
        background: t.paperDim,
        color: t.ink,
        padding: "140px 56px",
        borderTop: `1px solid ${t.line}`,
        borderBottom: `1px solid ${t.line}`,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ marginBottom: 80, maxWidth: 1100 }}>
          <Label style={{ opacity: 0.6, marginBottom: 24 }}>The Platform</Label>
          <h2
            style={{
              fontFamily: t.sansDisplay,
              fontSize: "clamp(40px, 5.2vw, 68px)",
              lineHeight: 1.05,
              fontWeight: 500,
              letterSpacing: "-0.025em",
              margin: 0,
            }}
          >
            Everything a brand needs to become a carrier — and nothing they shouldn&apos;t have to touch.
          </h2>
        </div>

        {ROWS.map((r, i) => {
          const flip = i % 2 !== 0;
          return (
            <Reveal key={r.label} delay={i * 80}>
              <div
                className="ew-stack-md"
                style={{
                  display: "grid",
                  gridTemplateColumns: flip ? "1fr 1.1fr" : "1.1fr 1fr",
                  gap: 64,
                  padding: "60px 0",
                  borderTop: `1px solid ${t.line}`,
                  alignItems: "center",
                }}
              >
                {flip ? (
                  <>
                    <RowVisual r={r} />
                    <RowContent r={r} />
                  </>
                ) : (
                  <>
                    <RowContent r={r} />
                    <RowVisual r={r} />
                  </>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
