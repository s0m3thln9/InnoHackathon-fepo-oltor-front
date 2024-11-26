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
        'background-form': 'var(--background-form)',
        'background-form-linear-first': 'var(--background-form-linear-first)',
        'background-form-linear-second': 'var(--background-form-linear-second)',
        text: 'var(--text)',
        'text-link': 'var(--text-link)',
        'text-secondary': 'var(--text-secondary)',
        'text-placeholder': 'var(--text-placeholder)',
        error: 'var(--error)',
      },
      boxShadow: {
        registration: '0px 0px 37px 10px rgba(44, 16, 110, 0.8)',
        'registration-sm': '0px 0px 17px 5px rgba(44, 16, 110, 0.6)',
        'registration-additional': '0px -6px 30px 0px rgba(44, 16, 110, 0.8)',
        'input-button': '0px 8px 30px 4px rgba(81, 45, 168, 0.2)',
      },
    },
  },
  plugins: [],
} satisfies Config
