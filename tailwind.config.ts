import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        profit: {
          DEFAULT: "hsl(var(--profit))",
          bg: "hsl(var(--profit-bg))",
        },
        loss: {
          DEFAULT: "hsl(var(--loss))",
          bg: "hsl(var(--loss-bg))",
        },
        accentBlue: "hsl(var(--accent-blue))",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
