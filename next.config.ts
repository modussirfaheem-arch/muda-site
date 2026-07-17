import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // This tells Next.js to ignore type errors during the build
    ignoreBuildErrors: true,
  },
  eslint: {
    // This tells Next.js to ignore linting errors during the build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;