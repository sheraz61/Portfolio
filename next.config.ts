import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // GitHub org/user avatars on the Open Source pages
    remotePatterns: [{ protocol: "https", hostname: "avatars.githubusercontent.com" }],
  },
};

export default nextConfig;
