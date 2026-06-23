'use client';

import { Calendar, Mail, MapPin } from 'lucide-react';
import Reveal from './Reveal';
import { STUDIO } from '@/data/studio';
import CalEmbed from './CalEmbed';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative overflow-hidden py-20 lg:py-28">
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-gradient-to-br from-[#FFB088] to-[#FF6B5A] opacity-25 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-stretch gap-10 px-5 lg:grid-cols-2 lg:px-8">
        {/* left: pitch */}
        <Reveal>
          <div className="flex h-full flex-col justify-between rounded-3xl bg-gradient-to-br from-[#FF6B5A] via-[#FF7A52] to-[#FFA24A] p-8 text-white shadow-2xl shadow-orange-200 lg:p-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">
                Let us climb together
              </span>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                Start your project today
              </h2>
              <p className="mt-4 max-w-md text-white/90">
                Book a free 30 minute discovery call. No pressure, no jargon, just a friendly chat
                about what you want to build.
              </p>

              <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 text-sm font-semibold backdrop-blur">
                <Calendar className="h-4 w-4" />
                Grab a time that works for you
              </div>
            </div>

            <div className="mt-10 space-y-3 border-t border-white/20 pt-6 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-white/80" />
                <a href={`mailto:${STUDIO.email}`} className="hover:underline">
                  {STUDIO.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-white/80" />
                <span>{STUDIO.location}</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* right: inline Cal.com scheduler */}
        <Reveal delay={120}>
          <div className="h-full overflow-hidden rounded-3xl border border-orange-100 bg-white p-2 shadow-sm sm:p-4">
            <CalEmbed />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
