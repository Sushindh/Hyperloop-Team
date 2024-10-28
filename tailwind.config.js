/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideIn: {
          '0%': { 
            transform: 'translateX(-100px)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateX(0)',
            opacity: '1'
          },
        },
        'subtle-zoom': {
          '0%, 100%': { transform: 'scale(1.05)' },
          '50%': { transform: 'scale(1.1)' },
        },
        'gradient': {
          '0%': { opacity: '0.5' },
          '50%': { opacity: '0.7' },
          '100%': { opacity: '0.5' },
        },
        'fade-in': {
          'from': { 
            opacity: '0',
            transform: 'translateY(20px)',
          },
          'to': { 
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'scaleIn': 'scaleIn 0.5s ease-in-out',
        'slideIn': 'slideIn 0.5s ease-in-out',
        'subtle-zoom': 'subtle-zoom 20s infinite',
        'gradient': 'gradient 8s infinite',
        'fade-in': 'fade-in 0.6s ease-out',
      }
    },
  },
  plugins: [],
}