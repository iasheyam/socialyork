import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        // Hero footage/posters and reel covers are content-addressed by
        // filename; a swap is a new deploy. Cache them hard at the edge.
        source: "/:dir(video|reels)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
