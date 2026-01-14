import React, { useState } from 'react';
import { Eye, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks';
import { Link } from 'react-router-dom';
import { useCMS } from '../hooks/useCMS';

export const Projects: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [filter, setFilter] = useState('all');
  const { data } = useCMS();

  const filteredProjects = filter === 'all' 
    ? data.projects 
    : data.projects.filter(p => p.category === filter);

  return (
    <section 
      id="featured-projects" 
      ref={ref}
      className="py-32 bg-bg-page"
    >
      <div className={`container transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <h2 className="section-title">Portfolio</h2>
          <p className="section-subtitle">Projects that showcase my expertise and impact</p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-4 mb-16 flex-wrap">
          {['all', 'analytics', 'marketing', 'operations'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize
                ${filter === f 
                  ? 'bg-primary-500 text-white shadow-[0_4px_15px_rgba(10,132,255,0.3)]' 
                  : 'bg-white/5 border border-white/10 text-text-secondary hover:bg-primary-500 hover:text-white hover:border-primary-500 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(10,132,255,0.3)]'
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project) => (
            <Link 
              to={project.link}
              key={project.id}
              className="group flex flex-col h-full card-glass"
            >
              {/* Image */}
              <div className="relative h-[250px] overflow-hidden flex-shrink-0">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary-500/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="flex items-center gap-2 bg-white text-primary-500 px-4 py-2 rounded-full font-medium hover:scale-110 transition-transform">
                    <Eye size={18} />
                    View
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-text-primary mb-2 line-clamp-2">{project.title}</h3>
                <p className="text-text-secondary mb-4 line-clamp-3 flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-primary-900 text-primary-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/portfolio" className="btn btn-primary group">
            View Full Portfolio
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};