/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00CFAA',
        secondary: '#0099CC',
        'brand-dark': '#05080e',
        'brand-muted': '#D1D5DB',
      },
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'menu-in': {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out forwards',
        'fade-up-delay-1': 'fade-up 0.7s ease-out 0.15s forwards',
        'fade-up-delay-2': 'fade-up 0.7s ease-out 0.3s forwards',
        'fade-up-delay-3': 'fade-up 0.7s ease-out 0.45s forwards',
        'fade-in': 'fade-in 0.8s ease-out 0.1s forwards',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        'scale-in': 'scale-in 0.9s ease-out 0.2s forwards',
        'slide-down': 'slide-down 0.5s ease-out forwards',
        'menu-in': 'menu-in 0.2s ease-out forwards',
      },
    },
  },
  plugins: [],
}
