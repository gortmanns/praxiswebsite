import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // The 'output: export' option is the root cause of many build errors if client-side
  // code (like Firebase hooks) is not properly handled during server-side rendering.
  // For testing purposes, you can comment this line out to switch back to a standard
  // Next.js build, which might provide more lenient error handling for SSR issues.
  output: 'export',
  // Suppress the warning about source maps in production, as it's not critical for this setup.
  productionBrowserSourceMaps: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
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
