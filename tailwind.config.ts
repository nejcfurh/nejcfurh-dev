/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./app/components/**/*.{ts,tsx}",
    "./app/features/**/*.{ts,tsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "var(--background)",
        secondary: "var(--muted)",
        tertiary: "var(--surface)",
        accent: "var(--accent)",
        "accent-light": "var(--accent-light)",
        "card-bg": "var(--card-bg)",
        "white-100": "var(--foreground)",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
        glow: "0 0 40px rgba(96, 134, 190, 0.15)",
      },
      screens: {
        xs: "450px",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        "awesome-serif": ["var(--font-awesome-serif)", "serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
