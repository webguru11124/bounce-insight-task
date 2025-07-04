import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': env.VITE_BACKEND_URL || 'http://localhost:4000'
      }
    },
    test: {
      environment: 'jsdom',
      globals: true
    }
  };
});
