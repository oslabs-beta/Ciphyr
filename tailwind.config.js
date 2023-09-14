/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-start": "#EAE6E2",
        "custom-end": "#C2CFDB",
        primary: "#0D63F7",
        secondary: "#6996E9",
        tertiary: "#E9F4FB",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to right, var(--custom-start), var(--custom-end))",
      },
      spacing: {
        "5rem": "5rem",
        "10rem": "10rem",
        "15rem": "15rem",
        "20rem": "20rem",
        "30rem": "30rem",
        "50rem": "50rem",
      },
      backgroundColor: {
        "sidenav-bg-color": "#1c1c1c",
        "mainpage-bg-color": "#161616",
      },
      fontSize: {
        "text-sm": ".5rem", // You can adjust the size as needed
      },
      fontFamily: {
        "gilroy-bold": ["Gilroy-Bold", "sans"],
        "gilroy-heavy": ["Gilroy-Heavy", "sans"],
        "gilroy-light": ["Gilroy-Light", "sans"],
        "gilroy-medium": ["Gilroy-Medium", "sans"],
        "gilroy-regular": ["Gilroy-Regular", "sans"],
      },
    },
  },
  plugins: [],
};

// content: ["./src/**/*.{html,js}"],
