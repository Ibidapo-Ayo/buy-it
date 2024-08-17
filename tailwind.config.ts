import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme")

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: "#FFA500",
          purple: {
            100: "#634C9F",
            200: "#39245F"
          }
        },
        secondary: {
          DEFAULT: "#808080",
          100: "#F3F4F6",
          green: {
            60: "#22C55E",
            50: "#16A34A"
          }
        },
        text: {
          DEFAULT: "#39245F"
        },
        dark: {
          200: "#0D0F10",
          300: "#131619",
          400: "#1A1D21",
          500: "#363A3D",
          600: "#76828D",
          700: "#ABB8C4",
        },
      }
    },
  },
  plugins: [],
};
export default config;
