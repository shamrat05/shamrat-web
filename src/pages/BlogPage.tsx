import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Particles } from '../components/Particles';
import { useCMS } from '../hooks/useCMS';
import { SEO } from '../components/SEO';

const BlogPage: React.FC = () => {
  const { data } = useCMS();

  return (
    <div className="pt-28 min-h-screen bg-bg-page relative">
       <SEO 
        title="Blog & Insights" 
        description="Thoughts, tutorials, and case studies on marketing, operations, and technology by Md. Shamrat Hossain."
        url="/blog"
      />
       <Particles />
      <div className="container relative z-10 py-16">
        <div className="mb-12">
            <Link to="/" className="inline-flex items-center text-primary-500 hover:text-primary-400 mb-6 font-medium">
                <ArrowLeft size={20} className="mr-2" />
                Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Blog & Insights</h1>
            <p className="text-text-secondary text-lg max-w-2xl">
                Thoughts, tutorials, and case studies on marketing, operations, and technology.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.posts.map((post) => (
                <motion.div 
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="group flex flex-col h-full card-glass"
                >
                     {/* Image */}
                    <div className="relative h-[240px] overflow-hidden flex-shrink-0">
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

                        <h3 className="text-xl font-bold text-text-primary mb-3 leading-tight group-hover:text-primary-400 transition-colors">
                            <Link to={post.link}>{post.title}</Link>
                        </h3>

                        <p className="text-text-secondary mb-6 text-sm leading-relaxed flex-grow">
                            {post.description}
                        </p>

                        <Link to={post.link} className="inline-flex items-center gap-2 text-primary-500 font-medium text-sm hover:text-primary-400 mt-auto">
                            Read More
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
