import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Article cover images from the Medium feed
    remotePatterns: [
      { protocol: "https", hostname: "cdn-images-1.medium.com" },
      { protocol: "https", hostname: "miro.medium.com" },
    ],
  },
};

export default nextConfig;
