import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*"],
  images: {
    remotePatterns: [
      new URL("https://picsum.photos/**"),
    ],
  },
};

export default nextConfig;
