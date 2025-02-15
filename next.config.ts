import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Accept all hostnames
      },
      {
        protocol: 'http',
        hostname: '**', // Accept all hostnames
      },
    ],
  },
};

export default nextConfig;
