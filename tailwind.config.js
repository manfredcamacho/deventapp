/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.{html,js}", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {},
  },
  variants: {
    outline: ["focus"],
  },
  plugins: [],
};
