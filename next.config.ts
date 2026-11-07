import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The old vercel.app address served a duplicate copy of the site; send it (and its rankings) to the real domain.
  // www -> apex is handled in Vercel's Domains settings, not here, so the two can't loop.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "hsheraz.vercel.app" }],
        destination: "https://sheraz.site/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn-images-1.medium.com" },
      { protocol: "https", hostname: "miro.medium.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
};

export default nextConfig;
