"use client";

import { tokens as t } from "@/lib/tokens";
import { DuotonePhoto, Label, Reveal } from "./primitives";

type Lane = { n: string; title: string; body: string; img: string; src: string };

const LANES: Lane[] = [
  {
    n: "4a",
    title: "Monthly sessions with world-class operators",
    body: "Jay Abraham — the most-quoted marketer alive, personal advisor to some of the largest brands in history — runs monthly sessions exclusively for Elevated members. Additional hosts curated across business, AI, health, and performance. Members-only. Not resold anywhere else.",
    img: "portrait · operator",
    src: "/img/access-4a.jpg",
  },
  {
    n: "4b",
    title: "A personal AI board of advisors",
    body: "Every member builds their own board — bot-embodied intelligence from operators and thinkers across history and today, built on the Delphi platform. Ask anything. Get the kind of counsel that used to require a phone number nobody gives out.",
    img: "abstract · advisor interface",
    src: "/img/access-4b.jpg",
  },
  {
    n: "4c",
    title: "Curated perks, not a rewards program",
    body: "Category-exclusive partner experiences across health, hospitality, golf, business services, and travel — curated the way a concierge would, not the way a coupon site would.",
    img: "editorial · hospitality",
    src: "/img/access-4c.jpg",
  },
  {
    n: "4d",
    title: "A room full of people worth knowing",
    body: "Private events. Digital salons. Member introductions. The people in the room are the point — and we protect who gets in for a reason.",
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
              The network
              <br />
              no other carrier
              <br />
              can offer you.
            </h2>
          </div>
          <div style={{ fontSize: 17, lineHeight: 1.6, opacity: 0.85, paddingBottom: 12 }}>
            Every Elevated Wireless member — and every member of every brand we power — gets
            access to a living network of operators, mentors, and institutions that most people
            will never meet.
            <div style={{ marginTop: 20, fontSize: 15, color: t.metalBright, fontStyle: "italic" }}>
              The cellular service is how we deliver it. Access is the product.
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
            A phone service that keeps you connected is obvious. A phone service that makes you
            more <span style={{ color: t.metalBright }}>capable</span> is the one we&apos;re building.
          </div>
        </div>
      </div>
    </section>
  );
}
