import React, { useEffect, useRef } from 'react';
import { useViewTransition } from '../hooks/useViewTransition';

interface PageTransitionProps {
  children: React.ReactNode;
  location: { pathname: string; search: string };
}

/**
 * PageTransition component using View Transitions API
 * Provides smooth, native page transitions without black screens
 * Falls back to instant transition on unsupported browsers
 */
export const PageTransition: React.FC<PageTransitionProps> = ({ children, location }) => {
  const { navigateWithTransition, supportsViewTransitions } = useViewTransition();
  const previousPathRef = useRef<string>(location.pathname);

  useEffect(() => {
    // Scroll to top with smooth behavior on route change
    const isSamePath = location.pathname === previousPathRef.current;
    
    if (!isSamePath) {
      // Use View Transitions API if available
      navigateWithTransition(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: supportsViewTransitions ? 'instant' : 'smooth'
        });
      });
      
      previousPathRef.current = location.pathname;
    }
  }, [location.pathname, navigateWithTransition, supportsViewTransitions]);

  return (
    <>
      {children}
    </>
  );
};
