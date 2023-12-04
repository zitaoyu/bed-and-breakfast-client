/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        airbnbRed: "#ff385c",
        black: "#222222",
        grey: "#717171",
      },
    },
  },
  plugins: [],
};
