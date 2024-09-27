/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Your React components directory
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // Flowbite components
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') // Add Flowbite as a plugin
  ],
};
