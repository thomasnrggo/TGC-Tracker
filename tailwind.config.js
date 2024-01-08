/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#C47AC0",
          200: "#77567A",
        },
        secondary: {
          100: "#364156",
          200: "#212D40",
          300: "#11151C",
        },
      },
    },
  },
  plugins: [],
};
