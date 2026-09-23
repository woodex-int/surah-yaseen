/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        black: '#000000',
        dark: {
          950: '#000000',
          900: '#08080A',
          850: '#0F1012',
          800: '#16171B',
          700: '#202127',
          600: '#2E3038',
        },
        red: {
          brand: '#FF2D20',
          hover: '#E02418',
          dark: '#B8140B',
          muted: 'rgba(255, 45, 32, 0.12)',
          border: 'rgba(255, 45, 32, 0.35)',
        },
        brand: {
          red: '#FF2D20',
          black: '#000000',
          white: '#FFFFFF',
          darkCard: '#111215',
          darkBorder: 'rgba(255, 255, 255, 0.1)',
          lightCard: '#F7F8FA',
          lightBorder: 'rgba(0, 0, 0, 0.08)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-red': '0 0 35px -5px rgba(255, 45, 32, 0.4)',
        'glow-white': '0 0 35px -5px rgba(255, 255, 255, 0.2)',
        'sheet': '0 -25px 60px rgba(0, 0, 0, 0.35)',
        'sheet-dark': '0 -25px 60px rgba(0, 0, 0, 0.7)',
      }
    },
  },
  plugins: [],
}
