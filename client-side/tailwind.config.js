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
        'text-primary-color': 'var(--text-primary-color)'
      },
      height: {
        'nav-height': 'var(--nav-height)'
      },
      margin: {
        'nav-height': 'var(--nav-height)'
      },
    },
  },
  plugins: [],
}

