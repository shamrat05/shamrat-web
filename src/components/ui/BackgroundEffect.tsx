import React from 'react';

export const BackgroundEffect: React.FC = () => {
  return (
    <div
      className="fixed inset-0 -z-50 overflow-hidden pointer-events-none"
      style={{ backgroundColor: 'var(--bg-page)' }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Grain texture overlay */}
      <img
        src="/grain_bg.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-[0.12]"
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Noise texture overlay */}
      <img
        src="/noise.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-[0.04]"
        style={{ transform: 'translateZ(0)', mixBlendMode: 'color-dodge' }}
      />

      {/* Subtle ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--accent)]/[0.02] rounded-full blur-[120px]" />
    </div>
  );
};
