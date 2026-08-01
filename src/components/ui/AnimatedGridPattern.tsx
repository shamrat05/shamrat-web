import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedGridPatternProps {
  className?: string;
  maxOpacity?: number;
  duration?: number;
}

export const AnimatedGridPattern: React.FC<AnimatedGridPatternProps> = ({
  className = '',
  maxOpacity = 0.38,
  duration = 3.6,
}) => {
  const id = React.useId();
  const [viewportSize, setViewportSize] = React.useState({ width: 1600, height: 900 });

  React.useEffect(() => {
    const updateSize = () => {
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const glows = React.useMemo(() => {
    const safeWidth = Math.max(viewportSize.width, 900);
    const safeHeight = Math.max(viewportSize.height, 700);

    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: safeWidth * (0.16 + i * 0.12),
      y: safeHeight * (0.2 + (i % 3) * 0.2),
      size: 220 + i * 70,
      opacity: 0.08 + i * 0.03,
    }));
  }, [viewportSize.width, viewportSize.height]);

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ maskImage: 'radial-gradient(circle at center, black 30%, transparent 85%)' }}
    >
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5E8FF" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#C084FC" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#4C1D95" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="100%" height="100%" fill="transparent" />

      {glows.map((glow, idx) => (
        <motion.circle
          key={glow.id}
          cx={glow.x}
          cy={glow.y}
          r={glow.size}
          fill={`url(#${id})`}
          initial={{ opacity: 0.02, scale: 0.92 }}
          animate={{
            opacity: [0.02, glow.opacity, 0.02],
            scale: [0.92, 1.05, 0.92],
          }}
          transition={{
            duration: duration + idx * 0.35,
            repeat: Infinity,
            delay: idx * 0.2,
            ease: 'easeInOut',
          }}
          style={{ filter: 'blur(45px)' }}
        />
      ))}

      {Array.from({ length: 8 }).map((_, idx) => (
        <motion.rect
          key={`spark-${idx}`}
          x={viewportSize.width * (0.12 + idx * 0.1)}
          y={viewportSize.height * (0.18 + (idx % 3) * 0.18)}
          width={170 + idx * 16}
          height={2.2}
          rx={1.1}
          fill="#FFFFFF"
          initial={{ opacity: 0, scaleX: 0.5, scaleY: 0.6 }}
          animate={{
            opacity: [0, maxOpacity, 0],
            scaleX: [0.5, 1, 0.5],
            scaleY: [0.6, 1, 0.6],
          }}
          transition={{
            duration: duration + idx * 0.1,
            repeat: Infinity,
            delay: idx * 0.18,
            ease: 'easeInOut',
          }}
          style={{
            transformOrigin: 'center',
            filter: 'drop-shadow(0 0 8px #FFFFFF) drop-shadow(0 0 12px #C084FC)',
          }}
        />
      ))}
    </svg>
  );
};
