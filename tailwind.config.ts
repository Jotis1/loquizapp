import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        "lg": "10px",
        "2xl": "20px",
      },
      colors: {
        "negro": "#0F1404",
        "amarillo": "#F1B300",
        "rojo": "#BA0020",
        "azul": "#007096",
        "cielo": "#8DB9CA"
      }
    },
  },
  plugins: [],
};
export default config;
