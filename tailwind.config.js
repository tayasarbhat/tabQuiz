/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        loading: {
          '0%': { width: '0%', opacity: '1' },
          '50%': { width: '100%', opacity: '0.5' },
          '100%': { width: '0%', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};