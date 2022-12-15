/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#cddae1",
        secondary: "#e1e9ed",
        logoText: "#EC7F50",
        discordBtn: "#de9f85",
        teal: {
          DEFAULT: "#009BA0",
          light: "#BFD0D8",
          lightest: "#E0E8EC",
        },
      },
    },
  },
  plugins: [],
};
