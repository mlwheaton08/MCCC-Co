/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary-color': 'var(--bg-primary-color)',
        'bg-secondary-color': 'var(--bg-secondary-color)',
        'bg-tint-color': 'var(--bg-tint-color)',
        'bg-tint-color-2': 'var(--bg-tint-color-2)',
        'text-primary-color': 'var(--text-primary-color)',
        'text-secondary-color': 'var(--text-secondary-color)',
        'accent-primary-color-light': 'var(--accent-primary-color-light)',
        'accent-primary-color-dark': 'var(--accent-primary-color-dark)',
        'accent-secondary-color-light': 'var(--accent-secondary-color-light)',
        'accent-secondary-color-dark': 'var(--accent-secondary-color-dark)'
      },
      height: {
        'nav-height': 'var(--nav-height)'
      },
      margin: {
        'nav-height': 'var(--nav-height)',
        'nav-height-plus': 'var(--nav-height-plus)'
      },
    },
  },
  plugins: [],
}

