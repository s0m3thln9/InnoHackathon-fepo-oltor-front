import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
  theme: {
    screens: {
      sm: '485px',
      md: '640px',
      lg: '830px',
      xl: '1100px',
      '2xl': '1300px',
      '3xl': '1500px',
      '4xl': '1700px',
      '5xl': '1900px',
      '6xl': '2100px',
    },
    extend: {
      colors: {
        background: 'var(--background)',
        'background-circles': 'var(--background-circles)',
        'background-secondary': 'var(--background-secondary)',
        'background-primary-linear-first':
          'var(--background-primary-linear-first)',
        'background-primary-linear-second':
          'var(--background-primary-linear-second)',
        'background-secondary-linear-first':
          'var(--background-secondary-linear-first)',
        'background-secondary-linear-second':
          'var(--background-secondary-linear-second)',
        'background-button-linear-first':
          'var(--background-button-linear-first)',
        'background-button-linear-second':
          'var(--background-button-linear-second)',
        text: 'var(--text)',
        'text-link': 'var(--text-link)',
        'text-secondary': 'var(--text-secondary)',
        'text-placeholder': 'var(--text-placeholder)',
        error: 'var(--error)',
        success: 'var(--success)',
      },
      boxShadow: {
        registration: '0px 0px 37px 10px rgba(44, 16, 110, 0.8)',
        'registration-sm': '0px 0px 17px 5px rgba(44, 16, 110, 0.6)',
        'registration-additional': '0px -6px 30px 0px rgba(44, 16, 110, 0.8)',
        'input-button': '0px 8px 30px 4px rgba(81, 45, 168, 0.2)',
      },
      dropShadow: {
        'slider-text': '0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
} satisfies Config
