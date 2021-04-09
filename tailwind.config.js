module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#005b99',
          dark: '#00375c',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
