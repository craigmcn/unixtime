import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': [
            'react',
            'react-dom',
            '@fortawesome/react-fontawesome',
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/sharp-duotone-light-svg-icons',
          ],
          'dayjs': ['dayjs'],
        },
      },
    },
  },
  plugins: [react()],
  server: {
    port: 3120,
  },
});
