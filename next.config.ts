import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Minimal configuration to eliminate redirect conflicts
  trailingSlash: false,
};

export default nextConfig;
