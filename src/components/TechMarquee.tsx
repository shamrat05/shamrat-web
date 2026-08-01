import React from 'react';
import { GridMotion } from './ui/GridMotion';

interface Skill {
  name: string;
  abbr: string;
  color: string;
}

const skills: Skill[] = [
  { name: 'Agentic AI Workflows', abbr: 'AI', color: '#79CEFF' },
  { name: 'n8n Orchestration', abbr: 'N8', color: '#FF6B35' },
  { name: 'Zapier Automation', abbr: 'ZP', color: '#FF4500' },
  { name: 'Cross-Departmental Pipelines', abbr: 'CD', color: '#3B9EFF' },
  { name: 'Marketing Strategy', abbr: 'MS', color: '#34D399' },
  { name: 'Data Analytics & Power BI', abbr: 'BI', color: '#0052AC' },
  { name: 'Banking Operations', abbr: 'BO', color: '#F59E0B' },
  { name: 'Sales Operations & CRM', abbr: 'SO', color: '#EC4899' },
  { name: 'Process & SLA Engineering', abbr: 'PO', color: '#10B981' },
  { name: 'HubSpot Ecosystem', abbr: 'HS', color: '#FF7A59' },
  { name: 'Python Automation', abbr: 'PY', color: '#8B5CF6' },
  { name: 'REST Webhooks & APIs', abbr: 'API', color: '#06B6D4' },
];

export const TechMarquee: React.FC = () => {
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

      <GridMotion items={skills} />
    </section>
  );
};
