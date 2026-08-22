import { ImageResponse } from "next/og";

import { siteName } from "@/app/metadata";
import { jobTitle } from "@/lib/schema/json-ld";

export const alt = "Tim Ritter · Design Engineer · tim.cv";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background: "#11110F",
        color: "#B8B4A9",
        fontFamily: "monospace",
      }}
    >
      <div style={{ color: "#F13E15", fontSize: 64, lineHeight: 1.1 }}>{siteName}</div>
      <div style={{ marginTop: 16, fontSize: 32 }}>{jobTitle}</div>
      <div style={{ marginTop: 48, fontSize: 24 }}>tim.cv</div>
    </div>,
    {
      ...size,
    },
  );
}
