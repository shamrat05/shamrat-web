import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, ArrowRight, Search, Tag, SlidersHorizontal, RotateCcw, Folder } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Particles } from '../components/Particles';
import { useCMS } from '../hooks/useCMS';
import { SEO } from '../components/SEO';
import { usePerformanceMode } from '../hooks/usePerformanceMode';

export const BlogPage: React.FC = () => {
  const { data } = useCMS();
  const { isReduced } = usePerformanceMode();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category') || 'All';
  const selectedTag = searchParams.get('tag') || '';
  const searchQuery = searchParams.get('search') || '';

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract all categories and tag counts
  const categories = useMemo(() => {
    const counts: Record<string, number> = { All: data.posts.length };
    data.posts.forEach((post) => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return Object.keys(counts).map((cat) => ({
      name: cat,
      count: counts[cat],
    }));
  }, [data.posts]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    data.posts.forEach((post) => {
      post.tags?.forEach((t) => tagsSet.add(t));
    });
    return Array.from(tagsSet);
  }, [data.posts]);

  // Filter posts based on Category, Tag, and Search
  const filteredPosts = useMemo(() => {
    return data.posts.filter((post) => {
      const matchCat = selectedCategory === 'All' || post.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchTag = !selectedTag || post.tags?.some((t) => t.toLowerCase() === selectedTag.toLowerCase());
      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.tags?.some((t) => t.toLowerCase().includes(query));

      return matchCat && matchTag && matchSearch;
    });
  }, [data.posts, selectedCategory, selectedTag, searchQuery]);

  const handleCategoryChange = (cat: string) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'All') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    setSearchParams(params);
  };

  const handleTagChange = (tag: string) => {
    const params = new URLSearchParams(searchParams);
    if (selectedTag === tag) {
      params.delete('tag');
    } else {
      params.set('tag', tag);
    }
    setSearchParams(params);
  };

  const handleSearchChange = (val: string) => {
    const params = new URLSearchParams(searchParams);
    if (!val) {
      params.delete('search');
    } else {
      params.set('search', val);
    }
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setSearchParams({});
  };

  const isFiltered = selectedCategory !== 'All' || !!selectedTag || !!searchQuery;

  const dynamicSeoTitle = selectedCategory !== 'All'
    ? `${selectedCategory} Articles & Insights | Md. Shamrat Hossain (Samrat Hossain)`
    : "Blog & Insights | Md. Shamrat Hossain (Samrat Hossain)";

  const dynamicSeoDesc = selectedCategory !== 'All'
    ? `Explore ${selectedCategory} articles, tutorials, and case studies by Md. Shamrat Hossain (Samrat Hossain).`
    : "Thoughts, tutorials, and case studies on marketing, data analytics, operations, and technology by Md. Shamrat Hossain.";

  return (
    <div className="pt-28 min-h-screen bg-bg-page relative">
      <SEO
        title={dynamicSeoTitle}
        description={dynamicSeoDesc}
        url={selectedCategory !== 'All' ? `/blog?category=${encodeURIComponent(selectedCategory)}` : '/blog'}
        keywords={[selectedCategory, selectedTag, 'Shamrat Blog', 'Samrat Blog', 'Marketing Articles Bangladesh', 'Data Analytics Insights'].filter(Boolean)}
      />
      <Particles />

      <div className="container relative z-10 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link to="/" className="inline-flex items-center text-primary-500 hover:text-primary-400 mb-6 font-medium text-sm transition-colors">
            <ArrowLeft size={18} className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Blog & Insights</h1>
          <p className="text-text-secondary text-lg max-w-2xl">
            Thought leadership, technical guides, and strategic insights on marketing, operations, data analytics, and AI.
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6 flex items-center justify-between gap-4 bg-bg-surface p-4 rounded-xl border border-border-default">
          <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
            <Folder size={18} className="text-primary-500" />
            <span>Category: <strong className="text-primary-400">{selectedCategory}</strong></span>
          </div>
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500/10 text-primary-500 border border-primary-500/20 text-xs font-semibold"
          >
            <SlidersHorizontal size={14} />
            {mobileFilterOpen ? 'Hide Categories' : 'Filter Categories'}
          </button>
        </div>

        {/* Main Content Layout: Left Sidebar + Right Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* LEFT SIDEBAR - Smart Categories & Filters */}
          <aside className={`w-full lg:w-72 shrink-0 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            {/* Search Box */}
            <div className="p-5 card-glass">
              <h3 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
                <Search size={16} className="text-primary-500" />
                Search Posts
              </h3>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search title or tag..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm bg-[var(--input)] text-text-primary placeholder-text-secondary border border-[var(--border)] focus:outline-none focus:border-primary-500 transition-all"
                />
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
              </div>
            </div>

            {/* Categories List */}
            <div className="p-5 card-glass">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                  <Folder size={16} className="text-primary-500" />
                  Categories
                </h3>
                {isFiltered && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-primary-500 hover:text-primary-400 flex items-center gap-1 font-medium"
                    title="Reset all filters"
                  >
                    <RotateCcw size={12} />
                    Reset
                  </button>
                )}
              </div>

              <div className="space-y-1.5">
                {categories.map((cat) => {
                  const isActive = selectedCategory.toLowerCase() === cat.name.toLowerCase();
                  return (
                    <button
                      key={cat.name}
                      onClick={() => handleCategoryChange(cat.name)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm transition-all text-left ${
                        isActive
                          ? 'bg-primary-500 text-white font-semibold shadow-md shadow-primary-500/20'
                          : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.04]'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                          isActive ? 'bg-white/20 text-white' : 'bg-primary-900/50 text-primary-400 border border-primary-500/20'
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Popular Tags */}
            {allTags.length > 0 && (
              <div className="p-5 card-glass">
                <h3 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
                  <Tag size={16} className="text-primary-500" />
                  Popular Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => {
                    const isActive = selectedTag.toLowerCase() === tag.toLowerCase();
                    return (
                      <button
                        key={tag}
                        onClick={() => handleTagChange(tag)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-primary-500 text-white font-semibold'
                            : 'bg-primary-900/40 text-primary-400 border border-primary-500/20 hover:border-primary-500'
                        }`}
                      >
                        #{tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>

          {/* RIGHT GRID - Articles Output */}
          <main className="flex-grow w-full">
            {/* Filter Summary Header */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border-default">
              <p className="text-sm text-text-secondary font-medium">
                Showing <span className="text-text-primary font-bold">{filteredPosts.length}</span> {filteredPosts.length === 1 ? 'article' : 'articles'}
                {selectedCategory !== 'All' && <span> in <strong className="text-primary-400">{selectedCategory}</strong></span>}
                {selectedTag && <span> tagged <strong className="text-primary-400">#{selectedTag}</strong></span>}
              </p>

              {isFiltered && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-500 hover:text-primary-400 bg-primary-500/10 px-3 py-1.5 rounded-full border border-primary-500/20"
                >
                  <RotateCcw size={13} />
                  Clear Filters
                </button>
              )}
            </div>

            {/* Posts Grid */}
            {filteredPosts.length === 0 ? (
              <div className="p-12 text-center card-glass rounded-xl my-8">
                <Folder size={40} className="mx-auto text-text-secondary opacity-40 mb-4" />
                <h3 className="text-xl font-bold text-text-primary mb-2">No Articles Found</h3>
                <p className="text-text-secondary text-sm max-w-md mx-auto mb-6">
                  No posts matched your criteria. Try adjusting your category filter or search terms.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="btn btn-primary text-sm px-6 py-2.5"
                >
                  View All Articles
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredPosts.map((post) => (
                    isReduced ? (
                      <div key={post.id} className="group flex flex-col h-full card-glass transition-transform duration-300">
                        {/* Image */}
                        <div className="relative h-[220px] overflow-hidden flex-shrink-0">
                          <img
                            src={post.image}
                            alt={post.title}
                            decoding="async"
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
                            Read Article
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <motion.div
                        key={post.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="group flex flex-col h-full card-glass"
                      >
                        {/* Image */}
                        <div className="relative h-[220px] overflow-hidden flex-shrink-0">
                          <img
                            src={post.image}
                            alt={post.title}
                            decoding="async"
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
                            Read Article
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
