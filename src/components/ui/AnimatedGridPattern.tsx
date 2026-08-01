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
  width = 44,
  height = 44,
  numSquares = 35,
  className = '',
  maxOpacity = 0.45,
  duration = 3,
}) => {
  const id = React.useId();

  // Generate random square coordinates for grid pulse
  const squares = React.useMemo(() => {
    return Array.from({ length: numSquares }, (_, i) => ({
      id: i,
      x: Math.floor(Math.random() * 25) * width,
      y: Math.floor(Math.random() * 15) * height,
      color:
        i % 4 === 0
          ? '#8B5CF6'
          : i % 4 === 1
            ? '#C084FC'
            : i % 4 === 2
              ? '#A855F7'
              : '#F472B6',
      length: Math.random() * 5 + 4,
    }));
  }, [numSquares, width, height]);

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full fill-gray-400/10 stroke-gray-400/20 [mask-image:radial-gradient(700px_circle_at_center,white,transparent)] ${className}`}
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
            className="opacity-15"
          />
        </pattern>

        {/* Vivid Purple Glitter Gradient */}
        <linearGradient id="glitterSparkle" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F5E8FF" stopOpacity="1" />
          <stop offset="40%" stopColor="#C084FC" stopOpacity="0.95" />
          <stop offset="80%" stopColor="#8B5CF6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#4C1D95" stopOpacity="0.75" />
        </linearGradient>
      </defs>

      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />

      {/* Glitter Shiny Grains inside Grid Cells */}
      <svg x={-1} y={-1} className="overflow-visible">
        {squares.map((square, idx) => (
          <g key={`${square.x}-${square.y}-${idx}`}>
            {/* Glowing Grid Cell Accent */}
            <motion.rect
              width={width - 1}
              height={height - 1}
              x={square.x + 1}
              y={square.y + 1}
              fill={square.color}
              strokeWidth="0"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, maxOpacity, 0],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: idx * 0.15,
                ease: 'easeInOut',
              }}
              className="rx-sm"
              style={{ opacity: 0.15 }}
            />

            {/* Elongated Glitter Grain */}
            <motion.rect
              x={square.x + width / 2 - square.length / 2}
              y={square.y + height / 2 - 1}
              width={square.length}
              height={1.8}
              rx={0.9}
              fill="url(#glitterSparkle)"
              initial={{ opacity: 0, scaleX: 0.35, scaleY: 0.6 }}
              animate={{
                opacity: [0, 0.95, 0],
                scaleX: [0.35, 1.05, 0.35],
                scaleY: [0.6, 1, 0.6],
              }}
              transition={{
                duration: duration * 0.8,
                repeat: Infinity,
                delay: idx * 0.18,
                ease: 'easeInOut',
              }}
              style={{
                transformOrigin: 'center',
                filter: 'drop-shadow(0 0 7px #C084FC)',
              }}
            />
          </g>
        ))}
      </svg>
    </svg>
  );
};
