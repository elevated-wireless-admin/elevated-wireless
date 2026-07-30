"use client";

import { CSSProperties } from "react";
import { tokens as t } from "@/lib/tokens";
import { Reveal } from "./primitives";
import { RevenueCalculator } from "./RevenueCalculator";

function RoyaltyPhrase() {
  // The design-moment word treatment, moved off "ACCESS" onto the royalty line.
  return (
    <span
      style={{
        color: t.metalBright,
        fontWeight: 700,
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
      }}
    >
      a royalty on every subscriber, every month.
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      data-screen-label="02 Hero"
      className="ew-pad-md"
      style={{
        background: t.navy,
        color: t.paper,
        padding: "88px 56px 120px",
        position: "relative",
        overflow: "hidden",
        minHeight: 720,
      }}
    >
      <Reveal>
        <div style={{ maxWidth: 1400, display: "flex", flexDirection: "column", gap: 32 }}>
          <h1
            style={{
              fontFamily: t.sansDisplay,
              fontSize: "clamp(54px, 6.6vw, 100px)",
              lineHeight: 1.0,
              fontWeight: 500,
              letterSpacing: "-0.03em",
              margin: 0,
              maxWidth: 1000,
              textWrap: "balance",
            } as CSSProperties}
          >
            <span style={{ display: "block", textWrap: "balance" } as CSSProperties}>
              Be the phone company
            </span>
            <span style={{ display: "block", textWrap: "balance" } as CSSProperties}>
              for the people who love you.
            </span>
          </h1>

          <div className="ew-hero-split">
            <div className="ew-hero-copy">
          <p
            style={{
              fontFamily: t.sans,
              fontSize: 18,
              lineHeight: 1.55,
              maxWidth: 680,
              opacity: 0.82,
              margin: 0,
            }}
          >
            Elevated turns your audience into a branded wireless service you never have to run —
            Verizon 5G, fully operated, your name on it. You promote it. We handle everything else.
            You earn <RoyaltyPhrase />
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a
              href="#partner"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 26px",
                background: t.metalBright,
                color: t.navy,
                fontFamily: t.mono,
                fontSize: 12,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Launch Your Brand
              <span aria-hidden="true" style={{ fontSize: 14, opacity: 0.8, lineHeight: 1, fontWeight: 500 }}>→</span>
            </a>
            <a
              href="mailto:invest@getelevatedwireless.com?subject=Investor%20Briefing"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 26px",
                background: "transparent",
                color: t.paper,
                border: `1px solid ${t.metal}`,
                fontFamily: t.mono,
                fontSize: 12,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Request an investor briefing
              <span aria-hidden="true" style={{ fontSize: 14, opacity: 0.8, lineHeight: 1, fontWeight: 500 }}>→</span>
            </a>
          </div>
            </div>

            <RevenueCalculator variant="home" className="ew-calc-card" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
