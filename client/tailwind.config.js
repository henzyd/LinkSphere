/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        Primary: "#0055FF",
        Secondary: "#10D876",
        Tertiary: "#343a40",
        Text: {
          Black: "#111",
          Black2: "#00000099",
        },
        AppBG: "#f6f6f6",
        IconColor: "#303030",
      },
      screens: {
        SmallPhones: { max: "380px" },
        // => @media (max-width: 380px) { ... }

        MediumPhones: { max: "450px" },
        // => @media (max-width: 425px) { ... }

        LargePhones: { max: "767px" },
        // => @media (max-width: 767px) { ... }

        Tablet: { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        TabletAndBelow: { max: "1023px" },
        // => @media (max-width:1023px) { ... }

        LaptopAndAbove: { min: "1023px" },
        // => @media (min-width:1023px) { ... }

        Laptop: { min: "1024px", max: "1439px" },
        // => @media (min-width: 1024px) { ... }

        LargeLaptop: "1440px",
        // => @media (min-width: 1440px) { ... }

        "4kDesktop": "2560px",
        // => @media (min-width: 2560px) { ... }
      },
    },
  },
  plugins: [],
};
