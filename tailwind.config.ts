import type { Config } from 'tailwindcss'

// Colors resolve to the RGB channel variables in main.css, so opacity modifiers like border-ink-muted/80 keep working.
const c = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`

export default {
  content: ['./app/**/*.{vue,ts}'],
  // Hover styles apply only to a real hovering pointer, so a tap on a phone never leaves one stuck on.
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      colors: {
        // Livery red from the fleet paint scheme and logo bird. Accent only.
        red: { DEFAULT: c('red'), dark: c('red-dark'), tint: c('red-tint') },
        // Navy from the "Flying School" logotype. Primary dark surface and headings.
        navy: { DEFAULT: c('navy'), 700: c('navy-700'), 400: c('navy-400'), 300: c('navy-300') },
        tarmac: c('tarmac'),
        apron: c('apron'),
        ink: { DEFAULT: c('ink'), muted: c('ink-muted') },
        line: c('line'),
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'Arial Narrow', 'sans-serif'],
        sans: ['Barlow', 'system-ui', 'sans-serif'],
      },
      maxWidth: { site: '76rem' },
    },
  },
} satisfies Config
