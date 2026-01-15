import { localData } from '../data/localData';
import type { CMSData, Project, BlogPost } from '../types/cms';

// Only use external API if explicitly configured
// In production/Vercel: no API_URL env var → use local data (no network access attempts)
// In development with server: set VITE_API_URL → use external API
// When migrating away from Vercel: set VITE_API_URL → use external API
const API_URL = import.meta.env.VITE_API_URL;
const USE_EXTERNAL_API = !!API_URL && API_URL !== 'undefined';

class CMSService {
  async getData(): Promise<CMSData> {
    // If no external API configured, use local data immediately (no network calls)
    if (!USE_EXTERNAL_API) {
      return localData;
    }

    // External API is configured, attempt to fetch
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