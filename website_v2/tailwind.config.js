/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [      {
      light: {
        ...require("daisyui/src/colors/themes")["[data-theme=light]"],
        primary: "#51B6A5",
      },
    }],
  },
}

