import React, { useState, useEffect } from 'react';

export const BackgroundEffect: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return saved || systemDark;
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  return (
    <div
      className="fixed inset-0 -z-50 overflow-hidden pointer-events-none"
      style={{ backgroundColor: 'var(--bg-page)' }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'} 1px, transparent 1px)`,
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[120px]" style={{ background: isDark ? 'rgba(121,206,255,0.02)' : 'rgba(15,127,255,0.02)' }} />
    </div>
  );
};
