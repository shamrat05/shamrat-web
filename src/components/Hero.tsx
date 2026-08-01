import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '../hooks/useCMS';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { Threads } from './ui/Threads';
import { GradientText } from './ui/GradientText';
import { TextPressure } from './ui/TextPressure';
import { Magnet } from './ui/Magnet';

export const Hero: React.FC = React.memo(() => {
  const { data } = useCMS();
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return saved || systemDark;
  });

  useEffect(() => {
    setMounted(true);
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-14"
    >
      {/* React Bits Threads Moving Light Strings Background */}
      <Threads
        numThreads={5}
        amplitude={0.9}
        enableMouseInteraction={true}
        color={['#3B9EFF', '#79CEFF', '#34D399', '#8B5CF6', '#F59E0B']}
      />

      {/* Grain overlay specific to hero */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <img
          src="/grain_bg.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-[0.12]"
        />
      </div>

      <div className="z-10 flex flex-col w-full max-w-5xl mx-auto px-4 items-center justify-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0, 0, 0.2, 1] }}
          className="mb-8"
        >
          <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium backdrop-blur-md shadow-lg ${
            isDark
              ? 'bg-[#1bb767]/[0.08] border-[#1bb767]/[0.25] text-[#1bb767]'
              : 'bg-[#33691e]/[0.06] border-[#33691e]/[0.2] text-[#33691e]'
          }`}>
            <span className="w-2 h-2 rounded-full bg-[var(--tertiary)] animate-pulse shadow-[0_0_10px_var(--tertiary)]" />
            Available for Strategic Projects
          </span>
        </motion.div>

        {/* Name - React Bits TextPressure Component */}
        <div className="mb-4">
          <TextPressure
            text={data.hero.name}
            weight={true}
            textColor="var(--foreground)"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
          />
        </div>

        {/* Alias - SEO only, visually hidden */}
        <p className="sr-only">{t('hero.alias')}</p>

        {/* Role Progression Badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2, ease: [0, 0, 0.2, 1] }}
          className="mb-6 flex flex-wrap items-center justify-center gap-2.5 text-xs sm:text-sm font-semibold"
        >
          <span className="px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-text-secondary backdrop-blur-md">Operations</span>
          <span className="text-primary-500 font-bold">➔</span>
          <span className="px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-text-secondary backdrop-blur-md">Sales & Marketing</span>
          <span className="text-primary-500 font-bold">➔</span>
          <span className="px-4 py-1.5 rounded-full bg-primary-500/15 border border-primary-500/40 text-primary-400 font-bold backdrop-blur-md shadow-[0_0_15px_rgba(10,132,255,0.2)]">Agentic AI & Automation</span>
        </motion.div>

        {/* Main Tagline - React Bits GradientText */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.3, ease: [0, 0, 0.2, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-8 max-w-4xl mx-auto leading-snug"
        >
          <span className="text-[var(--foreground)]">Automating </span>
          <GradientText colors={['#3B9EFF', '#79CEFF', '#34D399', '#3B9EFF']}>
            business processes
          </GradientText>
          <span className="text-[var(--foreground)]"> & driving </span>
          <GradientText colors={['#34D399', '#1bb767', '#8B5CF6', '#34D399']}>
            cross-departmental efficiency
          </GradientText>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.4, ease: [0, 0, 0.2, 1] }}
          className={`text-base md:text-lg max-w-2xl font-light leading-relaxed mb-12 mx-auto ${
            isDark ? 'text-white/50' : 'text-[#4B5563]'
          }`}
        >
          {data.hero.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.6, ease: [0, 0, 0.2, 1] }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          {/* Primary CTA - Book a Call */}
          <Magnet magnetStrength={3} padding={60}>
            <a
              href="https://calendly.com/shamrat"
              target="_blank"
              rel="noopener noreferrer"
              className={`group/cta relative inline-flex items-center justify-center rounded-xl text-sm font-semibold h-12 px-7 transition-all duration-200 hover:scale-[0.97] active:scale-[0.97] ${
                isDark
                  ? 'bg-white text-[#020202] hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]'
                  : 'bg-[#020202] text-white hover:bg-[#020202]/90 hover:shadow-[0_0_30px_rgba(0,0,0,0.15)]'
              }`}
            >
              <span>Book a Call</span>
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
              {/* Cat GIF */}
              <img
                src="/cat-sitting-black.gif"
                alt=""
                className="absolute h-8 w-auto object-contain -top-[calc(100%-8px)] right-3 pointer-events-none"
              />
            </a>
          </Magnet>

          {/* Secondary CTA - Contact */}
          <Magnet magnetStrength={3} padding={60}>
            <button
              onClick={() => scrollTo('contact')}
              className={`group/cta inline-flex items-center justify-center rounded-xl backdrop-blur-sm text-sm font-medium h-12 px-7 transition-all duration-200 hover:scale-[0.97] active:scale-[0.97] ${
                isDark
                  ? 'border border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:border-[#3B9EFF]/30 hover:text-white'
                  : 'border border-black/10 bg-black/[0.03] text-[#4B5563] hover:bg-black/[0.06] hover:border-[#0f7fff]/30 hover:text-[#0a0a0a]'
              }`}
            >
              <span>Contact Me</span>
            </button>
          </Magnet>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 2.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className={`w-5 h-8 rounded-full flex items-start justify-center p-1 ${
              isDark ? 'border border-white/20' : 'border border-black/15'
            }`}
          >
            <motion.div className={`w-1 h-2 rounded-full ${isDark ? 'bg-white/40' : 'bg-black/30'}`} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});
