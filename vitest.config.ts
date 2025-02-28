import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.ts';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      typecheck: {
        enabled: true
      },
      env: {
        MODE: 'development'
      },
      server: {
        deps: {
          inline: ['react-leaflet-cluster']
        }
      },
      browser: {
        enabled: true,
        provider: 'playwright',
        headless: false,
        instances: [{ browser: 'chromium' }]
      }
    }
  })
);
