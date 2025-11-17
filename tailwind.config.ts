import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#2563EB', dark: '#1E40AF' }
      }
    }
  },
  plugins: []
}

export default config