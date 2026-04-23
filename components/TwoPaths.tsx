"use client";

import { tokens as t } from "@/lib/tokens";
import { Label, Reveal } from "./primitives";

export function TwoPaths() {
  return (
    <section
      id="partner"
      data-screen-label="08 Two Paths"
      className="ew-pad-md"
      style={{
        background: t.navy,
        color: t.paper,
        padding: "140px 56px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <Label style={{ color: t.metal, marginBottom: 24, opacity: 0.75 }}>What&apos;s Next</Label>
          <h2
            style={{
              fontFamily: t.sansDisplay,
              fontSize: "clamp(60px, 8vw, 96px)",
              lineHeight: 1.0,
              fontWeight: 500,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            For brands.
          </h2>
        </div>

        <Reveal>
          <div
            style={{
              maxWidth: 640,
              margin: "0 auto",
              padding: "40px 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 24,
            }}
          >
            <Label style={{ color: t.metal, opacity: 0.7 }}>For Brands</Label>
            <h3
              style={{
                fontFamily: t.sansDisplay,
                fontSize: "clamp(36px, 4vw, 48px)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                margin: 0,
              }}
            >
              Launch your own brand.
            </h3>
            <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.82, margin: 0, maxWidth: 520 }}>
              Own an audience worth something? Turn it into a wireless company — turnkey.
              Royalty-based, equity-aligned, operationally handled. Two-week onboarding once
              terms are signed.
            </p>
            <a
              href="mailto:partnerships@getelevatedwireless.com?subject=Partner%20Briefing"
              style={{
                padding: "14px 22px",
                background: "transparent",
                color: t.paper,
                border: `1px solid ${t.metal}`,
                fontFamily: t.mono,
                fontSize: 12,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginTop: 8,
              }}
            >
              Request a partner briefing →
            </a>
          </div>
        </Reveal>

        <div
          style={{
            marginTop: 80,
            paddingTop: 32,
            borderTop: `1px solid ${t.navyMid}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 14,
            opacity: 0.7,
          }}
        >
          <div>
            Backing the next category of wireless?{" "}
            <a
              href="mailto:invest@getelevatedwireless.com?subject=Investor%20Briefing"
              style={{ color: t.metalBright, borderBottom: `1px solid ${t.metal}` }}
            >
              Request an investor briefing →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
