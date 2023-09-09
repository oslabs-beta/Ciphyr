/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
"./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '5rem': '5rem', 
        '10rem': '10rem', 
        '15rem': '15rem', 
        '20rem': '20rem', 
        '50rem' : '50rem',

      }, 
    },
  },
  plugins: [],
}

// content: ["./src/**/*.{html,js}"],