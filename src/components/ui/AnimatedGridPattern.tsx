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
      color: i % 3 === 0 ? '#3B9EFF' : i % 3 === 1 ? '#34D399' : '#F59E0B',
      size: Math.random() * 3 + 2,
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

        {/* Metallic Glitter Sparkle Gradient */}
        <radialGradient id="glitterSparkle" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#79CEFF" stopOpacity="1" />
          <stop offset="50%" stopColor="#3B9EFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3B9EFF" stopOpacity="0" />
        </radialGradient>
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

            {/* Sparkle Glitter Grain Star Dot */}
            <motion.circle
              cx={square.x + width / 2}
              cy={square.y + height / 2}
              r={square.size}
              fill={square.color}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0, 0.9, 0],
                scale: [0.5, 1.4, 0.5],
              }}
              transition={{
                duration: duration * 0.8,
                repeat: Infinity,
                delay: idx * 0.18,
                ease: 'easeInOut',
              }}
              style={{
                filter: `drop-shadow(0 0 6px ${square.color})`,
              }}
            />
          </g>
        ))}
      </svg>
    </svg>
  );
};
