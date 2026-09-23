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
        dark: {
          950: '#000000',
          900: '#08080A',
          850: '#0F1014',
          800: '#15161C',
          700: '#1F2128',
          600: '#2D3039',
        },
        excited: {
          coral: '#FF453A',
          coralHover: '#FF5E54',
          coralMuted: 'rgba(255, 69, 58, 0.12)',
          yellow: '#F9C922',
          cyan: '#00E5FF',
          darkCard: '#111216',
          darkBorder: 'rgba(255, 255, 255, 0.08)',
          lightCard: '#F7F8FA',
          lightBorder: 'rgba(0, 0, 0, 0.08)',
        },
        lime: {
          brand: '#D4FF00',
          hover: '#C2EB00',
          muted: 'rgba(212, 255, 0, 0.12)',
          border: 'rgba(212, 255, 0, 0.3)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      boxShadow: {
        'glow-coral': '0 0 35px -5px rgba(255, 69, 58, 0.35)',
        'glow-lime': '0 0 35px -5px rgba(212, 255, 0, 0.25)',
        'sheet': '0 -20px 50px rgba(0, 0, 0, 0.25)',
        'sheet-dark': '0 -20px 50px rgba(0, 0, 0, 0.6)',
      }
    },
  },
  plugins: [],
}
