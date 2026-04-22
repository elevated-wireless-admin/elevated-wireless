"use client";

import { tokens as t } from "@/lib/tokens";
import { Label, Reveal } from "./primitives";

type Engine = {
  n: string;
  name: string;
  body: string;
  who: string;
  cta?: string;
};

const ENGINES: Engine[] = [
  {
    n: "01",
    name: "Flagship Brands",
    body: "Custom-built premium wireless companies for recognized brands with audiences worth the full build. Long cycle. Large revenue. We run the operating company end-to-end.",
    who: "Media empires · Legacy consumer brands · Category-defining personalities",
  },
  {
    n: "02",
    name: "White-Label Brands",
    body: "Turnkey branded wireless for high-affinity audiences — media personalities, mission-driven brands, universities, celebrities with their own business ambitions. Fast to market. Recurring royalties.",
    who: "Glenn Beck–pattern partners · NIL schools · The Ryan Reynolds category",
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
  {
    n: "05",
    name: "Elevated Wireless (D2C)",
    body: "Our own luxury wireless service. Premium cellular on Verizon 5G. Full access to the Elevated members' network — mastermind calls, curated experiences, AI advisor bench, partner perks.",
    who: "Affluent professionals · Launching 2026",
    cta: "Join the waitlist →",
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
              Five engines.
              <br />
              One platform.
            </h2>
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.6, opacity: 0.75, paddingBottom: 12, margin: 0 }}>
            Elevated earns on five distinct paths — from turnkey brand licensing to our own
            luxury wireless service. Each engine compounds the next.
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
          {ENGINES.map((e, i) => {
            const isFeatured = i === 4;
            return (
              <Reveal
                key={e.n}
                delay={i * 60}
                style={{
                  gridColumn: isFeatured ? "span 12" : "span 6",
                  display: "block",
                }}
              >
                <div
                  style={{
                    borderRight: `1px solid ${t.line}`,
                    borderBottom: `1px solid ${t.line}`,
                    padding: 40,
                    background: isFeatured ? t.navy : "transparent",
                    color: isFeatured ? t.paper : t.ink,
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    minHeight: 280,
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Label style={{ opacity: 0.55, color: isFeatured ? t.metal : t.ink }}>
                      Engine {e.n}
                    </Label>
                    {isFeatured && (
                      <Label style={{ color: t.metalBright, letterSpacing: "0.22em" }}>
                        Launching 2026
                      </Label>
                    )}
                  </div>
                  <h3
                    style={{
                      fontFamily: t.sansDisplay,
                      fontSize: isFeatured ? 40 : 28,
                      fontWeight: 500,
                      letterSpacing: "-0.018em",
                      lineHeight: 1.1,
                      margin: "0 0 4px",
                      color: isFeatured ? t.metalBright : t.ink,
                    }}
                  >
                    {e.name}
                  </h3>
                  <p
                    style={{
                      fontSize: 14.5,
                      lineHeight: 1.6,
                      margin: 0,
                      opacity: isFeatured ? 0.85 : 0.78,
                      maxWidth: isFeatured ? 720 : "none",
                    }}
                  >
                    {e.body}
                  </p>
                  <div
                    style={{
                      marginTop: "auto",
                      paddingTop: 14,
                      borderTop: `1px solid ${isFeatured ? t.navyMid : t.line}`,
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
                  {e.cta && (
                    <a
                      href="#partner"
                      style={{
                        marginTop: 8,
                        padding: "12px 20px",
                        background: t.metalBright,
                        color: t.navy,
                        fontFamily: t.mono,
                        fontSize: 11.5,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        alignSelf: "flex-start",
                      }}
                    >
                      {e.cta}
                    </a>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
