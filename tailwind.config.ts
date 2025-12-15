import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "543px",
        md: "879px",
        lg: "1503px",
        xl: "1920px",
      },
      fontFamily: {
        pretendard: ["Pretendard Variable", "sans-serif"],
      },
      keyframes: {
        "slide-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-up": {
          "0%": {
            opacity: "1",
            transform: "translateY(0)",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(-20px)",
          },
        },
      },
      animation: {
        "slide-down": "slide-down 0.3s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
      },
      colors: {
        primary: "#374254",
        secondary: "#9AABC5",
        black: "#000000",
        error: "#FF787A",
        gray: {
          100: "#F1F1F1",
          200: "#EAEAEC",
          300: "#E1E1E7",
          400: "#9CA3AF",
          500: "#6B7280",
        },
        blue: {
          100: "#E7F2FE",
          300: "#14AFFD",
          500: "#1481FD",
        },
        input: {
          bg: "#F1F1F180",
          border: "#EAEAEC",
        },
        button: {
          primary: "#EAEAEC",
          secondary: "#E7F2FE",
          gray: {
            100: "#F5F5F7",
          },
          blue: {
            400: "#8CB0E7",
          },
        },
        stroke: {
          primary: "#D8DCE2",
        },
      },
    },
  },
  plugins: [],
};
export default config;
