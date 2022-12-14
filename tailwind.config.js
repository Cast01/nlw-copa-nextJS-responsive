/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "clamp1rem3vw2.7rem": "clamp(1rem, 3vw, 2.7rem)"
      }
    },
  },
  plugins: [],
}
