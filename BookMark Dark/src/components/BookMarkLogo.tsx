import React from 'react';

interface BookMarkLogoProps {
  className?: string;
  size?: number;
  variant?: 'mark' | 'squircle' | 'text' | 'hero';
}

export default function BookMarkLogo({ className = '', size = 32, variant = 'mark' }: BookMarkLogoProps) {
  // The emblem is a folded ribbon and book cover that beautifully forms the letter 'B'.
  // We represent this crisp vector emblem mathematically using SVG path.
  const svgContent = (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Shadow / Glow for premium contrast if not in pure squircle */}
      <g filter="url(#glow)">
        {/* Left bookmark ribbon with bottom V-notch cut, shifted slightly left for the gap */}
        <path
          d="M156 170 L248 120 V400 L202 340 L156 380 Z"
          fill="currentColor"
        />
        {/* Right curved B loops with beautiful typographic holes (compound path with fillRule="evenodd") */}
        <path
          fillRule="evenodd"
          d="M254 120 C348 120, 388 170, 388 230 C388 280, 328 295, 254 295 C338 295, 408 310, 408 380 C408 440, 338 460, 254 460 V120 Z
             M254 165 V250 C308 250, 338 230, 338 205 C338 180, 308 165, 254 165 Z
             M254 315 V415 C318 415, 353 395, 353 365 C353 335, 318 315, 254 315 Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="rgba(0,0,0,0.15)" />
        </filter>
      </defs>
    </svg>
  );

  if (variant === 'squircle') {
    return (
      <div
        id="logo-squircle"
        className={`flex items-center justify-center bg-white rounded-[24%] shadow-xl border border-white/10 shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="text-black" style={{ width: '64%', height: '64%' }}>
          {svgContent}
        </div>
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div id="logo-text-combo" className={`flex items-center gap-3 ${className}`}>
        <div className="text-white flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
          {svgContent}
        </div>
        <span className="font-display text-xl font-extrabold tracking-tighter uppercase text-white">
          BOOKMARK
        </span>
        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white/5 text-cyan-200 border border-white/5 tracking-wider uppercase">
          v2
        </span>
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div id="logo-hero-combo" className={`flex flex-col items-center text-center ${className}`}>
        <div
          className="flex items-center justify-center bg-white rounded-[24%] shadow-2xl border border-white/20 mb-6 shrink-0 hover:scale-105 transition-all duration-500 animate-float-slow"
          style={{ width: size, height: size }}
        >
          <div className="text-black" style={{ width: '64%', height: '64%' }}>
            {svgContent}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="logo-mark"
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {svgContent}
    </div>
  );
}
