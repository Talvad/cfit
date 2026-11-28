import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      ...(process.env.NEXT_PUBLIC_CLOUD_FRONT
        ? [new URL(process.env.NEXT_PUBLIC_CLOUD_FRONT)]
        : []),
    ],
  },
};

export default nextConfig;
