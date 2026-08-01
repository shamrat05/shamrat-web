import React, { useState, useEffect } from 'react';

interface Skill {
  name: string;
  abbr: string;
  color: string;
}

const skillsRow1: Skill[] = [
  { name: 'Agentic AI Workflows', abbr: 'AI', color: '#3B9EFF' },
  { name: 'n8n Orchestration', abbr: 'N8', color: '#FF6B35' },
  { name: 'Zapier Automation', abbr: 'ZP', color: '#FF4500' },
  { name: 'Cross-Departmental Pipelines', abbr: 'CD', color: '#3B9EFF' },
  { name: 'Marketing Strategy', abbr: 'MS', color: '#34D399' },
  { name: 'Data Analytics & Power BI', abbr: 'BI', color: '#0052AC' },
];

const skillsRow2: Skill[] = [
  { name: 'Banking Operations', abbr: 'BO', color: '#F59E0B' },
  { name: 'Sales Operations & CRM', abbr: 'SO', color: '#EC4899' },
  { name: 'Process & SLA Engineering', abbr: 'PO', color: '#10B981' },
  { name: 'HubSpot Ecosystem', abbr: 'HS', color: '#FF7A59' },
  { name: 'Python Automation', abbr: 'PY', color: '#8B5CF6' },
  { name: 'REST Webhooks & APIs', abbr: 'API', color: '#06B6D4' },
];

export const TechMarquee: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return document.documentElement.getAttribute('data-theme') !== 'light';
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute('data-theme') !== 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-16 contain-layout overflow-hidden" aria-label="What I work with">
      <div className="container mb-8 text-center">
        <h3 className="text-2xl font-bold tracking-tight text-text-primary">
          What I Work With
        </h3>
        <p className="text-sm text-text-secondary mt-1">
          Production-grade tools, platforms, and automation engines
        </p>
      </div>

      {/* GPU Accelerated Pure CSS Marquee Row 1 */}
      <div className="flex overflow-hidden w-full select-none py-2">
        <div className="flex gap-4 animate-marquee-left shrink-0 min-w-full items-center justify-around">
          {[...skillsRow1, ...skillsRow1, ...skillsRow1].map((skill, idx) => (
            <div
              key={`r1-${idx}`}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-transform duration-200 hover:scale-105 shrink-0 ${
                isDark
                  ? 'bg-[#0a0a0a] border-white/10 text-white'
                  : 'bg-white border-black/10 text-[#0a0a0a] shadow-sm font-semibold'
              }`}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                style={{
                  background: isDark ? `${skill.color}25` : `${skill.color}18`,
                  color: skill.color,
                  border: `1px solid ${skill.color}44`,
                }}
              >
                {skill.abbr}
              </div>
              <span className="text-sm font-semibold whitespace-nowrap">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* GPU Accelerated Pure CSS Marquee Row 2 */}
      <div className="flex overflow-hidden w-full select-none py-2 mt-3">
        <div className="flex gap-4 animate-marquee-right shrink-0 min-w-full items-center justify-around">
          {[...skillsRow2, ...skillsRow2, ...skillsRow2].map((skill, idx) => (
            <div
              key={`r2-${idx}`}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-transform duration-200 hover:scale-105 shrink-0 ${
                isDark
                  ? 'bg-[#0a0a0a] border-white/10 text-white'
                  : 'bg-white border-black/10 text-[#0a0a0a] shadow-sm font-semibold'
              }`}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                style={{
                  background: isDark ? `${skill.color}25` : `${skill.color}18`,
                  color: skill.color,
                  border: `1px solid ${skill.color}44`,
                }}
              >
                {skill.abbr}
              </div>
              <span className="text-sm font-semibold whitespace-nowrap">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
