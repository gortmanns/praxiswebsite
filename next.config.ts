import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
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
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'www.praxiszentrum-im-ring.ch',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.vasc-alliance.ch',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'schemmer-worni.ch',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.mcl.ch',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.toxinfo.ch',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
