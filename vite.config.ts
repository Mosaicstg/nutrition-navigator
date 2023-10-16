import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2015',
    // This ensures that assets import no larger than 5KB are turned into "data:image" urls
    assetsInlineLimit: 5120,
    rollupOptions: {
      output: {
        entryFileNames: 'nutrition-navigator/[name].js',
        chunkFileNames: 'nutrition-navigator/[name].js',
        assetFileNames: 'nutrition-navigator/[name].[ext]'
      }
    }
  }
});
