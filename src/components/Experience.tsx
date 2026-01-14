import React from 'react';
import { useInView } from '../hooks';
import { useCMS } from '../hooks/useCMS';

export const Experience: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const { data } = useCMS();

  return (
    <section 
      id="experience" 
      ref={ref}
      className="py-32 bg-bg-page"
    >
      <div className={`container transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle">Building expertise through diverse roles and challenges</p>
        </div>

        <div className="max-w-[800px] mx-auto relative pl-[30px] md:pl-0">
          {/* Vertical Line */}
          <div className="absolute left-[30px] md:left-[30px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary-500 to-primary-400"></div>

          <div className="flex flex-col gap-12">
            {data.experience.map((exp, index) => (
              <div key={index} className="relative pl-[50px]">
                {/* Marker */}
                <div className="absolute left-[22px] top-2 w-[18px] h-[18px] bg-primary-500 rounded-full border-[4px] border-bg-page shadow-[0_0_0_4px_#0A84FF]"></div>
                
                {/* Content Card */}
                <div className="p-8 card-glass">
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
};
