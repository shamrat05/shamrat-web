import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook to enable View Transitions API for smooth page navigation
 * Uses the modern View Transitions API when available, falls back to instant transition
 * This prevents black screens and provides butter-smooth page changes
 */
export const useViewTransition = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if the browser supports View Transitions API
    if (!document.startViewTransition) {
      return;
    }

    // The View Transitions API doesn't expose currentTransition directly
    // We rely on the CSS ::view-transition pseudo-elements for styling
  }, [location]);

  // Wrap navigation with view transition
  const navigateWithTransition = (callback: () => void) => {
    if (document.startViewTransition) {
      document.startViewTransition(callback);
    } else {
      callback();
    }
  };

  return { navigateWithTransition, supportsViewTransitions: !!document.startViewTransition };
};
