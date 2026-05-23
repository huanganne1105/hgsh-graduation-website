import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/hgsh-graduation-website/',
  plugins: [react()],
})
