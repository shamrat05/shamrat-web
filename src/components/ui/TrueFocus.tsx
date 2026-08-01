import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TrueFocusProps {
  sentence?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
}

export const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = 'Automating business processes & driving efficiency',
  manualMode = false,
  blurAmount = 4,
  borderColor = '#3B9EFF',
  glowColor = 'rgba(59, 158, 255, 0.4)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  className = '',
}) => {
  const words = sentence.split(' ');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (manualMode) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, (animationDuration + pauseBetweenAnimations) * 1000);

    return () => clearInterval(interval);
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(currentIndex);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode && lastActiveIndex !== null) {
      setCurrentIndex(lastActiveIndex);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 ${className}`}
    >
      {words.map((word, index) => {
        const isFocused = index === currentIndex;

        return (
          <span
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className="relative cursor-pointer select-none py-1 px-1.5 transition-all duration-300"
            style={{
              filter: isFocused ? 'none' : `blur(${blurAmount}px)`,
              opacity: isFocused ? 1 : 0.4,
              transform: isFocused ? 'scale(1.04)' : 'scale(0.98)',
            }}
          >
            <span className="relative z-10 font-bold">{word}</span>

            {isFocused && (
              <motion.span
                layoutId="true-focus-box"
                className="absolute inset-0 rounded-lg border-2 pointer-events-none z-0"
                style={{
                  borderColor: borderColor,
                  boxShadow: `0 0 16px ${glowColor}`,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 25,
                }}
              />
            )}
          </span>
        );
      })}
    </div>
  );
};
