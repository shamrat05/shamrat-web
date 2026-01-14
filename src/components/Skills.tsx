import React from 'react';
import * as LucideIcons from 'lucide-react';
import { useInView } from '../hooks';
import { useCMS } from '../hooks/useCMS';

export const Skills: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const { data } = useCMS();

  const getIcon = (iconName?: string) => {
    if (!iconName) return LucideIcons.Code;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.Code;
    return Icon;
  };

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'expert': return 'bg-primary-500/10 border-primary-500/30 text-primary-500';
      case 'advanced': return 'bg-primary-400/10 border-primary-400/30 text-primary-400';
      default: return 'bg-primary-400/5 border-primary-400/20 text-primary-400/80';
    }
  };

  return (
    <section 
      id="skills" 
      ref={ref}
      className="py-32 bg-bg-surface"
    >
      <div className={`container transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="section-subtitle">Tools and technologies I use to create value</p>
        </div>

        {/* Skills Tags Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Technical Skills */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-center text-text-primary">Technical Skills</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {data.skills.technical.map((skill, index) => {
                const Icon = getIcon(skill.icon);
                return (
                  <div 
                    key={index}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-white/10 hover:shadow-[0_8px_24px_rgba(10,132,255,0.25)] hover:border-primary-500 ${getLevelColor(skill.level)}`}
                  >
                    <Icon size={16} />
                    <span className="font-medium text-text-primary">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Professional Skills */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-center text-text-primary">Professional Skills</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {data.skills.professional.map((skill, index) => {
                const Icon = getIcon(skill.icon);
                return (
                  <div 
                    key={index}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-white/10 hover:shadow-[0_8px_24px_rgba(10,132,255,0.25)] hover:border-primary-500 ${getLevelColor(skill.level)}`}
                  >
                    <Icon size={16} />
                    <span className="font-medium text-text-primary">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center text-text-primary mb-12">Certifications & Achievements</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.certifications.map((cert, index) => {
              const Icon = getIcon(cert.icon);
              return (
                <div 
                  key={index} 
                  className="flex flex-col items-center text-center p-8 card-glass h-full"
                >
                  <div className="mb-4 text-primary-500">
                    <Icon size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-text-primary mb-2 line-clamp-2">{cert.title}</h4>
                  <p className="text-sm text-text-secondary mt-auto">{cert.issuer}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};