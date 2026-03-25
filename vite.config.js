import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
    headers: {
      'Cache-Control': 'no-store',
    },
  },
  base:'./',
  plugins: [react()],
  publicDir: "public",
  define: {global: 'window'},
  resolve: {
    alias: {
      'toriphone-auth': path.resolve(__dirname, 'node_modules/toriphone-auth'),
    },
    dedupe: ['toriphone-auth'],
  }
})