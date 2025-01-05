/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        anchor: "#3b82f6",
        light: "#D6E6FF",
      },
    },
    fontFamily: {
      sans: ["SF-Pro", "ui-sans-serif", "system-ui"],
    },
  },
  plugins: [],
};
