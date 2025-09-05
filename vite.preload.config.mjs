import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
  build: {
    lib: {
      entry: 'src/main/preload.js',
      formats: ['cjs'],
      fileName: () => '[name].js',
    },
    outDir: '.vite/build',
    emptyOutDir: false, // Don't empty, we're sharing with main
    rollupOptions: {
      external: ['electron'],
    },
  },
});