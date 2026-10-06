"use client";

import { usePathname } from "next/navigation";
import { tokens as t } from "@/lib/tokens";
import { Wordmark } from "./primitives";

// Which in-page anchors actually exist on each route. Kept here so a nav link
// can never point at a section that is not on the current page, which is how
// ACCESS, PLATFORM and TEAM all silently broke before.
const ANCHORS: Record<string, string[]> = {
  "/": ["#top", "#platform", "#partner", "#contact"],
  "/universities": ["#partner", "#contact"],
  "/about": ["#contact"],
};

export type NavLink = { label: string; href: string; anchor?: string };

// href is the always-safe cross-page destination. anchor is used instead when
// that section exists on the page the visitor is already on, so the link
// scrolls rather than reloading.
// Home is deliberately the only link that carries #top. Every page renders an
// element with that id, so listing "#top" in the ANCHORS of a sub-page made the
// lookup below match there too and Home resolved to "#top" on /about and
// /universities: it scrolled to the top of the page you were already on and
// never went home. Home is a page destination, not a section, so it only
// degrades to a scroll on "/" itself.
export const HOME: NavLink = { label: "Home", href: "/", anchor: "#top" };

export const LINKS: NavLink[] = [
  HOME,
  { label: "Platform", href: "/#platform", anchor: "#platform" },
  { label: "Partner", href: "/#partner", anchor: "#partner" },
  { label: "About Us", href: "/about/" },
  { label: "Universities", href: "/universities/" },
  { label: "Contact", href: "/#contact", anchor: "#contact" },
];

export function resolveHref(link: NavLink, pathname: string | null): string {
  const route = (pathname || "/").replace(/\/+$/, "") || "/";
  if (link.anchor && (ANCHORS[route] || []).includes(link.anchor)) return link.anchor;
  return link.href;
}

export function Nav() {
  const pathname = usePathname();
  return (
    <nav
      className="ew-nav ew-pad-md"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "22px 56px",
        // Persistent accent chrome at the top of the viewport, the web
        // equivalent of the spine running down the deck's slides.
        borderTop: `3px solid ${t.accent}`,
        borderBottom: `1px solid ${t.line}`,
        background: "rgba(255, 255, 255, 0.86)",
        color: t.ink,
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <a href={resolveHref(HOME, pathname)} aria-label="Elevated Wireless home">
        <Wordmark color={t.ink} withMark markRing={t.ink} size={13} />
      </a>
      <div
        className="ew-nav-links"
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
          <a
            key={x.label}
            href={resolveHref(x, pathname)}
            style={{ color: t.ink, opacity: 0.75 }}
          >
            {x.label}
          </a>
        ))}
      </div>
      <a
        href="mailto:partnerships@getelevatedwireless.com"
        style={{
          padding: "11px 20px",
          background: t.accent,
          border: `1px solid ${t.accent}`,
          color: t.paper,
          fontFamily: t.mono,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        Get in Touch
      </a>
    </nav>
  );
}
