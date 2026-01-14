import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Particles } from '../components/Particles';
import { useCMS } from '../hooks/useCMS';

export const PortfolioPage: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const { data } = useCMS();

  const filteredProjects = filter === 'all' 
    ? data.projects 
    : data.projects.filter(p => p.category === filter);

  return (
    <div className="pt-28 min-h-screen bg-bg-page relative">
       <Particles />
      <div className="container relative z-10 py-16">
        <div className="mb-12">
            <Link to="/" className="inline-flex items-center text-primary-500 hover:text-primary-400 mb-6 font-medium">
                <ArrowLeft size={20} className="mr-2" />
                Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Full Portfolio</h1>
            <p className="text-text-secondary text-lg max-w-2xl">
                A showcase of my projects across marketing, operations, and analytics.
            </p>
        </div>

        {/* Filters */}
        <div className="flex justify-start gap-4 mb-12 flex-wrap">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Link 
                to={project.link}
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
                <h3 className="text-xl font-bold text-text-primary mb-2 line-clamp-2">
                    <Link to={project.link}>{project.title}</Link>
                </h3>
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
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
