
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // Suppress the warning about source maps in production, as it's not critical for this setup.
  productionBrowserSourceMaps: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      }
    ],
  },
};

export default nextConfig;
