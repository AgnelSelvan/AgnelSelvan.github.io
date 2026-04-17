import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // We removed output: 'export' to allow API routes to work on Vercel
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
