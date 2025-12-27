/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        elegant: ["'Playfair Display'", "serif"],
      },
    },
  },
  plugins: [],
};
