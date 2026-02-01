import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = 'Come back soon! 👋 | Md. Shamrat Hossain';
      } else {
        resetTitle();
      }
    };

    const resetTitle = () => {
      const path = location.pathname;
      let title = 'Md. Shamrat Hossain | Marketing & Operations Professional';

      if (path === '/') title = 'Md. Shamrat Hossain | Portfolio & Analytics Expert';
      else if (path.startsWith('/portfolio')) title = 'Portfolio | Shamrat Hossain';
      else if (path.startsWith('/blog')) title = 'Blog & Insights | Shamrat Hossain';
      else if (path.startsWith('/resume')) title = 'Resume | Md. Shamrat Hossain';
      
      document.title = title;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    resetTitle(); // Set initial title based on route

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [location]);
};
