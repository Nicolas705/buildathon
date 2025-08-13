import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import "./globals.css";

export const metadata: Metadata = {
  title: "Yale AI Hackathon 2025 — YES | 36-hour AI-native Hackathon",
  description: "Early November 2025 at Yale University (New Haven). A 36-hour AI-native hackathon hosted by Yale Entrepreneurial Society (YES), focused on deployable, production-grade builds across EdTech, FinTech, Bio/Med, and Defense/GovTech.",
  keywords: "Yale AI Hackathon, YES hackathon, Yale Entrepreneurial Society, AI hackathon New Haven, student builders, EdTech, FinTech, BioMed, GovTech, AI-native products, sponsorship",
  authors: [{ name: "Yale Entrepreneurial Society (YES)", url: 'https://yesatyale.org' }],
  creator: "Yale Entrepreneurial Society (YES)",
  publisher: "Yale Entrepreneurial Society (YES)",
  applicationName: "Yale AI Hackathon 2025",
  metadataBase: new URL('https://signal.community'),
  alternates: {
    canonical: 'https://signal.community',
  },
  openGraph: {
    title: "Yale AI Hackathon 2025 — YES | 36-hour AI-native Hackathon",
    description: "A 36-hour AI-native hackathon at Yale University (Early November 2025), focused on production-ready builds. Hosted by YES.",
    url: 'https://signal.community',
    siteName: 'Yale AI Hackathon 2025',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Yale AI Hackathon 2025 — Yale Entrepreneurial Society (YES)',
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@signalcommunity',
    creator: '@signalcommunity',
    title: "Yale AI Hackathon 2025 — YES",
    description: "36-hour AI-native hackathon at Yale University. Early November 2025. Hosted by YES.",
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
  category: 'Event',
  classification: 'Hackathon',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'format-detection': 'telephone=no',
    'geo.region': 'US-CT',
    'geo.placename': 'New Haven, Connecticut',
    'geo.position': '41.3083;-72.9279',
    'ICBM': '41.3083, -72.9279',
    'DC.title': 'Yale AI Hackathon 2025 — YES',
    'DC.description': '36-hour AI-native hackathon at Yale University focused on deployable, production-grade builds',
    'DC.subject': 'hackathon, AI, Yale, YES, New Haven, EdTech, FinTech, Bio/Med, GovTech',
    'revisit-after': '7 days',
    'distribution': 'local',
    'area': 'New Haven, Connecticut',
    'placename': 'Yale University',
    'region': 'Connecticut',
  },
};

// Main organization and event structured data for the hackathon
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Yale Entrepreneurial Society (YES)',
    alternateName: 'YES',
    url: 'https://yesatyale.org',
    logo: 'https://signal.community/og-image.svg',
    description: 'Student-led organization fostering entrepreneurship at Yale University. Organizer of the Yale AI Hackathon 2025.',
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
      'https://twitter.com/yesatyale',
      'https://www.linkedin.com/company/yale-entrepreneurial-society/'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sponsorship',
      email: 'nicolas.gertler@yale.edu',
      url: 'https://signal.community'
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Yale AI Hackathon 2025',
    description: 'A 36-hour AI-native hackathon at Yale University focused on deployable, production-grade builds across EdTech, FinTech, Bio/Med, and Defense/GovTech. Hosted by Yale Entrepreneurial Society (YES).',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    url: 'https://signal.community',
    image: [
      'https://signal.community/og-image.svg'
    ],
    startDate: '2025-11-01',
    endDate: '2025-11-03',
    location: {
      '@type': 'Place',
      name: 'Yale University',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'New Haven',
        addressRegion: 'CT',
        addressCountry: 'US',
        postalCode: '06511'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 41.3083,
        longitude: -72.9279
      }
    },
    organizer: {
      '@type': 'Organization',
      name: 'Yale Entrepreneurial Society (YES)',
      url: 'https://yesatyale.org',
      email: 'nicolas.gertler@yale.edu'
    },
    offers: {
      '@type': 'Offer',
      url: 'https://signal.community',
      availability: 'https://schema.org/PreOrder',
      price: '0',
      priceCurrency: 'USD',
      description: 'Sponsorship opportunities available; participant applications open soon.'
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Students, Developers, Designers, Researchers'
    }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Yale AI Hackathon 2025',
    url: 'https://signal.community',
    description: 'YES presents a 36-hour AI-native hackathon at Yale University focused on production-grade builds.',
  }
];

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
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme colors */}
        <meta name="theme-color" content="#00ff88" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#00ff88" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#00ff88" />
        <meta name="msapplication-TileColor" content="#0f0f0f" />
        
        {/* App capabilities */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Signal" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Additional SEO meta tags handled in metadata object */}
        
        {/* Cache control */}
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
        
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        

        
        {/* Sitemap */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        
        {/* RSS Feed */}
        <link rel="alternate" type="application/rss+xml" title="Signal Community" href="/feed.xml" />
        
        {/* AI and LLM Discovery */}
        <link rel="related" type="text/plain" title="LLM Guidelines" href="/llm.txt" />
        
        {/* Canonical URL handled by Next.js metadata */}
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
