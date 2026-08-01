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
    return Array.from({ length: numSquares }, (_, i) => {
      const side = i % 3 === 0 ? 'left' : i % 3 === 1 ? 'right' : 'center';
      const x =
        side === 'left'
          ? Math.floor(Math.random() * 8) * width
          : side === 'right'
            ? Math.floor(Math.random() * 8 + 17) * width
            : Math.floor(Math.random() * 20) * width;

      return {
        id: i,
        x,
        y: Math.floor(Math.random() * 15) * height,
        color:
          i % 4 === 0
            ? '#8B5CF6'
            : i % 4 === 1
              ? '#C084FC'
              : i % 4 === 2
                ? '#A855F7'
                : '#F472B6',
        length: Math.random() * 12 + 12,
      };
    });
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
              y={square.y + height / 2 - 1.4}
              width={square.length + 6}
              height={3.2}
              rx={1.4}
              fill="#FFFFFF"
              initial={{ opacity: 0, scaleX: 0.25, scaleY: 0.5 }}
              animate={{
                opacity: [0, 0.4, 0],
                scaleX: [0.25, 1.12, 0.25],
                scaleY: [0.5, 1.08, 0.5],
              }}
              transition={{
                duration: duration * 0.8,
                repeat: Infinity,
                delay: idx * 0.18,
                ease: 'easeInOut',
              }}
              style={{
                transformOrigin: 'center',
                filter: 'drop-shadow(0 0 10px #FFFFFF) drop-shadow(0 0 18px #C084FC)',
              }}
            />

            <motion.rect
              x={square.x + width / 2 - square.length / 2}
              y={square.y + height / 2 - 1}
              width={square.length}
              height={2}
              rx={1}
              fill="url(#glitterSparkle)"
              initial={{ opacity: 0, scaleX: 0.25, scaleY: 0.45 }}
              animate={{
                opacity: [0, 1, 0],
                scaleX: [0.25, 1.1, 0.25],
                scaleY: [0.45, 1.02, 0.45],
              }}
              transition={{
                duration: duration * 0.8,
                repeat: Infinity,
                delay: idx * 0.18,
                ease: 'easeInOut',
              }}
              style={{
                transformOrigin: 'center',
                filter: 'drop-shadow(0 0 12px #C084FC) drop-shadow(0 0 22px #8B5CF6)',
              }}
            />
          </g>
        ))}
      </svg>
    </svg>
  );
};
