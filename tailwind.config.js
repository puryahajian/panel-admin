/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/db/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grayText: "#454545",
        grayTitle: "#BCBCBC",
        customBlue: "#6669F9",
        bgInput: "#E6E6E6",
        buttomExiting: "#5DCDC2",
        bgAcceptOrder: "#F9FFEE",
        bgRejectOrder: "#FFF2EE",
      },
      fontFamily: {
        sans: ["sans"],
        sahelBold: ["sahelBold"],
      },
    },
  },
  plugins: [],
}

