/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37',
        'gold-light': '#F0D060',
        'gold-dark': '#A07820',
        bg: '#0F0F0F',
        'bg-2': '#161616',
        surface: '#242424',
        dark: '#1A1612',
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        jost: ['Jost', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
