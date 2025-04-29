// tailwind.config.js
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'planit-backgroud': "url('/images/backgroundImageDarkMode.png')",
      },
      fontFamily: {
        sans: ['"Josefin Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
