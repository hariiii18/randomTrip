// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/randomTrip/',
  plugins: [react()],
  optimizeDeps: {
    include: ['react-router-dom']
  },
  build: {
    target: 'es2015',
    minify: 'esbuild',
    rollupOptions: {
      external: [],
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})