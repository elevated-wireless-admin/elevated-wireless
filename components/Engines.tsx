"use client";

import { tokens as t } from "@/lib/tokens";
import { Label, Reveal } from "./primitives";

type Engine = {
  n: string;
  name: string;
  body: string;
  who: string;
};

const ENGINES: Engine[] = [
  {
    n: "01",
    name: "Flagship Brands",
    body: "Custom-built premium wireless ecosystems for the largest brands. Bespoke application, custom marketplace, custom programming, custom data layer — every part of the stack reshaped to the brand. Long cycle. Large revenue. Full operating responsibility.",
    who: "Media empires · Legacy consumer brands · Category-defining personalities",
  },
  {
    n: "02",
    name: "White-Label Brands",
    body: "Turnkey branded wireless on the operator stack we run ourselves. You get the relationship with our carrier partners, the pre-built application reskinned to your brand, and mobile as a new channel to activate your audience — surfacing offers, programming, and benefits that don't belong in email. Two-week onboarding. Recurring royalties.",
    who: "Influencer pattern partners · NIL schools · The Ryan Reynolds category",
  },
  {
    n: "03",
    name: "Cellular as a Benefit",
    body: "Premium wireless licensed at scale to private masterminds, membership organizations, professional associations, and enterprise benefits programs — offered to members at preferred pricing.",
    who: "Masterminds · Private clubs · Trade associations · HR benefits buyers",
  },
  {
    n: "04",
    name: "Services",
    body: "Marketing, data operations, and AI-native strategy — sold to other MVNOs, telecom operators, and enterprise wireless programs. The shortest sales cycle in the business.",
    who: "Operators with network but no team",
  },
];

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
            <Label style={{ opacity: 0.6, marginBottom: 24 }}>The Business</Label>
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
              Four engines.
              <br />
              One platform.
            </h2>
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.6, opacity: 0.75, paddingBottom: 12, margin: 0 }}>
            Elevated earns on four distinct paths — from turnkey brand licensing to enterprise
            benefits programs. Each engine compounds the next.
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
              key={e.n}
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
                  minHeight: 280,
                  height: "100%",
                }}
              >
                <Label style={{ opacity: 0.55, color: t.ink }}>Engine {e.n}</Label>
                <h3
                  style={{
                    fontFamily: t.sansDisplay,
                    fontSize: 28,
                    fontWeight: 500,
                    letterSpacing: "-0.018em",
                    lineHeight: 1.1,
                    margin: "0 0 4px",
                    color: t.ink,
                  }}
                >
                  {e.name}
                </h3>
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
                  }}
                >
                  <div
                    style={{
                      fontFamily: t.mono,
                      fontSize: 11.5,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      opacity: 0.55,
                      marginBottom: 4,
                    }}
                  >
                    For
                  </div>
                  <div style={{ fontSize: 13, opacity: 0.85 }}>{e.who}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
