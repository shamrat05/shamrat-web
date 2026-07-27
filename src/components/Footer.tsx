import React, { useState, useEffect } from 'react';
import { Mail, Phone, Linkedin, ArrowUp } from 'lucide-react';
import { ShortcutsLegend } from './ShortcutsLegend';

export const Footer: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    let animationFrameId: number;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      animationFrameId = requestAnimationFrame(() => {
        // Calculate scroll progress
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = `${totalScroll / windowHeight}`;
        const progress = Number(scroll);
        
        setScrollProgress(progress);

        if (totalScroll > 300) {
          setShowBackToTop(true);
        } else {
          setShowBackToTop(false);
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SVG Configuration
  const size = 48;
  const strokeWidth = 3;
  const center = size / 2;
  const radius = size / 2 - strokeWidth * 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <footer className="relative overflow-hidden" style={{ background: 'var(--card)' }}>
      {/* Grain overlay on footer */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          filter: 'url(#grain-filter)',
          opacity: 0.03,
          mixBlendMode: 'soft-light',
        }}
      />

      {/* Top border with subtle glow */}
      <div className="relative z-10 border-t border-border-default">
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />
      </div>

      <div className="relative z-10 container pt-12 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold text-text-primary mb-1">Md. Shamrat Hossain</h3>
            <p className="text-text-secondary text-sm">Sales Lead at LevelAxis Technologies</p>
          </div>
          
          <div className="flex items-center gap-3">
            <a
              href="https://calendly.com/shamrat"
              target="_blank"
              rel="noopener noreferrer"
              className="group/button inline-flex shrink-0 items-center justify-center rounded-lg bg-primary-500 text-white text-sm font-medium h-9 px-4 transition-all duration-200 hover:scale-[0.96] active:scale-[0.96]"
            >
              Book a Call
            </a>
            {[
              { icon: Mail, href: 'mailto:shamrat.r.h@gmail.com', label: 'Email' },
              { icon: Phone, href: 'tel:+8801727805705', label: 'Phone' },
              { icon: Linkedin, href: 'https://linkedin.com/in/shamrat5', label: 'LinkedIn' },
            ].map((social, index) => (
              <a 
                key={index}
                href={social.href}
                rel="me"
                className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'var(--background)',
                  color: 'var(--muted-foreground)',
                  border: '1px solid var(--border)',
                }}
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
        
        <div className="text-center pt-6 border-t border-border-default">
          <p className="text-text-secondary text-xs">&copy; {currentYear} Md. Shamrat Hossain. All rights reserved.</p>
          <ShortcutsLegend />
        </div>
      </div>

      {/* Circular Progress Back to Top Button */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 transition-all duration-300 transform ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        aria-label="Back to top"
      >
        <div className="relative flex items-center justify-center group">
          {/* Progress Circle */}
          <svg className="transform -rotate-90 w-[48px] h-[48px]">
            <circle
              className="text-text-secondary/20"
              strokeWidth={strokeWidth}
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx={center}
              cy={center}
            />
            <circle
              className="text-primary-500 transition-all duration-100 ease-out"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx={center}
              cy={center}
            />
          </svg>
          
          {/* Arrow Icon */}
          <div className="absolute inset-0 flex items-center justify-center text-primary-500 group-hover:-translate-y-1 transition-transform duration-300">
            <ArrowUp size={20} />
          </div>
          
          {/* Glass background behind the circle for better visibility */}
          <div className="absolute inset-1 bg-bg-surface/80 backdrop-blur-sm rounded-full -z-10 shadow-lg border border-border-default group-hover:bg-bg-surface transition-colors"></div>
        </div>
      </button>
    </footer>
  );
};
