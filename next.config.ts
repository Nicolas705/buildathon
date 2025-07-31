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
          // Security headers for SEO
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
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // Canonical domain enforcement
          {
            key: 'Link',
            value: '<https://signal.community>; rel="canonical"',
          },
          // SEO performance headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      // Optimize static assets caching
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
          {
            key: 'Content-Type',
            value: 'image/svg+xml',
          },
        ],
      },
      // RSS Feed optimization
      {
        source: '/feed.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/rss+xml; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      // Sitemap optimization
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=3600',
          },
        ],
      },
      // Web manifest optimization
      {
        source: '/site.webmanifest',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
      // LLM.txt optimization for AI discovery
      {
        source: '/llm.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=3600',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
