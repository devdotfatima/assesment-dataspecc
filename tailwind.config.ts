import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        thm: {
          DEFAULT: "#FEB5F3",
        },
        pink: { DEFAULT: "#EC9EA5", 100: "#F69D7B" },
        purple: { DEFAULT: "#8755D8" },
        grey: {
          DEFAULT: "#3A3A3A",
          100: "#ACACAC",
        },
        green: {
          DEFAULT: "#82D9A2",
          100: "#27E172",
        },
      },
      fontFamily: {
        inter: ["Inter", ...fontFamily.sans],
        merriweather: ["Merriweather", ...fontFamily.serif],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
    },
  },
  plugins: [],
};
export default config;
