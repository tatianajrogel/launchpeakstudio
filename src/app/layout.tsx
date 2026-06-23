import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { Providers } from './providers';
import { STUDIO } from '@/data/studio';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

const SITE_URL = 'https://launchpeakstudio.com';

export const viewport: Viewport = {
  themeColor: '#FF6B5A',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      'UI/UX Design and Web Development Studio | Portland and Global — Launch Peak Studio',
    template: '%s — Launch Peak Studio',
  },
  description:
    'Launch Peak Studio designs, builds, launches, and scales digital products. UI/UX, web, and mobile development for startups and growing teams in Portland and worldwide.',
  keywords: [
    'UI/UX design',
    'web design and development',
    'mobile app development',
    'product design',
    'design studio',
    'Portland web design',
    'startup design partner',
    'Launch Peak Studio',
  ],
  authors: [{ name: STUDIO.owner }],
  creator: STUDIO.owner,
  publisher: STUDIO.name,
  alternates: { canonical: '/' },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: STUDIO.name,
    title: STUDIO.name,
    description:
      'A premium design and development studio for startups and growing businesses, offering UI/UX, web, and mobile services globally.',
    url: SITE_URL,
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image', title: STUDIO.name, creator: '@launchpeakstudio' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: STUDIO.name,
    description: STUDIO.positioning,
    email: STUDIO.email,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    image: `${SITE_URL}/opengraph-image`,
    areaServed: STUDIO.location,
    founder: { '@type': 'Person', name: STUDIO.owner },
    slogan: STUDIO.tagline,
    priceRange: '$$',
    serviceType: ['UI/UX Design', 'Web Development', 'Mobile App Development'],
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
