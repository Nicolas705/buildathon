import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Signal — Yale's 10 Exceptional Builders",
  description: "Weekly dinners with top VCs and operators. Signal brings Yale's brightest founders together with leading investors to accelerate the next generation of world-changing companies.",
  keywords: "Yale, builders, entrepreneurs, VCs, venture capital, startup, founders, Signal, developers, innovation",
  authors: [{ name: "Signal" }],
  creator: "Signal",
  publisher: "Signal",
  metadataBase: new URL('https://signal-yale.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Signal — Yale's 10 Exceptional Builders",
    description: "Weekly dinners with top VCs and operators. Signal brings Yale's brightest founders together with leading investors.",
    url: 'https://signal-yale.vercel.app',
    siteName: 'Signal',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Signal — Yale\'s 10 Exceptional Builders',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Signal — Yale's 10 Exceptional Builders",
    description: "Weekly dinners with top VCs and operators.",
    images: ['/og-image.jpg'],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0066ff" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
