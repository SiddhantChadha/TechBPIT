/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx}',
    './src/screens/*.{js,jsx}',
    './src/components/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        grey_4a: '#4A4A4A',
        primary_blue: '#2E3094',
        primary_red: '#f14440',
        grey_f5: '#f7f7f7',
      },
    },
    maxWidth: {'1/2': '50%'},
  },
  plugins: [],
};
