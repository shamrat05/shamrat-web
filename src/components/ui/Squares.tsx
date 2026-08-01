import React, { useRef, useEffect } from 'react';

interface SquaresProps {
  direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left';
  speed?: number;
  squareSize?: number;
  borderColor?: string;
  hoverFillColor?: string;
  className?: string;
}

export const Squares: React.FC<SquaresProps> = ({
  direction = 'diagonal',
  speed = 0.5,
  squareSize = 40,
  borderColor = 'rgba(255, 255, 255, 0.05)',
  hoverFillColor = 'rgba(59, 158, 255, 0.15)',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridOffset = useRef({ x: 0, y: 0 });
  const mousePosition = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mousePosition.current = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Shift offset based on direction & speed
      switch (direction) {
        case 'right':
          gridOffset.current.x = (gridOffset.current.x + speed) % squareSize;
          break;
        case 'left':
          gridOffset.current.x = (gridOffset.current.x - speed + squareSize) % squareSize;
          break;
        case 'down':
          gridOffset.current.y = (gridOffset.current.y + speed) % squareSize;
          break;
        case 'up':
          gridOffset.current.y = (gridOffset.current.y - speed + squareSize) % squareSize;
          break;
        case 'diagonal':
        default:
          gridOffset.current.x = (gridOffset.current.x + speed) % squareSize;
          gridOffset.current.y = (gridOffset.current.y + speed) % squareSize;
          break;
      }

      const startX = Math.floor(gridOffset.current.x % squareSize) - squareSize;
      const startY = Math.floor(gridOffset.current.y % squareSize) - squareSize;

      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          ctx.strokeRect(x, y, squareSize, squareSize);

          if (mousePosition.current) {
            const hoverX = Math.floor((mousePosition.current.x - startX) / squareSize) * squareSize + startX;
            const hoverY = Math.floor((mousePosition.current.y - startY) / squareSize) * squareSize + startY;

            if (x === hoverX && y === hoverY) {
              ctx.fillStyle = hoverFillColor;
              ctx.fillRect(x, y, squareSize, squareSize);
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [direction, speed, squareSize, borderColor, hoverFillColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-auto absolute inset-0 h-full w-full ${className}`}
    />
  );
};
