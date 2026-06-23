import React from 'react';
import { ArrowRight, Star, ChevronDown } from 'lucide-react';
import Reveal from './Reveal';
import Image from 'next/image';
import { BOOKING_URL, TEAM, STATS } from '@/data/studio';

const peakImg =
  'https://d64gsuwffb70l.cloudfront.net/6a39e287708138786b561e2d_1782178520454_5445e59b.png';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
      {/* warm gradient blobs */}
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-gradient-to-br from-[#FFB088] to-[#FF6B5A] opacity-30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-40 h-96 w-96 rounded-full bg-gradient-to-br from-[#FFC857] to-[#FFB088] opacity-30 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/70 px-4 py-1.5 text-xs font-semibold text-[#FF6B5A] shadow-sm">
              <Star className="h-3.5 w-3.5 fill-[#FFC857] text-[#FFC857]" />
              Design + dev studio, Portland and global
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-[#2B211C] sm:text-6xl">
              From startup to{' '}
              <span className="bg-gradient-to-r from-[#FF6B5A] via-[#FF8A5B] to-[#FFB04A] bg-clip-text text-transparent">
                summit.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#5a4a40]">
              We design, build, launch, and scale digital products for founders and growing
              teams. One warm, focused partner for UI/UX, web, and mobile.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF6B5A] to-[#FF8A5B] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition-transform hover:-translate-y-0.5"
              >
                Book a free discovery call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#start"
                className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/70 px-6 py-3.5 text-sm font-semibold text-[#2B211C] transition-colors hover:border-[#FF6B5A] hover:text-[#FF6B5A]"
              >
                Start your project
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {TEAM.map((m) => (
                  <img
                    key={m.name}
                    src={m.avatar}
                    alt={m.name}
                    className="h-11 w-11 rounded-full border-2 border-[#FFFBF5] object-cover shadow"
                  />
                ))}
              </div>
              <div className="text-sm text-[#5a4a40]">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#FFC857] text-[#FFC857]" />
                  ))}
                  <span className="ml-1 font-semibold text-[#2B211C]">4.9</span>
                </div>
                <span>Loved by founders worldwide</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Visual: peak art + meet the team cards */}
        <div className="lg:col-span-6">
          <Reveal delay={160}>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-2xl shadow-orange-100">
                <Image src={peakImg} alt="Warm peak summit illustration" width={1200} height={900} priority className="h-full w-full object-cover" />
              </div>

              {/* floating team card */}
              <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-orange-100 bg-white/90 p-4 shadow-xl backdrop-blur sm:block">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[#FF6B5A]">Meet the team</p>
                <div className="flex items-center gap-3">
                  {TEAM.slice(0, 3).map((m) => (
                    <div key={m.name} className="text-center">
                      <img src={m.avatar} alt={m.name} className="mx-auto h-12 w-12 rounded-full object-cover" />
                      <p className="mt-1 max-w-[64px] truncate text-[10px] font-medium text-[#5a4a40]">
                        {m.name.split(' ')[0]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* floating result chip */}
              <div className="absolute -right-3 top-6 rounded-2xl border border-orange-100 bg-white/90 px-4 py-3 shadow-xl backdrop-blur">
                <p className="text-xs font-medium text-[#5a4a40]">Avg. launch boost</p>
                <p className="text-xl font-extrabold text-[#FF6B5A]">+38%</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* stats strip */}
      <Reveal>
        <div className="relative mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-orange-100 bg-orange-100 px-0 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-[#FFFBF5] px-4 py-6 text-center">
              <div className="text-2xl font-extrabold text-[#2B211C] sm:text-3xl">{s.value}</div>
              <div className="mt-1 text-xs font-medium text-[#5a4a40]">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-12 flex justify-center">
        <a href="#flow" aria-label="Scroll down" className="animate-bounce text-[#FF6B5A]">
          <ChevronDown className="h-7 w-7" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
