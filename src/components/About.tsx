import React from 'react';
import { GraduationCap, Briefcase, Heart } from 'lucide-react';
import { useInView } from '../hooks';
import { useCMS } from '../hooks/useCMS';
import { ScrollReveal } from './ScrollReveal';

export const About: React.FC = React.memo(() => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const { data } = useCMS();

  return (
    <section 
      id="about" 
      ref={ref}
      className="py-32 bg-bg-surface"
    >
      <div className={`container transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-12">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">Passionate about creating impact through strategic thinking and data-driven solutions.</p>
        </div>
        
        <div className="max-w-[900px] mx-auto text-center mb-16 text-lg leading-relaxed text-text-secondary flex flex-col items-center">
          {data.about.description.map((paragraph, idx) => (
            <ScrollReveal key={idx} width="100%">
              <p className="mb-6">{paragraph}</p>
            </ScrollReveal>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 items-start">
          <div className="flex flex-col gap-8">
            {/* Education */}
            <div className="flex items-center gap-6 p-6 card-glass">
              <div className="text-primary-500 min-w-[40px] text-center">
                <GraduationCap size={28} />
              </div>
              <div>
                <h4 className="text-text-primary font-bold text-lg mb-1">Education</h4>
                <p className="text-text-secondary">MBA & BBA in Marketing from Islamic University</p>
              </div>
            </div>
            
            {/* Experience */}
            <div className="flex items-center gap-6 p-6 card-glass">
              <div className="text-primary-500 min-w-[40px] text-center">
                <Briefcase size={28} />
              </div>
              <div>
                <h4 className="text-text-primary font-bold text-lg mb-1">Experience</h4>
                <p className="text-text-secondary">2+ years in operations and marketing roles</p>
              </div>
            </div>
            
            {/* Passion */}
            <div className="flex items-center gap-6 p-6 card-glass">
              <div className="text-primary-500 min-w-[40px] text-center">
                <Heart size={28} />
              </div>
              <div>
                <h4 className="text-text-primary font-bold text-lg mb-1">Passion</h4>
                <p className="text-text-secondary">Bridging the gap between strategy and execution</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
             {data.about.stats.map((stat, idx) => (
                <div key={idx} className="text-center p-8 card-glass">
                  <div className="text-4xl md:text-5xl font-bold font-heading text-primary-500 mb-2">{stat.value}</div>
                  <div className="text-xs md:text-sm text-text-secondary uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
});
