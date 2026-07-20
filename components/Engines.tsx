"use client";

import { tokens as t } from "@/lib/tokens";
import { Reveal } from "./primitives";

type Engine = {
  name: string;
  body: string;
  who: string;
};

const ENGINES: Engine[] = [
  {
    name: "White-Label Brands",
    body: "Turnkey branded wireless for audiences with real affinity — media personalities, universities, mission-driven brands. They bring the audience; we bring the entire company.",
    who: "Media personalities · Universities · Mission-driven brands",
  },
  {
    name: "Flagship Brands",
    body: "Higher-touch anchor partnerships with co-marketing, custom development, and deeper integration.",
    who: "Anchor brand partnerships",
  },
  {
    name: "Wireless as a Benefit",
    body: "B2B licensing of wireless as an employee or member benefit — masterminds, associations, enterprise programs.",
    who: "Masterminds · Associations · Enterprise programs",
  },
  {
    name: "Services",
    body: "Platform-side enablement — creative, support, data — sold to brands and operators.",
    who: "Brands · Operators",
  },
];

// Numbered accent badge. Rendered as SVG so it stays a true circle — the
// global stylesheet forces border-radius:0 on every box element.
function NumberBadge({ n }: { n: number }) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" style={{ display: "block", flexShrink: 0 }}>
      <circle cx="18" cy="18" r="17" fill="none" stroke={t.ink} strokeWidth="1" />
      <text
        x="18"
        y="19"
        textAnchor="middle"
        dominantBaseline="central"
        fill={t.ink}
        style={{ fontFamily: t.sansDisplay, fontSize: 16, fontWeight: 500 }}
      >
        {n}
      </text>
    </svg>
  );
}

export function Engines() {
  return (
    <section
      id="engines"
      data-screen-label="05 Engines"
      className="ew-pad-md"
      style={{
        background: t.paper,
        color: t.ink,
        padding: "140px 56px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          className="ew-stack-md"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "end",
            marginBottom: 80,
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: t.sansDisplay,
                fontSize: "clamp(48px, 6.4vw, 80px)",
                lineHeight: 1.0,
                fontWeight: 500,
                letterSpacing: "-0.028em",
                margin: 0,
              }}
            >
              Four streams.
              <br />
              One platform.
            </h2>
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.6, opacity: 0.75, paddingBottom: 12, margin: 0 }}>
            A single shared platform monetized through four distinct paths. Each stream compounds
            the next.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: 0,
            borderTop: `1px solid ${t.line}`,
            borderLeft: `1px solid ${t.line}`,
          }}
        >
          {ENGINES.map((e, i) => (
            <Reveal
              key={e.name}
              delay={i * 60}
              style={{
                gridColumn: "span 6",
                display: "block",
              }}
            >
              <div
                style={{
                  borderRight: `1px solid ${t.line}`,
                  borderBottom: `1px solid ${t.line}`,
                  padding: 40,
                  background: "transparent",
                  color: t.ink,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  minHeight: 260,
                  height: "100%",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <NumberBadge n={i + 1} />
                  <h3
                    style={{
                      fontFamily: t.sansDisplay,
                      fontSize: 28,
                      fontWeight: 500,
                      letterSpacing: "-0.018em",
                      lineHeight: 1.1,
                      margin: 0,
                      color: t.ink,
                    }}
                  >
                    {e.name}
                  </h3>
                </div>
                <p
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.6,
                    margin: 0,
                    opacity: 0.78,
                  }}
                >
                  {e.body}
                </p>
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: 14,
                    borderTop: `1px solid ${t.line}`,
                    fontSize: 13,
                    opacity: 0.7,
                  }}
                >
                  {e.who}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal
          style={{
            marginTop: 56,
            paddingTop: 40,
            borderTop: `1px solid ${t.line}`,
            display: "block",
          }}
        >
          <p
            style={{
              fontFamily: t.sansDisplay,
              fontSize: "clamp(22px, 2.6vw, 30px)",
              lineHeight: 1.28,
              fontWeight: 400,
              fontStyle: "italic",
              letterSpacing: "-0.012em",
              margin: 0,
              maxWidth: 900,
              opacity: 0.9,
            }}
          >
            Same audience. Same wireless service. Repackaged and re-fronted by the brand the
            customer actually chose.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
