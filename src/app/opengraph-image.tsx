import { ImageResponse } from "next/og";
import { site } from "./site";
import { bio } from "./content";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: 80,
          background: "#f4f5f8",
          color: "#0d1220",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#5a6275" }}>
          {bio.role} · {bio.location}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 128, fontWeight: 700, lineHeight: 0.95, letterSpacing: -4 }}>
            Yash <span style={{ color: "#2347d6", marginLeft: 28 }}>Saini</span>
          </div>
          <div style={{ display: "flex", fontSize: 40, color: "#5a6275" }}>{bio.tagline}</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#5a6275" }}>React · Next.js · TypeScript · UI design</div>
      </div>
    ),
    size,
  );
}
