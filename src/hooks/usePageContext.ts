import { useLocation } from 'react-router-dom';
import { useCMS } from './useCMS';

export const usePageContext = () => {
  const location = useLocation();
  const { data } = useCMS();
  
  // We need to parse the URL to get IDs/slugs since useParams might be empty if used outside the Route component
  // But AISearch is inside Router, so it *should* work, but useParams is route-specific.
  // Actually, AISearch is global. useParams only works if the component is rendered by a <Route>.
  // Since AISearch is in AppContent (global), useParams might return empty objects if not inside the specific route tree.
  // We'll parse location.pathname manually for reliability.

  const getContext = (): string => {
    const path = location.pathname;

    // 1. Home Page (General Overview)
    if (path === '/') {
      return `Current Page: Home / Overview.
      
      About Me: ${data.about.description.join(' ')}
      Title: ${data.hero.title}
      Top Skills: ${data.skills.technical.map(s => s.name).join(', ')}.
      
      Summary: I am ${data.hero.name}, a ${data.hero.title}. I specialize in data analytics, marketing, and operations.`;
    }

    // 2. Specific Blog Post
    if (path.startsWith('/blog/')) {
      const slug = path.split('/blog/')[1];
      const post = data.posts.find(p => p.slug === slug);
      if (post) {
        // Strip HTML tags for cleaner token usage
        const cleanContent = post.content?.replace(/<[^>]*>/g, '') || post.description;
        return `Current Page: Blog Post - "${post.title}".
        
        Summary: ${post.description}
        Content: ${cleanContent}
        
        User is currently reading this article. Answer questions based on this text.`;
      }
    }

    // 3. Specific Project
    if (path.startsWith('/portfolio/')) {
      const slug = path.split('/portfolio/')[1];
      const project = data.projects.find(p => p.slug === slug);
      if (project) {
        return `Current Page: Project Case Study - "${project.title}".
        
        Category: ${project.category}
        Challenge: ${project.challenge || 'N/A'}
        Solution: ${project.solution || 'N/A'}
        Results: ${project.results?.join(', ') || 'N/A'}
        Technologies: ${project.technologies?.join(', ') || 'N/A'}
        
        User is viewing this project details.`;
      }
    }

    // 4. Resume Page
    if (path ===('/resume')) {
      return `Current Page: Resume / CV.
      
      Experience: ${data.experience.map(e => `${e.title} at ${e.company} (${e.date}): ${e.description}`).join('\n')}
      Education: MBA and BBA in Marketing.
      Certifications: ${data.certifications.map(c => c.title).join(', ')}.`;
    }

    // Default Fallback
    return `Current Page: ${path}. 
    User is navigating the portfolio of Md. Shamrat Hossain.`;
  };

  return getContext();
};
