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
        // Livery red from the fleet paint scheme and logo bird. The brand color: actions, the cheatline, one red band.
        red: { DEFAULT: c('red'), dark: c('red-dark'), tint: c('red-tint') },
        tarmac: c('tarmac'),
        apron: c('apron'),
        // Body text, plus near-black for headings and outlines (strong), its hover (soft) and a chart tint (400).
        ink: { DEFAULT: c('ink'), muted: c('ink-muted'), strong: c('ink-strong'), soft: c('ink-soft'), 400: c('ink-400') },
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
