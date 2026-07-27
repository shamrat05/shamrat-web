import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Menu, X, Sparkles, ChevronDown } from 'lucide-react';
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

  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
    <header className={`fixed inset-x-0 top-0 z-30 h-14 transition-all duration-300 border-b ${scrolled ? 'bg-[#020202]/90 backdrop-blur-md border-white/10' : 'bg-transparent border-transparent'}`}>
      <div className="md:container h-full">
        <div className="flex items-center justify-between h-full px-4 md:px-0">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home', '/')}
            className="flex items-center gap-2 bg-transparent border-none p-0 cursor-pointer group"
          >
            <span className="text-lg font-bold tracking-tight text-[var(--tertiary-dark)] group-hover:text-[var(--tertiary)] transition-colors">
              Shamrat
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.slice(0, 6).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.href)}
                className={`text-sm font-medium px-3 py-1.5 rounded-md transition-all bg-transparent border-none cursor-pointer ${
                  (activeSection === item.id || location.pathname === item.href)
                    ? 'text-white bg-white/10'
                    : 'text-[var(--muted-foreground)] hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setAiChatOpen(!isAiChatOpen)}
              className={`p-2 rounded-md transition-colors ${isAiChatOpen ? 'text-[var(--accent)]' : 'text-[var(--muted-foreground)] hover:text-white'}`}
            >
              <Sparkles size={16} />
            </button>

            <a
              href="https://calendly.com/shamrat-r-h/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group/button inline-flex shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-medium h-9 px-4 transition-all hover:scale-[0.96] active:scale-[0.96]"
            >
              Book a Call
            </a>

            <button
              className="md:hidden p-2 text-[var(--muted-foreground)] hover:text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#020202] border-b border-white/10">
          <div className="flex flex-col p-4 gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.href)}
                className={`text-left py-2.5 px-4 rounded-lg text-sm transition-colors ${
                  (activeSection === item.id || location.pathname === item.href)
                    ? 'bg-white/10 text-white'
                    : 'text-[var(--muted-foreground)] hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
});
