"use client";

import { tokens as t } from "@/lib/tokens";
import { Reveal } from "./primitives";

const ctaStyle = {
  display: "inline-flex",
  alignItems: "center",
  padding: "14px 22px",
  background: "transparent",
  color: t.paper,
  border: `1px solid ${t.metal}`,
  fontFamily: t.mono,
  fontSize: 12,
  letterSpacing: "0.22em",
  textTransform: "uppercase" as const,
  marginTop: 8,
  alignSelf: "flex-start" as const,
};

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
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <h2
            style={{
              fontFamily: t.sansDisplay,
              fontSize: "clamp(48px, 7vw, 88px)",
              lineHeight: 1.0,
              fontWeight: 500,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            What&apos;s next.
          </h2>
        </div>

        <Reveal>
          <div
            className="ew-stack-md"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 0,
              borderTop: `1px solid ${t.navyMid}`,
            }}
          >
            {/* Launch panel — unchanged content */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
                padding: "48px 56px 48px 0",
              }}
            >
              <h3
                style={{
                  fontFamily: t.sansDisplay,
                  fontSize: "clamp(32px, 3.6vw, 44px)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.06,
                  margin: 0,
                }}
              >
                Launch your own brand.
              </h3>
              <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.82, margin: 0, maxWidth: 480 }}>
                Own an audience that trusts you? Turn it into a wireless revenue stream — branded as
                yours, operated entirely by us, paying you a royalty on every subscriber, every
                month. Two-week onboarding once terms are signed.
              </p>
              <a
                href="mailto:partnerships@getelevatedwireless.com?subject=Partner%20Briefing"
                style={ctaStyle}
              >
                Request a partner briefing →
              </a>
            </div>

            {/* Investor panel */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
                padding: "48px 0 48px 56px",
                borderLeft: `1px solid ${t.navyMid}`,
              }}
            >
              <h3
                style={{
                  fontFamily: t.sansDisplay,
                  fontSize: "clamp(32px, 3.6vw, 44px)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.06,
                  margin: 0,
                }}
              >
                Back the category.
              </h3>
              <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.82, margin: 0, maxWidth: 480 }}>
                Backing the next category of wireless? Request the investor briefing and we&apos;ll
                walk you through the platform, the pipeline, and the round.
              </p>
              <a
                href="mailto:invest@getelevatedwireless.com?subject=Investor%20Briefing"
                style={ctaStyle}
              >
                Request an investor briefing →
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
