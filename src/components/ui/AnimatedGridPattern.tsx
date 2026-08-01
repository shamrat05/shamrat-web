import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedGridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: string;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
}

export const AnimatedGridPattern: React.FC<AnimatedGridPatternProps> = ({
  width = 40,
  height = 40,
  strokeDasharray = '0',
  numSquares = 30,
  className = '',
  maxOpacity = 0.35,
  duration = 4,
}) => {
  const id = React.useId();

  // Generate random square coordinates for ambient grid pulse
  const squares = React.useMemo(() => {
    return Array.from({ length: numSquares }, (_, i) => ({
      id: i,
      x: Math.floor(Math.random() * 25) * width,
      y: Math.floor(Math.random() * 15) * height,
    }));
  }, [numSquares, width, height]);

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full fill-gray-400/10 stroke-gray-400/20 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)] ${className}`}
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
            strokeDasharray={strokeDasharray}
            stroke="currentColor"
            strokeWidth="1"
            className="opacity-20"
          />
        </pattern>
      </defs>

      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />

      <svg x={-1} y={-1} className="overflow-visible">
        {squares.map((square, idx) => (
          <motion.rect
            key={`${square.x}-${square.y}-${idx}`}
            width={width - 1}
            height={height - 1}
            x={square.x + 1}
            y={square.y + 1}
            fill="currentColor"
            strokeWidth="0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, maxOpacity, 0],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: idx * 0.2,
              ease: 'easeInOut',
            }}
            className="text-primary-500/20"
          />
        ))}
      </svg>
    </svg>
  );
};
