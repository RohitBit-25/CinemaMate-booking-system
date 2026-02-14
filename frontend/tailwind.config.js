/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'cinema-black': '#0a0a0a',    // Deep black for better contrast
        'cinema-dark': '#1a1a1a',     // Rich dark gray for cards
        'cinema-gold': '#fbbf24', // Amber 400
        'cinema-red': '#dc2626', // Red 600
        'cinema-white': '#f3f4f6', // Gray 100
        'cinema-gray': '#e5e7eb', // Gray 200 (Lightened from Gray 400 for better visibility)
        'cinema-gray-dark': '#9ca3af', // Gray 400 (New: for subtle text)
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
