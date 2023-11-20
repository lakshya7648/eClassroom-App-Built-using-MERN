/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  "./node_modules/flowbite/**/*.js",
],
  theme: {
    extend: {
      fontFamily:{
        'Young-Serif':['Young Serif', 'serif'],
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

