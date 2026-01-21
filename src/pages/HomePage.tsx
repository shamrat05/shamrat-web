import React, { lazy, Suspense } from 'react';
import { Hero } from '../components/Hero';
import { SectionLoader } from '../components/SectionLoader';
import { SEO } from '../components/SEO';
import { localData } from '../data/localData';

const About = lazy(() => import('../components/About').then(module => ({ default: module.About })));
const Skills = lazy(() => import('../components/Skills').then(module => ({ default: module.Skills })));
const Experience = lazy(() => import('../components/Experience').then(module => ({ default: module.Experience })));
const Projects = lazy(() => import('../components/Projects').then(module => ({ default: module.Projects })));
const Blog = lazy(() => import('../components/Blog').then(module => ({ default: module.Blog })));
const Contact = lazy(() => import('../components/Contact').then(module => ({ default: module.Contact })));

const HomePage: React.FC = () => {
  return (
    <>
      <SEO 
        title="Home" 
        description={localData.hero.description}
        url="/"
      />
      <Hero />
      <Suspense fallback={<SectionLoader />}>
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Blog />
        <Contact />
      </Suspense>
    </>
  );
};

export default HomePage;
