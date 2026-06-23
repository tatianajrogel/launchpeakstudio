import React, { useEffect } from 'react';
import {
  X,
  ArrowRight,
  ArrowUpRight,
  Check,
  Target,
  Compass,
  Code2,
  TrendingUp,
  Quote,
} from 'lucide-react';
import { WorkItem, BOOKING_URL } from '@/data/studio';

interface CaseStudyProps {
  item: WorkItem;
  onClose: () => void;
}

const SectionTitle: React.FC<{ icon: React.ReactNode; eyebrow: string; title: string }> = ({
  icon,
  eyebrow,
  title,
}) => (
  <div className="mb-5 flex items-center gap-3">
    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6B5A] to-[#FF8A5B] text-white shadow-md shadow-orange-200">
      {icon}
    </span>
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF6B5A]">{eyebrow}</p>
      <h3 className="text-xl font-extrabold text-[#2B211C]">{title}</h3>
    </div>
  </div>
);

const CaseStudy: React.FC<CaseStudyProps> = ({ item, onClose }) => {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/40 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`${item.title} case study`}>
      <div className="min-h-full px-3 py-6 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-[#FFFBF5] shadow-2xl">
          {/* close */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-orange-100 bg-[#FFFBF5]/90 px-5 py-3 backdrop-blur sm:px-8">
            <span className="text-sm font-bold text-[#2B211C]">{item.client} case study</span>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#5a4a40] shadow transition-colors hover:text-[#FF6B5A]"
              aria-label="Close case study"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* hero */}
          <div className="relative">
            <img src={item.image} alt={item.title} className="h-64 w-full object-cover sm:h-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 sm:p-8">
              <span className="inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#FF6B5A]">
                {item.category}
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">{item.title}</h2>
              <p className="mt-1 max-w-lg text-white/90">{item.blurb}</p>
            </div>
          </div>

          {/* meta strip */}
          <div className="grid grid-cols-2 gap-px border-b border-orange-100 bg-orange-100 sm:grid-cols-4">
            {[
              { k: 'Client', v: item.client },
              { k: 'Industry', v: item.industry },
              { k: 'Timeline', v: item.timeline },
              { k: 'Services', v: item.services.join(', ') },
            ].map((m) => (
              <div key={m.k} className="bg-[#FFFBF5] px-4 py-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#FF6B5A]">{m.k}</p>
                <p className="mt-1 text-sm font-medium text-[#2B211C]">{m.v}</p>
              </div>
            ))}
          </div>

          <div className="space-y-12 px-5 py-10 sm:px-8 sm:py-12">
            {/* challenge */}
            <section>
              <SectionTitle icon={<Target className="h-5 w-5" />} eyebrow="The problem" title="The challenge" />
              <p className="text-[15px] leading-relaxed text-[#4a3c33]">{item.challenge}</p>
            </section>

            {/* approach */}
            <section>
              <SectionTitle icon={<Compass className="h-5 w-5" />} eyebrow="What we did" title="Our approach" />
              <ul className="grid gap-3 sm:grid-cols-2">
                {item.approach.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 rounded-2xl border border-orange-100 bg-white p-4 text-sm text-[#4a3c33]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FF6B5A]" />
                    {a}
                  </li>
                ))}
              </ul>
            </section>

            {/* design */}
            <section>
              <SectionTitle icon={<ArrowUpRight className="h-5 w-5" />} eyebrow="The look" title="Design" />
              <p className="mb-5 text-[15px] leading-relaxed text-[#4a3c33]">{item.designNote}</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {item.gallery.map((g, i) => (
                  <div key={i} className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">
                    <img src={g} alt={`${item.title} screen ${i + 1}`} className="h-44 w-full object-cover" />
                  </div>
                ))}
              </div>
            </section>

            {/* build */}
            <section>
              <SectionTitle icon={<Code2 className="h-5 w-5" />} eyebrow="Under the hood" title="The build" />
              <ul className="grid gap-3 sm:grid-cols-2">
                {item.build.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 rounded-2xl border border-orange-100 bg-white p-4 text-sm text-[#4a3c33]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FF6B5A]" />
                    {b}
                  </li>
                ))}
              </ul>
            </section>

            {/* results */}
            <section>
              <SectionTitle icon={<TrendingUp className="h-5 w-5" />} eyebrow="The outcome" title="Results" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {item.results.map((r) => (
                  <div key={r.label} className="rounded-2xl bg-gradient-to-br from-[#FF6B5A] to-[#FF8A5B] p-6 text-center text-white shadow-lg shadow-orange-200">
                    <div className="text-3xl font-extrabold">{r.value}</div>
                    <div className="mt-1 text-xs font-medium text-white/90">{r.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* quote */}
            <section className="relative rounded-3xl border border-orange-100 bg-white p-7 shadow-sm">
              <Quote className="h-8 w-8 text-orange-200" />
              <blockquote className="mt-3 text-lg font-medium leading-relaxed text-[#2B211C]">
                "{item.quote.text}"
              </blockquote>
              <div className="mt-4 text-sm">
                <span className="font-bold text-[#2B211C]">{item.quote.name}</span>
                <span className="text-[#5a4a40]"> · {item.quote.role}</span>
              </div>
            </section>

            {/* CTA */}
            <section className="rounded-3xl bg-gradient-to-br from-[#2B211C] to-[#4a352a] p-8 text-center text-white sm:p-10">
              <h3 className="text-2xl font-extrabold sm:text-3xl">Want results like {item.client}?</h3>
              <p className="mx-auto mt-3 max-w-md text-white/80">
                Let us design and build your next product. Book a free discovery call and we will map your climb to the summit.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF6B5A] to-[#FF8A5B] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  Start a project like this
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <button
                  onClick={onClose}
                  className="rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Back to work
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;
