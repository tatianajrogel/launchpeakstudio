'use client';

import React, { useState } from 'react';
import { ArrowRight, Check, Calendar, Mail, MapPin } from 'lucide-react';
import Reveal from './Reveal';
import { BOOKING_URL, SUBSCRIBE_URL, STUDIO } from '@/data/studio';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [project, setProject] = useState('');
  const [smsOptIn, setSmsOptIn] = useState(true);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [err, setErr] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setErr('Please enter a valid email.');
      return;
    }
    setStatus('loading');
    try {
      await fetch(SUBSCRIBE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: name || undefined,
          phone: phone || undefined,
          sms_opt_in: smsOptIn === true,
          source: 'contact-form',
          tags: ['contact', 'lead', project ? `interest:${project}` : 'general'],
        }),
      });
      setStatus('done');
    } catch {
      setStatus('error');
      setErr('Something went wrong. Please email us directly.');
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-20 lg:py-28">
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-gradient-to-br from-[#FFB088] to-[#FF6B5A] opacity-25 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-stretch gap-10 px-5 lg:grid-cols-2 lg:px-8">
        {/* left: pitch + booking */}
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
                Tell us a little about your idea or book a free 30 minute discovery call. No pressure,
                no jargon, just a friendly chat about what you want to build.
              </p>

              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#FF6B5A] shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <Calendar className="h-4 w-4" />
                Book a free discovery call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="mt-10 space-y-3 border-t border-white/20 pt-6 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-white/80" />
                <span>{STUDIO.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-white/80" />
                <span>{STUDIO.location}</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* right: form */}
        <Reveal delay={120}>
          <div id="start" className="flex h-full flex-col rounded-3xl border border-orange-100 bg-white p-8 shadow-sm lg:p-10">
            {status === 'done' ? (
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Check className="h-8 w-8" />
                </span>
                <h3 className="mt-5 text-2xl font-extrabold text-[#2B211C]">Thank you!</h3>
                <p className="mt-2 max-w-sm text-[#5a4a40]">
                  We got your message and will reach out within one business day. Want to talk sooner?
                </p>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF6B5A] to-[#FF8A5B] px-6 py-3 text-sm font-semibold text-white"
                >
                  Book a call now
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h3 className="text-xl font-bold text-[#2B211C]">Send us a note</h3>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#5a4a40]">Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-orange-200 bg-[#FFFBF5] px-4 py-3 text-sm text-[#2B211C] outline-none transition focus:border-[#FF6B5A] focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#5a4a40]">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="w-full rounded-xl border border-orange-200 bg-[#FFFBF5] px-4 py-3 text-sm text-[#2B211C] outline-none transition focus:border-[#FF6B5A] focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#5a4a40]">
                    Phone number (optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 555 000 0000"
                    className="w-full rounded-xl border border-orange-200 bg-[#FFFBF5] px-4 py-3 text-sm text-[#2B211C] outline-none transition focus:border-[#FF6B5A] focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#5a4a40]">
                    What do you need?
                  </label>
                  <select
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    className="w-full rounded-xl border border-orange-200 bg-[#FFFBF5] px-4 py-3 text-sm text-[#2B211C] outline-none transition focus:border-[#FF6B5A] focus:ring-2 focus:ring-orange-100"
                  >
                    <option value="">Choose one</option>
                    <option value="ui-ux">UI / UX design</option>
                    <option value="web">Web design + development</option>
                    <option value="mobile">Mobile app</option>
                    <option value="not-sure">Not sure yet</option>
                  </select>
                </div>

                <label className="flex items-start gap-2.5 text-xs text-[#5a4a40]">
                  <input
                    type="checkbox"
                    checked={smsOptIn}
                    onChange={(e) => setSmsOptIn(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-orange-300 text-[#FF6B5A] focus:ring-[#FF6B5A]"
                  />
                  <span>
                    Text me updates. Msg and data rates may apply. Reply STOP to unsubscribe.
                  </span>
                </label>

                {err && <p className="text-sm text-red-500">{err}</p>}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF6B5A] to-[#FF8A5B] px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-orange-200 transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {status === 'loading' ? 'Sending...' : 'Send message'}
                  {status !== 'loading' && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
