/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        primary: "#b9ff3e", // verde lima
        background: "#232946", // azul oscuro suave
        text: {
          primary: "#fff", // texto principal blanco
        },
        accent: "#a259f7", // morado vibrante
        lime: "#b9ff3e",
        dark: "#232946",
      },
    },
  },
  plugins: [],
}