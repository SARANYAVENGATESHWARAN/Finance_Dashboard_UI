/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        mono: ['"DM Mono"', 'monospace'],
        sans: ['Syne', 'sans-serif'],
      },
      colors: {
        bg: '#09090e',
        surface: '#111118',
        surface2: '#17171f',
        surface3: '#1d1d27',
        border: 'rgba(255,255,255,0.07)',
        border2: 'rgba(255,255,255,0.12)',
        accent: {
          DEFAULT: '#a78bfa',
          dark: '#7c3aed',
        },
        fin: {
          green: '#34d399',
          red: '#f87171',
          amber: '#fbbf24',
          blue: '#60a5fa',
          pink: '#f472b6',
          teal: '#2dd4bf',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.4s ease both',
        'fade-in': 'fadeIn 0.3s ease both',
        'slide-in': 'slideIn 0.3s ease both',
        'count-up': 'countUp 0.6s ease both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(16px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideIn: {
          from: { opacity: 0, transform: 'translateX(-12px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
