/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2b78ac',
        blue: {
          50: '#f2f7fb',
          100: '#e6f0f7',
          200: '#c9dfef',
          300: '#a6cce5',
          400: '#6fa8cf',
          500: '#3a83b3',
          600: '#2b78ac', // brand primary
          700: '#256699',
          800: '#1f5a80',
          900: '#194a6a',
        },
      },
    },
  },
  plugins: [],
};
