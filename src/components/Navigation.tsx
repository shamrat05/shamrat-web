import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Navigation: React.FC = React.memo(() => {
  const activeSection = usePortfolioStore((state) => state.activeSection);
  const setActiveSection = usePortfolioStore((state) => state.setActiveSection);
  const setAiChatOpen = usePortfolioStore((state) => state.setAiChatOpen);
  const isAiChatOpen = usePortfolioStore((state) => state.isAiChatOpen);

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return saved || systemDark;
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      return next;
    });
  }, []);

  const navItems = useMemo(() => [
    { label: t('nav.home'), id: 'home', href: '/' },
    { label: t('nav.about'), id: 'about', href: '/#about' },
    { label: t('nav.experience'), id: 'experience', href: '/#experience' },
    { label: t('nav.skills'), id: 'skills', href: '/#skills' },
    { label: t('nav.portfolio'), id: 'projects', href: '/portfolio' },
    { label: t('nav.blog'), id: 'blog', href: '/blog' },
    { label: 'Resume', id: 'resume', href: '/resume' },
    { label: t('nav.contact'), id: 'contact', href: '/#contact' },
  ], [t]);

  const handleNavClick = useCallback((id: string, href: string) => {
    if (href.startsWith('/#') || href === '/') {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => scrollToSection(id, href), 100);
      } else {
        scrollToSection(id, href);
      }
    } else {
      navigate(href);
      window.scrollTo(0, 0);
      setActiveSection(id);
    }
    setIsOpen(false);
  }, [location.pathname, navigate, setActiveSection]);

  const scrollToSection = useCallback((id: string, href: string) => {
    setActiveSection(id);
    if (href === '/') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const el = document.getElementById(href.replace('/#', ''));
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, [setActiveSection]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 h-14 transition-all duration-300 ${
        scrolled
          ? 'bg-[#020202]/90 backdrop-blur-md border-b border-white/[0.08]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="md:container h-full">
        <div className="flex items-center justify-between h-full px-4 md:px-0">
          {/* Logo + Profile */}
          <button
            onClick={() => handleNavClick('home', '/')}
            className="flex items-center gap-2.5 bg-transparent border-none p-0 cursor-pointer group"
          >
            <img
              src="/images/shamrat-profile.jpg"
              alt="Md Shamrat Hossain"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-[var(--tertiary)]/50 transition-all duration-300"
              loading="lazy"
            />
            <span className="text-base font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--tertiary)] transition-colors duration-300">
              Shamrat
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.slice(0, 6).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.href)}
                className={`relative text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-200 bg-transparent border-none cursor-pointer ${
                  (activeSection === item.id || location.pathname === item.href)
                    ? 'text-white'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {item.label}
                {(activeSection === item.id || location.pathname === item.href) && (
                  <span className="absolute inset-0 bg-white/[0.06] rounded-lg -z-10" />
                )}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* AI Chat */}
            <button
              onClick={() => setAiChatOpen(!isAiChatOpen)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isAiChatOpen
                  ? 'text-[var(--accent)] bg-[var(--accent)]/10'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
              aria-label="Toggle AI Chat"
            >
              <Sparkles size={16} />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all duration-200"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Book a Call CTA */}
            <a
              href="https://calendly.com/shamrat-r-h/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center rounded-lg bg-white text-[#020202] text-sm font-medium h-9 px-4 transition-all duration-200 hover:bg-white/90 hover:scale-[0.97] active:scale-[0.97]"
            >
              Book a Call
            </a>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-white/40 hover:text-white"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 origin-top ${
          isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-[#020202]/95 backdrop-blur-xl border-b border-white/[0.08] px-4 py-3 flex flex-col gap-0.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id, item.href)}
              className={`text-left py-2.5 px-3 rounded-lg text-sm transition-all duration-200 ${
                (activeSection === item.id || location.pathname === item.href)
                  ? 'bg-white/[0.06] text-white'
                  : 'text-white/50 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="h-px bg-white/[0.06] my-2" />
          <a
            href="https://calendly.com/shamrat-r-h/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center py-2.5 px-3 rounded-lg text-sm font-medium bg-white text-[#020202] hover:bg-white/90 transition-all"
          >
            Book a Call
          </a>
        </div>
      </div>
    </header>
  );
});
