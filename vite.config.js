import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['puppeteer', 'cheerio']
    }
  },
  plugins: [react(), tailwind()],
})
