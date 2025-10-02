/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "sm": "640px",
        "md": "768px",
        "lg": "1024px"
      },
      colors : {
        "slate-100": "#f3f3f2",
        "red-100": "#ff395d"
      }
    },
  },
  plugins: [],
}

