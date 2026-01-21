import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { imagetools } from 'vite-imagetools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imagetools(),
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
          'pixi': ['pixi.js'],
          'zustand': ['zustand'],
          'lucide': ['lucide-react'],
          '3d': ['three', '@react-three/fiber', '@react-three/drei'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  }
})
