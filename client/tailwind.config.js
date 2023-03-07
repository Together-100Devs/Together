/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      // => @media (0-639px) will run bg-primary (default)

      tablet: "640px",
      // => sm @media (min-width: 640px)  640 -1023px this will run

      laptop: "1024px",
      // => lg @media (min-width: 1024px) 1024 -1079px this will run

      desktop: "1280px",
      // => xl @media (min-width: 1280px) 1280 -> beyond this will run
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
