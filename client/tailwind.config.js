/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeOut: {
          '0%, 60%': { opacity: '1' }, 
          '100%': { opacity: '0', visibility: 'hidden' }
        },
      },
      animation: {
        fadeOut: 'fadeOut 3s ease forwards',
        fadeOutFav: 'fadeOut 6s ease forwards'
      }
    },
  },
  plugins: [require("daisyui")]
}


