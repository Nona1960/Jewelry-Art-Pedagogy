import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    borderRadius: { none: "0", DEFAULT: "0" },
    extend: {
      colors: {
        milk: "#FAF8F3",
        ink: { DEFAULT: "#526987", deep: "#3E5372", soft: "#7C8EA6" },
        sand: "#E9D9B8",
        gold: { DEFAULT: "#B49A65", deep: "#8E7646" },
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
