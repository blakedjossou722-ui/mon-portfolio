// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://blakedjossou722-ui.github.io/mon-portfolio',
  base: '/mon-portfolio/',
  server: {
    host: '127.0.0.1',
    port: 4321
  },
  vite: {
    plugins: [tailwindcss()]
  }
});