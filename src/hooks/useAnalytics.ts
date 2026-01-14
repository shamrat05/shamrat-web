import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { track } from '@vercel/analytics';

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views automatically handled by Vercel Analytics, 
    // but we can add custom timing logic here if needed.
    const startTime = Date.now();

    return () => {
      const timeSpent = Date.now() - startTime;
      track('Page View Duration', {
        path: location.pathname,
        duration_ms: timeSpent,
        duration_sec: Math.round(timeSpent / 1000),
      });
    };
  }, [location]);

  const trackEvent = (eventName: string, properties?: Record<string, string | number | boolean>) => {
    track(eventName, properties);
  };

  return { trackEvent };
};
