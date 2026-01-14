import { create } from 'zustand';
import type { Project, BlogPost, Skill, Experience } from '../types';

interface PortfolioStore {
  // Data
  projects: Project[];
  blogPosts: BlogPost[];
  skills: Skill[];
  experiences: Experience[];
  
  // UI State
  activeSection: string;
  isDarkMode: boolean;
  isLoading: boolean;
  
  // Actions
  setActiveSection: (section: string) => void;
  setDarkMode: (isDark: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setProjects: (projects: Project[]) => void;
  setBlogPosts: (posts: BlogPost[]) => void;
  setSkills: (skills: Skill[]) => void;
  setExperiences: (experiences: Experience[]) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  // Initial state
  projects: [],
  blogPosts: [],
  skills: [],
  experiences: [],
  activeSection: 'home',
  isDarkMode: true,
  isLoading: false,
  
  // Actions
  setActiveSection: (section) => set({ activeSection: section }),
  setDarkMode: (isDark) => set({ isDarkMode: isDark }),
  setLoading: (isLoading) => set({ isLoading }),
  setProjects: (projects) => set({ projects }),
  setBlogPosts: (posts) => set({ blogPosts: posts }),
  setSkills: (skills) => set({ skills }),
  setExperiences: (experiences) => set({ experiences }),
}));
