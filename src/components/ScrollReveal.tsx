import React, { useRef, useEffect, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  width?: "fit-content" | "100%";
}

/**
 * Optimized ScrollReveal using native Intersection Observer and CSS transitions
 * No Framer Motion dependency - significantly lighter and faster on mobile
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  delay = 250, 
  width = "fit-content" 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Use requestAnimationFrame for smooth reveal
          requestAnimationFrame(() => {
            setIsVisible(true);
          });
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <div 
      ref={ref} 
      style={{ 
        position: 'relative', 
        width,
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(75px)',
          transition: `opacity 0.5s ease-out ${delay}ms, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
          willChange: 'opacity, transform',
        }}
      >
        {children}
      </div>
      {/* Animated reveal bar - CSS only */}
      <div
        style={{
          position: 'absolute',
          top: 4,
          bottom: 4,
          left: isVisible ? '100%' : '0',
          right: isVisible ? '0' : 'auto',
          background: 'var(--primary-500)',
          zIndex: 20,
          transition: `left 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
          width: '100%',
        }}
      />
    </div>
  );
};
