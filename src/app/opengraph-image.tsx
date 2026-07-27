import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

/**
 * Social share card.
 *
 * The layout metadata declares `twitter.card = "summary_large_image"`, which is
 * broken without an actual image — LinkedIn, WhatsApp and X would all render a
 * bare text link. Generated here so it stays in sync with profile.ts.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — ${profile.role}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: 72,
          // Emerald wash in the corner so the card is not a plain white slab.
          backgroundImage:
            "radial-gradient(circle at 88% 12%, #dcfce7 0%, transparent 45%)",
        }}
      >
        {/* Monogram */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 76,
              height: 76,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#16a34a",
              color: "#ffffff",
              fontSize: 32,
              fontWeight: 800,
              borderRadius: 22,
              letterSpacing: "-0.04em",
            }}
          >
            {profile.initials}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 600,
              color: "#16a34a",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            RMDC
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 800,
              color: "#111827",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 38,
              fontWeight: 600,
              color: "#16a34a",
              letterSpacing: "-0.02em",
            }}
          >
            {profile.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #e2e8f0",
            paddingTop: 28,
            fontSize: 24,
            color: "#475569",
          }}
        >
          <div style={{ display: "flex" }}>
            Linux · VMware · AWS · FortiGate · Docker
          </div>
          <div style={{ display: "flex", color: "#94a3b8" }}>
            {profile.location}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
