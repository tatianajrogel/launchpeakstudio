'use client';

import React, { useState } from 'react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from './Reveal';
import { WORK, WORK_FILTERS } from '@/data/studio';

const Work: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const items = filter === 'All' ? WORK : WORK.filter((w) => w.category === filter);

  return (
    <section id="work" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#FF6B5A]">
              Selected work
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#2B211C] sm:text-4xl">
              Products we helped reach the peak
            </h2>
            <p className="mt-3 text-[#5a4a40]">Click any project to read the full case study.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {WORK_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  filter === f
                    ? 'bg-gradient-to-r from-[#FF6B5A] to-[#FF8A5B] text-white shadow-md shadow-orange-200'
                    : 'border border-orange-200 bg-white text-[#5a4a40] hover:border-[#FF6B5A] hover:text-[#FF6B5A]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((w, i) => (
            <Reveal key={w.slug} delay={(i % 3) * 100}>
              <Link
                href={`/work/${w.slug}`}
                className="group block w-full overflow-hidden rounded-3xl border border-orange-100 bg-white text-left shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-orange-100"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={w.image}
                    alt={w.title}
                    width={640}
                    height={224}
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#FF6B5A] backdrop-blur">
                    {w.category}
                  </span>
                  <span className="absolute bottom-4 right-4 rounded-full bg-[#2B211C]/80 px-3 py-1 text-xs font-semibold text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                    View case study
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold text-[#2B211C]">{w.title}</h3>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-[#FF8A5B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#5a4a40]">{w.blurb}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-[#FF6B5A]">
                    <TrendingUp className="h-3.5 w-3.5" />
                    {w.result}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
