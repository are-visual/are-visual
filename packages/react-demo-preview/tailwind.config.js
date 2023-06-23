const configPath = require('@are-visual/tailwindcss/tailwindcss-config')

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...configPath,
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../react-demo/src/**/*.{js,ts,jsx,tsx}',
  ],
}
