/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bricolage: ["Bricolage Grotesque"],
        handjet: ["Handjet"],
      },
      colors: {
        primaryColor: "#245ba3",
        white: "#FFFFFF",
        errorRed: "#F61111"
      },
    },
  },
  plugins: [],
}

