import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { WORK } from '@/data/studio';
import CaseStudy from '@/components/studio/CaseStudy';

export function generateStaticParams() {
  return WORK.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = WORK.find((w) => w.slug === slug);
  if (!item) return {};
  return {
    title: `${item.title} — Case Study`,
    description: item.blurb,
    alternates: { canonical: `/work/${item.slug}` },
    openGraph: {
      title: `${item.title} — Case Study`,
      description: item.blurb,
      images: [item.image],
      url: `/work/${item.slug}`,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = WORK.find((w) => w.slug === slug);
  if (!item) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: item.title,
    headline: item.title,
    description: item.blurb,
    image: item.image,
    about: item.industry,
  };

  return (
    <main className="min-h-screen bg-[#FFFBF5] py-6 font-sans text-[#2B211C] antialiased">
      <div className="mx-auto max-w-4xl px-4">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#5a4a40] transition-colors hover:text-[#FF6B5A]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to work
        </Link>
      </div>
      <div className="mt-4 px-3 sm:px-6">
        <CaseStudy item={item} />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
