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
        <div style={{ maxWidth: 1200, display: "flex", flexDirection: "column", gap: 28 }}>
          <Label style={{ color: t.metalBright, letterSpacing: "0.34em" }}>
            The Future Has Arrived
          </Label>

          <h1
            style={{
              fontFamily: t.sansDisplay,
              fontSize: "clamp(56px, 8vw, 112px)",
              lineHeight: 0.98,
              fontWeight: 500,
              letterSpacing: "-0.028em",
              margin: 0,
              maxWidth: 1100,
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
            most sought-after people, ideas, and experiences on earth. Join us or leverage our
            platform to launch your own branded wireless offer.
          </p>

          <div style={{ display: "flex", gap: 14, marginTop: 16, flexWrap: "wrap" }}>
            <a
              href="#partner"
              style={{
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
              Join Elevated →
            </a>
            <a
              href="#partner"
              style={{
                padding: "16px 26px",
                border: `1px solid ${t.metal}`,
                color: t.paper,
                fontFamily: t.mono,
                fontSize: 12,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              Launch Your Brand →
            </a>
          </div>

          <a
            href="#category"
            style={{
              marginTop: 40,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              opacity: 0.5,
              color: t.paper,
            }}
          >
            <Label>Learn more</Label>
            <span style={{ fontSize: 14 }}>↓</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
