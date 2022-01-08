module.exports = {
  content: ['apps/store-front/**/*.{ts,html}', 'libs/ui/src/**/*.{ts,html}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        'primary-100': 'var(--primary-100)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
