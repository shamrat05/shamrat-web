import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Languages, Sparkles, Folder, ChevronDown } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Navigation: React.FC = () => {
  const activeSection = usePortfolioStore((state) => state.activeSection);
  const setActiveSection = usePortfolioStore((state) => state.setActiveSection);
  const setAiChatOpen = usePortfolioStore((state) => state.setAiChatOpen);
  const isAiChatOpen = usePortfolioStore((state) => state.isAiChatOpen);

  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    return savedTheme || systemTheme;
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
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
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          scrollToSection(id, href);
        }, 100);
      } else {
        scrollToSection(id, href);
      }
    } else {
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
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="w-full max-w-5xl bg-neutral-900/80 backdrop-blur-md border border-white/10 rounded-full px-4 py-3 md:px-6 flex items-center justify-between shadow-2xl shadow-black/50 pointer-events-auto">
        {/* Logo */}
        <button
          className="flex items-center gap-2 group bg-transparent border-none p-0 cursor-pointer"
          onClick={() => handleNavClick('home', '/')}
          aria-label="Md. Shamrat Hossain - Homepage"
        >
          <div className="relative flex items-center justify-center">
            <Folder className="w-5 h-5 text-white group-hover:text-neutral-300 transition-colors" />
          </div>
          <div className="relative flex items-center">
            <span className="text-lg font-bold tracking-tight text-white mt-0.5">Shamrat</span>
            <span className={`ml-2 w-2 h-2 rounded-full ${getStatusColor()} shadow-[0_0_8px_currentColor]`} title="Availability Status" />
          </div>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id, item.href)}
              className={`text-sm font-medium transition-colors bg-transparent border-none cursor-pointer ${(activeSection === item.id || location.pathname === item.href)
                  ? 'text-white'
                  : 'text-white/60 hover:text-white'
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAiChatOpen(!isAiChatOpen)}
            className={`p-2 rounded-full transition-colors ${isAiChatOpen ? 'text-primary-400 bg-primary-500/10' : 'text-white/60 hover:text-white'}`}
            aria-label="Toggle AI Chat"
          >
            <Sparkles size={18} />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-white/60 hover:text-white transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="relative">
            <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1.5 transition-colors">
              <img
                src="/images/shamrat-profile.jpg"
                alt="Md Shamrat Hossain"
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="text-sm text-white hidden sm:block max-w-[100px] truncate">Md Shamrat</span>
              <ChevronDown className="w-4 h-4 text-white/60" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white/60 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-20 left-4 right-4 bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-2xl transition-all duration-300 origin-top pointer-events-auto ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
        <div className="flex flex-col p-4 gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id, item.href)}
              className={`text-left py-3 px-4 rounded-lg transition-colors ${(activeSection === item.id || location.pathname === item.href)
                  ? 'bg-primary-500/10 text-primary-400'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
            >
              {item.label}
            </button>
          ))}
          <div className="h-px bg-white/10 my-2" />
          <button
            onClick={toggleLanguage}
            className="text-left py-3 px-4 rounded-lg text-white/60 hover:bg-white/5 hover:text-white transition-colors