module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // pokud máš app dir
  ],
  theme: {
    extend: {
      colors: {
        creativeGreen: "#1c873b", // nebo jiný odstín
      },
    },
  },
  plugins: [],
};