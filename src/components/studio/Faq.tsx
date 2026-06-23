import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import Reveal from './Reveal';
import { FAQS } from '@/data/studio';

const Faq: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <Reveal className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#FF6B5A]">
            Questions
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#2B211C] sm:text-4xl">
            Good things to know
          </h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 70}>
                <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[15px] font-semibold text-[#2B211C]">{f.q}</span>
                    {isOpen ? (
                      <Minus className="h-5 w-5 shrink-0 text-[#FF6B5A]" />
                    ) : (
                      <Plus className="h-5 w-5 shrink-0 text-[#FF6B5A]" />
                    )}
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed text-[#5a4a40]">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
