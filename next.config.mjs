import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  // 👇 This fixes wrong project root and ensures sitemap deploys
  experimental: {
    turbopack: {
      root: __dirname,
    },
  },
};

export default nextConfig;
