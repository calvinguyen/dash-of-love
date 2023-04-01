/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/views/AdminView.{vue,js}",
    "./src/components/Admin/*.{vue,js}",
  ],
  prefix: 'tw-',
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false,
},
  plugins: [],
}
