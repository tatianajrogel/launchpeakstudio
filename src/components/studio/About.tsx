import React from 'react';
import { Heart, Sparkles, Globe } from 'lucide-react';
import Reveal from './Reveal';
import { TEAM, STUDIO } from '@/data/studio';

const VALUES = [
  { icon: Heart, title: 'Human first', text: 'We listen closely and treat your product like our own.' },
  { icon: Sparkles, title: 'Crafted', text: 'Every pixel and line of code gets care and polish.' },
  { icon: Globe, title: 'Global ready', text: 'Portland based, working with teams all over the world.' },
];

const About: React.FC = () => {
  return (
    <section id="about" className="relative overflow-hidden bg-white/60 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#FF6B5A]">
            About the studio
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#2B211C] sm:text-4xl">
            Founded by a designer who codes
          </h2>
          <p className="mt-5 text-[#5a4a40]">
            Launch Peak Studio started with a simple belief. Great products come from one team that
            both designs and builds. {STUDIO.owner} leads the work, and a small, sharp crew brings
            it to life.
          </p>
          <p className="mt-4 text-[#5a4a40]">
            We are friendly enough that a first time founder feels welcome, and polished enough that
            a funded company trusts us with the whole thing.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-orange-100 bg-[#FFFBF5] p-4">
                <v.icon className="h-6 w-6 text-[#FF6B5A]" />
                <h3 className="mt-2 text-sm font-bold text-[#2B211C]">{v.title}</h3>
                <p className="mt-1 text-xs text-[#5a4a40]">{v.text}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="grid grid-cols-2 gap-4">
            {TEAM.map((m, i) => (
              <div
                key={m.name}
                className={`overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm ${
                  i % 2 === 1 ? 'mt-8' : ''
                }`}
              >
                <img src={m.avatar} alt={m.name} className="h-44 w-full object-cover" />
                <div className="p-4">
                  <div className="text-sm font-bold text-[#2B211C]">{m.name}</div>
                  <div className="text-xs text-[#FF6B5A]">{m.role}</div>
                  <p className="mt-1.5 text-xs text-[#5a4a40]">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
