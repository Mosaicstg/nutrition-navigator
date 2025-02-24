import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    target: 'es2020',
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
