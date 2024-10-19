import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  daisyui: {
    themes: [
      {
        lofi: {
          ...require("daisyui/src/theming/themes")["lofi"],
          neutral: "#E5E5E5"
        },
      },
    ],
  },

  theme: {
    extend: {
      animation: {
        spin: "spin 5s linear infinite",
      },
    },
    screens: {
      'phone-sm':'320px',
      'phone-lg':'425px',
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px'
    }
  },
  plugins: [require("daisyui")],
};
export default config;
