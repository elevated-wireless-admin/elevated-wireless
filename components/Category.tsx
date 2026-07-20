"use client";

import { tokens as t } from "@/lib/tokens";
import { Reveal } from "./primitives";

const PARAS = [
  "300 million Americans spend $349 billion a year with AT&T, T-Mobile, and Verizon — without feeling loyalty to any of them. Thirty years of price, coverage, and speed. A commodity with a logo.",
  "The brands people actually love should be competing here. Most still believe in a barrier to entry that fell years ago.",
  "For the brands these customers love, wireless is the next layer of a relationship they've already earned. Elevated is the platform that makes it possible.",
];

export function Category() {
  return (
    <section
      id="category"
      data-screen-label="03 Category"
      className="ew-pad-md"
      style={{
        background: t.paper,
        color: t.ink,
        padding: "140px 56px",
        borderBottom: `1px solid ${t.line}`,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: t.sansDisplay,
            fontSize: "clamp(42px, 5.6vw, 72px)",
            lineHeight: 1.02,
            fontWeight: 500,
            letterSpacing: "-0.025em",
            margin: "0 0 72px",
            maxWidth: 1100,
          }}
        >
          No one loves their carrier.
        </h2>

        <div
          className="ew-stack-md"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 40,
          }}
        >
          {PARAS.map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ borderTop: `1px solid ${t.line}`, paddingTop: 20 }}>
                <div
                  style={{
                    fontFamily: t.mono,
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    opacity: 0.5,
                    marginBottom: 14,
                  }}
                >
                  0{i + 1}
                </div>
                <p style={{ fontSize: 16, lineHeight: 1.6, margin: 0 }}>{p}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Pull-quote / "The Math" panel */}
        <Reveal
          style={{
            marginTop: 120,
            background: t.navy,
            color: t.paper,
            position: "relative",
            overflow: "hidden",
            padding: "72px 72px 80px",
            display: "block",
          }}
        >
          <div
            className="ew-stack-md ew-stagger"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr auto 1fr",
              alignItems: "center",
              gap: 0,
              marginTop: 40,
              marginBottom: 56,
            }}
          >
            {/* Cell 1 — Three carriers */}
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 18 }}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 28,
                      height: 56,
                      border: `1px solid ${t.metal}`,
                      background: i === 0 ? t.metal : "transparent",
                      opacity: i === 0 ? 1 : 0.55,
                    }}
                  />
                ))}
              </div>
              <div
                className="ew-math-num"
                style={{
                  fontFamily: t.sansDisplay,
                  fontSize: 88,
                  fontWeight: 500,
                  lineHeight: 1,
                  color: t.metalBright,
                }}
              >
                3
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontFamily: t.mono,
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: t.metal,
                  opacity: 0.85,
                }}
              >
                National carriers
              </div>
            </div>

            <div
              style={{
                fontFamily: t.sansDisplay,
                fontSize: 36,
                fontWeight: 300,
                color: t.metal,
                opacity: 0.55,
                padding: "0 28px",
              }}
            >
              ×
            </div>

            {/* Cell 2 — Hundreds of audiences */}
            <div style={{ textAlign: "center" }}>
              <div
                className="ew-dots"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(10, 1fr)",
                  gap: 4,
                  width: 200,
                  margin: "0 auto 18px",
                }}
              >
                {Array.from({ length: 40 }).map((_, i) => {
                  const dotOpacity = 0.25 + (i % 7) * 0.1;
                  return (
                    <div
                      key={i}
                      style={{
                        width: "100%",
                        aspectRatio: "1 / 1",
                        background: t.metal,
                        ["--dot-opacity" as string]: String(dotOpacity),
                        transitionDelay: `${(i % 10) * 25 + Math.floor(i / 10) * 60}ms`,
                      } as React.CSSProperties}
                    />
                  );
                })}
              </div>
              <div
                className="ew-math-num"
                style={{
                  fontFamily: t.sansDisplay,
                  fontSize: 88,
                  fontWeight: 500,
                  lineHeight: 1,
                  color: t.metalBright,
                }}
              >
                100s
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontFamily: t.mono,
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: t.metal,
                  opacity: 0.85,
                }}
              >
                Loved brands
              </div>
            </div>

            {/* Equals */}
            <div
              style={{
                padding: "0 28px",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <div style={{ height: 2, width: 28, background: t.metal, opacity: 0.6 }} />
              <div style={{ height: 2, width: 28, background: t.metal, opacity: 0.6 }} />
            </div>

            {/* Cell 3 — Hub-and-spoke + ∞ */}
            <div style={{ textAlign: "center" }}>
              <svg
                width="200"
                height="110"
                viewBox="0 0 200 110"
                style={{ margin: "0 auto 18px", display: "block", overflow: "visible" }}
              >
                {(() => {
                  const cx = 100;
                  const cy = 55;
                  const r = 44;
                  const nodes = Array.from({ length: 6 }).map((_, i) => {
                    const a = (Math.PI * 2 * i) / 6 - Math.PI / 2;
                    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
                  });
                  return (
                    <g>
                      {nodes.map((n, i) => (
                        <line
                          key={`l${i}`}
                          x1={cx}
                          y1={cy}
                          x2={n.x}
                          y2={n.y}
                          stroke={t.metal}
                          strokeWidth="0.75"
                          opacity="0.55"
                        />
                      ))}
                      {nodes.map((n, i) => (
                        <g key={`n${i}`}>
                          <circle cx={n.x} cy={n.y} r="6" fill="none" stroke={t.metal} strokeWidth="1" />
                          <circle cx={n.x} cy={n.y} r="2.5" fill={t.metalBright} opacity="0.8" />
                        </g>
                      ))}
                      <circle cx={cx} cy={cy} r="11" fill={t.metalBright} />
                      <circle
                        cx={cx}
                        cy={cy}
                        r="17"
                        fill="none"
                        stroke={t.metalBright}
                        strokeWidth="0.5"
                        opacity="0.4"
                      />
                    </g>
                  );
                })()}
              </svg>
              <div
                className="ew-math-num"
                style={{
                  fontFamily: t.sansDisplay,
                  fontSize: 88,
                  fontWeight: 500,
                  lineHeight: 1,
                  color: t.metalBright,
                }}
              >
                ∞
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontFamily: t.mono,
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: t.metal,
                  opacity: 0.85,
                }}
              >
                Branded relationships
              </div>
            </div>
          </div>

          <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto" }}>
            <div
              className="ew-rule-draw"
              aria-hidden="true"
              style={{
                height: 1,
                width: "100%",
                background: t.navyMid,
                marginBottom: 48,
              }}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: 40,
                alignItems: "start",
              }}
            >
              <div
                style={{
                  fontFamily: t.sansDisplay,
                  fontSize: 120,
                  lineHeight: 0.7,
                  color: t.metalBright,
                  fontWeight: 300,
                  paddingTop: 8,
                }}
              >
                &ldquo;
              </div>
              <div
                style={{
                  fontFamily: t.sansDisplay,
                  fontSize: "clamp(30px, 3.6vw, 46px)",
                  lineHeight: 1.18,
                  fontWeight: 400,
                  letterSpacing: "-0.018em",
                  fontStyle: "italic",
                  color: t.paper,
                  maxWidth: 900,
                }}
              >
                Three national carriers.
                <br />
                Hundreds of loved brands.
                <br />
                <span style={{ color: t.metalBright }}>
                  The math isn&rsquo;t going to hold.
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
