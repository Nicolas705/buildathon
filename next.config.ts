import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure canonical URL structure
  trailingSlash: false,
  
  // Add redirects for canonical URL enforcement
  async redirects() {
    return [
      // Redirect www to non-www (canonical)
      {
        source: '/(.*)',
        has: [
          {
            type: 'host',
            value: 'www.signal.community',
          },
        ],
        destination: 'https://signal.community/:path*',
        permanent: true,
      },
      // Redirect trailing slashes (except root)
      {
        source: '/:path*/',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },
  
  // Add headers for SEO and caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Canonical domain enforcement
          {
            key: 'Link',
            value: '<https://signal.community>; rel="canonical"',
          },
        ],
      },
      // Cache static assets
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=31536000',
          },
        ],
      },
      {
        source: '/(.*)\\.svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=31536000',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
