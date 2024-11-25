import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "amaranth-genuine-rabbit-530.mypinata.cloud", protocol: "https" },
    ]
  }
};

export default nextConfig;
