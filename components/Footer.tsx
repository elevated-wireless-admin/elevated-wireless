"use client";

import { tokens as t } from "@/lib/tokens";
import { Label, Wordmark } from "./primitives";

const COLS = [
  { h: "Company", items: ["Access", "Platform", "Partner", "Team", "Contact"] },
  { h: "For", items: ["Members", "Brands", "Investors", "Press"] },
  {
    h: "Contact",
    items: [
      "partnerships@elevatedwireless.com",
      "invest@elevatedwireless.com",
      "press@elevatedwireless.com",
    ],
  },
];

export function Footer() {
  return (
    <footer
      id="contact"
      data-screen-label="09 Footer"
      className="ew-pad-md"
      style={{
        background: t.paper,
        color: t.ink,
        padding: "80px 56px 40px",
        borderTop: `1px solid ${t.line}`,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          className="ew-stack-md"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
            gap: 40,
            marginBottom: 56,
          }}
        >
          <div>
            <Wordmark color={t.ink} withMark markRing={t.ink} size={15} />
            <p style={{ fontSize: 14, lineHeight: 1.55, opacity: 0.7, marginTop: 16, maxWidth: 340 }}>
              Premium wireless. Direct access.
              <br />
              <span style={{ fontStyle: "italic" }}>Built to be run. Built to be licensed.</span>
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.h}>
              <Label style={{ opacity: 0.6, marginBottom: 16 }}>{col.h}</Label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  fontSize: 13.5,
                }}
              >
                {col.items.map((x) => (
                  <span key={x} style={{ opacity: 0.78 }}>
                    {x}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            paddingTop: 24,
            borderTop: `1px solid ${t.line}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            fontSize: 11.5,
            letterSpacing: "0.08em",
            opacity: 0.6,
            flexWrap: "wrap",
          }}
        >
          <div>© 2026 Elevated Wireless Inc. · Delaware C-Corp</div>
          <div style={{ fontStyle: "italic", opacity: 0.85 }}>
            Cellular service provided on the Verizon 5G network via Reach Mobile.
          </div>
          <div style={{ display: "flex", gap: 18 }}>
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
