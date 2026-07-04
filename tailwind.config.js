/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'delulu': {
          primary: '#D8FA39',
          dark: '#3C4A22',
          pink: '#FF6B8B',
          card: '#FAF9F4',
        }
      }
    },
  },
  plugins: [],
}
