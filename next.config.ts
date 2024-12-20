import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
    scrollRestoration: true,
    optimizeCss: true,
    turbo: {
      useSwcCss: true,
    },
  },
};

export default nextConfig;
