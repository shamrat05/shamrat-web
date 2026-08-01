import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedGridPatternProps {
  className?: string;
  maxOpacity?: number;
  duration?: number;
}

export const AnimatedGridPattern: React.FC<AnimatedGridPatternProps> = ({
  className = '',
  maxOpacity = 0.55,
  duration = 3.4,
}) => {
  const id = React.useId();
  const [viewportSize, setViewportSize] = React.useState({ width: 1600, height: 900 });
  const [pointer, setPointer] = React.useState({ x: 800, y: 450 });

  React.useEffect(() => {
    const updateSize = () => {
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
      setPointer({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const dots = React.useMemo(() => {
    const columns = Math.max(10, Math.floor(viewportSize.width / 44));
    const rows = Math.max(7, Math.floor(viewportSize.height / 44));

    return Array.from({ length: columns * rows }, (_, i) => {
      const col = i % columns;
      const row = Math.floor(i / columns);
      const x = (col + 0.5) * (viewportSize.width / columns);
      const y = (row + 0.5) * (viewportSize.height / rows);
      const base = i % 13 === 0 ? 2.1 : 1.1;
      const opacity = i % 19 === 0 ? 0.8 : 0.35 + Math.random() * 0.2;

      return { x, y, size: base, opacity };
    });
  }, [viewportSize.width, viewportSize.height]);

  const sparkleDots = React.useMemo(() => dots.filter((_, i) => i % 19 === 0), [dots]);

  const handlePointerMove = (event: React.MouseEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      onMouseMove={handlePointerMove}
      onMouseLeave={() => setPointer({ x: viewportSize.width / 2, y: viewportSize.height / 2 })}
      style={{ maskImage: 'radial-gradient(circle at center, black 35%, transparent 90%)' }}
    >
      <defs>
        <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#C084FC" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#4C1D95" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-dot`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="100%" stopColor="#A855F7" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      <rect width="100%" height="100%" fill="transparent" />

      <motion.circle
        cx={pointer.x}
        cy={pointer.y}
        r={180}
        fill={`url(#${id}-glow)`}
        initial={{ opacity: 0.12, scale: 0.9 }}
        animate={{ opacity: [0.12, 0.22, 0.12], scale: [0.9, 1.04, 0.9] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
        style={{ filter: 'blur(80px)' }}
      />

      {dots.map((dot, index) => (
        <circle
          key={`${dot.x}-${dot.y}-${index}`}
          cx={dot.x}
          cy={dot.y}
          r={dot.size}
          fill={index % 2 === 0 ? `url(#${id}-dot)` : '#C084FC'}
          opacity={dot.opacity}
        />
      ))}

      {sparkleDots.map((dot, index) => (
        <motion.circle
          key={`spark-${dot.x}-${dot.y}-${index}`}
          cx={dot.x}
          cy={dot.y}
          r={2.4}
          fill="#FFFFFF"
          initial={{ opacity: 0.3, scale: 0.9 }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: duration + index * 0.12, repeat: Infinity, delay: index * 0.05, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 6px #FFFFFF) drop-shadow(0 0 10px #C084FC)' }}
        />
      ))}
    </svg>
  );
};
