const {heroui} = require('@heroui/theme');
// tailwind.config.js
import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export const content = [
  "./node_modules/@heroui/theme/dist/components/(button|ripple|spinner).js",
];
export const theme = {
  extend: {},
};
export const darkMode = "class";
export const plugins = [heroui()];
  plugins: [heroui()],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(button|input-otp|ripple|spinner|form).js"
  ];
