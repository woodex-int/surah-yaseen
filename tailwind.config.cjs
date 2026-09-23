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
          950: '#07080B',
          900: '#0D0E14',
          850: '#12141C',
          800: '#171A24',
          700: '#222634',
          600: '#323749',
        },
        lime: {
          brand: '#D4FF00',
          hover: '#C2EB00',
          muted: 'rgba(212, 255, 0, 0.12)',
          border: 'rgba(212, 255, 0, 0.3)',
        },
        inprint: {
          accent: '#D4FF00',
          coral: '#FF4158',
          cyan: '#00E5FF',
          dark: '#090A0F',
          surface: '#11131A',
          border: 'rgba(255, 255, 255, 0.08)',
          muted: '#8E94A4',
          light: '#F5F6F8'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-lime': '0 0 35px -5px rgba(212, 255, 0, 0.25)',
        'glow-card': '0 10px 40px -10px rgba(0, 0, 0, 0.5)',
        'inner-light': 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
