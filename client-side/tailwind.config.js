/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // './node_modules/flowbite/**/*.js'
  ],
  theme: {
    minWidth: {
      '1/2': '50%',
    },
    extend: {
      colors: {
        'bg-primary-color': 'var(--bg-primary-color)',
        'bg-secondary-color': 'var(--bg-secondary-color)',
        'bg-tertiary-color': 'var(--bg-tertiary-color)',
        'bg-quaternary-color': 'var(--bg-quaternary-color)',
        'bg-tint-color': 'var(--bg-tint-color)',
        'bg-tint-color-2': 'var(--bg-tint-color-2)',
        'bg-tint-color-3': 'var(--bg-tint-color-3)',
        'text-primary-color': 'var(--text-primary-color)',
        'text-secondary-color': 'var(--text-secondary-color)',
        'border-color-1': 'var(--border-color-1)',
        'accent-primary-color-light': 'var(--accent-primary-color-light)',
        'accent-primary-color': 'var(--accent-primary-color)',
        'accent-primary-color-dark': 'var(--accent-primary-color-dark)',
        'accent-secondary-color-light': 'var(--accent-secondary-color-light)',
        'accent-secondary-color': 'var(--accent-secondary-color)',
        'accent-secondary-color-dark': 'var(--accent-secondary-color-dark)'
      },
      height: {
        'nav-height': 'var(--nav-height)',
        'screen-minus-nav-height': 'var(--screen-minus-nav-height)'
      },
      margin: {
        'nav-height': 'var(--nav-height)',
        'nav-height-plus': 'var(--nav-height-plus)'
      },
      spacing: {
        'nav-height': 'var(--nav-height)',
        'nav-height-plus': 'var(--nav-height-plus)',
        'half-vw': '50vw',
        'third-vw': '33vw'
      }
    },
  },
  // plugins: [require('flowbite/plugin')],
}

