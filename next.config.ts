import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // `next dev` and `next build` both write to .next by default, so building
  // while the dev server is running deletes the chunks that server is still
  // serving — the page then loads with a 404 stylesheet and renders blank.
  // `npm run build:check` sets BUILD_DIR to keep the two apart.
  distDir: process.env.BUILD_DIR || ".next",

  // `npm run build:static` emits plain HTML/CSS/JS into out/, which any web
  // server can host without Node running. Everything here prerenders, so
  // nothing is lost by exporting. Left off by default so `npm run dev` and a
  // normal build keep the full Next.js server behaviour available.
  output: process.env.BUILD_STATIC ? "export" : undefined,
  images: {
    // Modern formats first; Next falls back automatically for older browsers.
    formats: ["image/avif", "image/webp"],
  },
  // Tree-shake icon imports so we don't ship the whole Lucide set.
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
