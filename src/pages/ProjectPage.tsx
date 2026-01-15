import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Layers } from 'lucide-react';
import { Particles } from '../components/Particles';
import { useCMS } from '../hooks/useCMS';

import { SEO } from '../components/SEO';

export const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useCMS();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const project = data.projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-bg-page text-text-primary">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <Link to="/portfolio" className="btn btn-primary">Back to Portfolio</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 min-h-screen bg-bg-page relative">
      <SEO 
        title={project.title}
        description={project.description}
        image={project.image}
        url={project.link}
        type="article"
        tags={project.tags}
      />
      <Particles />
      
      <div className="container relative z-10 py-12">
        <Link to="/portfolio" className="inline-flex items-center text-primary-500 hover:text-primary-400 mb-8 font-medium transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Back to Projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
          {/* Main Content */}
          <div>
            <div className="rounded-2xl overflow-hidden mb-8 border border-white/10 shadow-2xl">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="glass-panel p-8 rounded-2xl mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                {project.title}
              </h1>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-text-primary mb-3">Overview</h3>
                <p className="text-text-secondary leading-relaxed text-lg">
                  {project.description}
                </p>
              </div>

              {project.challenge && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-text-primary mb-3">The Challenge</h3>
                  <p className="text-text-secondary leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-text-primary mb-3">The Solution</h3>
                  <p className="text-text-secondary leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info Card */}
            <div className="glass-panel p-6 rounded-xl">
              <h3 className="text-lg font-bold text-text-primary mb-4 border-b border-white/10 pb-2">Project Info</h3>
              
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-text-secondary block mb-1">Category</span>
                  <span className="font-medium text-primary-400">{project.category}</span>
                </div>
                
                {project.technologies && (
                  <div>
                    <span className="text-sm text-text-secondary block mb-1">Technologies</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map(tech => (
                        <span key={tech} className="px-3 py-1 text-xs rounded-lg bg-white/5 border border-white/10 text-text-primary">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 flex gap-3">
                  {project.externalLink && (
                    <a href={project.externalLink} className="flex-1 btn btn-primary flex items-center justify-center gap-2 py-2 text-sm">
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                  {project.githubLink && (
                    <a href={project.githubLink} className="flex-1 btn btn-secondary flex items-center justify-center gap-2 py-2 text-sm">
                      <Github size={16} /> Code
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Key Results Card */}
            {project.results && (
              <div className="glass-panel p-6 rounded-xl bg-gradient-to-br from-primary-900/30 to-transparent">
                <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                  <Layers size={20} className="text-primary-500" />
                  Key Results
                </h3>
                <ul className="space-y-3">
                  {project.results.map((result, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-semantic-success shrink-0" />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};