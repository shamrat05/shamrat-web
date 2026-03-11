import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string;
}

/**
 * Optimized LazyImage with:
 * - Native loading="lazy" attribute
 * - CSS-based fade transition (no Framer Motion)
 * - Intersection Observer for preloading
 * - No AnimatePresence re-mounts
 */
export const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className, 
  placeholderSrc,
  loading = "lazy",
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Preload image when it comes into view
  useEffect(() => {
    const element = imgRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      {
        rootMargin: '400px', // Start loading before visible
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ 
        contain: 'layout',
        backgroundImage: placeholderSrc ? `url(${placeholderSrc})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Placeholder background */}
      <div
        className={`absolute inset-0 bg-white/5 transition-opacity duration-300 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backdropFilter: placeholderSrc ? 'blur(10px)' : 'none',
          WebkitBackdropFilter: placeholderSrc ? 'blur(10px)' : 'none',
        }}
      />
      
      {/* Actual image */}
      <img
        ref={imgRef}
        src={isInView ? src : undefined}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={loading === "eager" ? "high" : "auto"}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)} // Show placeholder on error
        {...props}
      />
    </div>
  );
};
