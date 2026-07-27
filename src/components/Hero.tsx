import React from 'react';
import { useCMS } from '../hooks/useCMS';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';

export const Hero: React.FC = React.memo(() => {
  const { data } = useCMS();
  const { t } = useTranslation();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-14">
      <div className="z-10 flex flex-col w-full max-w-5xl mx-auto px-4 items-center justify-center text-center">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-6 text-[var(--foreground)]">
          <span className="block">{data.hero.name}</span>
          <span className="block text-lg sm:text-xl md:text-2xl text-[var(--muted-foreground)] font-medium tracking-wide mt-3">
            {t('hero.alias')}
          </span>
          <span className="block text-xl sm:text-2xl md:text-3xl text-[var(--accent)] mt-2">
            {t('hero.role')}
          </span>
        </h1>

        <p className="text-base md:text-lg text-[var(--muted-foreground)] max-w-2xl font-light leading-relaxed mb-10 mx-auto">
          {data.hero.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <a
            href="https://calendly.com/shamrat-r-h/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="group/button relative inline-flex shrink-0 items-center justify-center rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium h-12 px-6 transition-all hover:scale-[0.96] active:scale-[0.96]"
          >
            <span>Book a Call</span>
            <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <img
              src="/cat-sitting-black.gif"
              alt=""
              className="absolute h-8 w-9.25 object-contain -top-[calc(100%-12px)] right-4"
            />
          </a>

          <button
            onClick={() => scrollTo('contact')}
            className="group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-transparent text-[var(--foreground)] text-sm font-medium h-12 px-6 transition-all hover:bg-white/5"
          >
            <span>Contact Us</span>
          </button>
        </div>
      </div>
    </section>
  );
});
