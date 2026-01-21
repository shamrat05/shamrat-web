import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string; // Optional low-res placeholder
}

export const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, placeholderSrc, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/10 backdrop-blur-xl animate-pulse"
          />
        )}
      </AnimatePresence>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        loading={props.loading || "lazy"}
        {...props}
      />
    </div>
  );
};
