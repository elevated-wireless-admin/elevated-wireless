"use client";

import { tokens as t } from "@/lib/tokens";
import { Wordmark } from "./primitives";

const LINKS: { label: string; href: string }[] = [
  { label: "Access", href: "#access" },
  { label: "Platform", href: "#platform" },
  { label: "Partner", href: "#partner" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  return (
    <nav
      className="ew-nav ew-pad-md"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "22px 56px",
        borderBottom: `1px solid ${t.line}`,
        background: "rgba(245, 246, 248, 0.82)",
        color: t.ink,
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <a href="#top" aria-label="Elevated Wireless — Home">
        <Wordmark color={t.ink} withMark markRing={t.ink} size={13} />
      </a>
      <div
        style={{
          display: "flex",
          gap: 32,
          fontFamily: t.mono,
          fontSize: 12,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        {LINKS.map((x) => (
          <a key={x.label} href={x.href} style={{ color: t.ink, opacity: 0.75 }}>
            {x.label}
          </a>
        ))}
      </div>
      <a
        href="mailto:partnerships@elevatedwireless.com"
        style={{
          padding: "10px 18px",
          border: `1px solid ${t.ink}`,
          color: t.ink,
          fontFamily: t.mono,
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        Get in Touch
      </a>
    </nav>
  );
}
