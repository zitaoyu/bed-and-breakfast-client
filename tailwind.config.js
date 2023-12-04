/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff385c",
        black: "#222222",
        grey: "#717171",
        "white-blur": "rgba(255, 255, 255, 0.96)",
      },
      boxShadow: {
        around: "0 3px 10px rgb(0,0,0,0.2)",
      },
    },
  },
  plugins: [],
};
