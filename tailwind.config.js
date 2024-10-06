/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all files where Tailwind classes might be used
  ],
  theme: {
    extend: {},
  },
  plugins: [], // No need to specify tailwindcss or autoprefixer here, it's handled via PostCSS
}
