import React from 'react';
import { Lightbulb, Rocket, TrendingUp, Mountain, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import { CLIENT_FLOW } from '@/data/studio';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Lightbulb,
  Rocket,
  TrendingUp,
  Mountain,
};

const ClientFlow: React.FC = () => {
  return (
    <section id="flow" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#FF6B5A]">
            Your business goals, our roadmap
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#2B211C] sm:text-4xl">
            The flow from idea to summit
          </h2>
          <p className="mt-4 text-[#5a4a40]">
            Every client follows the same simple climb. We meet you where you are and walk the whole way up.
          </p>
        </Reveal>

        <div className="relative mt-14">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-9 hidden h-0.5 bg-gradient-to-r from-[#FFB088] via-[#FF8A5B] to-[#FFC857] lg:block" />
          <div className="grid gap-8 lg:grid-cols-4">
            {CLIENT_FLOW.map((step, i) => {
              const Icon = ICONS[step.icon] || Lightbulb;
              return (
                <Reveal key={step.goal} delay={i * 120}>
                  <div className="group relative rounded-2xl border border-orange-100 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-xl">
                    <div className="mx-auto flex h-18 w-18 items-center justify-center">
                      <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF6B5A] to-[#FF8A5B] text-white shadow-lg shadow-orange-200">
                        <Icon className="h-7 w-7" />
                      </span>
                    </div>
                    <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[#FF6B5A]">
                      Step {i + 1}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-[#2B211C]">{step.goal}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5a4a40]">{step.detail}</p>
                    {i < CLIENT_FLOW.length - 1 && (
                      <ArrowRight className="absolute -right-5 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-[#FF8A5B] lg:block" />
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientFlow;
