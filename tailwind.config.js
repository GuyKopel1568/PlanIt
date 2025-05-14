/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // move this outside theme
  theme: {
    extend: {
      colors: {
        gray: {
          50: 'var(--color-gray-50)',
          100: 'var(--color-gray-100)',
          150: 'var(--color-gray-150)',
          200: 'var(--color-gray-200)',
          250: 'var(--color-gray-250)',
          300: 'var(--color-gray-300)',
          350: 'var(--color-gray-350)',
          400: 'var(--color-gray-400)',
          450: 'var(--color-gray-450)',
          500: 'var(--color-gray-500)',
          550: 'var(--color-gray-550)',
          600: 'var(--color-gray-600)',
          650: 'var(--color-gray-650)',
          700: 'var(--color-gray-700)',
          750: 'var(--color-gray-750)',
          800: 'var(--color-gray-800)',
          850: 'var(--color-gray-850)',
          900: 'var(--color-gray-900)',
        },
        blue: {
          1000: 'var(--color-blue-1000)',
          900: 'var(--color-blue-900)',
          800: 'var(--color-blue-800)',
          700: 'var(--color-blue-700)',
          600: 'var(--color-blue-600)',
          500: 'var(--color-blue-500)',
          400: 'var(--color-blue-400)',
          300: 'var(--color-blue-300)',
          200: 'var(--color-blue-200)',
          100: 'var(--color-blue-100)',
        },
        red: {
          500: 'var(--color-red-500)',
        },
        green: {
          500: 'var(--color-green-500)',
        },
        text: {
          main: 'var(--color-text-main)',
          error: 'var(--color-text-error)',
        },
      },
    },
  },
  plugins: [],
};
