import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Redireciona chamadas /api para o backend, evitando problemas de CORS
    proxy: {
      '/api': {
        target: 'http://backend:7777',
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});