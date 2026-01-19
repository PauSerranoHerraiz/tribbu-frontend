/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#615FFF',
        dark: '#242424',
       
        blue: {
          500: '#615FFF',
        }
      },
    },
  },
  plugins: [],
};