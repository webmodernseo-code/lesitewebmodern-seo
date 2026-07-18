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
        brand: {
          orange: "#ff4d00",
          sable: "#F5E6D3",
          black: "#000000",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        toastIn: {
          '0%': { opacity: '0', transform: 'translateY(8px) translateX(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0) translateX(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.35s ease-out',
        scaleIn: 'scaleIn 0.2s ease-out',
        toastIn: 'toastIn 0.25s ease-out',
      },
    },
  },
  plugins: [],
};
export default config;
