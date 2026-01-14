export interface HeroData {
  name: string;
  title: string;
  description: string;
  image: string;
}

export interface AboutData {
  description: string[]; // Paragraphs
  stats: {
    label: string;
    value: string;
  }[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  location: string;
}

export interface Project {
  id: string | number;
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  link: string; // Detail page link /portfolio/:id
  externalLink?: string; // Live site
  githubLink?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  technologies?: string[];
}

export interface BlogPost {
  id: string | number;
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  description: string;
  content?: string; // HTML or Markdown
  link: string; // Detail page link /blog/:id
  tags?: string[];
}

export interface Experience {
  id: string | number;
  title: string;
  company: string;
  date: string;
  description: string;
  tags: string[];
}

export interface Skill {
  name: string;
  level: 'expert' | 'advanced' | 'intermediate' | 'beginner';
  icon?: string; // Icon name from Lucide
}

export interface Certification {
  title: string;
  issuer: string;
  icon?: string;
}

export interface CMSData {
  hero: HeroData;
  about: AboutData;
  contact: ContactInfo;
  projects: Project[];
  posts: BlogPost[];
  experience: Experience[];
  skills: {
    technical: Skill[];
    professional: Skill[];
  };
  certifications: Certification[];
}
