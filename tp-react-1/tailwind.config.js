/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Jaro: ['Jaro', 'sans-serif'], // "Roboto" es la fuente que importaste
      },
    },
  },
  plugins: [],
}

