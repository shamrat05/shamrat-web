import React, { useEffect, useRef } from 'react';

interface IridescenceProps {
  color?: [number, number, number];
  speed?: number;
  amplitude?: number;
  className?: string;
}

export const Iridescence: React.FC<IridescenceProps> = ({
  speed = 1.0,
  amplitude = 0.1,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const draw = () => {
      time += 0.008 * speed;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Multi-color organic iridescent fluid gradient mesh
      const w = canvas.width;
      const h = canvas.height;

      // Glow 1: Cyan/Azure (#3B9EFF)
      const g1 = ctx.createRadialGradient(
        w * (0.3 + Math.sin(time * 0.8) * amplitude),
        h * (0.4 + Math.cos(time * 0.6) * amplitude),
        50,
        w * 0.3,
        h * 0.4,
        w * 0.6
      );
      g1.addColorStop(0, 'rgba(59, 158, 255, 0.18)');
      g1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      // Glow 2: Emerald/Lime (#34D399)
      const g2 = ctx.createRadialGradient(
        w * (0.7 + Math.cos(time * 0.7) * amplitude),
        h * (0.6 + Math.sin(time * 0.9) * amplitude),
        60,
        w * 0.7,
        h * 0.6,
        w * 0.55
      );
      g2.addColorStop(0, 'rgba(52, 211, 153, 0.14)');
      g2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      // Glow 3: Deep Indigo/Purple (#8B5CF6)
      const g3 = ctx.createRadialGradient(
        w * (0.5 + Math.sin(time * 0.5) * amplitude * 1.5),
        h * (0.3 + Math.sin(time * 1.1) * amplitude),
        40,
        w * 0.5,
        h * 0.3,
        w * 0.5
      );
      g3.addColorStop(0, 'rgba(139, 92, 246, 0.12)');
      g3.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, w, h);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, amplitude]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
};
