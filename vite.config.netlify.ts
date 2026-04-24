import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      output: [
        { dir: 'netlify',
          manualChunks(id) {
            if (
              id.includes('node_modules/react') ||
              id.includes('node_modules/@fortawesome') ||
              id.includes('node_modules/dayjs')
            ) return 'vendor';
          },
        },
        { dir: 'netlify/unixtime', // For Netlify subdirectory
          manualChunks(id) {
            if (
              id.includes('node_modules/react') ||
              id.includes('node_modules/@fortawesome') ||
              id.includes('node_modules/dayjs')
            ) return 'vendor';
          },
        },
      ],
    },
  },
  plugins: [react()],
});
