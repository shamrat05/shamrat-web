import React from 'react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from '../hooks';
import { useCMS } from '../hooks/useCMS';

export const Blog: React.FC = React.memo(() => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const { data } = useCMS();

  // Show only first 3 posts on home
  const featuredPosts = data.posts.slice(0, 3);

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post) => (
            <Link 
              to={post.link}
              key={post.id}
              className="group flex flex-col h-full card-glass"
            >
               {/* Image */}
               <div className="relative h-[200px] overflow-hidden flex-shrink-0">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute top-4 left-4 bg-primary-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-text-secondary mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-primary-500" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-primary-500" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-text-primary mb-3 line-clamp-2 leading-tight group-hover:text-primary-400 transition-colors">
                  {post.title}
                </h3>

                <p className="text-text-secondary mb-6 line-clamp-3 text-sm leading-relaxed flex-grow">
                  {post.description}
                </p>

                <div className="inline-flex items-center gap-2 text-primary-500 font-medium text-sm hover:text-primary-400 mt-auto">
                  Read More
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

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