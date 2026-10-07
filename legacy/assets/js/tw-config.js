// Shared Tailwind (Play CDN) config. Load right after the CDN script on every page.
tailwind.config = {
  theme: {
    extend: {
      colors: {
        // Livery red from the fleet paint scheme and logo bird. Accent only.
        red: { DEFAULT: '#C8102E', dark: '#A20C24', tint: '#FBE9EC' },
        // Navy from the "Flying School" logotype. Primary dark surface and headings.
        navy: { DEFAULT: '#0E2240', 700: '#16305A', 300: '#AEB7C2' },
        tarmac: '#141A22',
        apron: '#F4F5F7',
        ink: { DEFAULT: '#1B2330', muted: '#5B6470' },
        line: '#DDE1E6',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'Arial Narrow', 'sans-serif'],
        sans: ['Barlow', 'system-ui', 'sans-serif'],
      },
      maxWidth: { site: '76rem' },
    },
  },
};
