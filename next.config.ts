import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Valentines',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
