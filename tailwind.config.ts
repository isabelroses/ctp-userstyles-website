import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", ...fontFamily.sans],
      },
    },
  },
  safelist: [
    "text-rosewater",
    "text-flamingo",
    "text-pink",
    "text-mauve",
    "text-red",
    "text-maroon",
    "text-peach",
    "text-yellow",
    "text-green",
    "text-teal",
    "text-sky",
    "text-sapphire",
    "text-blue",
    "text-lavender",
    "text-text",

    "fill-rosewater",
    "fill-flamingo",
    "fill-pink",
    "fill-mauve",
    "fill-red",
    "fill-maroon",
    "fill-peach",
    "fill-yellow",
    "fill-green",
    "fill-teal",
    "fill-sky",
    "fill-sapphire",
    "fill-blue",
    "fill-lavender",
    "fill-text",
  ],
  plugins: [require("@catppuccin/tailwindcss")],
} satisfies Config;
