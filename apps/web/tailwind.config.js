/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        foreground: '#c8bfa8',
        border: '#2a2a2a',
      },
      fontFamily: {
        mono: ['Courier Prime', 'monospace'],
        vt323: ['VT323', 'monospace'],
        pixel: ['Press Start 2P', 'monospace'],
      },
    },
  },
  plugins: [],
}