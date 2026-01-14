import { localData } from '../data/localData';
import type { CMSData, Project, BlogPost } from '../types/cms';

const API_URL = import.meta.env.VITE_API_URL;

class CMSService {
  /*
  private async fetchFromAPI(endpoint: string) {
    if (!API_URL) return null;
    try {
      const response = await fetch(`${API_URL}${endpoint}`);
      if (!response.ok) throw new Error('API Error');
      return await response.json();
    } catch (error) {
      console.error('CMS Fetch Error:', error);
      return null;
    }
  }
  */

  async getData(): Promise<CMSData> {
    // In a real Strapi implementation, we would fetch multiple endpoints here
    // For now, we return localData to ensure "out of the box" functionality
    // If VITE_API_URL is set, we would implement the logic to fetch and merge
    
    if (API_URL) {
      // Placeholder for Strapi Logic
      // const hero = await this.fetchFromAPI('/hero');
      // const projects = await this.fetchFromAPI('/projects');
      // ... transform and return
      console.log('API URL found, but using local fallback for safety until schemas match.');
    }

    return localData;
  }

  async getProject(id: string | number): Promise<Project | undefined> {
    const data = await this.getData();
    return data.projects.find(p => p.id.toString() === id.toString());
  }

  async getPost(id: string | number): Promise<BlogPost | undefined> {
    const data = await this.getData();
    return data.posts.find(p => p.id.toString() === id.toString());
  }
}

export const cms = new CMSService();
