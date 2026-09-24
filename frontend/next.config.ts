import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  devIndicators: false,
  allowedDevOrigins: ["*.preview.emergentagent.com", "*.preview.emergentcf.cloud"],
  webpack(config, { dev }) {
    if (dev) config.watchOptions = { ...config.watchOptions, poll: 1500, aggregateTimeout: 300 };
    return config;
  },
};
export default nextConfig;