import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#0088CC",
      hover: "#179CDE",
      light: "#8C8C8C",
      dark: "#333333",
    },
    extend: {},
  },
  plugins: [],
};
export default config;
