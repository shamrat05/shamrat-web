import React from 'react';
import { useInView } from '../hooks';
import { useCMS } from '../hooks/useCMS';

export const Experience: React.FC = React.memo(() => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const { data } = useCMS();

  return (
    <section 
      id="experience" 
      ref={ref}
      className="py-32 bg-bg-page contain-layout"
    >
      <div className={`container transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle">Building expertise through diverse roles and challenges</p>
        </div>

        <div className="max-w-[800px] mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-4 top-3 bottom-3 w-[2px] bg-gradient-to-b from-primary-500 via-primary-400 to-primary-600 rounded-full" />

          <div className="flex flex-col gap-8 md:gap-12">
            {data.experience.map((exp, index) => (
              <div key={index} className="relative pl-10 sm:pl-12">
                {/* Marker Dot - Centered on 16px vertical line */}
                <div className="absolute left-[9px] top-6 w-3.5 h-3.5 bg-primary-500 rounded-full ring-4 ring-bg-page shadow-[0_0_12px_rgba(10,132,255,0.6)] z-10" />
                
                {/* Content Card */}
                <div className="p-6 sm:p-8 card-glass">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-1">{exp.title}</h3>
                      <span className="text-primary-400 font-medium">{exp.company}</span>
                    </div>
                    <span className="text-sm text-text-secondary bg-primary-900/50 px-3 py-1 rounded-full border border-primary-500/20 whitespace-nowrap">
                      {exp.date}
                    </span>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-text-secondary leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-primary-900 text-primary-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
