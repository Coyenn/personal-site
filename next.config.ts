import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 90],
  },
  experimental: {
    reactCompiler: true,
    scrollRestoration: true,
  },
};

export default nextConfig;
