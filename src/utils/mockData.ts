import type { Project, BlogPost, Experience, Skill } from '../types';

// REAL PERSONAL DATA
export const PERSONAL_DATA = {
  name: 'Md. Shamrat Hossain',
  title: 'Marketing & Operations Professional',
  description: 'Results-driven marketing and operations professional with proven expertise in data analytics, stakeholder coordination, and strategic business execution.',
  email: 'shamrat.r.h@gmail.com',
  linkedin: 'https://linkedin.com/in/shamrat5',
  website: 'https://shamrat-on-web.vercel.app',
  phone: '+88 01727-805705',
  address: 'Azimpur, Dhaka, Bangladesh',
};

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Banking Operations Analytics Dashboard',
    description: 'Comprehensive Power BI dashboard analyzing performance metrics across 551+ banking outlets with real-time data integration and geographic analysis across 62 districts.',
    category: 'Analytics',
    tags: ['Power BI', 'Data Analytics', 'Dashboard Design'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    technologies: ['Power BI', 'Excel', 'Power Query', 'SQL'],
    link: '#',
  },
  {
    id: '2',
    title: 'Customer Journey Analytics',
    description: 'Detailed analysis of customer service efficiency and satisfaction metrics across banking outlets with customer touchpoint mapping and service delivery optimization.',
    category: 'Analytics',
    tags: ['Customer Analytics', 'Journey Mapping', 'UX Research'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    technologies: ['Data Analysis', 'Customer Journey Mapping', 'Service Design'],
    link: '#',
  },
  {
    id: '3',
    title: 'Digital Marketing Strategy & Campaign',
    description: 'Developed comprehensive digital marketing strategy for metal industry products. Led multi-channel campaign with market research, content marketing, and paid advertising resulting in 15% increase in online sales.',
    category: 'Marketing',
    tags: ['Digital Marketing', 'Market Research', 'Strategy Development'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    technologies: ['Google Ads', 'Facebook Ads', 'SEO', 'Content Marketing'],
    link: '#',
  },
  {
    id: '4',
    title: 'Process Optimization & Team Coordination',
    description: 'Streamlined operational workflows and implemented team coordination systems for improved efficiency across distributed banking network.',
    category: 'Operations',
    tags: ['Process Optimization', 'Operations Management', 'Team Coordination'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
    technologies: ['Project Management', 'Process Analysis', 'Operations'],
    link: '#',
  },
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Data-Driven Decision Making in Operations',
    description: 'How leveraging data analytics can transform operational efficiency and drive better business outcomes, with insights from managing 551+ banking outlets.',
    category: 'Data Analytics',
    tags: ['Data Analytics', 'Operations', 'Business Intelligence', 'Decision Making'],
    date: '2025-12-05',
    readTime: '8 min read',
    content: 'In today\'s data-driven business environment, the ability to make informed decisions based on solid analytics is no longer a luxury—it\'s a necessity. Having managed operations across 551+ banking outlets, I\'ve witnessed firsthand how data can transform operational efficiency. This article explores key KPIs, data transformation strategies, and practical implementation approaches.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop',
  },
  {
    id: '2',
    title: 'The Future of Digital Banking in Bangladesh',
    description: 'Exploring how digital transformation is reshaping the banking landscape in Bangladesh, and what it means for traditional banking operations and customer experience.',
    category: 'Digital Transformation',
    tags: ['Digital Banking', 'FinTech', 'Digital Transformation', 'Banking Operations'],
    date: '2025-12-08',
    readTime: '7 min read',
    content: 'Digital transformation is revolutionizing the banking sector worldwide, and Bangladesh is no exception. This comprehensive analysis covers mobile banking adoption, AI integration, blockchain potential, and open banking APIs reshaping financial services delivery.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&h=400&fit=crop',
  },
  {
    id: '3',
    title: 'The Ultimate SEO Cheat Sheet: How to Rank on Google and AI Search in 2025',
    description: 'A comprehensive guide to SEO best practices for 2025, covering technical SEO, content optimization, and strategies for appearing in AI search results.',
    category: 'SEO & Marketing',
    tags: ['SEO', 'Google Ranking', 'AI Search', 'Digital Marketing', 'Content Strategy'],
    date: '2025-12-02',
    readTime: '15 min read',
    content: 'Search Engine Optimization continues to evolve with AI-powered search engines and voice assistants becoming mainstream. Learn Core Web Vitals, E-E-A-T principles, content optimization strategies, and how to optimize for both traditional and AI search results.',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=400&fit=crop',
  },
];

export const allSkills: Skill[] = [
  // Technical Skills
  { name: 'Advanced Excel / Google Sheets', level: 95, category: 'technical' as const },
  { name: 'Power BI Dashboarding', level: 90, category: 'technical' as const },
  { name: 'Data Analysis & Reporting', level: 95, category: 'technical' as const },
  { name: 'CRM Systems', level: 85, category: 'technical' as const },
  { name: 'Business Automation', level: 80, category: 'technical' as const },
  { name: 'Python, VBA, JavaScript', level: 85, category: 'technical' as const },
  
  // Professional Skills (Soft Skills)
  { name: 'Strategic Thinking', level: 95, category: 'soft' as const },
  { name: 'Team Leadership', level: 90, category: 'soft' as const },
  { name: 'Customer Relations', level: 95, category: 'soft' as const },
  { name: 'Project Management', level: 88, category: 'soft' as const },
  { name: 'Communication', level: 95, category: 'soft' as const },
  { name: 'Stakeholder Coordination', level: 95, category: 'soft' as const },
];

export const mockExperiences: Experience[] = [
  {
    id: '1',
    title: 'Officer – Smart Banking Operations',
    company: 'DOER Services PLC',
    period: 'Nov 2024 – Aug 2025',
    description: 'Managed daily operations for 551+ agent banking outlets across 62 districts as liaison between field teams, outlet owners, and Agrani Bank stakeholders. Addressed compliance and ownership-related issues while monitoring outlet performance and preparing monthly Bangladesh Bank Transaction Reports.',
    achievements: [
      'Operations Management',
      'Stakeholder Coordination',
      'Data Analysis',
      'Compliance',
    ],
  },
  {
    id: '2',
    title: 'Marketing Intern',
    company: 'Kiam Metal Industries',
    period: 'Dec 2023 – Mar 2024',
    description: 'Supported marketing team in developing sales strategies and conducting market research to identify new business opportunities. Assisted in promotional campaign planning and competitive analysis for cookware products.',
    achievements: [
      'Market Research',
      'Sales Strategy',
      'Competitive Analysis',
      'Campaign Planning',
    ],
  },
];

export const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min read`;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const scrollToSection = (id: string): void => {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: 'smooth' });
};
