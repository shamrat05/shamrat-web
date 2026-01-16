import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
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

export const usePortfolioStore = create<PortfolioStore>()(
  devtools(
    (set) => ({
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
    }),
    { name: 'PortfolioStore' }
  )
);

// Selectors
export const useProjects = () => usePortfolioStore((state) => state.projects);
export const useBlogPosts = () => usePortfolioStore((state) => state.blogPosts);
export const useSkills = () => usePortfolioStore((state) => state.skills);
export const useExperiences = () => usePortfolioStore((state) => state.experiences);
export const useActiveSection = () => usePortfolioStore((state) => state.activeSection);
export const useIsDarkMode = () => usePortfolioStore((state) => state.isDarkMode);
export const useIsLoading = () => usePortfolioStore((state) => state.isLoading);
export const usePortfolioActions = () => usePortfolioStore((state) => ({
  setActiveSection: state.setActiveSection,
  setDarkMode: state.setDarkMode,
  setLoading: state.setLoading,
  setProjects: state.setProjects,
  setBlogPosts: state.setBlogPosts,
  setSkills: state.setSkills,
  setExperiences: state.setExperiences,
}));
