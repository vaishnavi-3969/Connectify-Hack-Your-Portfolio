/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'dark-purple': '#070113',
        'federal-blue': '#0F084B',
        'marian-blue': '#26408B',
        'light-blue': '#A6CFD5',
        'mint-green': '#C2E7D9',
      },
    },
  },
  plugins: [],
};
