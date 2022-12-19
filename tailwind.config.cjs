/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#005b99',
          dark: '#00375c',
        },
        'primary-inverse': {
          DEFAULT: '#4cb5fa',
          active: '#109cf8',
          contrast: '#02243c',
        },
      },
    },
  },
  plugins: [],
};
