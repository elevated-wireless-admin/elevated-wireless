"use client";

import { tokens as t } from "@/lib/tokens";
import { DuotonePhoto, Label, Reveal } from "./primitives";

type Lane = { n: string; title: string; body: string; img: string; src: string };

const LANES: Lane[] = [
  {
    n: "4a · Activate",
    title: "Programming your audience can't get elsewhere.",
    body: "Exclusive sessions with operators, AI thinkers, doctors, and the marketers your audience already reads — programmed for the Elevated network and surfaced inside your branded service. Activation stops being a paid email. It becomes a reason your audience joins your wireless and stays.",
    img: "portrait · operator",
    src: "/img/access-4a.jpg",
  },
  {
    n: "4b · Engage",
    title: "AI counsel, inside the experience your brand owns.",
    body: "A personal advisor bench — bot-embodied intelligence from operators and thinkers across history and today, built on the Delphi platform. Your audience asks it anything; the answer surfaces inside your branded service. You get the engagement data.",
    img: "abstract · advisor interface",
    src: "/img/access-4b.jpg",
  },
  {
    n: "4c · Differentiate",
    title: "A curated marketplace, not a coupon page.",
    body: "Category-exclusive partner experiences across health, hospitality, golf, business services, and travel — curated the way a concierge would, not the way a rewards program would. Shaped per partner so the marketplace fits what makes your audience yours and never reads as “perks anyone could get.”",
    img: "editorial · hospitality",
    src: "/img/access-4c.jpg",
  },
  {
    n: "4d · Monetize",
    title: "A revenue line a sponsorship deal could never carry.",
    body: "Royalty on every subscriber. Marketplace participation. Premium tiers, event programming, optional add-ons. For most premium brands, an Elevated white-label is a higher-LTV product than the last digital course they launched — and the contract renews monthly without the customer ever thinking about it.",
    img: "editorial · private event",
    src: "/img/access-4d.jpg",
  },
];

function LaneRow({ lane, flip }: { lane: Lane; flip: boolean }) {
  const text = (
    <div>
      <Label style={{ color: t.metal, opacity: 0.65, marginBottom: 14 }}>Lane · {lane.n}</Label>
      <h3
        style={{
          fontFamily: t.sansDisplay,
          fontSize: "clamp(28px, 3vw, 38px)",
          lineHeight: 1.12,
          fontWeight: 500,
          letterSpacing: "-0.015em",
          margin: "0 0 18px",
        }}
      >
        {lane.title}
      </h3>
      <p style={{ fontSize: 15.5, lineHeight: 1.6, opacity: 0.8, margin: 0, maxWidth: 560 }}>{lane.body}</p>
    </div>
  );

  const photo = (
    <div style={{ height: 320, overflow: "hidden", position: "relative" }}>
      <DuotonePhoto
        ratio="16 / 11"
        shadow={t.navy}
        highlight={t.metalBright}
        midtone={t.navyMid}
        src={lane.src}
        alt={lane.img}
        style={{ height: 320, aspectRatio: "auto" }}
      />
    </div>
  );

  return (
    <div
      className="ew-stack-md"
      style={{
        display: "grid",
        gridTemplateColumns: flip ? "1.2fr 1fr" : "1fr 1.2fr",
        gap: 56,
        padding: "56px 0",
        borderTop: `1px solid ${t.navyMid}`,
        alignItems: "center",
      }}
    >
      {flip ? (
        <>
          {text}
          {photo}
        </>
      ) : (
        <>
          {photo}
          {text}
        </>
      )}
    </div>
  );
}

export function Access() {
  return (
    <section
      id="access"
      data-screen-label="04 Access"
      className="ew-pad-md"
      style={{
        background: t.navy,
        color: t.paper,
        padding: "160px 56px",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          className="ew-stack-md"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "end",
            marginBottom: 100,
          }}
        >
          <div>
            <Label style={{ color: t.metal, opacity: 0.75, marginBottom: 28 }}>
              The Elevated Difference
            </Label>
            <h2
              style={{
                fontFamily: t.sansDisplay,
                fontSize: "clamp(48px, 6.8vw, 84px)",
                lineHeight: 1.0,
                fontWeight: 500,
                letterSpacing: "-0.028em",
                margin: 0,
              }}
            >
              <span style={{ color: t.metalBright }}>Activate.</span>
              <br />
              <span style={{ color: t.metalBright }}>Engage.</span>
              <br />
              <span style={{ color: t.metalBright }}>Differentiate.</span>
              <br />
              <span style={{ color: t.metalBright }}>Monetize.</span>
            </h2>
          </div>
          <div style={{ fontSize: 17, lineHeight: 1.6, opacity: 0.85, paddingBottom: 12 }}>
            Wireless was sold as a phone bill. Elevated turns it into a product your brand can
            sell, a benefit your audience values, a relationship deeper than the last sponsorship
            deal — and a revenue line that compounds without ever being seen as &ldquo;their phone
            bill went up.&rdquo;
            <div style={{ marginTop: 20, fontSize: 15, color: t.metalBright, fontStyle: "italic" }}>
              Four ways the platform turns wireless into a brand asset.
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {LANES.map((lane, i) => (
            <Reveal key={lane.n} delay={i * 80}>
              <LaneRow lane={lane} flip={i % 2 !== 0} />
            </Reveal>
          ))}
        </div>

        <div
          style={{
            marginTop: 80,
            padding: "56px 0 0",
            borderTop: `1px solid ${t.metal}`,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: t.sansDisplay,
              fontSize: "clamp(28px, 3.2vw, 40px)",
              lineHeight: 1.2,
              fontWeight: 400,
              fontStyle: "italic",
              letterSpacing: "-0.015em",
              maxWidth: 920,
              textAlign: "center",
            }}
          >
            We run our own service to prove every lever works in practice. Brands on the platform
            get the same operating stack — and the same{" "}
            <span style={{ color: t.metalBright }}>four ways to put it to work</span>.
          </div>
        </div>
      </div>
    </section>
  );
}
