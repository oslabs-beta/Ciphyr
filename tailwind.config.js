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
        '30rem': '30rem',
        '50rem' : '50rem',
      }, 
      backgroundColor: {
        'sidenav-bg-color':'#1c1c1c',
        'mainpage-bg-color':'#161616'
      },
      fontSize: {
        'text-sm': '.5rem', // You can adjust the size as needed
      },
    },

  },
  plugins: [],
}

// content: ["./src/**/*.{html,js}"],