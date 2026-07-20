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
    name: "White-Label Brands",
    body: "Turnkey branded wireless for audiences with real affinity — media personalities, universities, mission-driven brands. They bring the audience; we bring the entire company.",
    who: "Media personalities · Universities · Mission-driven brands",
  },
  {
    n: "02",
    name: "Flagship Brands",
    body: "Higher-touch anchor partnerships with co-marketing, custom development, and deeper integration.",
    who: "Anchor brand partnerships",
  },
  {
    n: "03",
    name: "Wireless as a Benefit",
    body: "B2B licensing of wireless as an employee or member benefit — masterminds, associations, enterprise programs.",
    who: "Masterminds · Associations · Enterprise programs",
  },
  {
    n: "04",
    name: "Services",
    body: "Platform-side enablement — creative, support, data — sold to brands and operators.",
    who: "Brands · Operators",
  },
  {
    n: "05",
    name: "Elevated Wireless (D2C)",
    body: "Our own premium service on Verizon 5G, proving the category works. Launching 2026.",
    who: "Direct to consumer · Launching 2026",
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
              Five streams.
              <br />
              One platform.
            </h2>
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.6, opacity: 0.75, paddingBottom: 12, margin: 0 }}>
            A single shared platform monetized through five distinct paths. Each stream compounds
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
              key={e.n}
              delay={i * 60}
              style={{
                gridColumn:
                  i === ENGINES.length - 1 && ENGINES.length % 2 === 1 ? "span 12" : "span 6",
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
