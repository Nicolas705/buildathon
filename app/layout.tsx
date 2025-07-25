import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";

export const metadata: Metadata = {
  title: "Signal — 10 builders. weekly vc dinners.",
  description: "every thursday. 10 builders. top-tier vcs and operators. no bs networking. just real conversations about building the future.",
  keywords: "Yale, builders, entrepreneurs, VCs, venture capital, startup, founders, signal, developers, innovation, weekly dinners",
  authors: [{ name: "signal" }],
  creator: "signal",
  publisher: "signal",
  metadataBase: new URL('https://signal-yale.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Signal — 10 builders. weekly vc dinners.",
    description: "every thursday. 10 builders. top-tier vcs and operators. no bs networking.",
    url: 'https://signal-yale.vercel.app',
    siteName: 'signal',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Signal — 10 builders. weekly vc dinners.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Signal — 10 builders. weekly vc dinners.",
    description: "every thursday. 10 builders. top-tier vcs and operators.",
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0f0f0f" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#0f0f0f" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0f0f0f" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
