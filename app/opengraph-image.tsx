import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.meta.name} — ${site.meta.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadGoogleFont(font: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const match = css.match(
    /src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/,
  );
  if (match) {
    const res = await fetch(match[1]);
    if (res.status === 200) return res.arrayBuffer();
  }
  throw new Error(`Failed to load font data for ${font}`);
}

export default async function Image() {
  const eyebrow = "SOCIAL MEDIA MARKETING AGENCY — NEW YORK CITY";
  const wordmark = "SocialYork.";
  const tagline = "We tell your brand's story.";
  const charset = `${eyebrow}${wordmark}${tagline}0123456789`;

  const [frauncesRegular, frauncesBold] = await Promise.all([
    loadGoogleFont("Fraunces", 400, charset),
    loadGoogleFont("Fraunces", 600, charset),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 28,
          background: "#000000",
          padding: "0 88px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Fraunces",
            fontWeight: 600,
            fontSize: 22,
            letterSpacing: 6,
            color: "#c8a253",
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            fontFamily: "Fraunces",
            fontWeight: 600,
            fontSize: 108,
            lineHeight: 1,
            color: "#0c0b09",
            background: "#c8a253",
            padding: "6px 24px",
          }}
        >
          {wordmark}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Fraunces",
            fontWeight: 400,
            fontSize: 40,
            color: "#ece7db",
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: frauncesRegular, weight: 400, style: "normal" },
        { name: "Fraunces", data: frauncesBold, weight: 600, style: "normal" },
      ],
    },
  );
}
