import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedGridPatternProps {
  width?: number;
  height?: number;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
}

export const AnimatedGridPattern: React.FC<AnimatedGridPatternProps> = ({
  width = 48,
  height = 48,
  numSquares = 8,
  className = '',
  maxOpacity = 0.35,
  duration = 3.8,
}) => {
  const id = React.useId();
  const [viewportSize, setViewportSize] = React.useState({ width: 1600, height: 900 });

  React.useEffect(() => {
    const updateSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const squares = React.useMemo(() => {
    const safeWidth = Math.max(viewportSize.width, 900);
    const safeHeight = Math.max(viewportSize.height, 700);

    return Array.from({ length: numSquares }, (_, i) => {
      const side = i % 2 === 0 ? 'left' : 'right';
      const x =
        side === 'left'
          ? Math.random() * safeWidth * 0.22 + safeWidth * 0.05
          : Math.random() * safeWidth * 0.22 + safeWidth * 0.73;
      const y = Math.random() * safeHeight * 0.76 + safeHeight * 0.12;

      return {
        id: i,
        x,
        y,
        color:
          i % 4 === 0
            ? '#8B5CF6'
            : i % 4 === 1
              ? '#C084FC'
              : i % 4 === 2
                ? '#A855F7'
                : '#F472B6',
        length: Math.random() * 10 + 16,
      };
    });
  }, [numSquares, viewportSize.width, viewportSize.height]);

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full fill-gray-400/10 stroke-gray-400/20 [mask-image:radial-gradient(1000px_circle_at_center,white,transparent)] ${className}`}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={-1}
          y={-1}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="opacity-10"
          />
        </pattern>

        {/* Vivid Purple Glitter Gradient */}
        <linearGradient id="glitterSparkle" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="25%" stopColor="#F5E8FF" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#C084FC" stopOpacity="0.98" />
          <stop offset="80%" stopColor="#8B5CF6" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#4C1D95" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />

      {/* Glitter Shiny Grains inside Grid Cells */}
      <svg x={-1} y={-1} className="overflow-visible">
        {squares.map((square, idx) => (
          <g key={`${square.x}-${square.y}-${idx}`}>
            {/* Elongated Glitter Grain */}
            <motion.rect
              x={square.x - square.length / 2}
              y={square.y - 1.4}
              width={square.length + 6}
              height={2.4}
              rx={1.2}
              fill="#FFFFFF"
              initial={{ opacity: 0, scaleX: 0.7, scaleY: 0.7 }}
              animate={{
                opacity: [0, 0.3, 0],
                scaleX: [0.7, 1.02, 0.7],
                scaleY: [0.7, 1, 0.7],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: idx * 0.4,
                ease: 'easeOut',
              }}
              style={{
                transformOrigin: 'center',
                willChange: 'transform, opacity',
                filter: 'drop-shadow(0 0 8px #FFFFFF) drop-shadow(0 0 12px #C084FC)',
              }}
            />

            <motion.rect
              x={square.x - square.length / 2}
              y={square.y - 1}
              width={square.length}
              height={1.6}
              rx={0.8}
              fill="url(#glitterSparkle)"
              initial={{ opacity: 0, scaleX: 0.7, scaleY: 0.7 }}
              animate={{
                opacity: [0, 0.9, 0],
                scaleX: [0.7, 1.03, 0.7],
                scaleY: [0.7, 1, 0.7],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: idx * 0.4,
                ease: 'easeOut',
              }}
              style={{
                transformOrigin: 'center',
                willChange: 'transform, opacity',
                filter: 'drop-shadow(0 0 10px #C084FC) drop-shadow(0 0 16px #8B5CF6)',
              }}
            />
          </g>
        ))}
      </svg>
    </svg>
  );
};
