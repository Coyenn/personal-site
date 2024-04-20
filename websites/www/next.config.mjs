import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  images: {
    remotePatterns: [{ hostname: '*.public.blob.vercel-storage.com' }],
  },
};

export default withPayload(nextConfig);
