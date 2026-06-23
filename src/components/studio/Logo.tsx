import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', showText = true }) => {
  return (
    <a href="#home" className={`flex items-center gap-2.5 ${className}`} aria-label="Launch Peak Studio home">
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6B5A] via-[#FF8A5B] to-[#FFC857] shadow-md shadow-orange-200">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 19l6-12 4 7 2.5-4L21 19z" />
        </svg>
      </span>
      {showText && (
        <span className="text-[17px] font-extrabold tracking-tight text-[#2B211C] leading-none">
          Launch Peak<span className="block text-[11px] font-semibold tracking-[0.18em] text-[#FF6B5A]">STUDIO</span>
        </span>
      )}
    </a>
  );
};

export default Logo;
