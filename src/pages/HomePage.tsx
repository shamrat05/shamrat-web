import React, { lazy, Suspense, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { SectionLoader } from '../components/SectionLoader';
import { SEO } from '../components/SEO';

import { SectionDivider } from '../components/SectionDivider';

const About = lazy(() => import('../components/About').then(module => ({ default: module.About })));
const Skills = lazy(() => import('../components/Skills').then(module => ({ default: module.Skills })));
const Experience = lazy(() => import('../components/Experience').then(module => ({ default: module.Experience })));
const Projects = lazy(() => import('../components/Projects').then(module => ({ default: module.Projects })));
const Blog = lazy(() => import('../components/Blog').then(module => ({ default: module.Blog })));
const Contact = lazy(() => import('../components/Contact').then(module => ({ default: module.Contact })));

type SectionKey = 'about' | 'experience' | 'skills' | 'projects' | 'blog' | 'contact';

const sectionSEO: Record<SectionKey, { title: string; description: string; keywords: string[] }> = {
  about: {
    title: 'About Shamrat | Marketing & Operations Professional',
    description: 'Learn about Md. Shamrat Hossain — a results-driven Marketing & Operations Professional from Bangladesh with expertise in Data Analytics, Digital Strategy, and Business Execution.',
    keywords: ['About Shamrat', 'Shamrat Hossain', 'Marketing Professional Bangladesh', 'Operations Expert', 'Data Analytics Professional'],
  },
  experience: {
    title: 'Experience | Shamrat Hossain — Sales Lead at LevelAxis Technologies',
    description: 'Professional experience of Md. Shamrat Hossain including his current role as Sales Lead at LevelAxis Technologies and previous positions in marketing, operations, and business development.',
    keywords: ['Shamrat experience', 'LevelAxis Technologies', 'Sales Lead', 'Marketing Manager', 'Business Development Bangladesh'],
  },
  skills: {
    title: 'Skills & Expertise | Data Analytics, AI, Marketing — Shamrat Hossain',
    description: 'Skills and technical expertise of Shamrat Hossain spanning Marketing Strategy, Data Analytics, AI & Automation, Sales Operations, CRM Systems, SEO/SEM, Python, and Business Intelligence.',
    keywords: ['Shamrat skills', 'Data Analytics expert', 'AI Marketing', 'CRM specialist', 'SEO SEM Bangladesh', 'Python data analyst'],
  },
  projects: {
    title: 'Projects & Portfolio | Shamrat Hossain — Marketing & Tech',
    description: 'Featured projects and portfolio work by Shamrat Hossain including marketing campaigns, data analytics dashboards, automation tools, and full-stack web applications.',
    keywords: ['Shamrat projects', 'Shamrat portfolio', 'marketing projects', 'data analytics dashboard', 'web application portfolio'],
  },
  blog: {
    title: 'Blog | Marketing Insights & Data Analytics — Shamrat Hossain',
    description: 'Blog posts by Shamrat Hossain covering marketing strategy, data analytics trends, AI in business, and operational excellence.',
    keywords: ['Shamrat blog', 'marketing blog Bangladesh', 'data analytics articles', 'AI business insights'],
  },
  contact: {
    title: 'Contact Shamrat | Book a Call — Marketing & Operations Expert',
    description: 'Get in touch with Md. Shamrat Hossain for marketing consulting, business strategy, data analytics projects, or collaboration opportunities. Book a call via Calendly.',
    keywords: ['Contact Shamrat', 'book a call Shamrat', 'marketing consultant Bangladesh', 'business strategy call'],
  },
};

interface HomePageProps {
  section?: SectionKey;
}

const HomePage: React.FC<HomePageProps> = ({ section }) => {
  const seo = section ? sectionSEO[section] : null;

  useEffect(() => {
    if (section) {
      const timer = setTimeout(() => {
        const el = document.getElementById(section === 'projects' ? 'featured-projects' : section);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [section]);

  return (
    <>
      {seo ? (
        <SEO
          title={seo.title}
          description={seo.description}
          url={`/${section}`}
          keywords={seo.keywords}
        />
      ) : (
        <SEO
          title="Md. Shamrat (Samrat) Hossain | Marketing & Operations Expert"
          description="Official portfolio of Md. Shamrat Hossain, also spelled Samrat Hossain. A results-driven Marketing & Operations Professional in Bangladesh with expertise in Data Analytics and Strategic Business Execution."
          url="/"
          keywords={["Shamrat", "Samrat", "Md. Shamrat Hossain", "Marketing Expert Bangladesh", "Operations Professional"]}
        />
      )}
      <Hero />
      <SectionDivider />
      <Suspense fallback={<SectionLoader />}>
        <About />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Blog />
        <SectionDivider />
        <Contact />
      </Suspense>
    </>
  );
};

export default HomePage;
