import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

/**
 * Generated favicon — the MR monogram on the brand emerald.
 * Without this Next serves nothing and browsers show a blank tab icon.
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#16a34a",
          color: "#ffffff",
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: "-0.05em",
          borderRadius: 7,
        }}
      >
        {profile.initials}
      </div>
    ),
    { ...size },
  );
}
