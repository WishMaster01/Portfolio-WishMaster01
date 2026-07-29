import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "linear-gradient(135deg, #020617 0%, #111827 55%, #312e81 100%)",
        color: "#f8fafc",
        padding: 72,
        fontFamily: "Arial",
      }}
    >
      <div style={{ fontSize: 28, letterSpacing: 4, color: "#a5b4fc" }}>
        WISHMASTER01
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1 }}>
          Enterprise Portfolio
        </div>
        <div
          style={{
            marginTop: 28,
            maxWidth: 860,
            fontSize: 30,
            color: "#cbd5e1",
          }}
        >
          {siteConfig.description}
        </div>
      </div>
      <div style={{ fontSize: 24, color: "#a5b4fc" }}>
        Next.js / TypeScript / Product Engineering
      </div>
    </div>,
    size,
  );
}
