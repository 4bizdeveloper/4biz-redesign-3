import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Tells Next.js to compile your app directly into static HTML/CSS/JS files
  images: {
    unoptimized: true, // Required for fully standalone static HTML exports
  },
};

export default nextConfig;
