import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Languages, Sparkles } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';
import { Typewriter } from './Typewriter';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Navigation: React.FC = () => {
  const activeSection = usePortfolioStore((state) => state.activeSection);
  const setActiveSection = usePortfolioStore((state) => state.setActiveSection);
  const setAiChatOpen = usePortfolioStore((state) => state.setAiChatOpen);
  const isAiChatOpen = usePortfolioStore((state) => state.isAiChatOpen);
  
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Theme initialization
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'bn' : 'en';
    i18n.changeLanguage(newLang);
  };

  const navItems = [
    { label: t('nav.home'), id: 'home', href: '/' },
    { label: t('nav.about'), id: 'about', href: '/#about' },
    { label: t('nav.experience'), id: 'experience', href: '/#experience' },
    { label: t('nav.skills'), id: 'skills', href: '/#skills' },
    { label: t('nav.portfolio'), id: 'projects', href: '/portfolio' },
    { label: t('nav.blog'), id: 'blog', href: '/blog' },
    { label: 'Resume', id: 'resume', href: '/resume' },
    { label: t('nav.contact'), id: 'contact', href: '/#contact' },
  ];

  // Status Dot Logic
  const getStatusColor = () => {
    const now = new Date();
    const bdHour = parseInt(new Intl.DateTimeFormat('en-US', { 
      timeZone: 'Asia/Dhaka', 
      hour: 'numeric', 
      hour12: false 
    }).format(now), 10);
    return (bdHour >= 9 && bdHour < 23) ? 'bg-semantic-success' : 'bg-orange-500';
  };

  const handleNavClick = (id: string, href: string) => {
    if (href.startsWith('/#') || href === '/') {
        // If we are not on home page, navigate to home first
        if (location.pathname !== '/') {
            navigate('/');
            // Small timeout to allow navigation to complete before scrolling
            setTimeout(() => {
                scrollToSection(id, href);
            }, 100);
        } else {
            scrollToSection(id, href);
        }
    } else {
        // Direct route navigation (Blog, Portfolio page)
        navigate(href);
        window.scrollTo(0, 0);
        setActiveSection(id);
    }
    setIsOpen(false);
  };

  const scrollToSection = (id: string, href: string) => {
    setActiveSection(id);
    if (href === '/') {
         window.scrollTo({ top: 0, behavior: 'smooth' });
         return;
    }
    const elementId = href.replace('/#', '');
    const element = document.getElementById(elementId);
    
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300
      bg-bg-surface/70 backdrop-blur-xl border-b border-white/10 shadow-sm
    ">
      <div className="max-w-[1280px] mx-auto px-4 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <button 
          className="relative flex items-center justify-center gap-2 cursor-pointer bg-transparent border-none p-0" 
          onClick={() => handleNavClick('home', '/')}
          aria-label="Go to homepage"
        >
             <span className="font-heading font-bold text-2xl bg-gradient-to-br from-primary-500 to-primary-400 bg-clip-text text-transparent">SH</span>
             <span className={`w-2 h-2 rounded-full ${getStatusColor()} shadow-[0_0_8px_currentColor]`} title="Availability Status" />
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.href)}
                className={`relative font-medium text-sm transition-colors duration-300 py-2 cursor-pointer
                  ${(activeSection === item.id || location.pathname === item.href) ? 'text-primary-500' : 'text-text-primary hover:text-primary-500'}
                  after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:bg-primary-500 after:transition-all after:duration-300
                  ${(activeSection === item.id || location.pathname === item.href) ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
                `}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4 border-l border-border-default pl-4">
             {/* Typewriter Effect */}
             <div className="flex items-center text-xs font-mono text-primary-500 bg-primary-500/10 px-2 py-1 rounded min-w-[100px]">
                <Typewriter />
             </div>

             <button
                onClick={() => setAiChatOpen(!isAiChatOpen)}
                className={`p-2 rounded-lg transition-colors flex items-center gap-1 font-mono text-xs uppercase ${isAiChatOpen ? 'text-primary-500 bg-primary-500/10' : 'text-text-primary hover:bg-bg-page hover:text-primary-500'}`}
                aria-label="Ask AI"
             >
                <Sparkles size={16} />
                AI
             </button>

             <button
                onClick={toggleLanguage}
                className="p-2 rounded-lg text-text-primary hover:bg-bg-page hover:text-primary-500 transition-colors flex items-center gap-1 font-mono text-xs uppercase"
                aria-label="Toggle language"
             >
                <Languages size={16} />
                {i18n.language === 'en' ? 'BN' : 'EN'}
             </button>

             <button 
                onClick={toggleTheme}
                className="p-2 rounded-lg text-text-primary hover:bg-bg-page hover:text-primary-500 transition-colors"
                aria-label="Toggle theme"
             >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
             </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Typewriter for Mobile */}
          <div className="flex items-center text-xs font-mono text-primary-500 bg-primary-500/10 px-2 py-1 rounded min-w-[80px] max-w-[100px] overflow-hidden">
             <Typewriter />
          </div>

          <button 
            onClick={() => setAiChatOpen(!isAiChatOpen)}
            className={`p-2 rounded-lg transition-colors ${isAiChatOpen ? 'text-primary-500 bg-primary-500/10' : 'text-text-primary hover:bg-bg-page hover:text-primary-500'}`}
            aria-label="Ask AI"
          >
            <Sparkles size={20} />
          </button>

          <button 
            onClick={toggleLanguage}
            className="p-2 rounded-lg text-text-primary hover:bg-bg-page hover:text-primary-500 transition-colors font-mono text-xs uppercase"
          >
            {i18n.language === 'en' ? 'BN' : 'EN'}
          </button>

          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg text-text-primary hover:bg-bg-page hover:text-primary-500 transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button
            className="p-2 text-text-primary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-[73px] left-0 right-0 bg-bg-surface/95 backdrop-blur-xl border-b border-border-default transition-all duration-300 origin-top ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
        <div className="flex flex-col p-4 gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id, item.href)}
              className={`text-left py-3 px-4 rounded-lg transition-colors ${
                (activeSection === item.id || location.pathname === item.href)
                  ? 'bg-primary-500/10 text-primary-500'
                  : 'text-text-primary hover:bg-bg-page'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};