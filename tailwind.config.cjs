/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      riffic: ["Riffic", "sans-serif"],
    },

    extend: {
      height: {
        screen: ['100vh', '100dvh'],
      },
      width: {
        screen: ['100vw', '100dvw'],
      },
      colors: {
        lightgreen: '#ECEED4',
        darkgreen: '#749654',
        lightbrown: '#FFCE9E',
        darkbrown: '#D18B47',

        'cell-light': 'rgb(var(--color-cell-light) / <alpha-value>)',
        'cell-dark': 'rgb(var(--color-cell-dark) / <alpha-value>)',
      },
      backgroundImage: {
        'home-background': "url('assets/HomePageBackground.jpeg')",
        'activegame-background': "url('assets/pattern.svg')",
      },

      gridTemplateRows: {
        '8': 'repeat(8, minmax(0, 1fr))',
      },

      keyframes: {
        bounceRight: {
          '0%, 100%': {transform: 'translateX(-25%)'},
          '50%': {transform: 'translateX(0%)'},
        },
      },
      animation: {
        bounceRight: 'bounceRight 1s infinite',
      },
    },
  },
  plugins: [],
}

