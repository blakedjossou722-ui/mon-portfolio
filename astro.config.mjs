// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: 4321
  },
  vite: {
    server: {
      watch: {
        // Use polling on Windows to avoid EBUSY "resource busy or locked" errors
        usePolling: true,
        interval: 100
      }
    },
    plugins: [tailwindcss()]
  },
  devToolbar: {
    enabled: false
  }
});