module.exports = {
  purge: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    minHeight: {
      '3/4': '75vh',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
