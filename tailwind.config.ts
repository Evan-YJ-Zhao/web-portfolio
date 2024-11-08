import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

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
          primary: "#333333",
          secondary: "#4F4F4F",
          accent: "#666666",
          neutral: "#FAFAFA",
          "base-100": "#FAFAFA",
        },
      },
      "cmyk"
    ],
  },

  theme: {
    extend: {
      animation: {
        spin: "spin 5s linear infinite",
      },
      fontFamily: {
        sans: ['var(--font-roboto)'],
        mono: ['var(--font-roboto-mono)']
      }
    },
    screens: {
      "phone-sm": "320px",
      "phone-lg": "425px",
      tablet: "640px",
      laptop: "1024px",
      "desktop-sm": "1280px",
      "desktop-lg": "1440px"
    },
  },
  plugins: [
    require("daisyui"),
    plugin(({ matchUtilities, addUtilities }) => {
      matchUtilities(
        {
          "translate-z": (value) => ({
            transform: `translateZ(${value})`,
          }),
        },
        {
          values: {
            "100": "100px",
            "200": "200px",
            "300": "300px",
            DEFAULT: "0px",
          },
        }
      );
      addUtilities({
        ".text-stroke-1": {
          "text-stroke": "1px",
          "-webkit-text-stroke": "1px",
        },
        ".text-stroke-2": {
          "text-stroke": "2px",
          "-webkit-text-stroke": "2px",
        },
        ".text-stroke-4": {
          "text-stroke": "4px",
          "-webkit-text-stroke": "4px",
        },

        ".text-stroke-color-white": {
          "-webkit-text-stroke-color": "white",
        },
        ".text-stroke-color-black": {
          "-webkit-text-stroke-color": "black",
        },
      });
      addUtilities({
        ".run-animation":{
          "animation-play-state": "running"
        }, 
        ".pause-animation": {
          "animation-play-state": "paused"
        }
      });
    }),
  ],
};
export default config;
