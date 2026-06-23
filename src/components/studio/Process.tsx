import React from 'react';
import Reveal from './Reveal';
import { PROCESS } from '@/data/studio';

const Process: React.FC = () => {
  return (
    <section id="process" className="relative overflow-hidden bg-white/60 py-20 lg:py-28">
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-gradient-to-br from-[#FFC857] to-[#FFB088] opacity-25 blur-3xl" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#FF6B5A]">
            How we work
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#2B211C] sm:text-4xl">
            A clear, friendly climb
          </h2>
          <p className="mt-4 text-[#5a4a40]">
            No mystery, no jargon. You always know what is happening and what comes next.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <div className="relative h-full rounded-3xl border border-orange-100 bg-[#FFFBF5] p-7 shadow-sm">
                <span className="text-4xl font-extrabold text-orange-100">{p.name}</span>
                <h3 className="mt-2 text-lg font-bold text-[#2B211C]">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5a4a40]">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
