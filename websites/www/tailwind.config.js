/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        gray1: 'rgb(var(--color-gray1))',
        gray2: 'rgb(var(--color-gray2))',
        gray3: 'rgb(var(--color-gray3))',
        gray4: 'rgb(var(--color-gray4))',
        gray5: 'rgb(var(--color-gray5))',
        gray6: 'rgb(var(--color-gray6))',
        link: 'rgb(var(--color-link))',
        background: 'rgb(var(--color-background))',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-newsreader)', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
