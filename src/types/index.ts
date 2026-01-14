export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  link?: string;
  technologies: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  content: string;
  readTime: string;
  image: string;
}

export interface Skill {
  name: string;
  level: number; // 1-100
  category: 'technical' | 'soft' | 'tools';
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface AnimationVariants {
  initial: Record<string, unknown>;
  animate: Record<string, unknown>;
  exit?: Record<string, unknown>;
  transition?: Record<string, unknown>;
}
