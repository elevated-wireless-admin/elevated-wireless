"use client";

import { tokens as t } from "@/lib/tokens";
import { Label, Reveal } from "./primitives";

function AccessWord() {
  // Direction B final: silver treatment — oversized bright platinum.
  return (
    <span
      style={{
        display: "inline-block",
        color: t.metalBright,
        fontWeight: 700,
        letterSpacing: "0.04em",
      }}
    >
      ACCESS.
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
        padding: "120px 56px 140px",
        position: "relative",
        overflow: "hidden",
        minHeight: 780,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 24,
          right: 56,
          display: "flex",
          gap: 20,
        }}
      >
        <Label style={{ color: t.metal, opacity: 0.6 }}>MMXXVI</Label>
        <Label style={{ color: t.metal, opacity: 0.6 }}>Private · By Invitation</Label>
      </div>

      <Reveal>
        <div style={{ maxWidth: 1400, display: "flex", flexDirection: "column", gap: 32 }}>
          <Label style={{ color: t.metalBright, letterSpacing: "0.34em" }}>
            The Next Evolution of Wireless
          </Label>

          <h1
            style={{
              fontFamily: t.sansDisplay,
              fontSize: "clamp(88px, 11.2vw, 156px)",
              lineHeight: 0.94,
              fontWeight: 500,
              letterSpacing: "-0.03em",
              margin: 0,
              maxWidth: 1340,
            }}
          >
            The next evolution
            <br />
            of wireless is <AccessWord />
          </h1>

          <p
            style={{
              fontFamily: t.sans,
              fontSize: 18,
              lineHeight: 1.55,
              maxWidth: 640,
              opacity: 0.82,
              margin: "12px 0 0",
            }}
          >
            Elevated delivers premium cellular on Verizon 5G — and direct access to some of the
            most sought-after people, ideas, and experiences on earth. Leverage our platform to
            launch your own branded wireless offering.
          </p>

          <div style={{ display: "flex", gap: 14, marginTop: 20 }}>
            <a
              href="#category"
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
              Learn More
              <span aria-hidden="true" style={{ fontSize: 14, opacity: 0.8, lineHeight: 1, fontWeight: 500 }}>↓</span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
