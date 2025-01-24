/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily:{
      'sans':['Jost', 'sans-serif']
    },
    extend: {
      backgroundImage:{
        "home": "url('/assents/bg.png')"
      }
    },
  },
  plugins: [],
}

