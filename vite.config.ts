import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { imagetools } from 'vite-imagetools'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
              },
              injectTo: 'head',
            },
          ];
        }
        return [];
      },
    },
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  build: {
    rollupOptions: {
      treeshake: true,
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'framer-motion'],
          'zustand': ['zustand'],
          'lucide': ['lucide-react'],
          '3d': ['three', '@react-three/fiber', '@react-three/drei'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  }
})
