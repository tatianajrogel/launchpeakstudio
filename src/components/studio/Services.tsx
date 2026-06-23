import React from 'react';
import { PenTool, Monitor, Smartphone, Check, ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import { SERVICES, BOOKING_URL } from '@/data/studio';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  PenTool,
  Monitor,
  Smartphone,
};

const Services: React.FC = () => {
  return (
    <section id="services" className="relative bg-white/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#FF6B5A]">
            What we do
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#2B211C] sm:text-4xl">
            Design and development, under one roof
          </h2>
          <p className="mt-4 text-[#5a4a40]">
            No handoffs, no finger pointing. One team that designs the experience and ships the code.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] || PenTool;
            return (
              <Reveal key={s.slug} delay={i * 120}>
                <div className="group flex h-full flex-col rounded-3xl border border-orange-100 bg-[#FFFBF5] p-7 shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-orange-100">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF6B5A] to-[#FFB04A] text-white shadow-md shadow-orange-200">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-[#2B211C]">{s.title}</h3>
                  <p className="mt-2 text-sm text-[#5a4a40]">{s.short}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#6b5a4f]">{s.description}</p>

                  <ul className="mt-5 space-y-2">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-sm text-[#5a4a40]">
                        <Check className="h-4 w-4 shrink-0 text-[#FF6B5A]" />
                        {d}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center justify-between border-t border-orange-100 pt-5">
                    <span className="text-sm font-bold text-[#2B211C]">{s.priceFrom}</span>
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#FF6B5A] transition-colors hover:text-[#e0533f]"
                    >
                      Start here
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
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

export default Services;
