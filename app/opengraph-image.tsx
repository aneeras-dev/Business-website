import { ImageResponse } from "next/og";

export const alt = "TripKnot Business — grow your hotel, restaurant, or travel agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card, rendered at request time by Satori. Only inline styles work
 * here, and every element with more than one child needs an explicit display.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#f6f4ef",
        fontFamily: "sans-serif",
      }}
    >
      {/* Colour bloom in the top-right corner */}
      <div
        style={{
          position: "absolute",
          top: -180,
          right: -140,
          width: 620,
          height: 620,
          borderRadius: 9999,
          background:
            "radial-gradient(circle, rgba(13,122,123,0.20) 0%, rgba(13,122,123,0.06) 55%, rgba(0,0,0,0) 72%)",
          display: "flex",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: "linear-gradient(135deg, #5bc1c2 0%, #0a6162 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 30,
            fontWeight: 700,
            color: "white",
          }}
        >
          T
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 30, fontWeight: 600, color: "#0e1413" }}>
            TripKnot
          </span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#0d7a7b",
              background: "rgba(13,122,123,0.10)",
              padding: "6px 14px",
              borderRadius: 9999,
              display: "flex",
            }}
          >
            Business
          </span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 68,
            fontWeight: 700,
            color: "#0e1413",
            lineHeight: 1.1,
            letterSpacing: -2,
            maxWidth: 900,
            display: "flex",
          }}
        >
          Grow your tourism business with TripKnot.
        </div>
        <div
          style={{
            marginTop: 26,
            fontSize: 28,
            color: "#5a625f",
            lineHeight: 1.4,
            maxWidth: 860,
            display: "flex",
          }}
        >
          Get discovered by thousands of travelers searching for hotels, restaurants,
          and travel services across India.
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {["50,000+ Travelers", "500+ Partners", "25+ Destinations"].map((chip) => (
          <div
            key={chip}
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 500,
              color: "#5a625f",
              border: "1px solid rgba(14,20,19,0.12)",
              background: "#ffffff",
              padding: "12px 22px",
              borderRadius: 9999,
            }}
          >
            {chip}
          </div>
        ))}
      </div>
    </div>,
    size
  );
}
