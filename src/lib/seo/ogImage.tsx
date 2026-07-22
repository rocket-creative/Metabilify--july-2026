import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function renderOgImage(kicker: string, title: string) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#1a1a1a",
          }}
        >
          Metablify
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#123227",
              marginBottom: 24,
            }}
          >
            {kicker}
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#1a1a1a",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            color: "#5c5c5c",
          }}
        >
          See more in your LC/MS data
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
