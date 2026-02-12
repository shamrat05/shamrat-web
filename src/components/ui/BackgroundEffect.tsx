// React import only
import React from 'react';

export const BackgroundEffect: React.FC = () => {
    return (
        <div className="fixed inset-0 -z-50 overflow-hidden bg-bg-page pointer-events-none transition-colors duration-500">
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.1)_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Top Gradient Overlay - Stronger but Lighter Blur */}
            <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-primary-900/40 via-primary-900/10 to-transparent blur-[80px]" />

            {/* Animated Mesh Gradient - CSS Only (No JS/Framer Motion overhead) */}
            <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-primary-600/30 rounded-full blur-[80px] mix-blend-screen animate-blob-1" />

            <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-600/20 rounded-full blur-[100px] mix-blend-screen animate-blob-2" />

            <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] bg-purple-600/20 rounded-full blur-[90px] mix-blend-screen animate-blob-3" />

            {/* Subtle Noise for texture */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
        </div>
    );
};
