import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from '../hooks';
import { useCMS } from '../hooks/useCMS';
import { TiltCard } from './TiltCard';

export const Blog: React.FC = React.memo(() => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const { data } = useCMS();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return saved || systemDark;
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  const featuredPosts = data.posts.slice(0, 3);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>('a')?.offsetWidth || 320;
    el.scrollBy({ left: direction === 'left' ? -(cardWidth + 24) : cardWidth + 24, behavior: 'smooth' });
  };

  const renderCard = (post: (typeof data.posts)[number], index: number) => (
    <TiltCard key={post.id} className="h-full">
      <Link
        to={post.link}
        className="group flex flex-col h-full relative overflow-hidden rounded-xl transition-all duration-300"
        style={{
          background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.015)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
        }}
      >
        {/* Grain overlay on card */}
        <img
          src="/grain_bg.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-[0.06] pointer-events-none z-10"
        />

        {/* Image */}
        <div className="relative h-[200px] overflow-hidden flex-shrink-0">
          <img
            src={post.image}
            alt={post.title}
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide backdrop-blur-sm"
            style={{
              background: isDark ? 'rgba(59,158,255,0.15)' : 'rgba(15,127,255,0.1)',
              color: isDark ? '#79ceff' : '#0f7fff',
              border: `1px solid ${isDark ? 'rgba(59,158,255,0.2)' : 'rgba(15,127,255,0.15)'}`,
            }}
          >
            {post.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow relative z-20">
          <div className="flex items-center gap-4 text-xs mb-3" style={{ color: isDark ? '#737373' : '#6B7280' }}>
            <div className="flex items-center gap-1">
              <Calendar size={14} className="text-primary-500" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} className="text-primary-500" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-text-primary mb-3 line-clamp-2 leading-tight group-hover:text-primary-400 transition-colors duration-300">
            {post.title}
          </h3>

          <p className="text-text-secondary mb-6 line-clamp-3 text-sm leading-relaxed flex-grow">
            {post.description}
          </p>

          <div className="inline-flex items-center gap-2 text-primary-500 font-medium text-sm mt-auto">
            Read More
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </div>
        </div>
      </Link>
    </TiltCard>
  );

  return (
    <section
      id="blog"
      ref={ref}
      className="py-32 bg-bg-surface"
    >
      <div className={`container transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <h2 className="section-title">Latest Insights</h2>
          <p className="section-subtitle">Thoughts on marketing, operations, and growth by Shamrat Hossain</p>
        </div>

        {/* Desktop: Grid | Mobile: Horizontal swipe */}
        {isMobile ? (
          <div className="relative mb-12">
            {/* Scroll arrows */}
            {canScrollLeft && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-bg-surface/90 backdrop-blur-sm border border-border-default flex items-center justify-center text-text-primary shadow-lg -translate-x-1/2"
              >
                <ArrowRight size={18} className="rotate-180" />
              </button>
            )}
            {canScrollRight && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-bg-surface/90 backdrop-blur-sm border border-border-default flex items-center justify-center text-text-primary shadow-lg translate-x-1/2"
              >
                <ArrowRight size={18} />
              </button>
            )}

            {/* Fade edges */}
            {canScrollLeft && <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-bg-surface to-transparent z-10 pointer-events-none" />}
            {canScrollRight && <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-bg-surface to-transparent z-10 pointer-events-none" />}

            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none -mx-4 px-4"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {featuredPosts.map((post, i) => (
                <div key={post.id} className="min-w-[85vw] max-w-[85vw] snap-center shrink-0">
                  {renderCard(post, i)}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredPosts.map((post, i) => renderCard(post, i))}
          </div>
        )}

        <div className="text-center">
          <Link to="/blog" className="btn btn-primary group">
            Explore All Blog Posts
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
});
