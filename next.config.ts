import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Qualities used across the site: 75 default, 80 logo, 88 process photos
    qualities: [75, 80, 88],
  },
};

export default nextConfig;
