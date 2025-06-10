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
    ],
  },
  // Optimize for Cloudflare Pages
  compress: true,
  poweredByHeader: false,
  // Uncomment the following lines if you want to export as static files
  // output: 'export',
  // trailingSlash: true,
  // distDir: 'out',
};

export default nextConfig;
