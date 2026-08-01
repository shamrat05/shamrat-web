import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return saved || systemDark;
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20, restDelta: 0.001 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20, restDelta: 0.001 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || isMobile) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);

    // Update CSS vars for spotlight
    ref.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    setHover(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => setHover(true);

  if (isMobile) {
    return (
      <div
        ref={ref}
        className={`relative transition-transform duration-300 ${className}`}
        style={{ transform: hover ? 'translateY(-4px)' : 'translateY(0)', willChange: 'transform' }}
      >
        <div className="h-full">{children}</div>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateY: hover ? rotateY : 0,
        rotateX: hover ? rotateX : 0,
        transformStyle: hover ? 'preserve-3d' : 'flat',
        willChange: hover ? 'transform' : 'auto',
      }}
      className={`relative transition-all duration-200 ease-out ${className}`}
    >
      <div
        style={{ transform: hover ? 'translateZ(15px)' : 'none' }}
        className="h-full"
      >
        {children}
      </div>

      {/* Mouse-tracking spotlight */}
      <div
        className="absolute inset-0 pointer-events-none rounded-xl z-20 transition-opacity duration-300"
        style={{
          opacity: hover ? 1 : 0,
          background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${isDark ? 'rgba(121,206,255,0.06)' : 'rgba(15,127,255,0.04)'}, transparent 50%)`,
        }}
      />

      {/* Gloss effect */}
      <div
        className="absolute inset-0 pointer-events-none rounded-xl z-20 transition-opacity duration-300"
        style={{
          opacity: hover ? 0.15 : 0,
          background: `linear-gradient(135deg, transparent 30%, ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'} 50%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
};
