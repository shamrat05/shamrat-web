import React, { useState, useEffect } from 'react';

interface Skill {
  name: string;
  abbr: string;
  color: string;
  category: string;
}

const skills: Skill[] = [
  { name: 'Marketing Strategy', abbr: 'MS', color: '#3B9EFF', category: 'marketing' },
  { name: 'Data Analytics', abbr: 'DA', color: '#1bb767', category: 'analytics' },
  { name: 'AI & Automation', abbr: 'AI', color: '#79ceff', category: 'tech' },
  { name: 'Sales Operations', abbr: 'SO', color: '#e6b422', category: 'sales' },
  { name: 'CRM Systems', abbr: 'CR', color: '#3B9EFF', category: 'tech' },
  { name: 'SEO & SEM', abbr: 'SE', color: '#1bb767', category: 'marketing' },
  { name: 'Funnel Optimization', abbr: 'FO', color: '#79ceff', category: 'sales' },
  { name: 'React & TypeScript', abbr: 'RT', color: '#3B9EFF', category: 'tech' },
  { name: 'Business Intelligence', abbr: 'BI', color: '#e6b422', category: 'analytics' },
  { name: 'Project Management', abbr: 'PM', color: '#1bb767', category: 'operations' },
  { name: 'Growth Hacking', abbr: 'GH', color: '#79ceff', category: 'marketing' },
  { name: 'Python & ML', abbr: 'PY', color: '#3B9EFF', category: 'tech' },
  { name: 'A/B Testing', abbr: 'AB', color: '#1bb767', category: 'analytics' },
  { name: 'Email Marketing', abbr: 'EM', color: '#e6b422', category: 'marketing' },
  { name: 'Revenue Operations', abbr: 'RO', color: '#79ceff', category: 'sales' },
  { name: 'PostgreSQL & MongoDB', abbr: 'DB', color: '#3B9EFF', category: 'tech' },
];

const SkillPill: React.FC<{ skill: Skill }> = ({ skill }) => {
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
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="inline-flex items-center gap-2 px-1 pr-3.5 py-1 rounded-full cursor-default select-none shrink-0 transition-all duration-300"
      style={{
        background: isDark
          ? `${skill.color}${isHovered ? '22' : '0c'}`
          : `${skill.color}${isHovered ? '14' : '0a'}`,
        border: `1px solid ${isDark
          ? `${skill.color}${isHovered ? '40' : '1a'}`
          : `${skill.color}${isHovered ? '35' : '18'}`}`,
        filter: isHovered ? 'grayscale(0)' : undefined,
      }}
    >
      {/* 2-letter monogram tile */}
      <span
        className="inline-flex items-center justify-center w-6 h-6 rounded-md text-[10px] font-bold shrink-0 transition-all duration-300"
        style={{
          background: isHovered
            ? skill.color
            : isDark
              ? `${skill.color}30`
              : `${skill.color}20`,
          color: isHovered ? '#fff' : skill.color,
        }}
      >
        {skill.abbr}
      </span>
      <span
        className="text-xs font-medium whitespace-nowrap transition-colors duration-300"
        style={{
          color: isDark
            ? isHovered ? '#e5e5e5' : '#a1a1aa'
            : isHovered ? '#111827' : '#6b7280',
        }}
      >
        {skill.name}
      </span>
    </div>
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

  const row1 = [...skills, ...skills];
  const row2 = [...skills.slice().reverse(), ...skills.slice().reverse()];

  return (
    <section
      className="relative py-10 overflow-hidden"
      aria-label="Skills"
    >
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'var(--bg-surface)' }} />

      {/* Edge fade masks using CSS mask-image */}
      <div className="absolute inset-0 pointer-events-none z-10" style={{
        maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
      }}>
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20" style={{ background: isDark ? '#0a0a0a' : '#FFFFFF' }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20" style={{ background: isDark ? '#0a0a0a' : '#FFFFFF' }} />
      </div>

      {/* Row 1 - scrolls left */}
      <div className="relative mb-3" aria-hidden="true">
        <div
          className="flex gap-3 whitespace-nowrap will-change-transform"
          style={{
            width: 'max-content',
            animation: 'marquee-drift 45s linear infinite',
          }}
        >
          {row1.map((skill, i) => (
            <SkillPill key={`r1-${i}`} skill={skill} />
          ))}
        </div>
      </div>

      {/* Row 2 - scrolls right (reversed), slower speed for parallax */}
      <div className="relative" aria-hidden="true">
        <div
          className="flex gap-3 whitespace-nowrap will-change-transform"
          style={{
            width: 'max-content',
            animation: 'marquee-drift 55s linear infinite reverse',
          }}
        >
          {row2.map((skill, i) => (
            <SkillPill key={`r2-${i}`} skill={skill} />
          ))}
        </div>
      </div>

      {/* SR-only static list for accessibility */}
      <ul className="sr-only">
        {skills.map((skill) => (
          <li key={skill.name}>{skill.name}</li>
        ))}
      </ul>
    </section>
  );
};
