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
      colors: {
        primary: "#374254",
        black: "#000000",
        gray: {
          100: "#F1F1F1",
          200: "#EAEAEC",
          300: "#E1E1E7",
          400: "#9CA3AF",
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
        },
        red: {
          error: "#FF787A",
        },
      },
    },
  },
  plugins: [],
};
export default config;
