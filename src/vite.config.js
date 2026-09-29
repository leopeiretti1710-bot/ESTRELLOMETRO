import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    transformer: 'postcss', // o usá esbuild
  },
  build: {
    cssMinify: 'esbuild', // Desactiva lightningcss para minificar CSS
  },
});