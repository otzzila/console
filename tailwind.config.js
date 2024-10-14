/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  mode: 'jit',
  content: ["./src/**/*.{html,js,ts,svelte}"],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        warn: 'var(--color-warn)',
        error: 'var(--color-error)',
      },
      fontFamily: {
        primary: ['var(--font-family-primary)', ...defaultTheme.fontFamily.mono] 
        /* ... , ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace */
      }
    },
  },
  // Classes to build even if not explicitly written
  safelist: [
    {
      pattern: /(bg|text)-(primary|secondary|warn|error)/,
      variants: ['hover', 'focus', 'group-focus'],
    }
  ],
  plugins: [],
}

