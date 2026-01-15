import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { Particles } from '../components/Particles';
import { useCMS } from '../hooks/useCMS';

import { SEO } from '../components/SEO';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useCMS();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const post = data.posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-bg-page text-text-primary">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
          <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 min-h-screen bg-bg-page relative">
      <SEO 
        title={post.title}
        description={post.description}
        image={post.image}
        url={post.link}
        type="article"
        publishedTime={post.date}
        tags={post.tags}
      />
      <Particles />
      
      <div className="container relative z-10 py-12">
        <Link to="/blog" className="inline-flex items-center text-primary-500 hover:text-primary-400 mb-8 font-medium transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Back to Articles
        </Link>

        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-4 text-sm text-text-secondary mb-4">
              <span className="bg-primary-500/10 text-primary-500 px-3 py-1 rounded-full font-medium border border-primary-500/20">
                {post.category}
              </span>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{post.readTime}</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
              {post.title}
            </h1>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Content */}
          <div 
            className="prose prose-invert prose-lg max-w-none text-text-secondary glass-panel p-8 md:p-12 rounded-2xl"
            dangerouslySetInnerHTML={{ __html: post.content || '' }} 
          />

          {/* Tags */}
          {post.tags && (
            <div className="mt-12 flex flex-wrap gap-2 justify-center">
              {post.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 px-4 py-2 rounded-full bg-bg-surface border border-white/10 text-sm text-text-secondary">
                  <Tag size={14} />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </div>
    </div>
  );
};