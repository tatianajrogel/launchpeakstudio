import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { STUDIO } from '@/data/studio';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

const SITE_URL = 'https://launchpeakstudio.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      'UI/UX Design and Web Development Studio | Portland and Global — Launch Peak Studio',
    template: '%s — Launch Peak Studio',
  },
  description:
    'Launch Peak Studio designs, builds, launches, and scales digital products. UI/UX, web, and mobile development for startups and growing teams in Portland and worldwide.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: STUDIO.name,
    title: STUDIO.name,
    description:
      'A premium design and development studio for startups and growing businesses, offering UI/UX, web, and mobile services globally.',
    url: SITE_URL,
  },
  twitter: { card: 'summary_large_image', title: STUDIO.name },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: STUDIO.name,
    description: STUDIO.positioning,
    email: STUDIO.email,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    areaServed: STUDIO.location,
    founder: STUDIO.owner,
    slogan: STUDIO.tagline,
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Providers>{children}</Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
