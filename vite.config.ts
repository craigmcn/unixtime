import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/@fortawesome') ||
            id.includes('node_modules/dayjs')
          ) return 'vendor';
        },
      },
    },
  },
  plugins: [react()],
  server: {
    port: 3120,
  },
});
