import { localData } from '../data/localData';
import type { CMSData, Project, BlogPost } from '../types/cms';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class CMSService {
  async getData(): Promise<CMSData> {
    try {
      const response = await fetch(`${API_URL}/api/cms`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('Failed to fetch from CMS, falling back to local data:', error);
      return localData;
    }
  }

  async getProject(slug: string): Promise<Project | undefined> {
    const data = await this.getData();
    return data.projects.find(p => p.slug === slug);
  }

  async getPost(slug: string): Promise<BlogPost | undefined> {
    const data = await this.getData();
    return data.posts.find(p => p.slug === slug);
  }
}

export const cms = new CMSService();