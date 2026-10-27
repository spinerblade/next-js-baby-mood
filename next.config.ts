import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typedRoutes: true,
  /* config options here */
  reactCompiler: true,
  // Remove turbopack rules which conflict parallel usage of TailwindCSS and SCSS
  // turbopack: {
  //   rules: {
  //     '*css': {
  //       loaders: ['@tailwindcss/turbopack'],
  //       as: '*.css',
  //     },
  //   },
  // },
};

export default nextConfig;
