import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typedRoutes: true,
  /* config options here */
  reactCompiler: true,
  experimental: {
    agentUpgrade: 'security',
  },
  // Remove turbopack rules which conflict parallel usage of TailwindCSS and SCSS
  // turbopack: {
  //   rules: {
  //     '*css': {
  //       loaders: ['@tailwindcss/turbopack'],
  //       as: '*.css',
  //     },
  //   },
  // },
  images: {
    // Disable image optimization on Fly.io to avoid crashes from 256MB memory limit
    unoptimized: !process.env.VERCEL,
  },
  typescript: {
    // Ignore TypeScript errors because types already checked during CI
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
