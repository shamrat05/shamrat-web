import React, { useEffect, useRef } from 'react';

interface ThreadsProps {
  amplitude?: number;
  distance?: number;
  enableMouseInteraction?: boolean;
  color?: string[];
  numThreads?: number;
  className?: string;
}

export const Threads: React.FC<ThreadsProps> = ({
  amplitude = 1,
  distance = 0,
  enableMouseInteraction = true,
  color = ['#3B9EFF', '#79CEFF', '#34D399', '#8B5CF6', '#F59E0B'],
  numThreads = 6,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const handleResize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableMouseInteraction) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    canvas.parentElement?.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement?.addEventListener('mouseleave', handleMouseLeave);

    const draw = () => {
      time += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const width = canvas.width;
      const height = canvas.height;

      for (let i = 0; i < numThreads; i++) {
        ctx.beginPath();
        const threadColor = color[i % color.length];

        ctx.lineWidth = i % 3 === 0 ? 2 : 1.2;
        ctx.strokeStyle = threadColor;

        const startY = (height / (numThreads + 1)) * (i + 1);

        ctx.moveTo(0, startY);

        const segments = 40;
        const segmentWidth = width / segments;

        for (let j = 0; j <= segments; j++) {
          const x = j * segmentWidth;
          
          // Calculate dynamic wave offset along thread path
          let yOffset =
            Math.sin(x * 0.006 + time * 2 + i * 0.3) * (20 * amplitude) +
            Math.cos(x * 0.01 + time * 1.5 + i * 0.5) * (12 * amplitude);

          // Calculate mouse attraction to thread string
          if (mouseRef.current.x > 0) {
            const dx = x - mouseRef.current.x;
            const dy = startY - mouseRef.current.y;
            const dist = Math.hypot(dx, dy);

            if (dist < 180) {
              const force = (1 - dist / 180) * 45;
              yOffset += dy > 0 ? -force : force;
            }
          }

          const y = startY + yOffset + distance;

          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.shadowBlur = 12;
        ctx.shadowColor = threadColor;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas.parentElement) {
        canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
        canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [amplitude, distance, enableMouseInteraction, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full opacity-75 ${className}`}
    />
  );
};
