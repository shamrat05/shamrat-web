import React from 'react';

export const SectionDivider: React.FC = React.memo(() => {
  return (
    <div className="relative w-full py-2 pointer-events-none flex items-center justify-center overflow-hidden">
      {/* Minimal grain strip overlay */}
      <div className="absolute inset-x-0 h-12 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none overflow-hidden">
        <img
          src="/grain_bg.png"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      {/* Elegant minimalist gradient divider line */}
      <div className="w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-[var(--border-default)] to-transparent relative z-10" />
    </div>
  );
});
