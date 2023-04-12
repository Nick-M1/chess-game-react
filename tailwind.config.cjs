/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        screen: ['100vh', '100dvh'],
      },
      width: {
        screen: ['100vw', '100dvw'],
      },
      colors: {
        lightgreen: '#ECEED4',
        darkgreen: '#749654'
      },
      backgroundImage: {
        'home-background': "url('assets/HomePageBackground.jpeg')",
        'activegame-background': "url('assets/pattern.svg')",
      },

      gridTemplateRows: {
        '8': 'repeat(8, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}

