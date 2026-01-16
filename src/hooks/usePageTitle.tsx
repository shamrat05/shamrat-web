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
      let title = 'Md. Shamrat Hossain - Portfolio';

      if (path === '/') title = 'Home | Md. Shamrat Hossain';
      else if (path.startsWith('/portfolio')) title = 'Portfolio | Md. Shamrat Hossain';
      else if (path.startsWith('/blog')) title = 'Blog | Md. Shamrat Hossain';
      
      document.title = title;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    resetTitle(); // Set initial title based on route

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [location]);
};
