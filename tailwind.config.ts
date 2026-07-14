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
        sans: ['"Google Sans"', '"Product Sans"', 'var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        serif: ['var(--font-exposure)', 'Georgia', 'serif'],
        mono: ['monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
