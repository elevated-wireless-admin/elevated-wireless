"use client";

import { CSSProperties } from "react";
import { tokens as t } from "@/lib/tokens";
import { EWMark, Reveal } from "./primitives";

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

function HeroDiagram() {
  return (
    <div
      aria-hidden="true"
      className="ew-hero-rail"
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 56,
        width: 240,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div style={{ position: "relative" }}>
        <svg
          width="240"
          height="260"
          viewBox="0 0 240 260"
          style={{ display: "block", overflow: "visible" }}
        >
          {/* vertical hairline spine */}
          <line x1="120" y1="0" x2="120" y2="260" stroke={t.metal} strokeWidth="0.6" opacity="0.35" />

          {/* hash-mark ticks along the spine */}
          {Array.from({ length: 13 }).map((_, i) => {
            const y = 8 + i * 20;
            const isMajor = i % 3 === 0;
            const len = isMajor ? 12 : 6;
            return (
              <line
                key={i}
                x1={120 - len}
                y1={y}
                x2={120 + len}
                y2={y}
                stroke={t.metal}
                strokeWidth="0.6"
                opacity={isMajor ? 0.55 : 0.3}
              />
            );
          })}

          {/* EW mark centered, with concentric ring halo */}
          <g transform="translate(120, 130)">
            <circle cx="0" cy="0" r="44" fill={t.navy} stroke={t.metal} strokeWidth="0.5" opacity="0.9" />
            <circle cx="0" cy="0" r="52" fill="none" stroke={t.metal} strokeWidth="0.4" opacity="0.45" />
            <circle cx="0" cy="0" r="62" fill="none" stroke={t.metal} strokeWidth="0.3" opacity="0.25" />
          </g>

          {/* 5G signal-bar motif below the mark */}
          <g transform="translate(98, 210)">
            {[0, 1, 2, 3, 4].map((i) => {
              const h = 6 + i * 4;
              return (
                <rect
                  key={i}
                  x={i * 10}
                  y={22 - h}
                  width="5"
                  height={h}
                  fill={t.metalBright}
                  opacity={i < 4 ? 0.85 : 0.35}
                />
              );
            })}
          </g>
        </svg>

        {/* EWMark overlay on top of the ring */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -58%)",
          }}
        >
          <EWMark size={44} ring={t.metalBright} ink={t.metalBright} />
        </div>
      </div>
    </div>
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
        padding: "120px 56px 140px",
        position: "relative",
        overflow: "hidden",
        minHeight: 720,
      }}
    >
      <HeroDiagram />

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

          <p
            style={{
              fontFamily: t.sans,
              fontSize: 18,
              lineHeight: 1.55,
              maxWidth: 680,
              opacity: 0.82,
              margin: "12px 0 0",
            }}
          >
            Elevated turns your audience into a branded wireless service you never have to run —
            Verizon 5G, fully operated, your name on it. You promote it. We handle everything else.
            You earn <RoyaltyPhrase />
          </p>

          <div style={{ display: "flex", gap: 14, marginTop: 20, flexWrap: "wrap" }}>
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
      </Reveal>
    </section>
  );
}
