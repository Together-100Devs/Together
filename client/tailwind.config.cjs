/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      //think of each breakpoint as starting with "X pixels"
      //so using md: means we want to apply styles to screen widths of 768px or greater
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      inconsolata: ["Inconsolata", "monospace"],
    },
    extend: {
      colors: {
        primary: "#F4F1F1",
        secondary: "#E1E9ED",
        mainOrange: "rgb(var(--color-mainOrange) / 0.85)",
        mainGreen: "rgb(var(--color-mainGreen) / 0.85)",
        mainBlue: "rgb(var(--color-mainBlue) / 0.85)",
        discordBtn: "rgb(var(--color-discordBtn) / 0.7)",
        navBtn: "#009BA0",
        navBtnLight: "#66C3C6",
        teal: {
          DEFAULT: "#009BA0",
          light: "#BFD0D8",
          lightest: "#E0E8EC",
        },
        accent: "rgb(var(--color-accent) / 0.6)",
      },
    },
  },
  plugins: [],
};
