import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Important: base must match repo name for GitHub Pages
export default defineConfig({
  base: '/universo-luxx/',
  plugins: [react()],
})
