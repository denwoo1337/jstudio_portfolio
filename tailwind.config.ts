import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        accent1: "var(--accent-1)",
        accent2: "var(--accent-2)",
        accent3: "var(--accent-3)",
        border: "var(--border)",
        surface: "var(--surface)",
        card: "var(--card)",
        "dark-section": "var(--dark-section)",
      },
      fontFamily: {
        display: ["Cabinet Grotesk", "sans-serif"],
        body: ["Outfit", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "blob-float": {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "25%": { transform: "translate(30px, -40px) scale(1.05)" },
          "50%": { transform: "translate(-20px, 20px) scale(0.97)" },
          "75%": { transform: "translate(15px, 35px) scale(1.03)" },
        },
        "blob-pulse": {
          "0%, 100%": { opacity: "0.25" },
          "50%": { opacity: "0.40" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
        "blob-float": "blob-float 20s ease-in-out infinite",
        "blob-pulse": "blob-pulse 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
