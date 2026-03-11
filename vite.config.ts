import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { imagetools } from 'vite-imagetools'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Optimize React for production
      include: '**/*.tsx',
    }),
    imagetools(),
    createHtmlPlugin({
      minify: true,
      entry: 'src/main.tsx',
    }),
    {
      name: 'preload-lcp-image',
      transformIndexHtml(_html, ctx) {
        // Find the generated profile image in the bundle
        const bundle = ctx.bundle;
        let profileImgPath = '';

        if (bundle) {
          for (const [, value] of Object.entries(bundle)) {
            if (value.fileName.includes('shamrat-profile') && value.fileName.endsWith('.webp')) {
              profileImgPath = value.fileName;
              break;
            }
          }
        }

        if (profileImgPath) {
          return [
            {
              tag: 'link',
              attrs: {
                rel: 'preload',
                as: 'image',
                href: `/${profileImgPath}`,
                fetchpriority: 'high',
                type: 'image/webp',
              },
              injectTo: 'head',
            },
          ];
        }
        return [];
      },
    },
    {
      name: 'view-transitions-css',
      transformIndexHtml(html) {
        // Add View Transitions CSS
        return html.replace(
          '</head>',
          `
    <style>
      ::view-transition-old(root),
      ::view-transition-new(root) {
        animation: none;
        mix-blend-mode: normal;
      }
      ::view-transition-old(root) {
        z-index: 1;
      }
      ::view-transition-new(root) {
        z-index: 2;
      }
      @media (prefers-reduced-motion: reduce) {
        ::view-transition-group(*),
        ::view-transition-old(*),
        ::view-transition-new(*) {
          animation: none !important;
        }
      }
    </style>
  </head>`
        );
      },
    },
    visualizer({
      open: false, // Don't auto-open in browser
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html',
    })
  ],
  build: {
    target: 'esnext', // Modern browsers support ESNext
    minify: 'esbuild', // Faster minifier
    rollupOptions: {
      treeshake: true,
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
          'zustand': ['zustand'],
          'lucide': ['lucide-react'],
          '3d': ['three', '@react-three/fiber', '@react-three/drei'],
          'router': ['react-router-dom'],
          'query': ['@tanstack/react-query'],
          'i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
        },
        // Optimize chunk loading
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      }
    },
    chunkSizeWarningLimit: 500, // Stricter limit
    // Enable source maps for debugging
    sourcemap: false, // Disable in production for smaller bundles
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'zustand'],
    exclude: ['lucide-react'], // Keep icon tree-shaking
  },
})
