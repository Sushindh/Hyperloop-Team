// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy requests to the backend
      '/run-c-program': {
        target: 'http://localhost:5000', // Your Node.js backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
