/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,ts,js,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        padding: '1rem',
        center: true
      }
    },
  },
  plugins: [],
}
