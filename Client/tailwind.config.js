/** @type {import('tailwindcss').Config} */
export default {
  // 1️⃣ Tell Tailwind where to look for class names:
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  // 2️⃣ Enable class-based dark mode:
  darkMode: 'class',

  theme: {
    extend: {
      // — Animations & keyframes remain as you had them —
      animation: {
        plane: 'planeMove 2s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-out forwards',
      },
      keyframes: {
        planeMove: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },

      // — Map your CSS variables to Tailwind color names —
      colors: {
        text: {
          main: 'var(--color-text-main)',
          error: 'var(--color-text-error)',
        },
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
          100: 'var(--color-blue-100)',
          200: 'var(--color-blue-200)',
          300: 'var(--color-blue-300)',
          400: 'var(--color-blue-400)',
          500: 'var(--color-blue-500)',
          600: 'var(--color-blue-600)',
          700: 'var(--color-blue-700)',
          800: 'var(--color-blue-800)',
          900: 'var(--color-blue-900)',
          1000: 'var(--color-blue-1000)',
        },
        red: {
          500: 'var(--color-red-500)',
        },
        green: {
          500: 'var(--color-green-500)',
        },
      },
    },
  },

  plugins: [],
};
