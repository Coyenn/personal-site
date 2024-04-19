import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  transpilePackages: ['@repo/custom-fields'],
};

export default withPayload(nextConfig);
