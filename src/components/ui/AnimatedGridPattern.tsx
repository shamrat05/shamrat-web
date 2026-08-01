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
  numSquares = 12,
  className = '',
  maxOpacity = 0.45,
  duration = 3.2,
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
          ? Math.random() * safeWidth * 0.24 + safeWidth * 0.04
          : Math.random() * safeWidth * 0.24 + safeWidth * 0.72;
      const y = Math.random() * safeHeight * 0.82 + safeHeight * 0.09;

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
      className={`pointer-events-none absolute inset-0 h-full w-full fill-gray-400/10 stroke-gray-400/20 [mask-image:linear-gradient(90deg,transparent_0%,white_8%,white_92%,transparent_100%)] ${className}`}
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
            {/* Elongated Glitter Grain */}
            <motion.rect
              x={square.x - square.length / 2}
              y={square.y - 1.4}
              width={square.length + 6}
              height={3.2}
              rx={1.4}
              fill="#FFFFFF"
              initial={{ opacity: 0, scaleX: 0.8, scaleY: 0.8 }}
              animate={{
                opacity: [0, 0.25, 0],
                scaleX: [0.8, 1, 0.8],
                scaleY: [0.8, 1, 0.8],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: idx * 0.3,
                ease: 'easeOut',
              }}
              style={{
                transformOrigin: 'center',
                willChange: 'transform, opacity',
                filter: 'drop-shadow(0 0 10px #FFFFFF) drop-shadow(0 0 16px #C084FC)',
              }}
            />

            <motion.rect
              x={square.x - square.length / 2}
              y={square.y - 1}
              width={square.length}
              height={2}
              rx={1}
              fill="url(#glitterSparkle)"
              initial={{ opacity: 0, scaleX: 0.8, scaleY: 0.8 }}
              animate={{
                opacity: [0, 0.9, 0],
                scaleX: [0.8, 1, 0.8],
                scaleY: [0.8, 1, 0.8],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: idx * 0.3,
                ease: 'easeOut',
              }}
              style={{
                transformOrigin: 'center',
                willChange: 'transform, opacity',
                filter: 'drop-shadow(0 0 12px #C084FC) drop-shadow(0 0 20px #8B5CF6)',
              }}
            />
          </g>
        ))}
      </svg>
    </svg>
  );
};
