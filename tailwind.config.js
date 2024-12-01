/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "theme-color": "#4d62d3",
        "secondary-color": "#FFC907",
        "tertiary-color": "#101B54",
      },
      boxShadow: {
        "box-shadow": "0px 4px 18.799999237060547px 0px #00000040",
      },
      fontFamily: {
        primary: ["Work Sans"],
      },
    },
  },
  plugins: [require("daisyui")],
};
