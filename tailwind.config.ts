import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    borderRadius: { none: "0", DEFAULT: "0" },
    extend: {
      colors: {
        milk: "#FAF8F3",
        ink: { DEFAULT: "#526987", deep: "#3E5372", soft: "#5E6F88" },
        sand: "#E9D9B8",
        gold: { DEFAULT: "#B49A65", deep: "#76612F", text: "#8A7240" },
        line: "#E4DCCB",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        serif: ['"PT Serif"', "Georgia", "serif"],
      },
      maxWidth: { page: "1200px" },
    },
  },
  plugins: [],
};
export default config;
