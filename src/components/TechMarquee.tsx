import React from 'react';

const technologies = [
  'Shamrat', 'React', 'TypeScript', 'Samrat', 'Node.js', 'Next.js', 'Tailwind CSS', 'GraphQL',
  'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'Figma', 'Framer Motion',
  'Three.js', 'Python', 'Go', 'Rust', 'Kubernetes'
];

export const TechMarquee: React.FC = () => {
  return (
    <div className="relative flex overflow-hidden py-10 bg-bg-surface border-y border-white/5">
      <div className="flex animate-marquee whitespace-nowrap">
        {technologies.map((tech, index) => (
          <span key={index} className="mx-8 text-xl font-bold text-text-secondary uppercase tracking-widest hover:text-primary-500 transition-colors cursor-default">
            {tech}
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {technologies.map((tech, index) => (
          <span key={`dup-${index}`} className="mx-8 text-xl font-bold text-text-secondary uppercase tracking-widest hover:text-primary-500 transition-colors cursor-default">
            {tech}
          </span>
        ))}
      </div>
      
      <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-bg-surface to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-bg-surface to-transparent z-10 pointer-events-none" />
    </div>
  );
};
