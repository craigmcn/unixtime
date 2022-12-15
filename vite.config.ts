import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': [
            'node_modules/react/index.js',
            'node_modules/react-dom/index.js',
            'node_modules/@fortawesome/react-fontawesome/index.js',
            'node_modules/@fortawesome/fontawesome-svg-core/index.js',
            'node_modules/@fortawesome/pro-duotone-svg-icons/index.js',
            'node_modules/@fortawesome/pro-light-svg-icons/index.js',
          ],
          'moment': [
            'node_modules/moment/moment.js',
            'node_modules/moment-timezone/index.js',
          ],
        },
      },
    },
  },
  plugins: [react({
    babel: {
      plugins: ['babel-plugin-typescript-to-proptypes'],
    },
  })],
});
