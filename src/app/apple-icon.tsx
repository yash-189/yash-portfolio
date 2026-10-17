import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Home-screen icon. iOS rounds the corners itself, so the square is left plain.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2347d6",
          color: "#f4f5f8",
          fontSize: 110,
          fontWeight: 700,
        }}
      >
        Y
      </div>
    ),
    size,
  );
}
