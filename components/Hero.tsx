"use client";

import { useEffect } from "react";
import { tokens as t } from "@/lib/tokens";
import { EWMark, Label, Reveal } from "./primitives";

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

function useHeroAmbient() {
  useEffect(() => {
    const phrases = [
      "Verizon 5G · nationwide",
      "Monthly royalties",
      "Fully operated · your brand",
      "Launch in weeks · not quarters",
    ];
    let phraseIdx = 0;
    const signalEl = document.querySelector<HTMLElement>("[data-hero-signal]");
    const clockEl = document.querySelector<HTMLElement>("[data-hero-clock]");

    const tickSignal = () => {
      if (!signalEl) return;
      signalEl.style.transition = "opacity 500ms ease, transform 500ms ease";
      signalEl.style.opacity = "0";
      signalEl.style.transform = "translateY(-4px)";
      setTimeout(() => {
        signalEl.textContent = phrases[phraseIdx % phrases.length];
        phraseIdx++;
        signalEl.style.opacity = "1";
        signalEl.style.transform = "translateY(0)";
      }, 520);
    };

    const tickClock = () => {
      if (!clockEl) return;
      const d = new Date();
      const h = String(d.getHours()).padStart(2, "0");
      const m = String(d.getMinutes()).padStart(2, "0");
      const s = String(d.getSeconds()).padStart(2, "0");
      clockEl.textContent = `MMXXVI · ${h}:${m}:${s} PDT`;
    };

    tickClock();
    tickSignal();
    const c = setInterval(tickClock, 1000);
    const sgn = setInterval(tickSignal, 4200);
    return () => {
      clearInterval(c);
      clearInterval(sgn);
    };
  }, []);
}

function HeroRightRail() {
  return (
    <div
      aria-hidden="true"
      className="ew-hero-rail"
      style={{
        position: "absolute",
        top: 24,
        right: 56,
        bottom: 48,
        width: 240,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        pointerEvents: "none",
      }}
    >
      {/* Top block — live clock + invitation line */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ height: 1, background: t.metal, opacity: 0.25 }} />
        <Label
          style={{
            color: t.metal,
            opacity: 0.75,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <span data-hero-clock>MMXXVI</span>
        </Label>
        <Label style={{ color: t.metal, opacity: 0.55 }}>
          Private · By Invitation
        </Label>
      </div>

      {/* Middle block — engineering-style signal column */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 0",
          position: "relative",
        }}
      >
        <svg
          width="240"
          height="260"
          viewBox="0 0 240 260"
          style={{ display: "block", overflow: "visible" }}
        >
          {/* vertical hairline spine */}
          <line
            x1="120"
            y1="0"
            x2="120"
            y2="260"
            stroke={t.metal}
            strokeWidth="0.6"
            opacity="0.35"
          />

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
            <circle
              cx="0"
              cy="0"
              r="44"
              fill={t.navy}
              stroke={t.metal}
              strokeWidth="0.5"
              opacity="0.9"
            />
            <circle
              cx="0"
              cy="0"
              r="52"
              fill="none"
              stroke={t.metal}
              strokeWidth="0.4"
              opacity="0.45"
            />
            <circle
              cx="0"
              cy="0"
              r="62"
              fill="none"
              stroke={t.metal}
              strokeWidth="0.3"
              opacity="0.25"
            />
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

      {/* Bottom block — rotating signal chip */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ height: 1, background: t.metal, opacity: 0.25 }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontFamily: t.mono,
            fontSize: 10.5,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: t.metalBright,
            opacity: 0.9,
            minHeight: 14,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: t.metalBright,
              boxShadow: `0 0 0 3px ${t.metalBright}22`,
              flexShrink: 0,
            }}
          />
          <span data-hero-signal style={{ display: "inline-block" }}>
            Verizon 5G · nationwide
          </span>
        </div>
        <Label style={{ color: t.metal, opacity: 0.45 }}>
          Verizon 5G · Nationwide
        </Label>
      </div>
    </div>
  );
}

export function Hero() {
  useHeroAmbient();

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
        minHeight: 780,
      }}
    >
      <HeroRightRail />

      <Reveal>
        <div style={{ maxWidth: 1400, display: "flex", flexDirection: "column", gap: 32 }}>
          <Label style={{ color: t.metalBright, letterSpacing: "0.34em" }}>
            The Next Evolution of Wireless
          </Label>

          <h1
            style={{
              fontFamily: t.sansDisplay,
              fontSize: "clamp(64px, 8.4vw, 120px)",
              lineHeight: 0.98,
              fontWeight: 500,
              letterSpacing: "-0.03em",
              margin: 0,
              maxWidth: 1340,
            }}
          >
            Be the phone company
            <br />
            for the people who love you.
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
              href="mailto:partnerships@getelevatedwireless.com?subject=Join%20Elevated"
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
              Join Elevated
              <span aria-hidden="true" style={{ fontSize: 14, opacity: 0.8, lineHeight: 1, fontWeight: 500 }}>→</span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
