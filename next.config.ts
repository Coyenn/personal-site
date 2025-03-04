import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
    scrollRestoration: true,
    optimizeCss: true,
  },
};

export default nextConfig;
