import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import "./globals.css";

export const metadata: Metadata = {
  title: "Signal — 10 builders. weekly vc dinners.",
  description: "every thursday. 10 builders. top-tier vcs and operators. meaningful conversations about building the future.",
  keywords: "Yale, builders, entrepreneurs, VCs, venture capital, startup, founders, signal, developers, innovation, weekly dinners, builder community, yale entrepreneurs, startup network, New Haven, Connecticut",
  authors: [{ name: "Signal Community", url: 'https://signal.community' }],
  creator: "Signal Community",
  publisher: "Signal Community",
  applicationName: "Signal",
  metadataBase: new URL('https://signal.community'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Signal — 10 builders. weekly vc dinners.",
    description: "every thursday. 10 builders. top-tier vcs and operators. meaningful conversations about building the future.",
    url: 'https://signal.community',
    siteName: 'Signal Community',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Signal — 10 builders. weekly vc dinners.',
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@signalcommunity',
    creator: '@signalcommunity',
    title: "Signal — 10 builders. weekly vc dinners.",
    description: "every thursday. 10 builders. top-tier vcs and operators. meaningful conversations about building the future.",
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
    other: {
      'msvalidate.01': process.env.BING_VERIFICATION || '',
    },
  },
  category: 'Business',
  classification: 'Business Network',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'format-detection': 'telephone=no',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Signal Community',
  alternateName: 'Signal',
  url: 'https://signal.community',
  logo: 'https://signal.community/og-image.svg',
  description: 'A community of 10 builders at Yale meeting weekly with top-tier VCs and operators for meaningful conversations about building the future.',
  foundingLocation: {
    '@type': 'Place',
    name: 'New Haven, CT',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.3083,
      longitude: -72.9279
    }
  },
  sameAs: [
    'https://twitter.com/signalcommunity',
    'https://linkedin.com/company/signal-community'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'General Inquiry',
    email: 'nicolas.gertler@yale.edu',
    url: 'https://signal.community'
  },
  event: {
    '@type': 'Event',
    name: 'Weekly Builder Dinners',
    description: 'Weekly dinners connecting builders with VCs and operators',
    startDate: '2024-01-01',
    eventSchedule: {
      '@type': 'Schedule',
      repeatFrequency: 'P1W',
      byDay: 'Thursday'
    },
    location: {
      '@type': 'Place',
      name: 'Yale University',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'New Haven',
        addressRegion: 'CT',
        addressCountry: 'US'
      }
    },
    organizer: {
      '@type': 'Organization',
      name: 'Signal Community'
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Preconnections for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Spline Performance Optimizations */}
        <link rel="preconnect" href="https://prod.spline.design" />
        <link rel="dns-prefetch" href="https://prod.spline.design" />
        <link rel="prefetch" href="https://prod.spline.design/6Ra-6TOXEw3lYhqa/scene.splinecode" as="fetch" crossOrigin="anonymous" />
        <link rel="prefetch" href="https://prod.spline.design/lfUqHnc-APD4Z3CK/scene.splinecode" as="fetch" crossOrigin="anonymous" />
        <script src="/spline-preload.js" async />
        
        {/* Favicons and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme colors */}
        <meta name="theme-color" content="#0f0f0f" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#0f0f0f" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0f0f0f" />
        <meta name="msapplication-TileColor" content="#0f0f0f" />
        
        {/* App capabilities */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Signal" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Additional SEO meta tags */}
        <meta name="geo.region" content="US-CT" />
        <meta name="geo.placename" content="New Haven" />
        <meta name="geo.position" content="41.3083;-72.9279" />
        <meta name="ICBM" content="41.3083, -72.9279" />
        
        {/* Cache control */}
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
        
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Favicon and App Icons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#00ff88" />
        <meta name="msapplication-TileColor" content="#0f0f0f" />
        
        {/* Sitemap */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        
        {/* RSS Feed */}
        <link rel="alternate" type="application/rss+xml" title="Signal Community" href="/feed.xml" />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
