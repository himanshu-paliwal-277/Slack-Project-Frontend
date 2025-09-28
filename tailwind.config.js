/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        slack: {
          DEFAULT: '#5c3B58',
        },
      },
    },
  },
  plugins: [],
};
