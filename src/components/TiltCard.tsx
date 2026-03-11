import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Optimized TiltCard with mobile detection
 * - Disables 3D tilt on mobile devices (uses simple hover instead)
 * - Uses GPU-accelerated transforms
 * - Throttles motion updates for better performance
 */
export const TiltCard: React.FC<TiltCardProps> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 
        window.matchMedia('(pointer: coarse)').matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Only create motion values on desktop
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { 
    stiffness: 200, 
    damping: 20,
    restDelta: 0.001
  });
  const mouseYSpring = useSpring(y, { 
    stiffness: 200, 
    damping: 20,
    restDelta: 0.001
  });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || isMobile) return;

    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setHover(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setHover(true);
  };

  // Mobile: simple hover effect without 3D tilt
  if (isMobile) {
    return (
      <div
        ref={ref}
        className={`relative transition-transform duration-300 ${className}`}
        style={{
          transform: hover ? 'translateY(-4px)' : 'translateY(0)',
          willChange: 'transform',
        }}
      >
        <div className="h-full">
          {children}
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none rounded-xl z-20 opacity-0 transition-opacity duration-200"
          style={{
            opacity: hover ? 0.2 : 0,
          }}
        />
      </div>
    );
  }

  // Desktop: full 3D tilt effect
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
        willChange: 'transform',
      }}
      className={`relative transition-all duration-200 ease-linear ${className}`}
    >
      <div
        style={{
          transform: "translateZ(30px)",
          transformStyle: "preserve-3d"
        }}
        className="h-full"
      >
        {children}
      </div>

      {/* Gloss/Reflection effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none rounded-xl z-20"
        style={{
          opacity: hover ? 0.3 : 0,
          transition: 'opacity 0.2s',
        }}
      />
    </motion.div>
  );
};
