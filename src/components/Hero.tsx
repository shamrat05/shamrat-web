import React, { Suspense } from 'react';
import { useCMS } from '../hooks/useCMS';
import { useTranslation } from 'react-i18next';
import { LazyImage } from './LazyImage';

const Particles = React.lazy(() => import('./Particles').then(module => ({ default: module.Particles })));

export const Hero: React.FC = React.memo(() => {
  const { data } = useCMS();
  const { t } = useTranslation();

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-24 md:pt-[72px] z-0">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Particles />
        </Suspense>
        <div className="hero-gradient"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="glass-panel grid md:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-12 items-center p-6 md:p-12 rounded-[40px] w-full max-w-[1000px] mx-auto transition-colors duration-500 relative z-10">
          <div className="hero-text text-center md:text-left">
            <h1 className="mb-8">
              <span className="block text-4xl md:text-6xl font-bold font-heading mb-2 bg-gradient-to-br from-text-primary to-primary-500 bg-clip-text text-transparent drop-shadow-sm">
                {data.hero.name}
              </span>
              <span className="block text-xl md:text-3xl text-primary-500 font-medium">
                {t('hero.role')}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-text-secondary/95 mb-8 leading-relaxed font-medium">
              {data.hero.description}
            </p>
            
            <div className="flex gap-4 justify-center md:justify-start flex-wrap">
              <a href="#featured-projects" className="btn btn-secondary">{t('hero.btn_work')}</a>
              <a href="#contact" className="btn btn-secondary">{t('hero.btn_contact')}</a>
            </div>
          </div>
          
          <div className="hero-image flex justify-center items-center">
            <div className="relative w-[280px] h-[280px] md:w-[325px] md:h-[325px]">
              <LazyImage 
                src={data.hero.image} 
                alt={`${data.hero.name} - ${data.hero.title}`} 
                loading="eager"
                className="w-full h-full rounded-full border-4 border-bg-surface shadow-[0_0_40px_rgba(10,132,255,0.3)] animate-[profileGlow_3s_ease-in-out_infinite_alternate] relative z-10" 
              />
              <div className="absolute -inset-5 bg-gradient-to-br from-primary-500 to-primary-400 rounded-full opacity-20 -z-0 animate-[glowPulse_4s_ease-in-out_infinite_alternate]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
