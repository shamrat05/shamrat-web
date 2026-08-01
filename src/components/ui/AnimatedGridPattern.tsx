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
    const columns = Math.max(12, Math.floor(viewportSize.width / 36));
    const rows = Math.max(8, Math.floor(viewportSize.height / 36));

    return Array.from({ length: columns * rows }, (_, i) => {
      const col = i % columns;
      const row = Math.floor(i / columns);
      const x = (col + 0.5) * (viewportSize.width / columns);
      const y = (row + 0.5) * (viewportSize.height / rows);
      const base = i % 17 === 0 ? 2.2 : i % 11 === 0 ? 1.45 : 0.95;
      const opacity = i % 19 === 0 ? 0.9 : 0.25 + Math.random() * 0.25;

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
        r={220}
        fill={`url(#${id}-glow)`}
        initial={{ opacity: 0.1, scale: 0.92 }}
        animate={{ opacity: [0.1, 0.24, 0.1], scale: [0.92, 1.08, 0.92] }}
        transition={{ duration: duration + 0.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ filter: 'blur(90px)' }}
      />

      {dots.map((dot, index) => (
        <motion.circle
          key={`${dot.x}-${dot.y}-${index}`}
          cx={dot.x}
          cy={dot.y}
          r={dot.size}
          fill={index % 2 === 0 ? `url(#${id}-dot)` : '#C084FC'}
          initial={{ opacity: dot.opacity * 0.7, scale: 0.92 }}
          animate={{
            opacity: [dot.opacity * 0.7, dot.opacity, dot.opacity * 0.7],
            scale: [0.92, 1.04, 0.92],
          }}
          transition={{
            duration: duration + (index % 5) * 0.2,
            repeat: Infinity,
            delay: (index % 7) * 0.07,
            ease: 'easeInOut',
          }}
        />
      ))}

      {sparkleDots.map((dot, index) => (
        <motion.circle
          key={`spark-${dot.x}-${dot.y}-${index}`}
          cx={dot.x}
          cy={dot.y}
          r={2.7}
          fill="#FFFFFF"
          initial={{ opacity: 0.35, scale: 0.9 }}
          animate={{ opacity: [0.35, 1, 0.35], scale: [0.9, 1.18, 0.9] }}
          transition={{ duration: duration + index * 0.08, repeat: Infinity, delay: index * 0.04, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 8px #FFFFFF) drop-shadow(0 0 12px #C084FC)' }}
        />
      ))}
    </svg>
  );
};
