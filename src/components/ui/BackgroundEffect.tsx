import React from 'react';
import { usePerformanceMode } from '../../hooks/usePerformanceMode';

/**
 * Optimized BackgroundEffect with:
 * - CSS containment for better rendering performance
 * - Reduced animation complexity on mobile
 * - prefers-reduced-motion support
 * - GPU-accelerated transforms only
 */
export const BackgroundEffect: React.FC = () => {
    const { isReduced } = usePerformanceMode();

    return (
        <div 
            className="fixed inset-0 -z-50 overflow-hidden bg-bg-page pointer-events-none transition-colors duration-500"
            style={{
                contain: 'layout size',
                willChange: 'contents',
            }}
        >
            {/* Grid Pattern - Static, no animation */}
            <div 
                className="bg-grid absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.1)_1px,transparent_1px)] bg-[size:24px_24px]"
                style={{
                    transform: 'translateZ(0)',
                    willChange: 'auto',
                }}
            />

            {/* Top Gradient Overlay - Static */}
            <div 
                className="bg-top-gradient absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-primary-900/40 via-primary-900/10 to-transparent"
                style={{
                    transform: 'translateZ(0)',
                }}
            />

            {/* Animated Mesh Gradient - Optimized with reduced motion support */}
            {!isReduced && (
              <>
                <style>{`
                    @media (prefers-reduced-motion: reduce) {
                        .animate-blob-1,
                        .animate-blob-2,
                        .animate-blob-3 {
                            animation: none !important;
                        }
                    }
                    
                    @media (max-width: 768px) {
                        .animate-blob-1,
                        .animate-blob-2,
                        .animate-blob-3 {
                            animation-duration: 40s !important;
                        }
                    }
                `}</style>
                
                <div 
                    className="bg-blob absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-primary-600/30 rounded-full blur-[80px] mix-blend-screen animate-blob-1"
                    style={{
                        transform: 'translateZ(0)',
                        willChange: 'transform',
                    }}
                />

                <div 
                    className="bg-blob absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-600/20 rounded-full blur-[100px] mix-blend-screen animate-blob-2"
                    style={{
                        transform: 'translateZ(0)',
                        willChange: 'transform',
                    }}
                />

                <div 
                    className="bg-blob absolute top-[20%] right-[10%] w-[40vw] h-[40vw] bg-purple-600/20 rounded-full blur-[90px] mix-blend-screen animate-blob-3"
                    style={{
                        transform: 'translateZ(0)',
                        willChange: 'transform',
                    }}
                />

                {/* Grain Overlay - like level.uui.app */}
                <img
                    src="/grain_bg.png"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 pointer-events-none"
                    style={{ transform: 'translateZ(0)' }}
                />
                <img
                    src="/noise.png"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover mix-blend-color-dodge opacity-20 pointer-events-none"
                    style={{ transform: 'translateZ(0)' }}
                />
              </>
            )}
        </div>
    );
};
