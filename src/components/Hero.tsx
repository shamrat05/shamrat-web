import React, { Suspense } from 'react';
import { useCMS } from '../hooks/useCMS';
import { useTranslation } from 'react-i18next';
import { Wand2, ArrowRight, Play } from 'lucide-react';

export const Hero: React.FC = React.memo(() => {
  const { data } = useCMS();
  const { t } = useTranslation();

  return (
    <section id="home" className="relative w-full min-h-screen overflow-hidden flex flex-col justify-center bg-[#0A0A0A]">
      {/* Aura Background Component */}
      <div className="absolute top-0 w-full h-full -z-10" style={{ maskImage: 'linear-gradient(transparent, black 0%, black 80%, transparent)' }}>
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <iframe 
            src="https://my.spline.design/glowingplanetparticles-HmCVKutonlFn3Oqqe6DI9nWi/" 
            frameBorder="0" 
            width="100%" 
            height="100%" 
            id="aura-spline" 
            title="Spline Background"
            className="opacity-60"
          />
        </div>
      </div>

      {/* Glow Effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary-500/10 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute inset-0 bg-matrix z-0 opacity-5"></div>
      </div>

      {/* Main Content */}
      <main className="z-10 flex flex-col w-full max-w-7xl mx-auto px-4 items-center justify-center pt-20 pb-16 md:pt-24 md:pb-20">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6 md:mb-8 animate-fade-in-up">
          <Wand2 className="w-3 h-3 text-primary-400" />
          <span className="text-xs text-neutral-300 tracking-wide uppercase">
            {t('hero.role')}
          </span>
        </div>

        {/* Hero Text */}
        <h1 className="text-4xl md:text-7xl lg:text-8xl text-center tracking-tight leading-[1.1] mb-6 md:mb-8 max-w-5xl">
          <span className="text-white drop-shadow-2xl">{data.hero.name}</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/40">
            {t('hero.role')}
          </span>
        </h1>

        <p className="text-lg md:text-xl text-center text-neutral-400 max-w-2xl font-light leading-relaxed mb-12">
          {data.hero.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/30 to-primary-400/30 rounded-full blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
            <a 
              href="#featured-projects" 
              className="relative flex items-center gap-3 bg-white text-black hover:bg-neutral-200 px-8 py-4 rounded-full text-lg transition-all duration-300 shadow-lg shadow-white/10"
            >
              {t('hero.btn_work')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-all" />
            </a>
          </div>
          
          <a 
            href="#contact"
            className="flex items-center gap-3 px-8 py-4 rounded-full text-lg font-medium text-white border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-sm"
          >
            <Play className="w-5 h-5 fill-current" />
            {t('hero.btn_contact')}
          </a>
        </div>
      </main>
    </section>
  );
});
