import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import "./globals.css";

export const metadata: Metadata = {
  title: "Signal — Weekly Dinners at Yale | 10 Technical Builders & VCs",
  description: "Weekly dinners at Yale University every Thursday. 10 technical builders, entrepreneurs, and top-tier VCs. Join Yale's premier startup community for meaningful conversations about building the future. Yale founder meetups in Connecticut.",
  keywords: "weekly dinners at Yale, technical builders at Yale, Yale startup community, entrepreneur meetup New Haven, builder dinners Connecticut, VC events Yale University, startup networking Yale, tech entrepreneur events New Haven, Yale founder community, Connecticut startup scene, New Haven entrepreneurs, Yale innovation hub, builder community Yale, startup founders Connecticut, venture capital New Haven, tech meetup Yale, entrepreneur dinners Yale University, Connecticut venture capital, Yale tech scene, New Haven startup network",
  authors: [{ name: "Signal Community", url: 'https://signal.community' }],
  creator: "Signal Community",
  publisher: "Signal Community",
  applicationName: "Signal",
  metadataBase: new URL('https://signal.community'),
  alternates: {
    canonical: 'https://signal.community',
  },
  openGraph: {
    title: "Signal — Weekly Dinners at Yale | Technical Builders & VCs",
    description: "Weekly dinners at Yale University connecting 10 technical builders with top-tier VCs and operators. Join New Haven's premier startup community every Thursday for meaningful conversations about building the future.",
    url: 'https://signal.community',
    siteName: 'Signal Community',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Signal Community - Weekly Dinners at Yale University connecting technical builders with VCs and operators',
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@signalcommunity',
    creator: '@signalcommunity',
    title: "Signal — Weekly Dinners at Yale | Technical Builders & VCs",
    description: "Weekly dinners at Yale University connecting technical builders with VCs. Join New Haven's premier startup community every Thursday for meaningful conversations.",
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
    // Local SEO metadata
    'geo.region': 'US-CT',
    'geo.placename': 'New Haven, Connecticut',
    'geo.position': '41.3083;-72.9279',
    'ICBM': '41.3083, -72.9279',
    'DC.title': 'Weekly Dinners at Yale - Technical Builders & VCs',
    'DC.description': 'Weekly entrepreneur meetup at Yale University connecting technical builders with VCs',
    'DC.subject': 'startup community, entrepreneur meetup, Yale University, New Haven, Connecticut',
    'revisit-after': '7 days',
    'distribution': 'local',
    'area': 'New Haven, Connecticut',
    'placename': 'Yale University',
    'region': 'Connecticut',
  },
};

// Main organization and event structured data
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Signal Community',
    alternateName: 'Signal',
    url: 'https://signal.community',
    logo: 'https://signal.community/og-image.svg',
    description: 'Weekly dinners at Yale University connecting 10 technical builders, entrepreneurs, and startup founders with top-tier venture capitalists and operators. New Haven\'s premier startup community for meaningful conversations about building the future of technology and innovation.',
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
    name: 'Weekly Dinners at Yale - Technical Builders & VCs',
    description: 'Weekly entrepreneur meetup at Yale University every Thursday. Connect with 10 technical builders, startup founders, and top-tier venture capitalists in New Haven. Premier startup networking event for Yale\'s innovation community.',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    url: 'https://signal.community',
    image: [
      'https://signal.community/og-image.svg'
    ],
    eventSchedule: {
      '@type': 'Schedule',
      repeatFrequency: 'P1W',
      byDay: 'Thursday',
      startTime: '18:00',
      endTime: '20:00'
    },
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
      name: 'Signal Community',
      url: 'https://signal.community',
      email: 'nicolas.gertler@yale.edu',
      sameAs: [
        'https://twitter.com/signalcommunity',
        'https://linkedin.com/company/signal-community'
      ]
    },
    performer: [
      {
        '@type': 'Organization',
        name: 'Signal Community',
        url: 'https://signal.community'
      },
      {
        '@type': 'Person',
        name: 'Guest VCs and Operators',
        description: 'Top-tier venture capitalists and industry operators'
      }
    ],
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: '0',
      priceCurrency: 'USD',
      validFrom: '2024-01-01',
      url: 'https://signal.community',
      eligibleRegion: {
        '@type': 'Place',
        name: 'New Haven, CT'
      },
      description: 'Invitation-only events for selected builders'
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Entrepreneurs, Builders, Developers',
      geographicArea: {
        '@type': 'Place',
        name: 'Yale University'
      }
    }
  }
},
{
  '@context': 'https://schema.org',
  '@type': 'EventSeries',
  name: 'Signal Weekly Dinners at Yale - Technical Builders & VCs',
  description: 'Weekly recurring entrepreneur meetup at Yale University connecting technical builders, startup founders, and venture capitalists in New Haven, Connecticut. Premier startup community events every Thursday.',
  url: 'https://signal.community',
  image: 'https://signal.community/og-image.svg',
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'Yale University',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'New Haven',
      addressRegion: 'CT',
      addressCountry: 'US',
      postalCode: '06511'
    }
  },
  organizer: {
    '@type': 'Organization',
    name: 'Signal Community',
    url: 'https://signal.community'
  },
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    price: '0',
    priceCurrency: 'USD',
    description: 'Invitation-only events'
  }
},
{
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Signal Community',
  url: 'https://signal.community',
  description: 'Weekly dinners at Yale University connecting technical builders, entrepreneurs, and startup founders with VCs. New Haven\'s premier startup community and innovation hub.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://signal.community/?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  }
},
{
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://signal.community/#localbusiness',
  name: 'Signal Community - Weekly Dinners at Yale',
  description: 'Weekly entrepreneur meetup and startup community at Yale University. Connecting technical builders, startup founders, and VCs in New Haven, Connecticut every Thursday.',
  url: 'https://signal.community',
  email: 'nicolas.gertler@yale.edu',
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
  },
  openingHours: 'Th 18:00-20:00',
  telephone: 'Contact via email',
  priceRange: 'Free (Invitation Only)',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Weekly Builder Dinners',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Event',
          name: 'Weekly Dinners at Yale - Technical Builders & VCs'
        }
      }
    ]
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'New Haven'
    },
    {
      '@type': 'State', 
      name: 'Connecticut'
    }
  ],
  keywords: 'weekly dinners at Yale, technical builders at Yale, Yale startup community, entrepreneur meetup New Haven, startup networking Yale, VC events Yale University'
},
{
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are Signal\'s weekly dinners at Yale?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Signal hosts weekly dinners every Thursday at Yale University, connecting 10 technical builders, entrepreneurs, and startup founders with top-tier venture capitalists and industry operators in New Haven, Connecticut.'
      }
    },
    {
      '@type': 'Question', 
      name: 'Who can attend the weekly builder dinners?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The dinners are invitation-only for technical builders, entrepreneurs, startup founders, and selected members of Yale\'s innovation community. We carefully curate each gathering to ensure meaningful conversations.'
      }
    },
    {
      '@type': 'Question',
      name: 'Where do the weekly dinners take place?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The dinners take place at Yale University in New Haven, Connecticut. Specific locations vary, but are always within the Yale campus area.'
      }
    },
    {
      '@type': 'Question',
      name: 'How can I apply to join Signal\'s startup community?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can apply through our website at signal.community. We look for technical builders, entrepreneurs, and founders with remarkable achievements who want to contribute to New Haven\'s startup ecosystem.'
      }
    },
    {
      '@type': 'Question',
      name: 'What makes Signal different from other startup meetups in Connecticut?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Signal is New Haven\'s premier startup community, hosting intimate weekly dinners that bring together only 10 carefully selected technical builders with top-tier VCs. We focus on meaningful conversations rather than large networking events.'
      }
    }
  ]
}];

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
