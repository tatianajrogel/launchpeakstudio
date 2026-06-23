'use client';

import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { BOOKING_URL } from '@/data/studio';

const NAV = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#FFFBF5]/90 backdrop-blur-md shadow-[0_4px_24px_-12px_rgba(120,60,30,0.25)]' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-[#5a4a40] transition-colors hover:text-[#FF6B5A]"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gradient-to-r from-[#FF6B5A] to-[#FF8A5B] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-200 transition-transform hover:-translate-y-0.5 hover:shadow-lg"
          >
            Book a free call
          </a>
        </div>

        <button
          className="rounded-lg p-2 text-[#2B211C] lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-orange-100 bg-[#FFFBF5] px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#5a4a40] hover:bg-orange-50 hover:text-[#FF6B5A]"
              >
                {n.label}
              </a>
            ))}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-full bg-gradient-to-r from-[#FF6B5A] to-[#FF8A5B] px-5 py-2.5 text-center text-sm font-semibold text-white"
            >
              Book a free call
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
