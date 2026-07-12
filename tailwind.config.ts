import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--theme-bg)",
        foreground: "var(--theme-text)",
      },
      fontFamily: {
        sans: ['Exposure', 'Exposure Trial VAR', 'Exposure Regular', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        serif: ['Exposure', 'Exposure Trial VAR', 'Exposure Regular', 'Georgia', 'serif'],
        mono: ['Exposure', 'Exposure Trial VAR', 'Exposure Regular', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
