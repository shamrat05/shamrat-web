import { useEffect } from 'react';

export const useDynamicFavicon = () => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      const link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) return;

      if (document.hidden) {
        // Optional: Change to a different icon when inactive
        // link.href = '/favicon-inactive.svg'; 
        // For now, we just rely on the title change, but this hook is ready for icon swapping
      } else {
        link.href = '/favicon.svg';
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);
};
