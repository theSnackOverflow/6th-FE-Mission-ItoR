import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
      '@icons': '/src/assets/icons',
    },
  },
  server: {
    proxy: {
      '/auth': {
        target: 'https://blog.leets.land',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
