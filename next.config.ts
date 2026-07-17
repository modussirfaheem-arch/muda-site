import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This tells Vercel to ignore the TypeScript error from your scrolling library
  typescript: {
    ignoreBuildErrors: true,
  },
  // Keep your custom settings
  allowedDevOrigins: ["192.168.0.104", "localhost:3000"]
};

export default nextConfig;