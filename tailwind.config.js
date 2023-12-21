/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E07400",
        black: "#222222",
        grey: "#717171",
        "grey-light": "#b0b0b0",
        slate: "#f1f5f9",
        "slate-dark": "#e2e8f0",
        "white-blur": "rgba(255, 255, 255, 0.92)",
      },
      boxShadow: {
        around: "0 3px 10px rgb(0,0,0,0.2)",
      },
    },
  },
  plugins: [],
};
