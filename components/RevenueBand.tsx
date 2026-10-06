"use client";

import { tokens as t } from "@/lib/tokens";
import { Eyebrow, Reveal, Spine } from "./primitives";
import { RevenueCalculator } from "./RevenueCalculator";

// ————————————————————————————————————————————————
// The calculator's own section, directly beneath the hero.
//
// It used to sit inside the hero itself, which made the first thing a partner
// met a revenue widget — the visual grammar of a savings calculator rather
// than of a company. Pulled out into a framed band it is still the first thing
// below the fold and reads as analysis, and the hero gets to state the
// proposition before the page quotes a number at anyone.
//
// The instrument is also wide. A centred 820px card cramped the plot; the band
// gives the curve the horizontal room it needs.
// ————————————————————————————————————————————————

export function RevenueBand({
  variant = "home",
  eyebrow = "Run the numbers",
  heading = "What an audience is worth, at any size.",
  screenLabel = "03 Calculator",
}: {
  variant?: "home" | "university";
  eyebrow?: string;
  heading?: string;
  screenLabel?: string;
}) {
  return (
    <section
      id="calculator"
      data-screen-label={screenLabel}
      className="ew-pad-md"
      style={{
        background: t.base,
        color: t.paper,
        // The section above is black too, so this top padding stacks with the
        // hero's bottom padding into a single unbroken gap. Kept deliberately
        // short for that reason.
        padding: "60px 56px 96px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Spine />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal>
            <div className="ew-calc-frame">
              <Eyebrow color="rgba(255,255,255,0.72)">{eyebrow}</Eyebrow>
              <h2
                style={{
                  fontFamily: t.sansDisplay,
                  fontSize: "clamp(28px, 3.4vw, 44px)",
                  lineHeight: 1.12,
                  fontWeight: 300,
                  letterSpacing: "-0.028em",
                  margin: 0,
                  maxWidth: 820,
                  textWrap: "balance",
                }}
              >
                {heading}
              </h2>
            </div>
          </Reveal>

          <Reveal>
            <RevenueCalculator variant={variant} className="ew-calc-card" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
