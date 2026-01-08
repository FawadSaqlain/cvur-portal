import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://cvur-portal-server.vercel.app/',
        changeOrigin: true
      },
      '/uploads': {
        target: 'https://cvur-portal-server.vercel.app/',
        changeOrigin: true
      }
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js']
  }
});
