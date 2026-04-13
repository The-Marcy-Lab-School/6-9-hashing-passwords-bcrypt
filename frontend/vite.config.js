import { defineConfig } from 'vite';

const SERVER_PORT = 3000;

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${SERVER_PORT}`,
        changeOrigin: true,
      },
    },
  },
});
