/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['Outfit', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        brand: {
          50: '#fdf8f0',
          100: '#faefd9',
          200: '#f3d9a8',
          300: '#e8bc6e',
          400: '#dda040',
          500: '#c9a86a',
          600: '#b08850',
          700: '#8a6838',
          800: '#7a4e48',
          900: '#5a3a36',
        },
        admin: {
          bg: '#F8F5F0',
          surface: '#FFFFFF',
          card: '#FFFFFF',
          border: '#E8DCCB',
          hover: '#EFE7DC',
          muted: '#777777',
          text: '#1F1F1F',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-16px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};