/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://mikeciphyr-c90a2b03292c.herokuapp.com/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  define: {
    apiUrl: JSON.stringify(process.env.API_URL),
    k8Enabled: JSON.stringify(process.env.K8_ENABLED),
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
