import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './src',
  base: './',
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    outDir: '../.vite/renderer/main_window',
    emptyOutDir: true,
    rollupOptions: {
      input: './src/index.html'
    }
  },
  server: {
    port: 5173
  }
});