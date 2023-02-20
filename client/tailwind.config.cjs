/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          1000: "#020e0a",
          1100: "#021d14",
          1200: "#021d14da",
          1300: "#021d14d2",
        },
      },
      backgroundImage: { "login-bg": "./assets/images/ambulance.jpg" },
    },

    plugins: [],
  },
};
