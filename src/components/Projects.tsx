import React, { useState, useMemo, useDeferredValue, useRef, useEffect } from 'react';
import { Eye, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks';
import { Link } from 'react-router-dom';
import { useCMS } from '../hooks/useCMS';
import { motion, AnimatePresence } from 'framer-motion';
import { TiltCard } from './TiltCard';
import { usePerformanceMode } from '../hooks/usePerformanceMode';

export const Projects: React.FC = React.memo(() => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [filter, setFilter] = useState('all');
  const deferredFilter = useDeferredValue(filter);
  const { data } = useCMS();
  const { isReduced } = usePerformanceMode();
  const [isMobile, setIsMobile] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredProjects = useMemo(() => 
    deferredFilter === 'all' 
      ? data.projects 
      : data.projects.filter(p => p.category === deferredFilter),
    [deferredFilter, data.projects]
  );

  const checkScrollability = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    if (!isMobile) return;
    checkScrollability();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScrollability);
    return () => el.removeEventListener('scroll', checkScrollability);
  }, [isMobile, filteredProjects]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const renderCard = (project: (typeof data.projects)[number]) => (
    <TiltCard className="h-full">
      <Link 
        to={project.link}
        className="group flex flex-col h-full card-glass"
      >
        {/* Image */}
        <div className="relative h-[240px] overflow-hidden flex-shrink-0">
          <img 
            src={project.image} 
            alt={project.title} 
            decoding="async"
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
          <p className="text-text-secondary mb-4 line-clamp-3 flex-grow text-sm leading-relaxed">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-primary-900 text-primary-500">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </TiltCard>
  );

  return (
    <section 
      id="featured-projects" 
      ref={ref}
      className="py-32 bg-bg-page contain-layout"
    >
      <div className={`container transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <h2 className="section-title">Portfolio</h2>
          <p className="section-subtitle">Featured projects across Agentic AI, Operations, Marketing & Growth Strategy</p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2.5 md:gap-4 mb-14 flex-wrap">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'ai-automation', label: 'AI & Automation' },
            { id: 'analytics', label: 'Analytics' },
            { id: 'marketing', label: 'Marketing' },
            { id: 'operations', label: 'Operations' },
            { id: 'strategy-growth', label: 'Strategy & Growth' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border
                ${filter === cat.id 
                  ? 'bg-primary-500 text-white shadow-[0_4px_15px_rgba(10,132,255,0.3)] border-primary-500' 
                  : 'bg-bg-surface border-border-default text-text-secondary hover:bg-primary-500 hover:text-white hover:border-primary-500 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(10,132,255,0.3)]'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Desktop Grid vs Mobile Swipable Carousel */}
        {isMobile ? (
          <div className="relative mb-14">
            {/* Scroll arrows */}
            {canScrollLeft && (
              <button
                onClick={() => scroll('left')}
                aria-label="Scroll left"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-bg-surface/90 backdrop-blur-sm border border-border-default flex items-center justify-center text-text-primary shadow-lg -translate-x-1/2"
              >
                <ArrowRight size={18} className="rotate-180" />
              </button>
            )}
            {canScrollRight && (
              <button
                onClick={() => scroll('right')}
                aria-label="Scroll right"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-bg-surface/90 backdrop-blur-sm border border-border-default flex items-center justify-center text-text-primary shadow-lg translate-x-1/2"
              >
                <ArrowRight size={18} />
              </button>
            )}

            {/* Swipable Row */}
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none -mx-4 px-4"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {filteredProjects.map((project) => (
                <div key={project.id} className="min-w-[85vw] max-w-[85vw] snap-center shrink-0">
                  {renderCard(project)}
                </div>
              ))}
            </div>
          </div>
        ) : isReduced ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredProjects.map((project) => (
              <div key={project.id} className="transition-transform duration-300">
                {renderCard(project)}
              </div>
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                >
                  {renderCard(project)}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

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
});
