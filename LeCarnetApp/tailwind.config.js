/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'title': ['Teko', 'sans-serif', ],
      'sans': ['Play', 'sans-serif']
    }
  },
  plugins: [],
}

