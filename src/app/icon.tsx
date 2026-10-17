import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Favicon: "Y" monogram on the accent colour.
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
          background: "#2347d6",
          color: "#f4f5f8",
          borderRadius: 8,
          fontSize: 22,
          fontWeight: 700,
        }}
      >
        Y
      </div>
    ),
    size,
  );
}
