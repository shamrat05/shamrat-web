import React from 'react';
import { useCMS } from '../hooks/useCMS';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

/**
 * Optimized Hero component with:
 * - CSS-based animations instead of Framer Motion
 * - React.memo for preventing re-renders
 * - Reduced animation complexity on mobile
 */
export const Hero: React.FC = React.memo(() => {
  const { data } = useCMS();
  const { t } = useTranslation();

  return (
    <section id="home" className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Decorative Glows specific to Hero - CSS only */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/20 rounded-full -z-10" 
           style={{ 
             filter: 'blur(120px)',
             transform: 'translateZ(0)',
             willChange: 'auto',
           }} 
      />

      <div className="z-10 flex flex-col w-full max-w-5xl mx-auto px-4 items-center justify-center text-center mt-20 md:mt-32">
        {/* Animated Badge - CSS animation */}
        <div 
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-default bg-white/5 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-default group"
          style={{
            animation: 'fadeInUp 0.6s ease-out 0.2s both',
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-semantic-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-semantic-success"></span>
          </span>
          <span className="text-sm font-medium text-text-secondary tracking-wide">
            Available for new projects
          </span>
          <ArrowRight className="w-3 h-3 text-text-secondary/60 group-hover:translate-x-0.5 transition-transform" />
        </div>

        {/* Hero Text - CSS staggered animation */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-6"
          style={{
            animation: 'fadeInUp 0.6s ease-out 0.3s both',
          }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-text-primary via-text-primary to-text-primary/50 block mb-2">
            {data.hero.name}
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-text-primary to-primary-600">
            {t('hero.role')}
          </span>
        </h1>

        <p
          className="text-lg md:text-xl text-text-secondary max-w-2xl font-light leading-relaxed mb-10 mx-auto"
          style={{
            animation: 'fadeInUp 0.6s ease-out 0.4s both',
          }}
        >
          {data.hero.description}
        </p>

        {/* CTA Buttons - CSS animation */}
        <div 
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4"
          style={{
            animation: 'fadeInUp 0.6s ease-out 0.5s both',
          }}
        >
          <a
            href="#projects"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-text-primary px-8 font-medium text-bg-page transition-all duration-300 hover:bg-text-secondary hover:ring-2 hover:ring-text-secondary hover:ring-offset-2 hover:ring-offset-bg-page"
          >
            <span className="mr-2">{t('hero.btn_work')}</span>
            <Sparkles className="h-4 w-4 transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600 opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
          </a>

          <a
            href="#contact"
            className="group inline-flex h-12 items-center justify-center rounded-full border border-border-default bg-white/5 px-8 font-medium text-text-primary backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-primary-500/30"
          >
            <span className="mr-2">{t('hero.btn_contact')}</span>
            <Play className="h-4 w-4 fill-current opacity-60 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      {/* Add CSS keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          @keyframes fadeInUp {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        }
      `}</style>
    </section>
  );
});
