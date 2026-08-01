import React, { useRef, useEffect } from 'react';

interface WavesProps {
  lineColor?: string;
  backgroundColor?: string;
  waveSpeedX?: number;
  waveSpeedY?: number;
  waveAmpX?: number;
  waveAmpY?: number;
  friction?: number;
  tension?: number;
  maxDistance?: number;
  className?: string;
}

export const Waves: React.FC<WavesProps> = ({
  lineColor = 'rgba(59, 158, 255, 0.15)',
  waveSpeedX = 0.015,
  waveSpeedY = 0.01,
  waveAmpX = 35,
  waveAmpY = 15,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let step = 0;

    const handleResize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      step += 1;

      const lines = 12;
      const stepY = canvas.height / (lines + 1);

      for (let i = 1; i <= lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = i % 2 === 0 ? 1.5 : 1;

        // Gradient line stroke
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, 'rgba(59, 158, 255, 0)');
        gradient.addColorStop(0.5, lineColor);
        gradient.addColorStop(1, 'rgba(27, 183, 103, 0)');
        ctx.strokeStyle = gradient;

        const baseY = i * stepY;

        for (let x = 0; x <= canvas.width; x += 15) {
          const y =
            baseY +
            Math.sin(x * 0.005 + step * waveSpeedX + i * 0.4) * waveAmpX +
            Math.cos(x * 0.008 + step * waveSpeedY + i * 0.2) * waveAmpY;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [lineColor, waveSpeedX, waveSpeedY, waveAmpX, waveAmpY]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full opacity-70 ${className}`}
    />
  );
};
