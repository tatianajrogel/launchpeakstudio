import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { SUBSCRIBE_URL, SERVICES, STUDIO } from '@/data/studio';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [smsOptIn, setSmsOptIn] = useState(true);
  const [done, setDone] = useState(false);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
    try {
      await fetch(SUBSCRIBE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          phone: phone || undefined,
          sms_opt_in: smsOptIn === true,
          source: 'footer-signup',
          tags: ['newsletter', 'footer-signup'],
        }),
      });
    } catch {
      /* noop */
    }
    setDone(true);
  };

  return (
    <footer className="relative border-t border-orange-100 bg-[#2B211C] text-[#f5ede5]">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="[&_*]:!text-white">
              <Logo />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#cdbfb4]">
              {STUDIO.positioning}
            </p>

            {/* newsletter */}
            <div className="mt-6 max-w-sm">
              {done ? (
                <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm">
                  <Check className="h-4 w-4 text-[#FFC857]" />
                  You are on the list. Thank you!
                </div>
              ) : (
                <form onSubmit={subscribe} className="space-y-2.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#FFC857]">
                    Studio insights, no spam
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      required
                      className="w-full rounded-full bg-white/10 px-4 py-2.5 text-sm text-white placeholder-[#cdbfb4] outline-none focus:bg-white/15"
                    />
                    <button
                      type="submit"
                      className="flex shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#FF6B5A] to-[#FF8A5B] px-4 text-white"
                      aria-label="Subscribe"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number (optional)"
                    className="w-full rounded-full bg-white/10 px-4 py-2.5 text-sm text-white placeholder-[#cdbfb4] outline-none focus:bg-white/15"
                  />
                  <label className="flex items-start gap-2 text-[11px] text-[#cdbfb4]">
                    <input
                      type="checkbox"
                      checked={smsOptIn}
                      onChange={(e) => setSmsOptIn(e.target.checked)}
                      className="mt-0.5 h-3.5 w-3.5 rounded"
                    />
                    <span>Text me updates. Msg and data rates may apply. Reply STOP to unsubscribe.</span>
                  </label>
                </form>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white">Services</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-[#cdbfb4]">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <a href="#services" className="hover:text-[#FFC857]">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white">Studio</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-[#cdbfb4]">
              <li><a href="#work" className="hover:text-[#FFC857]">Work</a></li>
              <li><a href="#process" className="hover:text-[#FFC857]">Process</a></li>
              <li><a href="#about" className="hover:text-[#FFC857]">About</a></li>
              <li><a href="#reviews" className="hover:text-[#FFC857]">Reviews</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white">Connect</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-[#cdbfb4]">
              <li><a href="#contact" className="hover:text-[#FFC857]">Contact</a></li>
              <li><a href={`mailto:${STUDIO.email}`} className="hover:text-[#FFC857]">{STUDIO.email}</a></li>
              <li><a href="#contact" className="hover:text-[#FFC857]">Start a project</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-[#cdbfb4] sm:flex-row">
          <span>© {new Date().getFullYear()} {STUDIO.name} LLC. {STUDIO.location}.</span>
          <span>Designed and built in house.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
