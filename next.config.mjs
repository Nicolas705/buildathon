/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  trailingSlash: false,

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Experiments
  experimental: {
    optimizePackageImports: ['framer-motion', '@splinetool/react-spline'],
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },

  // Webpack optimizations (used for production bundling)
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        spline: {
          name: 'spline',
          test: /[\\/]node_modules[\\/]@splinetool[\\/]/,
          chunks: 'all',
          priority: 30,
        },
        framer: {
          name: 'framer',
          test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
          chunks: 'all',
          priority: 25,
        },
      };
    }
    return config;
  },

  // Headers for better caching and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=86400',
          },
        ],
      },
    ];
  },
};

export default nextConfig;


