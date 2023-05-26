/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        SmallPhones: { min: " 220px", max: "380px" },
        // => @media (min-width: 320px) { ... }

        MediumPhones: { min: "375px", max: "425px" },
        // => @media (min-width: 375px) { ... }

        LargePhones: { min: "425px", max: "767px" },
        // => @media (min-width: 425px) { ... }

        RangeForPhone: { min: "200px", max: "1023px" },
        // => @media (min-width: 200px) and (max-width:1023px) { ... }

        Tablet: { min: "768px", max: "1023px" },
        // => @media (min-width: 768px) { ... }

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
