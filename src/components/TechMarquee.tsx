import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  icon: string;
  color: string;
  bg: string;
  category: string;
}

const skills: Skill[] = [
  { name: 'Marketing Strategy', icon: '🎯', color: '#3B9EFF', bg: 'rgba(59,158,255,0.08)', category: 'marketing' },
  { name: 'Data Analytics', icon: '📊', color: '#1bb767', bg: 'rgba(27,183,103,0.08)', category: 'analytics' },
  { name: 'AI & Automation', icon: '🤖', color: '#79ceff', bg: 'rgba(121,206,255,0.08)', category: 'tech' },
  { name: 'Sales Operations', icon: '💡', color: '#e6ff4c', bg: 'rgba(230,255,76,0.08)', category: 'sales' },
  { name: 'CRM Systems', icon: '🔗', color: '#3B9EFF', bg: 'rgba(59,158,255,0.08)', category: 'tech' },
  { name: 'SEO & SEM', icon: '🔍', color: '#1bb767', bg: 'rgba(27,183,103,0.08)', category: 'marketing' },
  { name: 'Funnel Optimization', icon: '⚡', color: '#79ceff', bg: 'rgba(121,206,255,0.08)', category: 'sales' },
  { name: 'React & TypeScript', icon: '⚛️', color: '#3B9EFF', bg: 'rgba(59,158,255,0.08)', category: 'tech' },
  { name: 'Business Intelligence', icon: '📈', color: '#e6ff4c', bg: 'rgba(230,255,76,0.08)', category: 'analytics' },
  { name: 'Project Management', icon: '📋', color: '#1bb767', bg: 'rgba(27,183,103,0.08)', category: 'operations' },
  { name: 'Growth Hacking', icon: '🚀', color: '#79ceff', bg: 'rgba(121,206,255,0.08)', category: 'marketing' },
  { name: 'Python & ML', icon: '🐍', color: '#3B9EFF', bg: 'rgba(59,158,255,0.08)', category: 'tech' },
  { name: 'A/B Testing', icon: '🔬', color: '#1bb767', bg: 'rgba(27,183,103,0.08)', category: 'analytics' },
  { name: 'Email Marketing', icon: '✉️', color: '#e6ff4c', bg: 'rgba(230,255,76,0.08)', category: 'marketing' },
  { name: 'Revenue Operations', icon: '💰', color: '#79ceff', bg: 'rgba(121,206,255,0.08)', category: 'sales' },
  { name: 'PostgreSQL & MongoDB', icon: '🗄️', color: '#3B9EFF', bg: 'rgba(59,158,255,0.08)', category: 'tech' },
];

const Badge: React.FC<{ skill: Skill }> = ({ skill }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return saved || systemDark;
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? 1.05 : 1,
        y: isHovered ? -2 : 0,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full cursor-default select-none shrink-0"
      style={{
        background: isDark ? skill.bg : `${skill.color}12`,
        border: `1px solid ${isDark ? `${skill.color}20` : `${skill.color}25`}`,
      }}
    >
      {/* Glow on hover */}
      <motion.div
        animate={{ opacity: isHovered ? 0.15 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-full"
        style={{ background: skill.color, filter: 'blur(12px)' }}
      />
      <span className="text-base relative z-10">{skill.icon}</span>
      <span
        className="text-sm font-medium relative z-10 whitespace-nowrap"
        style={{ color: skill.color }}
      >
        {skill.name}
      </span>
    </motion.div>
  );
};

export const TechMarquee: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return saved || systemDark;
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  return (
    <section className="relative py-12 overflow-hidden" style={{ background: isDark ? 'var(--bg-page)' : 'var(--bg-page)' }}>
      {/* Top/bottom fade */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-bg-page to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-bg-page to-transparent z-10 pointer-events-none" />

      {/* Row 1 - scrolls left */}
      <div className="relative mb-4">
        <div className="flex animate-marquee whitespace-nowrap gap-3">
          {[...skills, ...skills].map((skill, i) => (
            <Badge key={`r1-${i}`} skill={skill} />
          ))}
        </div>
      </div>

      {/* Row 2 - scrolls right (reversed) */}
      <div className="relative">
        <div className="flex animate-marquee-reverse whitespace-nowrap gap-3" style={{ animationDirection: 'reverse' }}>
          {[...skills.slice().reverse(), ...skills.slice().reverse()].map((skill, i) => (
            <Badge key={`r2-${i}`} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
};
