import React from 'react';
import { Star } from 'lucide-react';
import Reveal from './Reveal';
import { REVIEWS } from '@/data/studio';

const GoogleG = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" />
  </svg>
);

const Stars = ({ n }: { n: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < n ? 'fill-[#FBBC05] text-[#FBBC05]' : 'text-gray-200'}`} />
    ))}
  </div>
);

const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#FF6B5A]">
            Client recommendations
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#2B211C] sm:text-4xl">
            5 star reviews from happy clients
          </h2>

          <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-orange-100 bg-white px-6 py-3 shadow-sm">
            <GoogleG />
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold text-[#2B211C]">4.9</span>
                <Stars n={5} />
              </div>
              <span className="text-xs text-[#5a4a40]">Based on Google reviews</span>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) * 110}>
              <figure className="flex h-full flex-col rounded-3xl border border-orange-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <Stars n={r.stars} />
                  <GoogleG />
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-[#4a3c33]">
                  &ldquo;{r.text}&rdquo;                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-orange-100 pt-5">
                  <img src={r.avatar} alt={r.name} className="h-11 w-11 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-bold text-[#2B211C]">{r.name}</div>
                    <div className="text-xs text-[#5a4a40]">{r.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
