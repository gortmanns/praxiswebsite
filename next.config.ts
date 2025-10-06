
require('dotenv').config({ path: './.env' });
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/login',
        permanent: true,
      },
    ]
  },
  /* config options here */
  env: {
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default nextConfig;
