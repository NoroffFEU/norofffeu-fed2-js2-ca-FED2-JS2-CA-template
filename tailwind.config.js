/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/**.{html,js}", "!./node_modules/**/*"],
  theme: {
    extend: {
      colors: {
        blue: "#294F64",
        lightGrayBlue: "#9FAEB7",
        lightGray: "#D9D9D9",
      },
    },
  },
  plugins: [],
};
