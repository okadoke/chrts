module.exports = {
  purge: [
    './**/*.html',
    './**/*.jsx',
    './**/*.tsx'
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography')
  ],
  future: {
    removeDeprecatedGapUtilities: true,
  },
}
