import React, { useEffect, useRef, useState } from 'react';

interface TextPressureProps {
  text: string;
  weight?: boolean;
  textColor?: string;
  className?: string;
}

export const TextPressure: React.FC<TextPressureProps> = ({
  text,
  weight = true,
  textColor = 'currentColor',
  className = '',
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const chars = text.split('');

  return (
    <h1
      ref={containerRef}
      className={`relative select-none text-center font-bold tracking-tight ${className}`}
      style={{ color: textColor }}
    >
      <span ref={titleRef} className="inline-flex flex-wrap justify-center items-center">
        {chars.map((char, i) => {
          const charDist = Math.max(0, 300 - Math.abs(cursor.x - (i * 40)));
          const dynamicWeight = weight ? Math.min(900, Math.max(200, 400 + charDist * 1.5)) : 700;
          const dynamicScale = Math.min(1.1, Math.max(1, 1 + (charDist / 300) * 0.1));

          return (
            <span
              key={i}
              className="inline-block transition-transform duration-150 ease-out"
              style={{
                fontWeight: dynamicWeight,
                transform: `scale(${dynamicScale})`,
                color: textColor,
                textShadow: dynamicWeight > 600 ? '0 0 20px rgba(59,158,255,0.4)' : 'none',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          );
        })}
      </span>
    </h1>
  );
};
