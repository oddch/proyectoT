/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          25: '#d4ddf0',
          100: '#3062ff',
          200: '#0e39cc',
          300: '#041a80',
        },
        secondary: {
          100: '#FFE0B2',
          200: '#FFC266',
          300: '#FFA726'
        },
        tertiary: {
          25: '#afccd5',
          100: '#8FC2D2',
          200: '#538CA6',
          300: '#2B6179',
        },
        gray: {
          100: '#F5F5F5',
          200: '#E0E0E0',
          250: '#374151',
          300: '#CCCCCC',
          600: '#222222',
        },
        petroleo: {
          100: '#0C4944',
          200: '#07332F',
          300: '#041D1A',
        },
      },
    },
  },
  plugins: [],
}

